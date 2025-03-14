"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = initCommand;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const execa_1 = __importDefault(require("execa"));
const chalk_1 = __importDefault(require("chalk"));
const prompts_1 = __importDefault(require("prompts"));
const config_1 = require("../utils/config");
const package_1 = require("../utils/package");
function initCommand() {
    return __awaiter(this, arguments, void 0, function* (options = {}) {
        console.log(chalk_1.default.bold("Initializing NativeCN in your project..."));
        // Check if package.json exists
        const packageInfo = yield (0, package_1.getUserPackageInfo)();
        if (!packageInfo.exists) {
            console.error(chalk_1.default.red("✗"), "No package.json found. Please run this command in a React Native project.");
            process.exit(1);
        }
        // Check if this is a React Native project
        const isReactNative = yield (0, package_1.isPackageInstalled)("react-native");
        if (!isReactNative) {
            console.error(chalk_1.default.red("✗"), "This does not appear to be a React Native project.");
            process.exit(1);
        }
        // Detect styling preference
        let styling = options.styling;
        if (!styling) {
            const isNativeWindInstalled = yield (0, package_1.isPackageInstalled)("nativewind");
            if (isNativeWindInstalled) {
                styling = "nativewind";
            }
            else {
                // Ask user for styling preference
                const response = yield (0, prompts_1.default)({
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
                    console.log(chalk_1.default.yellow("Operation cancelled"));
                    process.exit(0);
                }
            }
        }
        // Check for existing theme providers
        const hasExistingTheme = yield checkForExistingThemeProvider();
        // Create components directory
        const componentsDir = path_1.default.join(process.cwd(), "components/ui");
        yield fs_extra_1.default.ensureDir(componentsDir);
        // Create config file
        yield (0, config_1.createConfig)({
            styling: styling,
            theme: {
                useExisting: hasExistingTheme.exists,
                existingThemePath: hasExistingTheme.path,
                defaultTheme: (options.theme || "light"),
                useSystemTheme: options.theme === "system",
            },
        });
        // Install dependencies
        if (!options.skipInstall) {
            yield installDependencies(styling);
        }
        // Set up NativeWind configuration if using NativeWind
        if (styling === "nativewind") {
            yield setupNativeWind();
        }
        // Create initial files
        yield createInitialFiles(styling, hasExistingTheme.exists);
        console.log();
        console.log(chalk_1.default.green("✓"), chalk_1.default.bold("NativeCN initialized successfully!"));
        console.log();
        console.log("Next steps:");
        console.log("  1. Add components to your project:");
        console.log("     npx nativecn add button card input");
        console.log();
        console.log("  2. Import and use components in your app:");
        console.log('     import Button from "./components/ui/button";');
        console.log();
    });
}
/**
 * Check for existing theme providers in the project
 */
function checkForExistingThemeProvider() {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = process.cwd();
        const potentialThemePaths = [
            "src/theme",
            "app/theme",
            "lib/theme",
            "context/theme",
            "hooks/theme",
        ];
        for (const dir of potentialThemePaths) {
            const fullPath = path_1.default.join(cwd, dir);
            if (yield fs_extra_1.default.pathExists(fullPath)) {
                const files = yield fs_extra_1.default.readdir(fullPath);
                for (const file of files) {
                    if (file.toLowerCase().includes("theme")) {
                        // Ask user if this is their theme provider
                        const response = yield (0, prompts_1.default)({
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
    });
}
/**
 * Install required dependencies based on styling choice
 */
function installDependencies(styling) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.bold("Installing dependencies..."));
        // Check if this is an Expo project
        const isExpo = yield (0, package_1.isPackageInstalled)("expo");
        if (styling === "nativewind" && !(yield (0, package_1.isPackageInstalled)("nativewind"))) {
            if (isExpo) {
                // For Expo projects, use expo install for ALL dependencies
                try {
                    yield (0, execa_1.default)("npx", ["expo", "install",
                        "nativewind",
                        "tailwindcss",
                        "react-native-reanimated",
                        "react-native-safe-area-context",
                        "clsx",
                        "tailwind-merge"
                    ], {
                        stdio: "inherit",
                    });
                    console.log(chalk_1.default.green("✓"), "Installed all dependencies with Expo");
                    return true;
                }
                catch (error) {
                    console.error(chalk_1.default.red("✗"), "Failed to install dependencies with expo install:", error instanceof Error ? error.message : String(error));
                    return false;
                }
            }
            else {
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
                const packageManager = yield detectPackageManager();
                try {
                    const installCmd = packageManager === "yarn" ? "add" : "install";
                    yield (0, execa_1.default)(packageManager, [installCmd, ...dependencies], {
                        stdio: "inherit",
                    });
                    console.log(chalk_1.default.green("✓"), "Dependencies installed");
                    return true;
                }
                catch (error) {
                    console.error(chalk_1.default.red("✗"), "Failed to install dependencies:", error instanceof Error ? error.message : String(error));
                    console.log(chalk_1.default.yellow("!"), "You can install them manually:", `${packageManager} ${packageManager === "yarn" ? "add" : "install"} ${dependencies.join(" ")}`);
                    return false;
                }
            }
        }
        // If we only need common dependencies and it's not an Expo project
        if (!isExpo) {
            const packageManager = yield detectPackageManager();
            try {
                const installCmd = packageManager === "yarn" ? "add" : "install";
                yield (0, execa_1.default)(packageManager, [installCmd, "clsx", "tailwind-merge"], {
                    stdio: "inherit",
                });
                console.log(chalk_1.default.green("✓"), "Dependencies installed");
                return true;
            }
            catch (error) {
                console.error(chalk_1.default.red("✗"), "Failed to install dependencies:", error instanceof Error ? error.message : String(error));
                return false;
            }
        }
        return true;
    });
}
/**
 * Detect the package manager being used
 */
function detectPackageManager() {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = process.cwd();
        if (yield fs_extra_1.default.pathExists(path_1.default.join(cwd, "yarn.lock"))) {
            return "yarn";
        }
        if (yield fs_extra_1.default.pathExists(path_1.default.join(cwd, "pnpm-lock.yaml"))) {
            return "pnpm";
        }
        return "npm";
    });
}
/**
 * Set up NativeWind configuration
 */
function setupNativeWind() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        const cwd = process.cwd();
        const isExpo = yield (0, package_1.isPackageInstalled)("expo");
        // Create or update tailwind.config.js
        const tailwindConfigPath = path_1.default.join(cwd, "tailwind.config.js");
        if (!(yield fs_extra_1.default.pathExists(tailwindConfigPath))) {
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
            yield fs_extra_1.default.writeFile(tailwindConfigPath, tailwindConfig);
            console.log(chalk_1.default.green("✓"), "Created tailwind.config.js");
        }
        else {
            console.log(chalk_1.default.blue("i"), "tailwind.config.js already exists, skipping");
        }
        // Create global.css
        const globalCssPath = path_1.default.join(cwd, "global.css");
        if (!(yield fs_extra_1.default.pathExists(globalCssPath))) {
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
            yield fs_extra_1.default.writeFile(globalCssPath, globalCss);
            console.log(chalk_1.default.green("✓"), "Created global.css");
        }
        else {
            console.log(chalk_1.default.blue("i"), "global.css already exists, skipping");
        }
        // Create or update metro.config.js
        const metroConfigPath = path_1.default.join(cwd, "metro.config.js");
        if (!(yield fs_extra_1.default.pathExists(metroConfigPath))) {
            // Create metro config based on project type
            const metroConfig = `const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

module.exports = withNativeWind(config, { input: './global.css' })
`;
            yield fs_extra_1.default.writeFile(metroConfigPath, metroConfig);
            console.log(chalk_1.default.green("✓"), "Created metro.config.js");
        }
        else {
            // Update existing metro.config.js
            let metroConfig = yield fs_extra_1.default.readFile(metroConfigPath, "utf-8");
            if (!metroConfig.includes("nativewind/metro")) {
                // Determine which import to use based on project type
                const getDefaultConfigImport = isExpo
                    ? 'require("expo/metro-config")'
                    : 'require("@react-native/metro-config")';
                metroConfig = `const { withNativeWind } = require('nativewind/metro');
const { getDefaultConfig } = ${getDefaultConfigImport};

${metroConfig.replace("module.exports =", "const config =")}

module.exports = withNativeWind(config, { input: './global.css' });
`;
                yield fs_extra_1.default.writeFile(metroConfigPath, metroConfig);
                console.log(chalk_1.default.green("✓"), "Updated metro.config.js");
            }
            else {
                console.log(chalk_1.default.blue("i"), "metro.config.js already configured, skipping");
            }
        }
        // Check babel.config.js
        const babelConfigPath = path_1.default.join(cwd, "babel.config.js");
        if (yield fs_extra_1.default.pathExists(babelConfigPath)) {
            let babelConfig = yield fs_extra_1.default.readFile(babelConfigPath, "utf-8");
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
                yield fs_extra_1.default.writeFile(babelConfigPath, babelConfig);
                console.log(chalk_1.default.green("✓"), "Updated babel.config.js");
            }
            else {
                console.log(chalk_1.default.blue("i"), "NativeWind already configured in babel.config.js");
            }
        }
        else {
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
            yield fs_extra_1.default.writeFile(babelConfigPath, babelConfig);
            console.log(chalk_1.default.green("✓"), "Created babel.config.js");
        }
        // Create or update app.json for Expo projects
        if (isExpo) {
            const appJsonPath = path_1.default.join(cwd, "app.json");
            if (yield fs_extra_1.default.pathExists(appJsonPath)) {
                let appJson = yield fs_extra_1.default.readFile(appJsonPath, "utf-8");
                const config = JSON.parse(appJson);
                if (!((_b = (_a = config.expo) === null || _a === void 0 ? void 0 : _a.web) === null || _b === void 0 ? void 0 : _b.bundler)) {
                    config.expo = Object.assign(Object.assign({}, config.expo), { web: Object.assign(Object.assign({}, (_c = config.expo) === null || _c === void 0 ? void 0 : _c.web), { bundler: "metro" }) });
                    yield fs_extra_1.default.writeFile(appJsonPath, JSON.stringify(config, null, 2));
                    console.log(chalk_1.default.green("✓"), "Updated app.json");
                }
                else {
                    console.log(chalk_1.default.blue("i"), "app.json already configured, skipping");
                }
            }
        }
        // Create app.json if it doesn't exist (for Expo projects)
        if (isExpo) {
            const appJsonPath = path_1.default.join(cwd, "app.json");
            if (!(yield fs_extra_1.default.pathExists(appJsonPath))) {
                const appJson = {
                    expo: {
                        web: {
                            bundler: "metro"
                        }
                    }
                };
                yield fs_extra_1.default.writeFile(appJsonPath, JSON.stringify(appJson, null, 2));
            }
            else {
                const appJson = JSON.parse(yield fs_extra_1.default.readFile(appJsonPath, "utf-8"));
                if (!appJson.expo)
                    appJson.expo = {};
                if (!appJson.expo.web)
                    appJson.expo.web = {};
                appJson.expo.web.bundler = "metro";
                yield fs_extra_1.default.writeFile(appJsonPath, JSON.stringify(appJson, null, 2));
            }
        }
    });
}
/**
 * Create initial utility files
 */
function createInitialFiles(styling, useExistingTheme) {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = process.cwd();
        // Create utils directory if it doesn't exist
        const utilsDir = path_1.default.join(cwd, "lib");
        yield fs_extra_1.default.ensureDir(utilsDir);
        // Create cn.ts utility
        const cnPath = path_1.default.join(utilsDir, "utils.ts");
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
        yield fs_extra_1.default.writeFile(cnPath, cnContent);
        console.log(chalk_1.default.green("✓"), "Created utility functions");
        // Add global.css import to App entry point if using NativeWind
        if (styling === "nativewind") {
            // Try common App entry point paths, including Expo Router's _layout.tsx
            const appPaths = [
                "app/_layout.tsx", // Expo Router layout file
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
                const fullPath = path_1.default.join(cwd, appPath);
                if (yield fs_extra_1.default.pathExists(fullPath)) {
                    let appContent = yield fs_extra_1.default.readFile(fullPath, "utf-8");
                    // Only add import if it doesn't exist
                    if (!appContent.includes('import "../global.css"') && !appContent.includes('import "./global.css"')) {
                        // Use different import path based on file location
                        const importPath = appPath.startsWith("app/") ? "../global.css" : "./global.css";
                        appContent = `import "${importPath}";\n\n${appContent}`;
                        yield fs_extra_1.default.writeFile(fullPath, appContent);
                        console.log(chalk_1.default.green("✓"), `Added global.css import to ${appPath}`);
                    }
                    break;
                }
            }
        }
        // Create theme context if needed
        if (!useExistingTheme) {
            const themeDir = path_1.default.join(cwd, "lib");
            yield fs_extra_1.default.ensureDir(themeDir);
            const themePath = path_1.default.join(themeDir, "ThemeContext.tsx");
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
            yield fs_extra_1.default.writeFile(themePath, themeContent);
            console.log(chalk_1.default.green("✓"), "Created theme context");
        }
    });
}
