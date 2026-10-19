import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Array]", async () => {
  describe("method: isArray", async () => {
    it("case: is array", async () => {
      const data = ["loquesea"];
      const expected = true;
      const received = util.isArray(data);
      expect(received).toBe(expected);
    });
    it("case: is not array", async () => {
      const data = 10;
      const expected = false;
      const received = util.isArray(data);
      expect(received).toBe(expected);
    });
    it("case: is array empty (allowed)", async () => {
      const data: any[] = [];
      const expected = true;
      const received = util.isArray(data, true);
      expect(received).toBe(expected);
    });
    it("case: is array empty (not allowed)", async () => {
      const data: any[] = [];
      const expected = false;
      const received = util.isArray(data, false);
      expect(received).toBe(expected);
    });
  });
  describe("method: castArrayByConditionType", async () => {
    it("case: number to array number", async () => {
      const data = 12;
      const queryType = "number";
      const expected = [12];
      const received = util.castArrayByConditionType(data, queryType);
      expect(received).toEqual(expected);
    });
    it("case: string to array string", async () => {
      const data = "hola";
      const queryType = "string";
      const expected = ["hola"];
      const received = util.castArrayByConditionType(data, queryType);
      expect(received).toEqual(expected);
    });
    it("case: string to array number (type string invalid)", async () => {
      const data = "hola"; //no es un number
      const queryType = "number";
      const expected = [] as number[]; // predefinídamente retorna un vacio si el tipo no corresponde
      const received = util.castArrayByConditionType<number>(
        data as any,
        queryType,
      );
      expect(received).toEqual(expected);
    });
    it("case: string to array number (type string invalid, custom default value)", async () => {
      const data = "hola"; //no es un number
      const queryType = "number";
      const df = [12];
      const expected = [12]; // predefinídamente retorna un vacio si el tipo no corresponde
      const received = util.castArrayByConditionType<number>(
        data as any,
        queryType,
        df,
      );
      expect(received).toEqual(expected);
    });
    it("case: structure to array structure (complex type object)", async () => {
      //verificar si data es EQUIVALENTE al tipo solicitado para castearlo a array
      const data = { a: "hola", b: 1 };
      const queryType = { a: ["string"] } as any; //se acepta si el objeto tiene al menos la propiedad "a" como string no vacio
      const df = { a: "saludo" };
      const aDf = [df];
      const expected = [{ a: "hola", b: 1 }]; //
      const received = util.castArrayByConditionType<typeof df>(
        data as any,
        queryType,
        aDf,
      );
      expect(received).toEqual(expected);
    });
    it("case: is previous array (don't modify)", async () => {
      const data = [1, 2, 3]; //los datos ya están en array
      const queryType = "number"; //los elementos deben ser number
      const expected = [1, 2, 3]; //no requiere casteo
      const received = util.castArrayByConditionType<number>(
        data as any,
        queryType,
        [],
      );
      expect(received).toEqual(expected);
    });
  });
  describe("method: sortMixedArray", async () => {
    describe("cases: array of boolean", async () => {
      it("case: is booleans (asc)", async () => {
        const data = [false, true, true, false, true];
        const expected = [false, false, true, true, true];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is booleans (desc)", async () => {
        const data = [false, true, true, false, true];
        const expected = [true, true, true, false, false];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
    });
    describe("cases: array of number", async () => {
      it("case: is numbers (asc)", async () => {
        const data = [-1, -2, -5, -3, -4, 0, 4, 3, 5, 2, 1];
        const expected = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is numbers (desc)", async () => {
        const data = [-1, -2, -5, -3, -4, 0, 4, 3, 5, 2, 1];
        const expected = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
    });
    describe("cases: array of string", async () => {
      it("case: is strings (asc)", async () => {
        const data = ["pera", "manzana", "uva", "mango", "ñame"];
        const expected = ["mango", "manzana", "ñame", "pera", "uva"];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is strings (desc)", async () => {
        const data = ["pera", "manzana", "uva", "mango", "ñame"];
        const expected = ["uva", "pera", "ñame", "manzana", "mango"];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is strings (desc, is not case sensitive)", async () => {
        const data = ["juan", "ana", "Juan", "Ana"];
        const expected = ["juan", "Juan", "ana", "Ana"]; //"j" y "J" pesan igual por no ser sensitivo
        const received = util.sortMixedArray(data, {
          direction: "desc",
          isCaseSensitiveForString: false,
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is strings (desc, is case sensitive)", async () => {
        const data = ["juan", "ana", "Juan", "Ana"];
        const expected = ["Juan", "juan", "Ana", "ana"]; //"J" pesa mas que "j", por ser sensitivo
        const received = util.sortMixedArray(data, {
          direction: "desc",
          isCaseSensitiveForString: true,
        });
        expect(received).toMatchObject(expected);
      });
    });
    describe("cases: array of object", async () => {
      it("case: is object (with keyPath, asc)", async () => {
        const data = [
          { id: "id-0005", p1: 511, p2: { p21: 1023 } },
          { id: "id-0003", p1: 127, p2: { p21: 1023 } },
          { id: "id-0004", p1: 255, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0006", p1: 767, p2: { p21: 1023 } },
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
        ];
        const expected = [
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0003", p1: 127, p2: { p21: 1023 } },
          { id: "id-0004", p1: 255, p2: { p21: 1023 } },
          { id: "id-0005", p1: 511, p2: { p21: 1023 } },
          { id: "id-0006", p1: 767, p2: { p21: 1023 } },
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
          keyOrKeysPath: "id",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is object (with keyPath, desc)", async () => {
        const data = [
          { id: "id-0005", p1: 511, p2: { p21: 1023 } },
          { id: "id-0003", p1: 127, p2: { p21: 1023 } },
          { id: "id-0004", p1: 255, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0006", p1: 767, p2: { p21: 1023 } },
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
        ];
        const expected = [
          { id: "id-0006", p1: 767, p2: { p21: 1023 } },
          { id: "id-0005", p1: 511, p2: { p21: 1023 } },
          { id: "id-0004", p1: 255, p2: { p21: 1023 } },
          { id: "id-0003", p1: 127, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
          keyOrKeysPath: "id",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is object (with deep keyPath, asc)", async () => {
        const data = [
          { id: "id-0005", p1: 511, p2: { p21: 1023, p22: "granadilla" } },
          { id: "id-0003", p1: 127, p2: { p21: 1023, p22: "pera" } },
          { id: "id-0004", p1: 255, p2: { p21: 1023, p22: "sandia" } },
          { id: "id-0002", p1: 63, p2: { p21: 1023, p22: "anon" } },
          { id: "id-0001", p1: 31, p2: { p21: 1023, p22: "zapote" } },
          { id: "id-0006", p1: 767, p2: { p21: 1023, p22: "uva" } },
        ];
        const expected = [
          { id: "id-0002", p1: 63, p2: { p21: 1023, p22: "anon" } },
          { id: "id-0005", p1: 511, p2: { p21: 1023, p22: "granadilla" } },
          { id: "id-0003", p1: 127, p2: { p21: 1023, p22: "pera" } },
          { id: "id-0004", p1: 255, p2: { p21: 1023, p22: "sandia" } },
          { id: "id-0006", p1: 767, p2: { p21: 1023, p22: "uva" } },
          { id: "id-0001", p1: 31, p2: { p21: 1023, p22: "zapote" } },
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
          keyOrKeysPath: "p2.p22",
        });
        expect(received).toMatchObject(expected);
      });
    });
    describe("cases: array of array", async () => {
      it("case: is booleans (asc)", async () => {
        const data = [
          [false, true, true, false, true],
          [false, true, false, true],
        ];
        const expected = [
          [false, false, true, true], //menor tamaño
          [false, false, true, true, true],
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is booleans (desc)", async () => {
        const data = [
          [false, true, true, false, true],
          [false, true, false],
        ];
        const expected = [
          [true, true, true, false, false], //mayor tamaño
          [true, false, false],
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is numbers (asc)", async () => {
        const data = [
          [1, -2, 2, 0, -1],
          [0, -1, 1],
        ];
        const expected = [
          [-1, 0, 1], //menor tamaño
          [-2, -1, 0, 1, 2],
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is numbers (desc)", async () => {
        const data = [
          [1, -2, 2, 0, -1],
          [0, -1, 1],
        ];
        const expected = [
          [2, 1, 0, -1, -2], //mayor tamaño
          [1, 0, -1],
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is strings (asc)", async () => {
        const data = [
          ["manzana", "banana", "pera", "kiwi", "zapote"],
          ["juan", "pedro", "alvaro"],
        ];
        const expected = [
          ["alvaro", "juan", "pedro"], //menor tamaño
          ["banana", "kiwi", "manzana", "pera", "zapote"],
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is strings (desc)", async () => {
        const data = [
          ["manzana", "banana", "pera", "kiwi", "zapote"],
          ["juan", "pedro", "alvaro"],
        ];
        const expected = [
          ["zapote", "pera", "manzana", "kiwi", "banana"], //mayor tamaño
          ["pedro", "juan", "alvaro"],
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is objects (asc)", async () => {
        const data = [
          [
            { age: 12, name: "juan" },
            { age: 89, name: "Pedro" },
            { age: 12, name: "Juan" },
            { age: 13, name: "camilo" },
            { age: 13, name: "Camila" },
          ],
          ["Zulma", "maria", "Alvaro"],
        ];
        const expected = [
          ["Alvaro", "maria", "Zulma"], //menor tamaño
          [
            { age: 12, name: "juan" }, //❗siempre este orden no importa direccion ni case sensitive❗
            { age: 12, name: "Juan" }, //❗siempre este orden no importa direccion ni case sensitive❗
            { age: 13, name: "Camila" },
            { age: 13, name: "camilo" },
            { age: 89, name: "Pedro" },
          ],
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
          keyOrKeysPath: ["age", "name"],
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is objects (desc)", async () => {
        const data = [
          [
            { age: 12, name: "juan" },
            { age: 89, name: "Pedro" },
            { age: 12, name: "Juan" },
            { age: 13, name: "camilo" },
            { age: 13, name: "Camila" },
          ],
          ["Zulma", "maria", "Alvaro"],
        ];
        const expected = [
          [
            //mayor tamaño
            { age: 89, name: "Pedro" },
            { age: 13, name: "camilo" },
            { age: 13, name: "Camila" },
            { age: 12, name: "Juan" }, //❗siempre este orden no importa direccion ni case sensitive❗
            { age: 12, name: "juan" }, //❗siempre este orden no importa direccion ni case sensitive❗
          ],
          ["Zulma", "maria", "Alvaro"],
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
          keyOrKeysPath: ["age", "name"],
          isCaseSensitiveForString: true,
        });
        expect(received).toMatchObject(expected);
      });
    });
    describe("cases: array of any", async () => {
      it("case: is anything sort (asc)", async () => {
        const data = [
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          undefined,
          [15, 7],
          null,
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
          null,
          31,
          true,
          false,
          -2,
          "hola",
          [false, true],
          "adios",
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          true,
          ["dato2", "dato1"],
        ];
        const expected = [
          //ordenado de acuerdo al peso de cada tipo
          undefined,
          null,
          null,
          false,
          true,
          true,
          -2,
          31,
          "adios",
          "hola",
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          [false, true],
          [7, 15],
          ["dato1", "dato2"],
        ];
        const received = util.sortMixedArray(data, {
          direction: "asc",
          keyOrKeysPath: "id",
        });
        expect(received).toMatchObject(expected);
      });
      it("case: is anything sort (desc)", async () => {
        const data = [
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          undefined,
          [15, 7],
          null,
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
          null,
          31,
          true,
          false,
          -2,
          "hola",
          [false, true],
          "adios",
          { id: "id-0002", p1: 63, p2: { p21: -1023 } },
          true,
          ["dato2", "dato1"],
        ];
        const expected = [
          //ordenado de acuerdo al peso de cada tipo
          ["dato2", "dato1"],
          [15, 7],
          [true, false],
          { id: "id-0002", p1: 63, p2: { p21: 1023 } },
          { id: "id-0002", p1: 63, p2: { p21: -1023 } },
          { id: "id-0001", p1: 31, p2: { p21: 1023 } },
          "hola",
          "adios",
          31,
          -2,
          true,
          true,
          false,
          null,
          null,
          undefined,
        ];
        const received = util.sortMixedArray(data, {
          direction: "desc",
          keyOrKeysPath: ["id", "p2.p21"],
        });
        expect(received).toMatchObject(expected);
      });
    });
  });
  describe("method: removeArrayDuplicate", async () => {
    it("case: exception is not array to remove duplicates", async () => {
      const expectedThrow = /is not array to remove duplicates valid/;
      const recivedThrowFn = () => util.removeArrayDuplicate(0 as any, {});
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: empty array", async () => {
      const expected: any[] = [];
      const received = util.removeArrayDuplicate([], {});
      expect(received).toMatchObject(expected);
    });
    it("case: null undefined array", async () => {
      const data = [null, null, undefined, undefined];
      const expected = [null, undefined];
      const received = util.removeArrayDuplicate(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: boolea array", async () => {
      const data = [true, true, false, true, false];
      const expected = [true, false];
      const received = util.removeArrayDuplicate(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: number array", async () => {
      const data = [1, -1, 1, 2, -1, 2, 0, 0];
      const expected = [1, -1, 2, 0]; //se respeta el orden (o desorden) del array base
      //(tambien influye el modo de conflicto, predefinido "last")
      const received = util.removeArrayDuplicate(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: string-number array (is compare string as number, last conflict mode)", async () => {
      const data = [0, "1", 1, 2, "2", 0];
      const expected = [1, "2", 0]; //de los duplicados se toman los ultimos
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
        isCompareStringToNumber: true,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string-number array (is compare string as number, first conflict mode)", async () => {
      const data = [0, "1", 1, 2, "2", 0];
      const expected = [0, "1", 2]; //de los duplicados se toman los primeros
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCompareStringToNumber: true,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string-number array (is not compare string as number, last conflict mode)", async () => {
      const data = [0, "1", 1, 2, "2", 0];
      const expected = ["1", 1, 2, "2", 0]; //de los duplicados se toman los ultimos
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
        isCompareStringToNumber: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string array (last conflict mode)", async () => {
      const data = [
        "banano",
        "manzana",
        "pera",
        "manzana",
        "mango",
        "piña",
        "piña",
      ];
      const expected = ["banano", "pera", "manzana", "mango", "piña"];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string array (is case sensitive, last conflict mode)", async () => {
      const data = [
        "banano",
        "manzana",
        "pera",
        "Manzana",
        "mango",
        "Piña",
        "piña",
      ];
      const expected = [
        "banano",
        "manzana",
        "pera",
        "Manzana", //"M"
        "mango",
        "Piña", // "P"
        "piña",
      ]; ///al ser case sensitive ninguno es dplicado
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
        isCaseSensitiveForString: true,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string array (is not case sensitive, last conflict mode)", async () => {
      const data = [
        "banano",
        "manzana", //son equivalntes po rno ser case sensitive
        "pera",
        "Manzana", //son equivalntes po rno ser case sensitive
        "mango",
        "Piña", //son equivalntes po rno ser case sensitive
        "piña", //son equivalntes po rno ser case sensitive
      ];
      const expected = [
        "banano",
        "pera",
        "Manzana", //es el ultimo duplicado
        "mango",
        "piña", //es el ultimo duplicado
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
        isCaseSensitiveForString: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: string array (is not case sensitive, first conflict mode)", async () => {
      const data = [
        "banano",
        "manzana", //son equivalntes po rno ser case sensitive
        "pera",
        "Manzana", //son equivalntes po rno ser case sensitive
        "mango",
        "Piña", //son equivalntes po rno ser case sensitive
        "piña", //son equivalntes po rno ser case sensitive
      ];
      const expected = [
        "banano",
        "manzana", //es el primer duplicado
        "pera",
        "mango",
        "Piña", //es el primer duplicado
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (first conflict mode)", async () => {
      const data = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" },
        { age: 14, name: "Pablo" },
        { age: 14, name: "Perla" },
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 18, name: "juan" },
      ];
      const expected = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" }, //es la primera
        { age: 14, name: "Pablo" },
        //{age: 14, name: "Perla"}, //❌ esta duplicada
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 18, name: "juan" },
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (first conflict mode, with key path)", async () => {
      const data = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" },
        { age: 14, name: "Pablo" },
        { age: 14, name: "Perla" },
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 18, name: "juan" },
      ];
      const expected = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" }, //es la primera
        //{age: 14, name: "Pablo"}, //❌ esta duplicado
        //{age: 14, name: "Perla"}, //❌ esta duplicado
        { age: 16, name: "Juan" },
        // {age: 14, name: "Pedro"}, //❌ esta duplicado
        { age: 18, name: "juan" },
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        keyOrKeysPath: "age",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (last conflict mode, with key path)", async () => {
      const data = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" },
        { age: 14, name: "Pablo" },
        { age: 14, name: "Perla" },
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 18, name: "juan" },
      ];
      const expected = [
        { age: 12, name: "Susana" },
        //{age: 14, name: "Perla"}, //❌ esta duplicado
        //{age: 14, name: "Pablo"}, //❌ esta duplicado
        //{age: 14, name: "Perla"}, //❌ esta duplicado
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" }, //es el ultimo
        { age: 18, name: "juan" },
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "last",
        keyOrKeysPath: "age",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (first conflict mode, with keys path, is case sensitive)", async () => {
      const data = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" },
        { age: 14, name: "Pablo" },
        { age: 14, name: "Perla" },
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 16, name: "juan" },
      ];
      const expected = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" }, //es la primera
        { age: 14, name: "Pablo" },
        //{age: 14, name: "Perla"}, //❌ esta duplicado
        { age: 16, name: "Juan" }, //"J" no son duplicados (es case sensitive)
        { age: 14, name: "Pedro" },
        { age: 16, name: "juan" }, //"j" no son duplicados (es case sensitive)
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: true,
        keyOrKeysPath: ["age", "name"],
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (first conflict mode, with keys path, is not case sensitive)", async () => {
      const data = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" },
        { age: 14, name: "Pablo" },
        { age: 14, name: "Perla" },
        { age: 16, name: "Juan" },
        { age: 14, name: "Pedro" },
        { age: 16, name: "juan" },
      ];
      const expected = [
        { age: 12, name: "Susana" },
        { age: 14, name: "Perla" }, //es la primera
        { age: 14, name: "Pablo" },
        //{age: 14, name: "Perla"}, //❌ esta duplicado
        { age: 16, name: "Juan" }, //es el primero (no es case sensitive)
        { age: 14, name: "Pedro" },
        //{ age: 16, name: "juan" }, //❌ esta duplicado, (no es case sensitive)
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: false,
        keyOrKeysPath: ["age", "name"],
      });
      expect(received).toMatchObject(expected);
    });
    it("case: object array (first conflict mode, with keys path deep)", async () => {
      const data = [
        { age: 14, name: "Susana", pd: { p1: 1 } },
        { age: 14, name: "Perla", pd: { p1: 5 } },
        { age: 14, name: "Pablo", pd: { p1: 1 } },
        { age: 14, name: "Perla", pd: { p1: 3 } },
      ];
      const expected = [
        { age: 14, name: "Susana", pd: { p1: 1 } }, //es la primera
        { age: 14, name: "Perla", pd: { p1: 5 } },
        //{ age: 14, name: "Pablo", pd:{p1:1}},//❌ esta duplicado
        { age: 14, name: "Perla", pd: { p1: 3 } },
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: false,
        keyOrKeysPath: ["age", "pd.p1"],
      });
      expect(received).toMatchObject(expected);
    });
    it("case: arrays of array (first conflict mode, is not compare length)", async () => {
      const data = [
        ["A", "B", "C"],
        ["A", "B", "C", "D"],
        [1, 2, 3],
        [1, 2, 3, 4, 5],
      ];
      const expected = [
        ["A", "B", "C"],
        //["A", "B", "C", "D"], //❌ duplicado
        [1, 2, 3],
        //[1,2,3,4,5], //❌ duplicado
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: true,
        isCompareLength: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: arrays of array (first conflict mode, is compare length)", async () => {
      const data = [
        ["A", "B", "C"],
        ["A", "B", "C", "D"],
        [1, 2, 3],
        [1, 2, 3, 4, 5],
      ];
      const expected = [
        ["A", "B", "C"],
        ["A", "B", "C", "D"], //no es duplicado porque es de mayor tamaño
        [1, 2, 3],
        [1, 2, 3, 4, 5], //no es duplicado porque es de mayor tamaño
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: true,
        isCompareLength: true,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: arrays of array (first conflict mode, is not compare length)", async () => {
      const data = [
        ["A", "B", "C"],
        ["a", "b", "c"],
        [1, 2, 3],
        [1, 2, 3, 4, 5],
      ];
      const expected = [
        ["A", "B", "C"],
        //["a", "b", "c", "D"], //❌ es duplicado (los elemento en exceso (como "D") no importan)
        [1, 2, 3],
        //[1,2,3,4,5], //❌ es duplicado
      ];
      const received = util.removeArrayDuplicate(data, {
        itemConflictMode: "first",
        isCaseSensitiveForString: false,
        isCompareLength: false,
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: getArrayUnion", async () => {
    it("case: union array of boolean", async () => {
      const arrA = [true, false, true, true];
      const arrB = [false, false, true, true];
      const data = [arrA, arrB] as [any, any];
      const expected = [false, true];
      const received = util.getArrayUnion(data);
      expect(received).toMatchObject(expected);
    });
    it("case: union array of number", async () => {
      const arrA = [1, 2, 3];
      const arrB = [3, 4, 5];
      const data = [arrA, arrB] as [any, any];
      const expected = [1, 2, 3, 4, 5];
      const received = util.getArrayUnion(data);
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string", async () => {
      const arrA = ["ana", "juan", "pedro"];
      const arrB = ["juan", "jacobo", "jose"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["ana", "pedro", "juan", "jacobo", "jose"];
      const received = util.getArrayUnion(data);
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string (is no sensitive)", async () => {
      const arrA = ["ana", "juan", "pedro"];
      const arrB = ["juan", "Ana", "jose"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["pedro", "juan", "Ana", "jose"];
      const received = util.getArrayUnion(data, {
        isCaseSensitiveForString: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string (mode last, is no sensitive)", async () => {
      const arrA = ["ana", "juan", "pedro"];
      const arrB = ["juan", "Ana", "jose"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["pedro", "juan", "Ana", "jose"];
      const received = util.getArrayUnion(data, {
        isCaseSensitiveForString: false,
        itemConflictMode: "last",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string (mode, first, is no sensitive)", async () => {
      const arrA = ["ana", "juan", "pedro"];
      const arrB = ["juan", "Ana", "jose"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["ana", "juan", "pedro", "jose"];
      const received = util.getArrayUnion(data, {
        isCaseSensitiveForString: false,
        itemConflictMode: "first",
      });
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string (is sensitive)", async () => {
      const arrA = ["ana", "juan", "pedro"];
      const arrB = ["juan", "Ana", "jose"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["ana", "pedro", "juan", "Ana", "jose"];
      const received = util.getArrayUnion(data, {
        isCaseSensitiveForString: true,
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: getArrayIntersection", async () => {
    it("case: union array of boolean", async () => {
      const arrA = [true, false, true, true];
      const arrB = [false, false, false, false];
      const data = [arrA, arrB] as [any, any];
      const expected = [false];
      const received = util.getArrayIntersection(data);
      expect(received).toMatchObject(expected);
    });
    it("case: union array of number", async () => {
      const arrA = [1, 2, 3];
      const arrB = [3, 4, 5];
      const data = [arrA, arrB] as [any, any];
      const expected = [3];
      const received = util.getArrayIntersection(data);
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string", async () => {
      const arrA = ["Juan", "ana", "Diana"];
      const arrB = ["Ana", "Pedro", "Andres"];
      const data = [arrA, arrB] as [any, any];
      const expected: any[] = []; //interseccion vacio ("ana" no es equivalente a "Ana" es case sensitive predefinidamente)
      const received = util.getArrayIntersection(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: union array of string (no sensitive)", async () => {
      const arrA = ["Juan", "ana", "Diana"];
      const arrB = ["Ana", "Pedro", "Andres"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["ana"]; //si no hay un orden establecido,
      //la interseccion retorna el elemento del array que representa *A*
      const received = util.getArrayIntersection(data, {
        isCaseSensitiveForString: false,
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: getArrayIntersection", async () => {
    it("case: intersection array of boolean", async () => {
      const arrA = [true, false, true, true];
      const arrB = [false, false, false, false];
      const data = [arrA, arrB] as [any, any];
      const expected = [false];
      const received = util.getArrayIntersection(data);
      expect(received).toMatchObject(expected);
    });
    it("case: intersection array of number", async () => {
      const arrA = [1, 2, 3];
      const arrB = [3, 4, 5];
      const data = [arrA, arrB] as [any, any];
      const expected = [3];
      const received = util.getArrayIntersection(data);
      expect(received).toMatchObject(expected);
    });
    it("case: intersection array of string", async () => {
      const arrA = ["Juan", "ana", "Diana"];
      const arrB = ["Ana", "Pedro", "Andres"];
      const data = [arrA, arrB] as [any, any];
      const expected: any[] = []; //interseccion vacio ("ana" no es equivalente a "Ana" es case sensitive predefinidamente)
      const received = util.getArrayIntersection(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: intersection array of string (no sensitive)", async () => {
      const arrA = ["Juan", "ana", "Diana"];
      const arrB = ["Ana", "Pedro", "Andres"];
      const data = [arrA, arrB] as [any, any];
      const expected = ["ana"]; //si no hay un orden establecido,
      //la interseccion retorna el elemento del array que representa *A*
      const received = util.getArrayIntersection(data, {
        isCaseSensitiveForString: false,
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: getArrayDifference", async () => {
    it("case: difference array of boolean (A)", async () => {
      const arrA = [true, false, true, true];
      const arrB = [false, false, false, false];
      const data = [arrA, arrB] as [any, any];
      const expected = [true];
      const received = util.getArrayDifference(data, "difference_A");
      expect(received).toMatchObject(expected);
    });
    it("case: difference array of boolean (B)", async () => {
      const arrA = [true, false, true, true];
      const arrB = [false, false, false, false];
      const data = [arrA, arrB] as [any, any];
      const expected: any[] = [];
      const received = util.getArrayDifference(data, "difference_B");
      expect(received).toMatchObject(expected);
    });
    it("case: difference array of number (A)", async () => {
      const arrA = [1, 2, 3];
      const arrB = [3, 4, 5];
      const data = [arrA, arrB] as [any, any];
      const expected = [1, 2];
      const received = util.getArrayDifference(data, "difference_A");
      expect(received).toMatchObject(expected);
    });
    it("case: difference array of number (B)", async () => {
      const arrA = [1, 2, 3];
      const arrB = [3, 4, 5];
      const data = [arrA, arrB] as [any, any];
      const expected = [4, 5];
      const received = util.getArrayDifference(data, "difference_B");
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: searchItemsInArray", async () => {
    it("case: serach", async () => {
      const aData = [
        { code: "A", age: 12, name: "Pedro" },
        { code: "B", age: 13, name: "Juan" },
        { code: "C", age: 15, name: "Ana" },
        { code: "B", age: 8, name: "Miguel" },
        { code: "D", age: 15, name: "Jorge" },
      ];
      const aSearch = [{ code: "B" }];
      const expected = [
        { code: "B", age: 13, name: "Juan" },
        { code: "B", age: 8, name: "Miguel" },
      ];
      const received = util.searchItemsInArray(aData, aSearch, {});
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: freezeArray", async () => {
    it("case: freeze array ok", async () => {
      const data = ["hola"];
      const expected = true; //congelamiento exitoso
      const frozen = util.freezeArray(data); //congelado
      const received = Object.isFrozen(frozen); //javascript determina si ha sido congelado
      expect(received).toBe(expected);
    });
  });
});
