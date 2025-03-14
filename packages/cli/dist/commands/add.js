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
exports.addCommand = addCommand;
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const templates_1 = require("../utils/templates");
const config_1 = require("../utils/config");
function addCommand(components_1) {
    return __awaiter(this, arguments, void 0, function* (components, options = {}) {
        // Read the config
        const config = yield (0, config_1.readConfig)();
        // Use config output directory if not specified
        const targetDir = options.dir || config.components.outDir;
        console.log(chalk_1.default.bold(`Adding components to ${targetDir}...`));
        // Process each component
        const results = yield Promise.all(components.map((component) => __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, templates_1.copyComponentTemplate)(component, targetDir, {
                overwrite: options.overwrite,
            });
            return { component, success: result };
        })));
        // Print summary
        console.log();
        console.log(chalk_1.default.bold("Summary:"));
        const successful = results.filter((r) => r.success);
        const failed = results.filter((r) => !r.success);
        if (successful.length > 0) {
            console.log(chalk_1.default.green("✓"), `Added ${successful.length} component(s):`);
            successful.forEach((result) => {
                console.log(`  • ${result.component}`);
            });
        }
        if (failed.length > 0) {
            console.log(chalk_1.default.red("✗"), `Failed to add ${failed.length} component(s):`);
            failed.forEach((result) => {
                console.log(`  • ${result.component}`);
            });
        }
        // Show usage example
        if (successful.length > 0) {
            console.log();
            console.log(chalk_1.default.bold("Usage example:"));
            console.log();
            console.log(`import { ${successful
                .map((r) => r.component.charAt(0).toUpperCase() + r.component.slice(1))
                .join(", ")} } from "${path_1.default.relative(process.cwd(), path_1.default.join(process.cwd(), targetDir))}/index";`);
            console.log();
        }
    });
}
