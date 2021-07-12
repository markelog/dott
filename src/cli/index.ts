#!/usr/bin/env node

import { Dott } from "../dott/index";
import reporters from "./reporters";
import * as readline from "readline";
import yargs from "yargs/yargs";
import chalk from "chalk";

const argv = yargs(process.argv.slice(2))
  .usage("Usage: $0 --reporter=console <data>")
  .version("0.0.1")
  .options({
    reporter: { type: "string", default: "stdout" },
  })
  .parseSync();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dott: Dott | null = null;
let pump: number[][] = [];

const main = async () => {
  // for await (const line of rl) {
  //   if (dott == null) {
  //     dott = new Dott(Number(line));
  //     continue;
  //   }

  //   pump.push(line.split("").map(Number));
  // }

  const p = [
    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],

    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  const d = new Dott(2);

  try {
    const reporter = reporters.get(argv.reporter);
    reporter(d.read(p).compute().results());

  } catch (err) {
    console.error(`${chalk.bold.red("Error")}: ${err.message}`);
    process.exit(1)
  }
};

main();
