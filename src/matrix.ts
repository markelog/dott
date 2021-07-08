interface MatrixInterface {
}

class Matrix implements MatrixInterface {
  private rows: number;
  private cols: number;

  constructor(rows: number, cols: number) {
    this.rows = rows
    this.cols = cols;
  }
}
