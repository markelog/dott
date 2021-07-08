const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

let pump = ""

rl.prompt();

rl.on("line", (line:string) => {
  pump += line
}).on("close", () => {
  console.log(pump)
})
