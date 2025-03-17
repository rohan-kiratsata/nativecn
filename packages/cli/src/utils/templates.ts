import path from 'path';

import chalk from 'chalk';
import fs from 'fs-extra';

import { NativeCNConfig, readConfig } from './config';

/**
 * Get the template directory for a component
 */
export function getTemplateDir(component: string) {
  // Try multiple possible locations for component templates
  const possiblePaths = [
    // First check if there are templates within the CLI package
    path.resolve(__dirname, '../../templates', component),

    // Then check relative to the CLI package in a monorepo setup
    path.resolve(__dirname, '../../../components/ui', component),

    // Lastly, check relative to current directory for local development
    path.resolve(process.cwd(), 'components/ui', component),
  ];

  for (const templatePath of possiblePaths) {
    if (fs.existsSync(templatePath)) {
      return templatePath;
    }
  }

  throw new Error(`Component template '${component}' not found`);
}

/**
 * Read component dependencies from dependencies.json if it exists
 */
export function getComponentDependencies(component: string): string[] {
  try {
    const templateDir = getTemplateDir(component);
    const dependencyFile = path.join(templateDir, 'dependencies.json');

    if (fs.existsSync(dependencyFile)) {
      const dependencyData = fs.readJSONSync(dependencyFile);
      return dependencyData.dependencies || [];
    }

    return [];
  } catch (error) {
    console.warn(
      chalk.yellow('!'),
      `Failed to read dependencies for component '${component}':`,
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }
}

/**
 * Resolve all dependencies for a component and its nested dependencies
 */
export function resolveComponentDependencies(
  components: string[],
  resolvedDeps: Set<string> = new Set(),
  processing: Set<string> = new Set()
): string[] {
  for (const component of components) {
    // Skip if already resolved or currently processing (circular dependency)
    if (resolvedDeps.has(component) || processing.has(component)) {
      continue;
    }

    // Add to processing set to detect circular dependencies
    processing.add(component);

    // Add the component itself
    resolvedDeps.add(component);

    // Get and process dependencies recursively
    try {
      const dependencies = getComponentDependencies(component);
      resolveComponentDependencies(dependencies, resolvedDeps, processing);
    } catch (error) {
      // If a template doesn't exist, that's fine, just skip its dependencies
      console.warn(
        chalk.yellow('!'),
        `Skipping dependencies for component '${component}':`,
        error instanceof Error ? error.message : String(error)
      );
    }

    // Remove from processing set
    processing.delete(component);
  }

  return Array.from(resolvedDeps);
}

/**
 * Copy a component template to the user's project
 */
export async function copyComponentTemplate(
  component: string,
  targetDir: string,
  options: { overwrite?: boolean } = {}
) {
  const { overwrite = false } = options;
  const config = await readConfig();
  const templateDir = getTemplateDir(component);
  const destinationDir = path.resolve(process.cwd(), targetDir, component);

  // Check if component already exists
  if (fs.existsSync(destinationDir) && !overwrite) {
    console.warn(
      chalk.yellow('!'),
      `Component '${component}' already exists. Use --overwrite to replace it.`
    );
    return false;
  }

  try {
    // Create the destination directory
    await fs.ensureDir(destinationDir);

    // Copy all files from the template
    const files = await fs.readdir(templateDir);

    for (const file of files) {
      // Skip dependencies.json as it's just for the CLI
      if (file === 'dependencies.json') {
        continue;
      }

      const sourcePath = path.join(templateDir, file);
      const destPath = path.join(destinationDir, file);

      let content = await fs.readFile(sourcePath, 'utf-8');

      // Process the file content based on config
      content = processTemplateContent(content, config);

      await fs.writeFile(destPath, content);
    }

    console.log(chalk.green('✓'), `Added component '${component}'`);
    return true;
  } catch (error) {
    console.error(
      chalk.red('✗'),
      `Failed to copy component '${component}':`,
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}

/**
 * Process template content based on configuration
 */
function processTemplateContent(content: string, config: NativeCNConfig) {
  // Strip out TypeScript directives - remove the first 3 lines if they're the directive comments
  const lines = content.split(/\r?\n/);
  if (
    lines.length >= 3 &&
    lines[0].trim() === '/* tslint:disable */' &&
    lines[1].trim() === '/* eslint-disable */' &&
    lines[2].trim().startsWith('// @ts-nocheck')
  ) {
    content = lines.slice(3).join('\n');
  }

  // Replace import paths based on styling approach
  if (config.styling === 'stylesheet') {
    // Use StyleSheet imports
    content = content.replace(/useNativeStyleSheet\s*=\s*false/g, 'useNativeStyleSheet = true');
  }

  // Replace theme configuration
  if (config.theme.useExisting && config.theme.existingThemePath) {
    // Use existing theme provider
    content = content.replace(
      /import.*from\s*["']@nativecn\/core["']/g,
      `import { cn, getVariantStyles, ThemeMode } from "@nativecn/core";\nimport { useTheme } from "${config.theme.existingThemePath}";`
    );
  }

  return content;
}

/**
 * Generate an index.ts barrel file that exports all components
 */
export async function generateComponentIndex(targetDir: string) {
  try {
    const componentsDir = path.resolve(process.cwd(), targetDir);
    const dirs = await fs.readdir(componentsDir, { withFileTypes: true });

    // Filter for directories only
    const componentDirs = dirs.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

    if (componentDirs.length === 0) {
      return;
    }

    // Generate export statements for each component
    const exports = componentDirs.map(dir => `export * from './${dir}';`).join('\n');
    const indexContent = `// This file is auto-generated by NativeCN CLI
// Do not edit this file manually

${exports}
`;

    const indexPath = path.join(componentsDir, 'index.ts');
    await fs.writeFile(indexPath, indexContent);

    console.log(chalk.green('✓'), `Updated index.ts with ${componentDirs.length} components`);
  } catch (error) {
    console.error(
      chalk.red('✗'),
      'Failed to generate index.ts:',
      error instanceof Error ? error.message : String(error)
    );
  }
}
