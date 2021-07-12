import assert from "assert";

const directions = [
  // up
  [-1, 0],

  // right
  [0, 1],

  // bottom
  [1, 0],

  // left
  [0, -1],
];
export interface MatrixInterface {
  add(data: number[]): this;
  isFilled(): boolean;
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
    this.result = new Array(this.rows).fill(Infinity).map(() => {
      return new Array(this.cols).fill(Infinity);
    });
    this.isComputed = false;
  }

  add(data: number[]): this {
    assert.strictEqual(
      data.length,
      this.cols,
      "amount of passed and expected columns does not match"
    );

    assert.ok(
      this.rows >= this.data.length + 1,
      "amount of passed and expected rows does not match"
    );

    this.data.push(data);

    return this;
  }

  isFilled(): boolean {
    return this.data.length === this.rows;
  }

  compute(): this {
    if (this.isComputed) {
      return this;
    }

    assert.strictEqual(
      this.data.length,
      this.rows,
      "there is not enough rows yet, add() more rows"
    );

    const queue: number[][] = [];
    this.data.forEach((row: number[], i: number) => {
      row.forEach((pixel: number, j: number) => {
        assert.ok(
          pixel === 1 || pixel === 0,
          "Pixel could be either white (value: 1) or black (value: 0)"
        );

        if (pixel === 1) {
          queue.push([i, j, 0]);
        }
      });
    });

    while (queue.length > 0) {
      const current = queue.shift();
      const [row, col, distance] = current as [number, number, number];

      if (distance < this.result[row][col]) {
        this.result[row][col] = distance;
      }

      for (let i = 0; i < 4; i++) {
        const newRow: number = row + directions[i][0];
        const newCol: number = col + directions[i][1];

        if (!this.canMove(newRow, newCol)) {
          continue;
        }

        if (this.result[newRow][newCol] !== Infinity) {
          continue;
        }

        this.result[newRow][newCol] = distance + 1;
        queue.push([newRow, newCol, distance + 1]);
      }
    }

    this.isComputed = true;
    return this;
  }

  private canMove(rows: number, cols: number): boolean {
    return rows > -1 && rows < this.rows && cols > -1 && cols < this.cols;
  }

  results(): number[][] {
    return this.result;
  }
}
