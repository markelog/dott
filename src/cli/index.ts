#!/usr/bin/env node

import { Dott, DottInterface } from "../dott";
import reporters from "./reporters";
import * as readline from "readline";
import yargs from "yargs/yargs";

const argv = yargs(process.argv.slice(2))
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

  const reporter = reporters.get(argv.reporter);

  reporter(d.read(p).compute().results());
};

main();
