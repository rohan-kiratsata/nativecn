# NativeCN

[![NPM Version](https://img.shields.io/npm/v/@nativecn/cli.svg)](https://www.npmjs.com/package/@nativecn/cli)
[![Downloads](https://img.shields.io/npm/dm/@nativecn/cli.svg)](https://www.npmjs.com/package/@nativecn/cli)
[![License](https://img.shields.io/npm/l/@nativecn/cli.svg)](https://github.com/tailwiinder/nativecn/blob/main/LICENSE)

A React Native UI component library inspired by shadcn/ui. Get beautiful, accessible UI components for your React Native apps by copying and pasting code.

## Installation & Usage

> Note: You need to have nativewind installed and setup in your project to use this library.

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

### Generate theme preset file (optional)

This is asked to be done automatically when you run `npx nativecn init`. Use this if you want a more fine-grained control over the preset file.

```bash
npx nativecn preset
```

Creates a nativecn-preset.js file with default theme colors.

## Available Components

- [button](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/button) - A customizable button component with different variants, sizes and states
- [accordion](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/accordion) - A vertically stacked set of interactive headings that reveal or hide associated content
- [alert](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/alert) - A component that displays a brief, important message to get users' attention
- [alertdialog](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/alertdialog) - A modal dialog that interrupts the user with important content and expects a response
- [avatar](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/avatar) - An image component used to represent a user, with a fallback for showing initials
- [badge](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/badge) - A small visual indicator for highlighting status, labels or counts
- [breadcrumb](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/breadcrumb) - A navigation component that shows the current location in a hierarchical structure
- [aspectratio](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/aspectratio) - A component to maintain consistent width/height ratios across different screen sizes
- [card](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/card) - A container component that groups related content and actions
- [carousel](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/carousel) - A slideshow component for cycling through elements like images or slides of content
- [input-otp](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/input-otp) - A one-time password input component with individual character boxes and auto-focus
- [skeleton](https://github.com/tailwiinder/nativecn/tree/main/packages/cli/templates/skeleton) - A placeholder loading component that animates to indicate content is being loaded

And more to come! Check out the [Roadmap](ROADMAP.md) for more details.

## Features

- **Non-intrusive installation process** - Components as source code, not packages
- **Easy theming** - NativeWind preset for consistent styling
- **Flexible styling** - Works with NativeWind or React Native StyleSheet
- **Full control** - Customize components to your specific needs
- **Type safety** - Built with TypeScript for better development experience

## Roadmap

NativeCN is under active development. Here's what we're planning:

- **More Components**: Expand our library with additional UI components that are present in shadcn/ui
- **Documentation Site**: Create a dedicated documentation website with live examples
- **Example Apps**: Create example apps using ~~expo and~~ react-native-cli to showcase the components in action

For a more detailed view of our plans and progress, check out our [Roadmap](ROADMAP.md).

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

## Contributing

We welcome contributions from everyone! Whether you're fixing a bug, adding a feature, or improving documentation, your help is appreciated.

Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct, the development process, and how to get your pull request accepted.

### Quick Start for Contributors

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment:
   ```bash
   npm install
   npm run build
   ```
4. Create a branch for your feature or bugfix
5. Make your changes
6. Test your changes
7. Submit a pull request

For more detailed instructions, please see the [Contributing Guidelines](CONTRIBUTING.md).

## Code of Conduct

We expect all participants to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating.

## License

MIT

---

<div align="center">
  <p>If you find this project helpful, consider buying me a coffee ☕</p>
  <a href="https://buymeacoffee.com/tailwiinder">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" width="217" height="60" />
  </a>
</div>
