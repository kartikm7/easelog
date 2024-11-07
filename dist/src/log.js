"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.saveToFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const chalk_1 = __importDefault(require("chalk"));
// basic map declaration for ease of use
const map = new Map();
map.set('log', 'INFO');
map.set('warn', 'WARN');
map.set('error', 'ERROR');
map.set('debug', 'DEBUG'); // this probably should never be pushed to production though
function saveToFile(message, type, location, path) {
    if (!path)
        return;
    // destructuring arrays is such a power move
    let [date, time] = new Date().toISOString().split('T');
    time = time.slice(0, 8);
    const writeStream = (0, fs_1.createWriteStream)((0, path_1.join)(path, date + ".txt"), { flags: "a" });
    writeStream.end(`${date} ${time} [${map.get(type)}] ${message}${location ? ": " + location : ""}`);
    writeStream.close();
    return;
}
exports.saveToFile = saveToFile;
class Logger {
    constructor(path = undefined) {
        this.path = path;
    }
    // base function  
    info(message, location = undefined) {
        if (location)
            console.log(chalk_1.default.bgBlue(location), message);
        else
            console.log(message);
        saveToFile(message, "log", location, this.path);
    }
    warn(message, location = undefined) {
        if (location)
            console.warn(chalk_1.default.bgBlue(location), chalk_1.default.yellow(message));
        else
            console.warn(chalk_1.default.yellow(message));
        saveToFile(message, "log", location, this.path);
    }
    error(message, location = undefined) {
        if (location)
            console.error(chalk_1.default.bgBlue(location), chalk_1.default.red(message));
        else
            console.error(chalk_1.default.red(message));
        saveToFile(message, "log", location, this.path);
    }
    debug(message, location = undefined) {
        if (location)
            console.log(chalk_1.default.bgBlue(location), message);
        else
            console.log(message);
        saveToFile(message, "log", location, this.path);
    }
}
exports.Logger = Logger;
