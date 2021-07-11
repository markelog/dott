import { read } from "fs";
import { Dott, DottInterface } from "./dott";
import * as readline from "readline";

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

  // console.log(pump)

  // if (dott != null) {
  //   dott.read(pump);
  // }

  const p = [
    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  const d = new Dott(1)

  d.read(p)

};

main();
