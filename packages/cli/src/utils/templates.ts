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
  // Strip out TypeScript directives
  content = content.replace(/\/\* tslint:disable \*\/[\r\n]+/g, '');
  content = content.replace(/\/\* eslint-disable \*\/[\r\n]+/g, '');
  content = content.replace(/\/\/ @ts-nocheck.*[\r\n]+/g, '');

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
