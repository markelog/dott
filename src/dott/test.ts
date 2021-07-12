import Dott from ".";

describe("Dott Class", () => {
  const data = [
    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  describe("read()", () => {
    test("one matrix", () => {
      const { matrices } = new Dott(1)
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3]);

      expect(matrices).toHaveLength(1);
    });

    test("two matrices", () => {
      const { matrices } = new Dott(2)

        // first matrix
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3])

        // second one
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3]);

      expect(matrices).toHaveLength(2);
    });

    test("incorrect length", () => {
      expect(() => {
        new Dott(1)

          // first matrix
          .read(data[0])
          .read(data[1])
          .read(data[2])
          .read(data[3])

          // second one
          .read(data[0])
          .read(data[1])
          .read(data[2])
          .read(data[3]);
      }).toThrow();
    });
  });

  describe("isFilled()", () => {
    test("filled it with one matrix", () => {
      const dott = new Dott(1)
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3]);

      expect(dott.isFilled()).toBe(true);
    });

    test("if wasn't filled", () => {
      const dott = new Dott(1);

      expect(dott.isFilled()).toBe(false);
    });

    test("didn't fully filled the matrix ", () => {
      const dott = new Dott(1).read(data[0]);

      expect(dott.isFilled()).toBe(false);
    });
  });

  describe("compute()", () => {
    test("basic case", () => {
      const expected = [
        [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],
      ];

      const results = new Dott(1)
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3])

        .compute()
        .results();

      expect(results).toStrictEqual(expected);
    });

    test("twice run", () => {
      const expected = [
        [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],
      ];

      const dott = new Dott(1)
        .read(data[0])
        .read(data[1])
        .read(data[2])
        .read(data[3])

        .compute()
        .compute();

      const results = dott.results();

      expect(results).toStrictEqual(expected);
    });

    test("variations of the input", () => {
      const input = [
        [3, 0, 4],
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 1, 1, 0],

        [2, 0, 2],
        [0, 1],
        [1, 0],

        [2, 0, 2],
        [1, 1],
        [1, 1],

        [3, 0, 4],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
        [1, 0, 0, 1],
      ];

      const expected = [
        [
          [3, 2, 1, 0],
          [2, 1, 0, 0],
          [1, 0, 0, 1],
        ],

        [
          [1, 0],
          [0, 1],
        ],
        [
          [0, 0],
          [0, 0],
        ],
        [
          [0, 1, 1, 0],
          [0, 1, 1, 0],
          [0, 1, 1, 0],
        ],
      ];

      const dott = new Dott(4);

      input.forEach((data: number[]) => {
        dott.read(data);
      });

      const results = dott.compute().results();

      expect(results).toStrictEqual(expected);
    });
  });
});
