import { Dott } from ".";

describe("Dott Class", () => {

  const data = [
    [3, 0, 4],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
  ];

  describe("read()", () => {
    test("one datum", () => {
      const {matrices} = new Dott(1).read(data)

      expect(matrices).toHaveLength(1);
    });

    test("two data", () => {
      const { matrices } = new Dott(2).read([...data, ...data]);

      expect(matrices).toHaveLength(2);
    });

    test("incorrect length", () => {
      expect(() => {
        new Dott(2).read(data);
      }).toThrow();
    });
  });
});
