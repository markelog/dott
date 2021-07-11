export interface MatrixInterface {
  add(data: number[]): boolean;
  compute(): this;
  results(): number[][]
}

export class Matrix implements MatrixInterface {
  private rows: number;
  private cols: number;
  private filled: number;
  public data: number[][];
  private result: number[][];
  private isComputed: boolean;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.filled = rows;
    this.cols = cols;
    this.data = [];
    this.result = [];
    this.isComputed = false;
  }

  add(data: number[]): boolean {
    if (this.filled === 0) {
      return false;
    }

    this.data.push(data);
    this.filled--;

    return this.filled !== 0;
  }

  compute(): this {
    if (this.isComputed) {
      return this;
    }

    for (let i = 0; i < this.data.length; i++) {
      const current = this.data[i]
      const result = []
      for (let j = 0; j < current.length; j++) {
        result.push(expand(current, j))
      }

      this.result.push(result)
    }

    this.isComputed = true;
    return this
  }

  results(): number[][] {
    return this.result;
  }
}

function expand(slice: number[], index: number): number {
  let [left, right] = [index, index];
  let distance = 0
  while (left > -1 || right < slice.length) {
    if (slice[left] === 1) {
      return distance
    }

    if (slice[right] === 1) {
      return distance
    }

    distance++;
    left--
    right++
  }

  return 0
}
