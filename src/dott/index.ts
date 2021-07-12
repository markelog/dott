import assert from "assert";

import Matrix, { MatrixInterface } from "../matrix";

export interface DottInterface {
  results(): number[][][];
  read(data: number[]): this;
  compute(): this;
  isFilled(): boolean;
  matrices: MatrixInterface[];
}

export default class Dott implements DottInterface {
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

  isFilled(): boolean {
    if (this.cases > this.matrices.length) {
      return false;
    }

    const last = this.matrices[this.matrices.length - 1];
    return last.isFilled();
  }

  read(data: number[]): this {
    assert.ok(
      this.cases >= this.matrices.length,
      "amount of passed and expected cases does not match"
    );

    let matrix = this.matrices[this.matrices.length - 1];
    if (matrix == null || matrix.isFilled()) {
      const rows = data[0];
      const cols = data[2];
      matrix = new Matrix(rows, cols);
      this.matrices.push(matrix);
      return this;
    }

    matrix.add(data);

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
