# EaseLog
![npm](https://img.shields.io/npm/v/easelog) ![npm downloads](https://img.shields.io/npm/dy/easelog) ![npm](https://img.shields.io/npm/l/easelog)

## Installation
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