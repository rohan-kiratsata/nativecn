# Contributing to NativeCN

Thank you for your interest in contributing to NativeCN! This document provides guidelines and instructions for contributing to this open-source project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Adding New Components](#adding-new-components)
- [Pull Request Process](#pull-request-process)
- [Coding Style](#coding-style)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Documentation](#documentation)
- [Releasing](#releasing)

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) to foster an inclusive and respectful community.

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- A React Native development environment

### Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/tailwiinder/nativecn.git
cd nativecn
```

2. **Install dependencies**

```bash
npm install
```

3. **Build all packages**

```bash
npm run build
```

4. **Link the CLI for local development**

```bash
# Link the package globally
npm link

# Now you can run the CLI locally
npx nativecn init
npx nativecn add button
```

5. **Alternatively, link individual packages**

```bash
npm link @nativecn/cli
```

6. **Start development mode** (watches for changes and rebuilds)

```bash
npm run dev
```

## Project Structure

The project is organized as a monorepo using npm workspaces:

- `packages/cli`: Command-line interface for managing NativeCN components
- `packages/components`: UI components implemented in React Native
- `packages/lib`: Utility functions and common code

Each component in `packages/components/ui` has its own directory with:

- `index.tsx`: Component implementation
- `styles.ts`: Styling for the component

Similarly, the CLI templates for components are in `packages/cli/templates`.

## Development Workflow

1. **Create a new branch for your changes**

```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes**

3. **Run linting and tests**

```bash
npm run lint
```

Tests are not yet implemented, but will be added in the future.
To run those tests, you will need to use the following command:

```bash
npm run test
```

4. **Commit your changes** (see Commit Message Guidelines below)

5. **Submit a pull request**

## Adding New Components

To add a new component:

1. Create component files in `packages/components/ui/<component-name>/`:

   - `index.tsx`: Component implementation
   - `styles.ts`: Component styles

2. Add component template files in `packages/cli/templates/<component-name>/`:
   - `index.tsx.template`: Component template
   - `styles.ts.template`: Styles template

Currently, the same files are used in the CLI and the components package. This is a bad practice and should be fixed in the future.

3. Update the component dependencies in `packages/cli/src/commands/add.ts` if needed

4. Add component documentation

5. Add tests for the component

## Pull Request Process

1. Ensure your code follows the project's coding style
2. Update the documentation as needed
3. Include tests for new features
4. Verify that all tests pass
5. Submit a pull request to the `main` branch
6. Address any feedback from reviewers

## Coding Style

This project uses ESLint and Prettier for code formatting. Please follow the existing style:

- Use TypeScript for type safety
- Follow React Native best practices
- Keep components small and focused
- Use NativeWind for styling when possible
- Write clear and concise code comments

Run the formatting tools before committing:

```bash
npm run format
npm run lint:fix
```

## Commit Message Guidelines

We follow conventional commits to maintain a readable git history:

```
type(scope): short description

Optional longer description

Optional footer
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Example: `feat(button): add new outline variant`

## Documentation

- Update README.md with any necessary information
- Document components with proper JSDoc comments
- Include usage examples for new components
- Provide clear and concise descriptions of props and behavior

## Releasing

The release process is managed by maintainers. However, contributors should:

- Update CHANGELOG.md with their changes
- Bump version numbers according to semver guidelines
- Test build processes before requesting a release

Thank you for contributing to NativeCN!
