#!/usr/bin/env node

import Dott from "../dott";
import reporters, { reporterType } from "./reporters";
import * as readline from "readline";
import yargs from "yargs/yargs";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 --reporter=console <data>")
  .version("0.0.1")
  .options({
    reporter: { type: "string", default: "stdout" },
    verbose: { type: "boolean", default: false },
  })
  .parseSync();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dott: Dott | null = null;
let reporter: reporterType;

const main = async () => {
  // If we can't find the reporter, we can't only report this to "stdout" reporter
  // which always should be present and be a default
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
