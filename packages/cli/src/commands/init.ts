import fs from "fs-extra";
import path from "path";
import execa from "execa";
import chalk from "chalk";
import prompts from "prompts";
import { createConfig } from "../utils/config";
import { isPackageInstalled, getUserPackageInfo } from "../utils/package";

interface InitOptions {
  styling?: "nativewind" | "stylesheet";
  theme?: "light" | "dark" | "system";
  skipInstall?: boolean;
}

export async function initCommand(options: InitOptions = {}) {
  console.log(chalk.bold("Initializing NativeCN in your project..."));

  // Check if package.json exists
  const packageInfo = await getUserPackageInfo();

  if (!packageInfo.exists) {
    console.error(
      chalk.red("✗"),
      "No package.json found. Please run this command in a React Native project."
    );
    process.exit(1);
  }

  // Check if this is a React Native project
  const isReactNative = await isPackageInstalled("react-native");

  if (!isReactNative) {
    console.error(
      chalk.red("✗"),
      "This does not appear to be a React Native project."
    );
    process.exit(1);
  }

  // Detect styling preference
  let styling = options.styling;

  if (!styling) {
    const isNativeWindInstalled = await isPackageInstalled("nativewind");

    if (isNativeWindInstalled) {
      styling = "nativewind";
    } else {
      // Ask user for styling preference
      const response = await prompts({
        type: "select",
        name: "styling",
        message: "Which styling approach would you like to use?",
        choices: [
          {
            title: "NativeWind (Tailwind CSS for React Native)",
            value: "nativewind",
          },
          { title: "React Native StyleSheet", value: "stylesheet" },
        ],
      });

      styling = response.styling;

      if (!styling) {
        console.log(chalk.yellow("Operation cancelled"));
        process.exit(0);
      }
    }
  }

  // Check for existing theme providers
  const hasExistingTheme = await checkForExistingThemeProvider();

  // Create components directory
  const componentsDir = path.join(process.cwd(), "components/ui");
  await fs.ensureDir(componentsDir);

  // Create config file
  await createConfig({
    styling: styling as "nativewind" | "stylesheet",
    theme: {
      useExisting: hasExistingTheme.exists,
      existingThemePath: hasExistingTheme.path,
      defaultTheme: (options.theme || "light") as "light" | "dark" | "system",
      useSystemTheme: options.theme === "system",
    },
  });

  // Install dependencies
  if (!options.skipInstall) {
    await installDependencies(styling as "nativewind" | "stylesheet");
  }

  // Set up NativeWind configuration if using NativeWind
  if (styling === "nativewind") {
    await setupNativeWind();
  }

  // Create initial files
  await createInitialFiles(
    styling as "nativewind" | "stylesheet",
    hasExistingTheme.exists
  );

  console.log();
  console.log(
    chalk.green("✓"),
    chalk.bold("NativeCN initialized successfully!")
  );
  console.log();
  console.log("Next steps:");
  console.log("  1. Add components to your project:");
  console.log("     npx nativecn add button card input");
  console.log();
  console.log("  2. Import and use components in your app:");
  console.log('     import Button from "./components/ui/button";');
  console.log();
}

/**
 * Check for existing theme providers in the project
 */
async function checkForExistingThemeProvider() {
  const cwd = process.cwd();
  const potentialThemePaths = [
    "src/theme",
    "app/theme",
    "lib/theme",
    "context/theme",
    "hooks/theme",
  ];

  for (const dir of potentialThemePaths) {
    const fullPath = path.join(cwd, dir);

    if (await fs.pathExists(fullPath)) {
      const files = await fs.readdir(fullPath);

      for (const file of files) {
        if (file.toLowerCase().includes("theme")) {
          // Ask user if this is their theme provider
          const response = await prompts({
            type: "confirm",
            name: "useTheme",
            message: `Found potential theme provider at ${dir}/${file}. Do you want to use this?`,
            initial: true,
          });

          if (response.useTheme) {
            return {
              exists: true,
              path: `${dir}/${file.replace(/\.[jt]sx?$/, "")}`,
            };
          }
        }
      }
    }
  }

  // No theme provider found or confirmed
  return { exists: false, path: null };
}

/**
 * Install required dependencies based on styling choice
 */
async function installDependencies(styling: "nativewind" | "stylesheet") {
  console.log(chalk.bold("Installing dependencies..."));

  // Check if this is an Expo project
  const isExpo = await isPackageInstalled("expo");

  if (styling === "nativewind" && !(await isPackageInstalled("nativewind"))) {
    if (isExpo) {
      // For Expo projects, use expo install for ALL dependencies
      try {
        await execa("npx", ["expo", "install", 
          "nativewind",
          "tailwindcss",
          "react-native-reanimated",
          "react-native-safe-area-context",
          "clsx",
          "tailwind-merge"
        ], {
          stdio: "inherit",
        });
        console.log(chalk.green("✓"), "Installed all dependencies with Expo");
        return true;
      } catch (error) {
        console.error(
          chalk.red("✗"),
          "Failed to install dependencies with expo install:",
          error instanceof Error ? error.message : String(error)
        );
        return false;
      }
    } else {
      // For bare React Native projects, use specific versions
      const dependencies = [
        "clsx",
        "tailwind-merge",
        "nativewind@^4.1.0",
        "tailwindcss@^3.4.17",
        "react-native-reanimated@~3.16.1",
        "react-native-safe-area-context@4.12.0"
      ];

      // Detect package manager
      const packageManager = await detectPackageManager();

      try {
        const installCmd = packageManager === "yarn" ? "add" : "install";
        await execa(packageManager, [installCmd, ...dependencies], {
          stdio: "inherit",
        });
        console.log(chalk.green("✓"), "Dependencies installed");
        return true;
      } catch (error) {
        console.error(
          chalk.red("✗"),
          "Failed to install dependencies:",
          error instanceof Error ? error.message : String(error)
        );
        console.log(
          chalk.yellow("!"),
          "You can install them manually:",
          `${packageManager} ${
            packageManager === "yarn" ? "add" : "install"
          } ${dependencies.join(" ")}`
        );
        return false;
      }
    }
  }

  // If we only need common dependencies and it's not an Expo project
  if (!isExpo) {
    const packageManager = await detectPackageManager();
    try {
      const installCmd = packageManager === "yarn" ? "add" : "install";
      await execa(packageManager, [installCmd, "clsx", "tailwind-merge"], {
        stdio: "inherit",
      });
      console.log(chalk.green("✓"), "Dependencies installed");
      return true;
    } catch (error) {
      console.error(
        chalk.red("✗"),
        "Failed to install dependencies:",
        error instanceof Error ? error.message : String(error)
      );
      return false;
    }
  }

  return true;
}

/**
 * Detect the package manager being used
 */
async function detectPackageManager() {
  const cwd = process.cwd();

  if (await fs.pathExists(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }

  if (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  return "npm";
}

/**
 * Set up NativeWind configuration
 */
async function setupNativeWind() {
  const cwd = process.cwd();
  const isExpo = await isPackageInstalled("expo");

  // Create or update tailwind.config.js
  const tailwindConfigPath = path.join(cwd, "tailwind.config.js");

  if (!(await fs.pathExists(tailwindConfigPath))) {
    // Create new tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Light theme colors
        background: "#ffffff",
        foreground: "#252525",
        card: "#ffffff",
        "card-foreground": "#252525",
        popover: "#ffffff",
        "popover-foreground": "#252525",
        primary: "#343434",
        "primary-foreground": "#fbfbfb",
        secondary: "#f7f7f7",
        "secondary-foreground": "#343434",
        muted: "#f7f7f7",
        "muted-foreground": "#8d8d8d",
        accent: "#f7f7f7",
        "accent-foreground": "#343434",
        destructive: "#e13636",
        "destructive-foreground": "#e13636",
        border: "#ebebeb",
        input: "#ebebeb",
        ring: "#b4b4b4",
        
        // Dark mode colors
        dark: {
          background: "#252525",
          foreground: "#fbfbfb",
          card: "#252525",
          "card-foreground": "#fbfbfb",
          popover: "#252525",
          "popover-foreground": "#fbfbfb",
          primary: "#fbfbfb",
          "primary-foreground": "#343434",
          secondary: "#444444",
          "secondary-foreground": "#fbfbfb",
          muted: "#444444",
          "muted-foreground": "#b4b4b4",
          accent: "#444444",
          "accent-foreground": "#fbfbfb",
          destructive: "#9e2626",
          "destructive-foreground": "#f85d5d",
          border: "#444444",
          input: "#444444",
          ring: "#8d8d8d",
        },
        
        // Sidebar colors
        sidebar: {
          DEFAULT: "#fbfbfb",
          foreground: "#252525",
          primary: "#343434",
          "primary-foreground": "#fbfbfb",
          accent: "#f7f7f7",
          "accent-foreground": "#343434",
          border: "#ebebeb",
          ring: "#b4b4b4",
        },
        
        "sidebar-dark": {
          DEFAULT: "#343434",
          foreground: "#fbfbfb",
          primary: "#5e46ff",
          "primary-foreground": "#fbfbfb",
          accent: "#444444",
          "accent-foreground": "#fbfbfb",
          border: "#444444",
          ring: "#707070",
        },
      },
      borderRadius: {
        xl: 16,
        lg: 10,
        md: 8,
        sm: 6,
      },
    },
  },
  plugins: [],
};
`;

    await fs.writeFile(tailwindConfigPath, tailwindConfig);
    console.log(chalk.green("✓"), "Created tailwind.config.js");
  } else {
    console.log(chalk.blue("i"), "tailwind.config.js already exists, skipping");
  }

  // Create global.css
  const globalCssPath = path.join(cwd, "global.css");
  if (!(await fs.pathExists(globalCssPath))) {
    const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #FFFFFF;
    --foreground: #0F172A;
    
    --primary: #2563EB;
    --primary-foreground: #FFFFFF;
    
    --secondary: #F1F5F9;
    --secondary-foreground: #0F172A;
    
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    
    --accent: #F1F5F9;
    --accent-foreground: #0F172A;
    
    --input: #E2E8F0;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --background: #0F172A;
      --foreground: #F8FAFC;
      
      --primary: #3B82F6;
      --primary-foreground: #FFFFFF;
      
      --secondary: #334155;
      --secondary-foreground: #F8FAFC;
      
      --destructive: #F87171;
      --destructive-foreground: #FFFFFF;
      
      --accent: #1E293B;
      --accent-foreground: #F8FAFC;
      
      --input: #1E293B;
    }
  }
}`;
    await fs.writeFile(globalCssPath, globalCss);
    console.log(chalk.green("✓"), "Created global.css");
  } else {
    console.log(chalk.blue("i"), "global.css already exists, skipping");
  }

  // Create or update metro.config.js
  const metroConfigPath = path.join(cwd, "metro.config.js");
  if (!(await fs.pathExists(metroConfigPath))) {
    // Create metro config based on project type
    const metroConfig = `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

module.exports = withNativeWind(config, { input: './global.css' })
`;

    await fs.writeFile(metroConfigPath, metroConfig);
    console.log(chalk.green("✓"), "Created metro.config.js");
  } else {
    // Update existing metro.config.js
    let metroConfig = await fs.readFile(metroConfigPath, "utf-8");
    if (!metroConfig.includes("nativewind/metro")) {
      // Determine which import to use based on project type
      const getDefaultConfigImport = isExpo
        ? 'require("expo/metro-config")'
        : 'require("@react-native/metro-config")';

      metroConfig = `const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = ${getDefaultConfigImport};

${metroConfig.replace(
        "module.exports =",
        "const config ="
      )}

module.exports = withNativeWind(config, { input: './global.css' });
`;
      await fs.writeFile(metroConfigPath, metroConfig);
      console.log(chalk.green("✓"), "Updated metro.config.js");
    } else {
      console.log(chalk.blue("i"), "metro.config.js already configured, skipping");
    }
  }

  // Check babel.config.js
  const babelConfigPath = path.join(cwd, "babel.config.js");
  if (await fs.pathExists(babelConfigPath)) {
    let babelConfig = await fs.readFile(babelConfigPath, "utf-8");

    // Check if NativeWind plugin is already configured
    if (!babelConfig.includes("nativewind")) {
      // Create new babel config based on project type
      babelConfig = isExpo
        ? `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin"
    ],
  };
};`
        : `module.exports = {
  presets: [
    ["react-native", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],
  plugins: [
    "react-native-reanimated/plugin",
  ],
};`;

      await fs.writeFile(babelConfigPath, babelConfig);
      console.log(chalk.green("✓"), "Updated babel.config.js");
    } else {
      console.log(
        chalk.blue("i"),
        "NativeWind already configured in babel.config.js"
      );
    }
  } else {
    // Create new babel.config.js based on project type
    const babelConfig = isExpo
      ? `module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "react-native-reanimated/plugin"
    ],
  };
};`
      : `module.exports = {
  presets: [
    ["react-native", { jsxImportSource: "nativewind" }],
    "nativewind/babel",
  ],
  plugins: [
    "react-native-reanimated/plugin",
  ],
};`;

    await fs.writeFile(babelConfigPath, babelConfig);
    console.log(chalk.green("✓"), "Created babel.config.js");
  }

  // Create or update app.json for Expo projects
  if (isExpo) {
    const appJsonPath = path.join(cwd, "app.json");
    if (await fs.pathExists(appJsonPath)) {
      let appJson = await fs.readFile(appJsonPath, "utf-8");
      const config = JSON.parse(appJson);

      if (!config.expo?.web?.bundler) {
        config.expo = {
          ...config.expo,
          web: {
            ...config.expo?.web,
            bundler: "metro"
          }
        };
        await fs.writeFile(appJsonPath, JSON.stringify(config, null, 2));
        console.log(chalk.green("✓"), "Updated app.json");
      } else {
        console.log(chalk.blue("i"), "app.json already configured, skipping");
      }
    }
  }

  // Create app.json if it doesn't exist (for Expo projects)
  if (isExpo) {
    const appJsonPath = path.join(cwd, "app.json");
    if (!(await fs.pathExists(appJsonPath))) {
      const appJson = {
        expo: {
          web: {
            bundler: "metro"
          }
        }
      };
      await fs.writeFile(appJsonPath, JSON.stringify(appJson, null, 2));
    } else {
      const appJson = JSON.parse(await fs.readFile(appJsonPath, "utf-8"));
      if (!appJson.expo) appJson.expo = {};
      if (!appJson.expo.web) appJson.expo.web = {};
      appJson.expo.web.bundler = "metro";
      await fs.writeFile(appJsonPath, JSON.stringify(appJson, null, 2));
    }
  }
}

/**
 * Create initial utility files
 */
async function createInitialFiles(
  styling: "nativewind" | "stylesheet",
  useExistingTheme: boolean
) {
  const cwd = process.cwd();

  // Create utils directory if it doesn't exist
  const utilsDir = path.join(cwd, "lib");
  await fs.ensureDir(utilsDir);

  // Create cn.ts utility
  const cnPath = path.join(utilsDir, "utils.ts");
  const cnContent = `import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility for merging Tailwind CSS classes without style conflicts.
 * Can be used with or without NativeWind.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  await fs.writeFile(cnPath, cnContent);
  console.log(chalk.green("✓"), "Created utility functions");

  // Add global.css import to App entry point if using NativeWind
  if (styling === "nativewind") {
    // Try common App entry point paths, including Expo Router's _layout.tsx
    const appPaths = [
      "app/_layout.tsx",  // Expo Router layout file
      "app/_layout.jsx",
      "app/_layout.js",
      "App.tsx",
      "App.jsx",
      "App.js",
      "app/index.tsx",
      "app/index.jsx",
      "app/index.js",
      "src/App.tsx",
      "src/App.jsx",
      "src/App.js",
    ];

    for (const appPath of appPaths) {
      const fullPath = path.join(cwd, appPath);
      if (await fs.pathExists(fullPath)) {
        let appContent = await fs.readFile(fullPath, "utf-8");
        
        // Only add import if it doesn't exist
        if (!appContent.includes('import "../global.css"') && !appContent.includes('import "./global.css"')) {
          // Use different import path based on file location
          const importPath = appPath.startsWith("app/") ? "../global.css" : "./global.css";
          appContent = `import "${importPath}";\n\n${appContent}`;
          await fs.writeFile(fullPath, appContent);
          console.log(chalk.green("✓"), `Added global.css import to ${appPath}`);
        }
        break;
      }
    }
  }

  // Create theme context if needed
  if (!useExistingTheme) {
    const themeDir = path.join(cwd, "lib");
    await fs.ensureDir(themeDir);

    const themePath = path.join(themeDir, "ThemeContext.tsx");
    const themeContent = `import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  defaultTheme?: ThemeMode;
  useSystemTheme?: boolean;
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  defaultTheme = 'light',
  useSystemTheme = true,
  children,
}) => {
  const [theme, setTheme] = useState<ThemeMode>(defaultTheme);

  useEffect(() => {
    if (useSystemTheme) {
      const colorScheme = Appearance.getColorScheme() as ThemeMode || defaultTheme;
      setTheme(colorScheme);

      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(colorScheme as ThemeMode || defaultTheme);
      });

      return () => {
        subscription.remove();
      };
    }
  }, [useSystemTheme, defaultTheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
`;

    await fs.writeFile(themePath, themeContent);
    console.log(chalk.green("✓"), "Created theme context");
  }
}


