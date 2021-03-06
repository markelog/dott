import assert from "assert";

import Matrix, { MatrixInterface } from "../matrix";

export interface DottInterface {
  results(): number[][][];
  read(data: number[]): this;
  compute(): this;
  isFilled(): boolean;
  matrices: MatrixInterface[];
}

/**
 * This is the main (decorator) class which encapsulates logic behind the matrices computations
 * @class
 */
export default class Dott implements DottInterface {
  /**
   * How many do can we have?
   */
  private cases: number;

  /**
   * Aggregates all the matrices in the game
   */
  readonly matrices: MatrixInterface[];

  /**
   * Our result
   */
  private result: number[][][];

  /**
   * Are the results computed yet?
   */
  private isComputed: boolean;

  /**
   * Creates an instance of dott
   * @param cases how many do can we have?
   */
  constructor(cases: number) {
    this.cases = Number(cases);
    this.matrices = [];
    this.result = [];
    this.isComputed = false;
  }

  /**
   * Get the matrices results
   * @returns results
   */
  results(): number[][][] {
    return this.result;
  }

  /**
   * Determines whether our matrices are filled in
   * @returns true if filled
   */
  isFilled(): boolean {
    if (this.cases > this.matrices.length) {
      return false;
    }

    const last = this.matrices[this.matrices.length - 1];
    return last.isFilled();
  }

  /**
   * Reads the data and populates matrices with it
   * @param data
   * @returns this
   */
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

  /**
   * Computes underlying matrices
   * @returns this
   */
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
