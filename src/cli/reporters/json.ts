import chalk from "chalk";

function success(data: number[][][]) {
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    const current = data[i];

    for (let j = 0; j < current.length; j++) {
      console.log(current[j].join(" "));
    }
  }
}

function error(err: Error, verbose: boolean) {
  if (verbose) {
    console.error(err);
  } else {
    console.error(err.message);
  }
}

export default { success, error };
