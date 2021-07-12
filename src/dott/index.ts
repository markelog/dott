import assert from "assert/strict";

import Matrix, { MatrixInterface } from "../matrix";

export interface DottInterface {
  results(): number[][][];
  read(data: number[][]): this;
  compute(): this;
  matrices: MatrixInterface[];
}

export class Dott implements DottInterface {
  private cases: number;
  readonly matrices: MatrixInterface[];
  readonly result: number[][][];
  private isComputed: boolean;

  constructor(cases: number) {
    this.cases = Number(cases);
    this.matrices = [];
    this.result = [];
    this.isComputed = false;
  }

  results(): number[][][] {
    return this.result;
  }

  read(data: number[][]): this {
    let cases = 0;
    for (let i = 0; i < data.length; i++) {
      const rows = data[i][0];
      const cols = data[i][2];

      const matrix = new Matrix(rows, cols);
      this.matrices.push(matrix);
      cases++;
      i++;

      while (matrix.add(data[i])) {
        i++;
      }
    }

    assert.equal(
      this.cases,
      cases,
      "amount of passed and expected cases does not match"
    );

    return this;
  }

  compute(): this {
    if (this.isComputed) {
      return this;
    }

    for (let i = 0; i < this.matrices.length; i++) {
      this.result.push(this.matrices[i].compute().results());
    }

    this.isComputed = true;
    return this;
  }
}
