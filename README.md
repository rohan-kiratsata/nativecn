# NativeCN

A React Native UI component library inspired by shadcn/ui.

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

## Alternatively, you can link individual packages

```bash
# Link individual packages
npm link @nativecn/cli @nativecn/components

# Run commands
npx nativecn init
npx nativecn add button
```

## Features

- Non-intrusive installation process
- Components as code, not packages
- Easy theming with tailwind presets
- Works with existing NativeWind setups
