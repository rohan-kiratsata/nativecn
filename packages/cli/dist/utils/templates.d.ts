/**
 * Get the template directory for a component
 */
export declare function getTemplateDir(component: string): string;
/**
 * Copy a component template to the user's project
 */
export declare function copyComponentTemplate(component: string, targetDir: string, options?: {
    overwrite?: boolean;
}): Promise<boolean>;
