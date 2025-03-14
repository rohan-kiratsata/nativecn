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
exports.getTemplateDir = getTemplateDir;
exports.copyComponentTemplate = copyComponentTemplate;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const config_1 = require("./config");
/**
 * Get the template directory for a component
 */
function getTemplateDir(component) {
    // Look for the component template in the components package
    const templatePath = path_1.default.resolve(__dirname, "../../../components/ui", component);
    if (fs_extra_1.default.existsSync(templatePath)) {
        return templatePath;
    }
    throw new Error(`Component template '${component}' not found`);
}
/**
 * Copy a component template to the user's project
 */
function copyComponentTemplate(component_1, targetDir_1) {
    return __awaiter(this, arguments, void 0, function* (component, targetDir, options = {}) {
        const { overwrite = false } = options;
        const config = yield (0, config_1.readConfig)();
        const templateDir = getTemplateDir(component);
        const destinationDir = path_1.default.resolve(process.cwd(), targetDir, component);
        // Check if component already exists
        if (fs_extra_1.default.existsSync(destinationDir) && !overwrite) {
            console.warn(chalk_1.default.yellow("!"), `Component '${component}' already exists. Use --overwrite to replace it.`);
            return false;
        }
        try {
            // Create the destination directory
            yield fs_extra_1.default.ensureDir(destinationDir);
            // Copy all files from the template
            const files = yield fs_extra_1.default.readdir(templateDir);
            for (const file of files) {
                const sourcePath = path_1.default.join(templateDir, file);
                const destPath = path_1.default.join(destinationDir, file);
                let content = yield fs_extra_1.default.readFile(sourcePath, "utf-8");
                // Process the file content based on config
                content = processTemplateContent(content, config);
                yield fs_extra_1.default.writeFile(destPath, content);
            }
            console.log(chalk_1.default.green("✓"), `Added component '${component}'`);
            return true;
        }
        catch (error) {
            console.error(chalk_1.default.red("✗"), `Failed to copy component '${component}':`, error instanceof Error ? error.message : String(error));
            return false;
        }
    });
}
/**
 * Process template content based on configuration
 */
function processTemplateContent(content, config) {
    // Replace import paths based on styling approach
    if (config.styling === "stylesheet") {
        // Use StyleSheet imports
        content = content.replace(/useNativeStyleSheet\s*=\s*false/g, "useNativeStyleSheet = true");
    }
    // Replace theme configuration
    if (config.theme.useExisting && config.theme.existingThemePath) {
        // Use existing theme provider
        content = content.replace(/import.*from\s*["']@nativecn\/core["']/g, `import { cn, getVariantStyles, ThemeMode } from "@nativecn/core";\nimport { useTheme } from "${config.theme.existingThemePath}";`);
        // Replace theme usage
        content = content.replace(/const themeContext = useNativeCNTheme\(\);/g, "const themeContext = useTheme();");
    }
    return content;
}
