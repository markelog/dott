import Dott from "../dott";
import reporters, { reporterType } from "./reporters";
import * as readline from "readline";
import yargs from "yargs/yargs";
import chalk from "chalk";

/* eslint-disable @typescript-eslint/no-var-requires */
const { version } = require("../../package.json");

const description = `
${chalk.blue("Usage")}: dott [options]

${chalk.green("Program starts in interactive mode.")}

Example:

$ dott
1
3 4
0001
0011
0110

<Press Enter>

3 2 1 0
2 1 0 0
1 0 0 1`;

const argv = yargs(process.argv.slice(2))
  .usage(description)
  .version(version)
  .options({
    reporter: {
      type: "string",
      describe: "Possible reporters are: stdout, json",
      default: "stdout",
    },
    verbose: {
      type: "boolean",
      describe: "Add stacktrace to error output",
      default: false,
    },
  })
  .parseSync();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dott: Dott | null = null;
let reporter: reporterType;

const main = async () => {
  // If we can't find the reporter, we can't only report this to "stdout"
  // which is always should be present default
  try {
    reporter = reporters.get(argv.reporter);
  } catch (err) {
    reporters.get("stdout").error(err, argv.verbose);

    process.exit(1);
  }

  // Start listing for the input
  for await (const line of rl) {
    if (dott == null) {
      dott = new Dott(Number(line));
      continue;
    }

    const data = line.trim().split("").map(Number);

    if (!data.length) {
      continue;
    }

    dott.read(data);

    // When we filled the dott immediately proceed to next instructions
    if (dott.isFilled()) {
      break;
    }
  }

  if (dott == null) {
    return;
  }

  try {
    reporter.success(dott.compute().results());
  } catch (err) {
    reporter.error(err, argv.verbose);
    process.exit(1);
  }
};

main();
