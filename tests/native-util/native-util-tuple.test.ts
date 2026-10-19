import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Tuple]", async () => {
  describe("method: isTuple", async () => {
    it("case: is not tuple", async () => {
      const data = 10;
      const expected = false;
      const received = util.isTuple(data as any, 0);
      expect(received).toBe(expected);
    });
    it("case: is tuple by two elements", async () => {
      const data = ["hola", "adios"];
      const length = 2;
      const expected = true;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple but not two elements", async () => {
      const data = ["hola", "hello", "Salut"]; //3 elementos
      const length = 2;
      const expected = false; //por que se espera una tupla de 2 elementos
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple but not one element", async () => {
      const data = ["hola"]; //1 elementos
      const length = 2;
      const expected = false; //por que se espera una tupla de 2 elementos
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple and is range between one and three elements", async () => {
      const data = ["hola"]; //1 elementos
      const length = [1, 3] as [number, number]; //rango entre 1 y 3 elementos (siempre es incluyente)
      const expected = true;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple and is range between zero and two elements", async () => {
      const data: any[] = []; //0 elementos
      const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
      const expected = true;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple and is range between zero and two elements (no array)", async () => {
      const data = null; //no array contenedor
      const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
      const expected = false;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is tuple and is range between zero and two elements (no array)", async () => {
      const data = null; //no array contenedor
      const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
      const expected = false;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
  });
  describe("method: isArrayTuple", async () => {
    it("case: is not array tuple", async () => {
      const data = 10;
      const expected = false;
      const received = util.isArrayTuple(data as any, 0);
      expect(received).toBe(expected);
    });
    it("case: is empty array tuple", async () => {
      const data: any[] = [];
      const expected = true;
      const isAllowEmpty = true;
      const received = util.isArrayTuple(data as any, 0, isAllowEmpty);
      expect(received).toBe(expected);
    });
    it("case: is tuple but not array tuple", async () => {
      const data = ["hola", "adios"]; //tuplas, pero no array de tuplas
      const length = 2;
      const expected = false;
      const received = util.isArrayTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is array tuple by two elements", async () => {
      const data = [
        ["hola", "adios"],
        ["hello", "bye"],
        ["Kon'nichiwa", "Sayonara"],
      ];
      const length = 2;
      const expected = true;
      const received = util.isArrayTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is array tuple but some item is not two elements", async () => {
      const data = [
        ["hola", "adios", "buenos dias"],
        ["hello", "bye"],
      ]; //una de las tuplas tiene 3 elelemntos
      const length = 2;
      const expected = false; //por que se espera que todas las tuplas sean de 2 elementos
      const received = util.isArrayTuple(data, length);
      expect(received).toBe(expected);
    });
    it("case: is array tuple and is items range between one and three elements", async () => {
      const data = [
        ["hola"],
        ["hello", "bye"],
        ["Kon'nichiwa", "Sayonara", "Ohayō"],
      ]; //tuplas entre 1 y 3 elementos
      const length = [1, 3] as [number, number]; //rango entre 1 y 3 elementos (siempre es incluyente)
      const expected = true;
      const received = util.isTuple(data, length);
      expect(received).toBe(expected);
    });
  });
});
