# EaseLog
![npm](https://img.shields.io/npm/v/easelog) ![npm downloads](https://img.shields.io/npm/dy/easelog) ![npm](https://img.shields.io/npm/l/easelog)

## Installation
### Recommended (for Typescript projects)
```bash
npx easelog init [destination]
```
The `easelog init` cli command downloads just the `logger.ts` and `types.ts` file. The best part about this is it allows you to make the project yours, you can adjust the logger the way you feel appropriate. If you do end up doing something you feel would help others, consider contributing!
### Conventional (for Javascript projects)
```bash
npm i easelog
```
## Usage

### With file save
```ts
import { Logger } from "easelog"
const path = "" // where the log file is created
const log = new Logger(path)
log.info("Message", "Location")
```

### Without file save
> This is just unnecessary abstraction, but I did use chalk.js for colouring the logs to spice things up though
```ts
import { Logger } from "easelog"
const log = new Logger()
log.info("Message")
log.warn("Message")
log.error("Message", "Location")
log.debug("Message", "Location")
```

**Note**: `location` is optional

## Types
```ts
Logger(path:string|undefined)
```
`path` is **optional**.

```ts
saveToFile(message: string, type:logType, location: string | undefined, path: string | undefined)
```
`location` and `path` are **optional**.

## EaseLog CLI
**Usage**: `easelog [options] [command]`

**Options**:
  - `-V`, `--version`       output the version number
  - `-h`, `--help`          display help for command

**Commands**:
  - `init [destination]`  clone logger.ts in your project;  default destination is the current working directory
  - `help [command]`      display help for command

## More info
`EaseLog` does not support commonjs