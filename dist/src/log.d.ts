export declare function saveToFile(message: string, type: logType, location: string | undefined, path: string | undefined): void;
export declare class Logger {
    private path;
    constructor(path?: undefined);
    info(message: string, location?: string | undefined): void;
    warn(message: string, location?: string | undefined): void;
    error(message: string, location?: string | undefined): void;
    debug(message: string, location?: string | undefined): void;
}
//# sourceMappingURL=log.d.ts.map