import { createWriteStream } from "fs";
import { join } from "path";
import chalk from "chalk";
export function saveToFile(message, type, location, path) {
    if (!path)
        return;
    // destructuring arrays is such a power move
    let [date, time] = new Date().toISOString().split('T');
    time = time.slice(0, 8);
    const writeStream = createWriteStream(join(path, date + ".log"), { flags: "a" });
    writeStream.end(`${date} ${time} [${type}] ${message}${location ? ": " + location : ""} \n`);
    writeStream.close();
    return;
}
export class Logger {
    constructor(path = undefined) {
        this.path = path;
    }
    // base function  
    info(message, location = undefined) {
        if (location)
            console.log(chalk.bgBlue(location), message);
        else
            console.log(message);
        saveToFile(message, "INFO", location, this.path);
    }
    warn(message, location = undefined) {
        if (location)
            console.warn(chalk.bgBlue(location), chalk.yellow(message));
        else
            console.warn(chalk.yellow(message));
        saveToFile(message, "WARN", location, this.path);
    }
    error(message, location = undefined) {
        if (location)
            console.error(chalk.bgBlue(location), chalk.red(message));
        else
            console.error(chalk.red(message));
        saveToFile(message, "ERROR", location, this.path);
    }
    debug(message, location = undefined) {
        if (location)
            console.log(chalk.bgBlue(location), message);
        else
            console.log(message);
        saveToFile(message, "DEBUG", location, this.path);
    }
}
