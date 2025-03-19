[![NPM Version](https://img.shields.io/npm/v/@nativecn/cli.svg)](https://www.npmjs.com/package/@nativecn/cli)
[![Downloads](https://img.shields.io/npm/dm/@nativecn/cli.svg)](https://www.npmjs.com/package/@nativecn/cli)
[![License](https://img.shields.io/npm/l/@nativecn/cli.svg)](https://github.com/tailwiinder/nativecn/blob/main/LICENSE)

# @nativecn/cli

A CLI tool for initializing and managing NativeCN components in React Native projects.

## Installation

```bash
npm install @nativecn/cli
# or
npx @nativecn/cli [command]
```

## Usage

### Initialize NativeCN in your project

```bash
npx nativecn init
```

The init command will:

1. Detect if your project uses NativeWind or StyleSheet
2. Create a nativecn-preset.js file with theme configuration
3. Add components directory structure
4. Install essential dependencies
5. Create utility functions

### Add components to your project

```bash
npx nativecn add button input card
```

Options:

- `--dir <directory>` - Target directory for components (default: './components/ui')
- `--overwrite` - Overwrite existing components

### Generate NativeCN preset file

```bash
npx nativecn preset
```

Creates a nativecn-preset.js file with default theme colors.

## Available Components

- `button` - A versatile button component
- `accordion` - An accordion component
- `alert` - An alert component
- `alertdialog` - An alertdialog component
- `avatar` - An avatar component
- `badge` - A badge component
- `breadcrumb` - A breadcrumb component
- `aspectratio` - An aspect ratio component
- `card` - A card component
- `carousel` - A carousel component
- And more to come!

## License

MIT
