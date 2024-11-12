import { Command } from "commander";
import {cristal} from "gradient-string"
import figlet from "figlet"

const program = new Command();

async function welcome(): Promise<void> {
  await new Promise<void>(resolve => figlet("DocNext", (err, msg) => {
    console.log(cristal(msg ?? ""))
    resolve()
  }))
  console.log((' An easy logging solution that saves to a file and displays on the console.'))
  console.log()
}

program
  .name('easelog')
  .description('CLI to copy easelog for easier customization!')
  .version('1.0.2')

program.parse(process.argv)