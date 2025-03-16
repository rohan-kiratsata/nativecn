# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.10] - 2025-03-16

### Changed

- Updated changelog error
- Updated typescript directives removal technique in templates.js

## [0.1.9] - 2025-03-16

### Changed

- Improved regex for removing TypeScript directives from templates

## [0.1.8] - 2025-03-16

### Changed

- reverted to last stable version of the lib

## [0.1.7] - 2025-03-16

### Changed

- Ignore templates in eslint because they are expected to have errors
- Update templates.js to remove the ignore comment from the components

## [0.1.6] - 2025-03-16

### Changed

- Modified template lookup to not check the components package
- added author to package.json

## [0.1.5] - 2025-03-16

### Changed

- Removed uncreated components from readme

## [0.1.4] - 2024-03-16

### Changed

- Updated README.md with accurate command documentation
- Improved documentation for available components
- Clarified usage instructions for all commands

## [0.1.3] - 2024-03-16

### Fixed

- Fixed `nativecn-preset.js` file not being created during initialization
- Modified initialization flow to always create the preset file
- Added preset.js template to the package

## [0.1.2] - 2024-03-16

### Fixed

- Fixed component template lookup to work in npm package
- Added component templates to the package
- Improved template resolution to check multiple possible locations

## [0.1.1] - 2024-03-16

### Changed

- Updated package metadata with correct repository information
- Fixed CI workflow issues

## [0.1.0] - 2024-03-16

### Added

- Initial release
- Init command for setting up NativeCN in React Native projects
- Support for NativeWind and StyleSheet styling options
