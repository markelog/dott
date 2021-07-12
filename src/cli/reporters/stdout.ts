export default function stdout(data: number[][][]) {
  for (let i = 0; i < data.length; i++) {
    const current = data[i];

    for (let j = 0; j < current.length; j++) {
      console.log(current[j].join(" "));
    }

    console.log();
  }
}
