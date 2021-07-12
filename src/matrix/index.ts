import assert from "assert/strict";

export interface MatrixInterface {
  add(data: number[]): boolean;
  compute(): this;
  results(): number[][];
  data: number[][];
}

export default class Matrix implements MatrixInterface {
  private rows: number;
  private cols: number;
  readonly data: number[][];
  private result: number[][];
  private isComputed: boolean;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    this.result = [];
    this.isComputed = false;
  }

  add(data: number[]): boolean {
    assert.equal(
      this.cols,
      data.length,
      "amount of passed and expected columns does not match"
    );

    assert.ok(
      this.rows >= this.data.length + 1,
      "amount of passed and expected rows does not match"
    );

    this.data.push(data);

    return this.data.length !== this.rows
  }

  compute(): this {
    if (this.isComputed) {
      return this;
    }

    for (let i = 0; i < this.rows; i++) {
      const current = this.data[i];
      const result = [];
      for (let j = 0; j < this.cols; j++) {
        result.push(expand(current, j));
      }

      this.result.push(result);
    }

    this.isComputed = true;
    return this;
  }

  results(): number[][] {
    return this.result;
  }
}

function expand(slice: number[], index: number): number {
  let [left, right] = [index, index];
  let distance = 0;
  while (left > -1 || right < slice.length) {
    if (slice[left] === 1) {
      return distance;
    }

    if (slice[right] === 1) {
      return distance;
    }

    distance++;
    left--;
    right++;
  }

  return 0;
}
