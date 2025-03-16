# NativeCN

A React Native UI component library inspired by shadcn/ui. Get beautiful, accessible UI components for your React Native apps by copying and pasting code.

## Installation & Usage

```bash
# Install via npm
npm install @nativecn/cli
# Or use directly with npx
npx @nativecn/cli [command]
```

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
npx nativecn add button
```

Options:

- `--dir <directory>` - Target directory for components (default: './components/ui')
- `--overwrite` - Overwrite existing components

### Generate theme preset file (optional. this is asked to be done automatically when you run `npx nativecn init`. Use this if you want a more fine-grained control over the preset file.)

```bash
npx nativecn preset
```

Creates a nativecn-preset.js file with default theme colors.

## Available Components

- `button` - A versatile button component
- And more to come!

## Features

- **Non-intrusive installation process** - Components as source code, not packages
- **Easy theming** - NativeWind preset for consistent styling
- **Flexible styling** - Works with NativeWind or React Native StyleSheet
- **Full control** - Customize components to your specific needs
- **Type safety** - Built with TypeScript for better development experience

## Development

To develop locally:

```bash
# Build the packages
npm run build

# Link for local development (simplified approach)
npm link

# Now you can run the CLI
npx nativecn init
npx nativecn add button
```

### Alternatively, you can link individual packages

```bash
# Link individual packages
npm link @nativecn/cli @nativecn/components

# Run commands
npx nativecn init
npx nativecn add button
```

## License

MIT
