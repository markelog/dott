import assert from "assert";

// Directions of where can we traverse the matrix
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

/**
 * Matrix class implements main computation functionality for the distance transformation
 * @class
 */
export default class Matrix implements MatrixInterface {
  /**
   * Rows of the matrix
   */
  private rows: number;

  /**
   * Cols of the matrix
   */
  private cols: number;

  /**
   * Matrix data
   */
  readonly data: number[][];

  /**
   * Result of the computation
   */
  private result: number[][];

  /**
   * Determines whether matrix is already computed (transformed)
   */
  private isComputed: boolean;

  /**
   * Creates an instance of matrix
   * @param rows
   * @param cols
   */
  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    this.result = new Array(this.rows).fill(Infinity).map(() => {
      return new Array(this.cols).fill(Infinity);
    });
    this.isComputed = false;
  }

  /**
   * Adds data to the matrix
   * @param data
   * @returns this
   */
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

  /**
   * Determines whether matrix is filled on
   * @returns true if filled
   */
  isFilled(): boolean {
    return this.data.length === this.rows;
  }

  /**
   * Computes the matrix with bfs algo
   * @returns this
   */
  compute(): this {
    if (this.isComputed) {
      return this;
    }

    assert.strictEqual(
      this.data.length,
      this.rows,
      "there is not enough rows yet, add() more rows"
    );

    // First we populate the queue with locations of the white pixels
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

    // Classic bfs stuff - let's go through the queue
    while (queue.length > 0) {
      // Get the pixel location and remove it from the queue
      const current = queue.shift();

      // Get the position of the pixel (row, col) and
      // distance for the nearest white pixel.
      // For whities it would be zero, for the black ones it would +1, for their children
      // it would another +1 and so on
      const [row, col, distance] = current as [number, number, number];

      // This is for the dark ones only.
      // Two things this does -
      // first it populates distance to the first white pixel that we handled, since
      // it would be less than infinity (which is our initial value).
      // Second, when we handle the second white pixel that happens to be closer to this black pixel (which we add to the queue later one)
      // we set it's distance again and than again and again, etc
      if (distance < this.result[row][col]) {
        this.result[row][col] = distance;
      }

      // Now this is very similar to the maze path finding algos.
      // We check what we have all around us - in every direction.
      // First we check all the white pixels than we put the black ones in the queue
      // as well, but initiate their distances not with zeros (how we do it for the white ones), but with increamented distance from the nearest white pixel, than we do the same for their children, than for grandchildren and etc
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

  /**
   * Determines whether we can move
   * @param rows
   * @param cols
   * @returns true if can move
   */
  private canMove(rows: number, cols: number): boolean {
    return rows > -1 && rows < this.rows && cols > -1 && cols < this.cols;
  }

  /**
   * Get computed results
   * @returns results
   */
  results(): number[][] {
    return this.result;
  }
}
