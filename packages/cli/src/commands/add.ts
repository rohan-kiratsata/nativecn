import path from 'path';

import chalk from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';

import { readConfig } from '../utils/config';
import { isPackageInstalled } from '../utils/package';
import {
  copyComponentTemplate,
  resolveComponentDependencies,
  generateComponentIndex,
} from '../utils/templates';

// Component-specific dependencies
const componentDependencies: Record<string, { deps: string[]; devDeps: string[] }> = {
  alert: {
    deps: ['react-native-vector-icons'],
    devDeps: ['@types/react-native-vector-icons'],
  },
};

interface AddOptions {
  dir?: string;
  overwrite?: boolean;
  skipDependencies?: boolean;
}

export async function addCommand(components: string[], options: AddOptions = {}) {
  // Read the config
  const config = await readConfig();

  // Use config output directory if not specified
  const targetDir = options.dir || config.components.outDir;

  console.log(chalk.bold(`Adding components to ${targetDir}...`));

  // Resolve all dependencies
  const resolvedComponents = resolveComponentDependencies(components);
  const additionalComponents = resolvedComponents.filter(c => !components.includes(c));

  if (additionalComponents.length > 0) {
    console.log(chalk.blue('i'), `Adding dependencies: ${additionalComponents.join(', ')}`);
  }

  // Check if we need to install any npm dependencies for the components
  if (!options.skipDependencies) {
    await installComponentDependencies(resolvedComponents);
  }

  // Process each component
  const results = await Promise.all(
    resolvedComponents.map(async component => {
      const result = await copyComponentTemplate(component, targetDir, {
        overwrite: options.overwrite,
      });

      return { component, success: result };
    })
  );

  // Generate index.ts file
  await generateComponentIndex(targetDir);

  // Print summary
  console.log();
  console.log(chalk.bold('Summary:'));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  if (successful.length > 0) {
    console.log(chalk.green('✓'), `Added ${successful.length} component(s):`);

    successful.forEach(result => {
      console.log(`  • ${result.component}`);
    });
  }

  if (failed.length > 0) {
    console.log(chalk.red('✗'), `Failed to add ${failed.length} component(s):`);

    failed.forEach(result => {
      console.log(`  • ${result.component}`);
    });
  }

  // Show usage example
  if (successful.length > 0) {
    console.log();
    console.log(chalk.bold('Usage example:'));
    console.log();
    console.log(
      `import { ${successful
        .map(r => r.component.charAt(0).toUpperCase() + r.component.slice(1))
        .join(', ')} } from "${path.relative(process.cwd(), path.join(process.cwd(), targetDir))}";`
    );
    console.log();
  }
}

/**
 * Install npm dependencies required by specific components
 */
async function installComponentDependencies(components: string[]) {
  // Collect all required dependencies
  const dependencies: string[] = [];
  const devDependencies: string[] = [];

  for (const component of components) {
    if (componentDependencies[component]) {
      // Regular dependencies
      for (const dep of componentDependencies[component].deps) {
        if (!dependencies.includes(dep) && !(await isPackageInstalled(dep))) {
          dependencies.push(dep);
        }
      }

      // Dev dependencies
      for (const dep of componentDependencies[component].devDeps) {
        if (!devDependencies.includes(dep) && !(await isPackageInstalled(dep))) {
          devDependencies.push(dep);
        }
      }
    }
  }

  // Detect package manager
  const packageManager = await detectPackageManager();
  const installCmd = packageManager === 'yarn' ? 'add' : 'install';

  let success = true;

  // Install regular dependencies if any
  if (dependencies.length > 0) {
    console.log(chalk.bold(`Installing component dependencies: ${dependencies.join(', ')}...`));

    try {
      await execa(packageManager, [installCmd, ...dependencies], {
        stdio: 'inherit',
      });
      console.log(chalk.green('✓'), 'Component dependencies installed');

      if (dependencies.includes('react-native-vector-icons')) {
        console.log(
          chalk.blue('i'),
          'Additional setup for react-native-vector-icons may be required:'
        );
        console.log('   For iOS: pod install in the ios directory');
        console.log('   For Android: Check that gradle is configured correctly');
        console.log('   See: https://github.com/oblador/react-native-vector-icons#installation');
      }
    } catch (error) {
      console.error(
        chalk.red('✗'),
        'Failed to install component dependencies:',
        error instanceof Error ? error.message : String(error)
      );
      console.log(
        chalk.yellow('!'),
        'You can install them manually:',
        `${packageManager} ${installCmd} ${dependencies.join(' ')}`
      );
      success = false;
    }
  }

  // Install dev dependencies if any
  if (devDependencies.length > 0) {
    console.log(
      chalk.bold(`Installing component dev dependencies: ${devDependencies.join(', ')}...`)
    );

    try {
      const devFlag = packageManager === 'npm' ? '--save-dev' : '-D';
      await execa(packageManager, [installCmd, devFlag, ...devDependencies], {
        stdio: 'inherit',
      });
      console.log(chalk.green('✓'), 'Component dev dependencies installed');
    } catch (error) {
      console.error(
        chalk.red('✗'),
        'Failed to install component dev dependencies:',
        error instanceof Error ? error.message : String(error)
      );
      console.log(
        chalk.yellow('!'),
        'You can install them manually:',
        `${packageManager} ${installCmd} ${packageManager === 'npm' ? '--save-dev' : '-D'} ${devDependencies.join(' ')}`
      );
      success = false;
    }
  }

  return success;
}

/**
 * Detect the package manager being used
 */
async function detectPackageManager() {
  const cwd = process.cwd();

  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  return 'npm';
}
