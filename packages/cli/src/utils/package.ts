import path from 'path';

import fs from 'fs-extra';

/**
 * Get package information from package.json
 */
export async function getPackageInfo() {
  const packageJsonPath = path.resolve(__dirname, '../../package.json');

  try {
    const packageJson = await fs.readJSON(packageJsonPath);
    return {
      name: packageJson.name,
      version: packageJson.version,
    };
  } catch {
    return {
      name: '@nativecn/cli',
      version: '0.1.0',
    };
  }
}

/**
 * Get the user's project package.json
 */
export async function getUserPackageInfo() {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, 'package.json');

  try {
    const packageJson = await fs.readJSON(packageJsonPath);
    return {
      path: packageJsonPath,
      data: packageJson,
      exists: true,
    };
  } catch {
    return {
      path: packageJsonPath,
      data: {},
      exists: false,
    };
  }
}

/**
 * Check if a package is installed in the user's project
 */
export async function isPackageInstalled(packageName: string) {
  const { data, exists } = await getUserPackageInfo();

  if (!exists) {
    return false;
  }

  const dependencies = {
    ...data.dependencies,
    ...data.devDependencies,
  };

  return !!dependencies[packageName];
}
