interface AddOptions {
    dir?: string;
    overwrite?: boolean;
}
export declare function addCommand(components: string[], options?: AddOptions): Promise<void>;
export {};
