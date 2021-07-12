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
      const { matrices } = new Dott(1).read(data);

      expect(matrices).toHaveLength(1);
    });

    test("two matrices", () => {
      const { matrices } = new Dott(2).read([...data, ...data]);

      expect(matrices).toHaveLength(2);
    });

    test("incorrect length", () => {
      expect(() => {
        new Dott(2).read(data);
      }).toThrow();
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

      const results = new Dott(1).read(data).compute().results();

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

      const dott = new Dott(1).read(data)

      dott.compute()
      dott.compute();

      const results = dott.results()

      expect(results).toStrictEqual(expected);
    });
  })
});
