export interface MatrixInterface {
  add(data: number[]): boolean;
  compute(): any;
  data: number[][]
}

export class Matrix implements MatrixInterface {
  private rows: number;
  private cols: number;
  private filled: number;
  public data: number[][];
  private results: number[][];
  private isComputed: boolean;

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.filled = rows;
    this.cols = cols;
    this.data = [];
    this.results = [];
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

  compute() {
    if (this.isComputed) {
      return this.results;
    }
  }

  getResults(): number[][] {
    return this.results;
  }
}
