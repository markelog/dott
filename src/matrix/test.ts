import Matrix from ".";

describe("Matrix Class", () => {
  const data = [
    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  describe("add()", () => {
    test("not enough rows", () => {
      const isFilled = new Matrix(3,4).add(data[1]).isFilled();

      expect(isFilled).toBe(false);
    });

    test("enough rows", () => {
      const matrix = new Matrix(3, 4)

      matrix.add(data[1])
      .add(data[2])
      .add(data[3]);

      expect(matrix.isFilled()).toBe(true);
    });

    test("not more please", () => {
      const matrix = new Matrix(3, 4);

      matrix.add(data[1])
      .add(data[2])
      .add(data[3]);

      expect(() => {
        matrix.add(data[1]);
      }).toThrow();
    });
  });

  describe("compute()", () => {
    const expected = [
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 1],
      ];
    test("basic case", () => {
      const matrix = new Matrix(3, 4);

      matrix.add(data[1]).add(data[2]).add(data[3]);

      const results = matrix.compute().results();

      expect(results).toStrictEqual(expected)
    });

    // This should not be the case according to the task definition, but no harm in being thorough :)
    test("with all zeros", () => {
      const matrix = new Matrix(1, 4);

      matrix.add([0, 0, 0, 0])

      const results = matrix.compute().results();

      expect(results).toStrictEqual([[0,0,0,0]]);
    });

    test("twice run", () => {
      const matrix = new Matrix(3, 4);

      matrix.add(data[1]).add(data[2]).add(data[3]);

      matrix.compute();
      matrix.compute();

      const results = matrix.results();

      expect(results).toStrictEqual(expected);
    });
  });
});
