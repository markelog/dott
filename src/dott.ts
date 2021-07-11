import { Matrix, MatrixInterface } from "./matrix";

export interface DottInterface {}

export class Dott implements DottInterface {
  private cases: number;
  private matrices: MatrixInterface[];
  private results: number[];
  private isComputed: boolean;

  constructor(cases: number) {
    this.cases = Number(cases);
    this.matrices = [];
    this.results = [];
    this.isComputed = false;
  }

  getResults(): number[] {
    return this.results;
  }

  read(data: number[][]) {
    for (let i = 0; i < data.length; i++) {
      const rows = data[i][0];
      const cols = data[i][2];

      const matrix = new Matrix(rows, cols);
      this.matrices.push(matrix);
      i++;

      while (matrix.add(data[i])) {
        i++;
      }
    }

    console.log(this.matrices)
  }

  compute() {
    if (this.isComputed) {
      return;
    }

    for (let i = 0; i < this.matrices.length; i++) {
      const matrix = this.matrices[i];
      matrix.compute();
    }

    this.isComputed = true;
  }
}
