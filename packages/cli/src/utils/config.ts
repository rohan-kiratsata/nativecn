import path from 'path';

import chalk from 'chalk';
import fs from 'fs-extra';

export interface NativeCNConfig {
  styling: 'nativewind' | 'stylesheet';
  theme: {
    useExisting: boolean;
    existingThemePath: string | null;
    defaultTheme: 'light' | 'dark' | 'system';
    useSystemTheme: boolean;
  };
  components: {
    outDir: string;
    defaultProps: Record<string, unknown>;
  };
}

const defaultConfig: NativeCNConfig = {
  styling: 'nativewind',
  theme: {
    useExisting: false,
    existingThemePath: null,
    defaultTheme: 'light',
    useSystemTheme: true,
  },
  components: {
    outDir: './components/ui',
    defaultProps: {
      Button: {
        variant: 'default',
        size: 'default',
      },
    },
  },
};

/**
 * Create a NativeCN config file
 */
export async function createConfig(configOptions: Partial<NativeCNConfig> = {}) {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'nativecn.config.js');

  // Merge default config with provided options
  const config = {
    ...defaultConfig,
    ...configOptions,
    theme: {
      ...defaultConfig.theme,
      ...configOptions.theme,
    },
    components: {
      ...defaultConfig.components,
      ...configOptions.components,
    },
  };

  // Create config file content
  const configContent = `/** @type {import('@nativecn/cli').Config} */
module.exports = ${JSON.stringify(config, null, 2)};
`;

  try {
    await fs.writeFile(configPath, configContent);
    console.log(chalk.green('✓'), 'Created NativeCN config file');
    return true;
  } catch (error) {
    console.error(
      chalk.red('✗'),
      'Failed to create config file:',
      error instanceof Error ? error.message : String(error)
    );
    return false;
  }
}

/**
 * Read the NativeCN config file
 */
export function readConfig(): NativeCNConfig {
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'nativecn.config.js');

  try {
    // Using require to load the config as a module
    delete require.cache[configPath];
    const config = require(configPath);
    return config as NativeCNConfig;
  } catch (error) {
    console.warn(
      chalk.yellow('!'),
      'Config file not found, using defaults:',
      error instanceof Error ? error.message : String(error)
    );
    return defaultConfig;
  }
}
