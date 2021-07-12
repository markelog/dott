import chalk from "chalk";

function success(data: number[][][]) {
  console.log(data);
}

function error(err: Error, verbose: boolean) {
  if (verbose) {
    console.error(err);
  } else {
    console.error(err.message);
  }
}

export default { success, error };
