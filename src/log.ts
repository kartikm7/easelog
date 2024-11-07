import { createWriteStream } from "fs";
import { join } from "path"
import chalk from "chalk"

// basic map declaration for ease of use
const map = new Map()
map.set('log', 'INFO')
map.set('warn', 'WARN')
map.set('error', 'ERROR')
map.set('debug', 'DEBUG') // this probably should never be pushed to production though

function saveToFile(message: string, type:logType, location: string | undefined, path: string | undefined):void {
  if(!path) return
  // destructuring arrays is such a power move
  let [date, time] = new Date().toISOString().split('T')
  time = time.slice(0,8)
  const writeStream = createWriteStream(join(path, date+".txt"),{flags: "a"})
  writeStream.end(`${date} ${time} [${map.get(type)}] ${message}${location ? ": "+location : ""}`)
  writeStream.close()
  return
}


class Logger {
  public path: string | undefined;
  constructor(path = undefined) {
    this.path = path
  }

  // base function  
  log(message: string, location: string | undefined = undefined) {
    if (location) console.log(chalk.bgBlue(location), message)
    else console.log(message)
    saveToFile(message, "log", location, this.path)
  }

  warn(message: string, location: string | undefined = undefined) {
    if (location) console.warn(chalk.bgBlue(location), chalk.yellow(message))
    else console.warn(chalk.yellow(message))
    saveToFile(message, "log", location, this.path)
  }

  error(message: string, location: string | undefined = undefined) {
    if (location) console.error(chalk.bgBlue(location), chalk.red(message))
    else console.error(chalk.red(message))
    saveToFile(message, "log", location, this.path)
  }

  debug(message: string, location: string | undefined = undefined) {
    if (location) console.log(chalk.bgBlue(location), message)
    else console.log(message)
    saveToFile(message, "log", location, this.path)
  }
}