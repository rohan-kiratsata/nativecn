import path from 'path';

import chalk from 'chalk';

import { readConfig } from '../utils/config';
import { copyComponentTemplate } from '../utils/templates';

interface AddOptions {
  dir?: string;
  overwrite?: boolean;
}

export async function addCommand(components: string[], options: AddOptions = {}) {
  // Read the config
  const config = await readConfig();

  // Use config output directory if not specified
  const targetDir = options.dir || config.components.outDir;

  console.log(chalk.bold(`Adding components to ${targetDir}...`));

  // Process each component
  const results = await Promise.all(
    components.map(async component => {
      const result = await copyComponentTemplate(component, targetDir, {
        overwrite: options.overwrite,
      });

      return { component, success: result };
    })
  );

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
        .join(', ')} } from "${path.relative(
        process.cwd(),
        path.join(process.cwd(), targetDir)
      )}/index";`
    );
    console.log();
  }
}
