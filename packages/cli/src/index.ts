#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';

import { addCommand } from './commands/add';
import { initCommand } from './commands/init';
import { presetCommand } from './commands/preset';
import { getPackageInfo } from './utils/package';

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name('nativecn')
    .description('CLI for managing NativeCN UI components')
    .version(packageInfo.version || '0.1.0');

  // Register commands
  program
    .command('init')
    .description('Initialize NativeCN in your project')
    .option('--styling <type>', 'Styling approach to use (nativewind|stylesheet)', 'nativewind')
    .option('--theme <mode>', 'Default theme mode (light|dark|system)', 'system')
    .option('--skip-install', 'Skip dependency installation')
    .action(initCommand);

  program
    .command('add <component...>')
    .description('Add components to your project')
    .option('-d, --dir <directory>', 'Target directory for the component', './components/ui')
    .option('--overwrite', 'Overwrite existing component', false)
    .action(addCommand);

  program
    .command('preset')
    .description('Generate the NativeCN preset file for tailwind.config.js')
    .action(presetCommand);

  // Add more commands as needed
  program
    .command('list')
    .description('List all available components')
    .action(() => {
      console.log(chalk.green('Available components:'));
      console.log('  • button - A versatile button component');
      console.log('  • card - A container component with variants');
      console.log('  • input - Text input with various styles');
      console.log('  • checkbox - Selectable checkbox component');
      console.log('  • switch - Toggle switch component');
    });

  program.parse();
}

main().catch(error => {
  console.error(chalk.red('Error:'), error.message);
  process.exit(1);
});
