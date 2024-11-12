#!/usr/bin/env node

import { Command } from "commander";
import { mind } from "gradient-string"
import figlet from "figlet"
import path from "node:path";
import { createSpinner } from "nanospinner";
import { downloadFile } from "./utils/download-file.js";
import { existsSync, mkdirSync } from "node:fs";
import { confirm, input } from '@inquirer/prompts';

const program = new Command();

async function welcome(): Promise<void> {
  await new Promise<void>(resolve => figlet("Easelog", (err, msg) => {
    console.log(mind(msg ?? ""))
    resolve()
  }))
  console.log(mind(' An easy logging solution that saves to a file and displays on the console.'))
  console.log(mind(' https://www.github.com/kartikm7/easelog'))
  console.log()
}

program
  .name('easelog')
  .description('CLI to copy easelog for easier customization!')
  .version('1.0.3')

program
  .command('init [destination]')
  .description('clone logger.ts in your project; default destination is the current working directory')
  .action(async (destination: string) => {
    // a nice little greeting
    await welcome()

    // getting the path of the current working directory
    let location = process.cwd()

    // checking whether the user entered the path or not
    if (destination) location = path.join(location, destination)

    // asking the user whether they want to create a sub-directory
    const createDir = await confirm({ message: ' Do you want to create a sub directory?' })
    let nameDir
    if (createDir) {
      nameDir = await input({ message: ' Name of the sub-directory: ', default: 'easelog' })
      location = path.join(location, nameDir) // updating the location path
      // create directory if it does not exist
      if(!existsSync(location)) mkdirSync(location, {recursive: true})
    }

    // loading spinner
    const spinner = createSpinner(' Downloading logger.ts from the repository...').start()

    // downloading the latest index.ts for the
    let res = await downloadFile('https://raw.githubusercontent.com/kartikm7/easelog/refs/heads/master/src/log.ts', 'logger.ts', location)

    // incase the download fails
    if (!res) {
      spinner.error(' Something went wrong :/')
      process.exit(1)
    }
    spinner.update(' Downloading types.ts from the repository...')

    // incase the types directory does not exist
    if (!existsSync(path.join(location, 'types'))) mkdirSync(path.join(location, 'types'))

    // downloading the latest types.ts
    res = await downloadFile('https://raw.githubusercontent.com/kartikm7/easelog/refs/heads/master/src/log.ts', 'types.ts', path.join(location, 'types'))

    // incase the download fails
    if (!res) {
      spinner.error(' Something went wrong :/')
      process.exit(1)
    }

    spinner.success(' Easelog has been setup in your project, enjoy logging!')
  })

program.parse()