import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [General Purpose]", async () => {
  describe("method: clone", async () => {
    it("case: clone literal object (without fn prop) by stringify)", async () => {
      const data = {
        p1: "hola",
        p2: 15,
        p3: true,
        p4: {
          p41: "otro texto",
          p42: [
            65535,
            {
              p43: "dentro del array",
            },
          ],
          p43: {
            p431: "hola de nuevo",
            p432: {
              p4321: 255,
            },
          },
        },
      };
      const expected = {
        p1: "hola",
        p2: 15,
        p3: true,
        p4: {
          p41: "otro texto",
          p42: [
            65535,
            {
              p43: "dentro del array",
            },
          ],
          p43: {
            p431: "hola de nuevo",
            p432: {
              p4321: 255,
            },
          },
        },
      };
      const received = util.clone(data, "stringify");
      expect(received).toStrictEqual(expected); //strict para verificar clonacion exacta
    });
    it("case: clone literal object (without fn prop) by structuredClone)", async () => {
      const data = {
        p1: "hola",
        p2: 15,
        p3: true,
        p4: {
          p41: "otro texto",
          p42: [
            65535,
            {
              p43: "dentro del array",
            },
          ],
          p43: {
            p431: "hola de nuevo",
            p432: {
              p4321: 255,
            },
          },
        },
      };
      const expected = {
        p1: "hola",
        p2: 15,
        p3: true,
        p4: {
          p41: "otro texto",
          p42: [
            65535,
            {
              p43: "dentro del array",
            },
          ],
          p43: {
            p431: "hola de nuevo",
            p432: {
              p4321: 255,
            },
          },
        },
      };
      const received = util.clone(data, "structuredClone");
      expect(received).toStrictEqual(expected); //strict para verificar clonacion exacta
    });
    it("case: clone literal object (with fn prop) by stringify)", async () => {
      const data = {
        p1: "hola",
        pFn: () => "hola fn",
      };
      const expected = {
        p1: "hola",
        pFn: () => "hola fn",
      };
      const received = util.clone(data, "stringify");
      try {
        //siempre se dispara el error porque structuredClone no clona funciones
        const t = received.pFn();
      } catch (error) {} //detectarlo y no hacer nada
      expect(received)
        .not //no puede ser igual porque stringify no clona funciones
        .toStrictEqual(expected); //strict para verificar clonacion exacta
    });
    it("case: clone literal object (with fn prop) by structuredClone)", async () => {
      const data = {
        p1: "hola",
        pFn: () => "hola fn",
      };
      const expected = {
        p1: "hola",
        pFn: () => "hola fn",
      };
      let received = undefined;
      try {
        received = util.clone(data, "structuredClone"); //❗structuredClone nisiquiera intenta la clonacion, lanza error❗
        const t = received.pFn();
      } catch (error) {} //detectarlo y no hacer nada
      expect(received)
        .not //no puede ser igual porque stringify no clona funciones
        .toStrictEqual(expected); //strict para verificar clonacion exacta
    });
    it("case: clone instance by stringify)", async () => {
      class ClassA {
        private p2: any;
        constructor(public p1: string) {}
        public doAny(): boolean {
          return true;
        }
      }
      const data = new ClassA("hola");
      const expected = new ClassA("hola");
      const received = util.clone(data, "stringify");
      try {
        //siempre se dispara el error porque structuredClone no clona funciones
        const t = received.doAny();
      } catch (error) {} //detectarlo y no hacer nada
      expect(received)
        .not //no puede ser igual porque stringify no clona funciones
        .toStrictEqual(expected);
    });
    it("case: clone instance by structuredClone)", async () => {
      class ClassA {
        private p2 = 10;
        constructor(public p1: string) {}
        public doAny(): boolean {
          return true;
        }
      }
      const data = new ClassA("hola");
      const expected = new ClassA("hola");
      const received = util.clone(data, "structuredClone");
      try {
        //siempre se dispara el error porque structuredClone no clona funciones
        const t = received.doAny();
      } catch (error) {} //detectarlo y no hacer nada
      expect(received)
        .not //no puede ser igual porque received no es una instancia (no se clonaron las funciones)
        .toStrictEqual(expected);
    });
    it("case: clone instance by customDeepClone)", async () => {
      class ClassA {
        private p2 = 10;
        constructor(public p1: string) {}
        public doAny(): boolean {
          //el método debe traspasare al clon
          return true;
        }
      }
      const data = new ClassA("hola");
      const expected = new ClassA("hola");
      const received = util.clone(data, "customDeepClone");
      expect(received).toStrictEqual(expected);
      //comprobación adicional del método traspasado del original al clon
      expect(received.doAny()).toBe(data.doAny());
    });
  });
  describe("method: isValueType", async () => {
    it("case: exception is not types array valid", async () => {
      const expectedThrow = /is not array types valid/;
      const recivedThrowFn = () => util.isValueType("lo que sea", null as any); //null no es array de tipos
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: exception is not types array valid (1)", async () => {
      const expectedThrow = /is not array types valid/;
      const recivedThrowFn = () => util.isValueType("lo que sea", null as any); //null no es array de tipos
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: exception is not types array valid (2)", async () => {
      const expectedThrow = /is not array types valid/;
      const recivedThrowFn = () =>
        util.isValueType("lo que sea", "string" as any); //los tipos deben ser agrupados en array
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: exception is not types array valid (3)", async () => {
      const expectedThrow = /is not selector type valid/;
      const recivedThrowFn = () =>
        util.isValueType("lo que sea", [null as any]); //los tipos se expresan en texto ( "null" ) o los tipos de agrupacion especial `[]` o `{}`
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: is undefined", async () => {
      const data = null;
      const expected = false;
      const received = util.isValueType(data, ["undefined"]);
      expect(received).toBe(expected);
    });
    it("case: is null", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isValueType(data, ["null"]);
      expect(received).toBe(expected);
    });
    it("case: is boolean", async () => {
      const data = 0;
      const expected = false;
      const received = util.isValueType(data, ["boolean"]);
      expect(received).toBe(expected);
    });
    it("case: is number (v1)", async () => {
      const data = true;
      const expected = false;
      const received = util.isValueType(data, ["number"]);
      expect(received).toBe(expected);
    });
    it("case: is number (v2)", async () => {
      const data = "1";
      const expected = false;
      const received = util.isValueType(data, ["number"]);
      expect(received).toBe(expected);
    });
    it("case: is number (v3)", async () => {
      const data = 1;
      const expected = true;
      const received = util.isValueType(data, ["number"]);
      expect(received).toBe(expected);
    });
    it("case: is string (v1)", async () => {
      const data = true;
      const expected = false;
      const received = util.isValueType(data, ["string"]);
      expect(received).toBe(expected);
    });
    it("case: is string (v2)", async () => {
      const data = "hola";
      const expected = true;
      const received = util.isValueType(data, ["string"]);
      expect(received).toBe(expected);
    });
    it("case: is string (v3 string empty invalid)", async () => {
      const data = "";
      const expected = false;
      const received = util.isValueType(data, ["string"]);
      expect(received).toBe(expected);
    });
    it("case: is string (4 string empty valid)", async () => {
      const data = "";
      const expected = true;
      const received = util.isValueType(data, ["string"], {
        allowStringEmpty: true,
      });
      expect(received).toBe(expected);
    });
    it("case: is string (5 string empty invalid)", async () => {
      const data = "";
      const expected = false;
      const received = util.isValueType(data, ["undefined", "null", "string"]);
      expect(received).toBe(expected);
    });
    it("case: is object (1 explicit object, empty invalid)", async () => {
      const data = {};
      const expected = false;
      //"object" se puede usar para determinar que es un objeto pero no vacio
      const received = util.isValueType(data, ["undefined", "null", "object"]); //mejor usar {} en vez de "object"
      expect(received).toBe(expected);
    });
    it("case: is object (2 implicit object, empty valid)", async () => {
      const data = {};
      const expected = true; //Se permiten objetos con cualquier propiedad (o vacios)
      const received = util.isValueType(data, ["undefined", "null", {}]);
      expect(received).toBe(expected);
    });
    it("case: is object (3 check subprop valid)", async () => {
      const data = { a: 1 };
      const expected = true; //la propiedad `a` es al menos es un número
      const received = util.isValueType(data, [
        "undefined",
        "null",
        { a: ["string", "number"] },
      ]);
      expect(received).toBe(expected);
    });
    it("case: is object (4 define {} as types is not empty)", async () => {
      const data = { a: "lo que sea" };
      const expected = true; //Se permiten objetos con cualquier propiedad (o vacios)
      const received = util.isValueType(data, ["undefined", "null", {}]); //❗{}, no solo significa objeto vacio, significa objeto con cualquier tipo de propiedades❗
      expect(received).toBe(expected);
    });
    it("case: is object (5 ignore others properties)", async () => {
      const data = { a: 1, b: "lo que sea" };
      const expected = true; //la propiedad `a` es al menos numero y las demás propiedades son ignoradas
      const received = util.isValueType(data, [
        "undefined",
        "null",
        { a: ["boolean", "number"] },
      ]);
      expect(received).toBe(expected);
    });
    it("case: is object (6 deep level)", async () => {
      const data = { a: { aa: 1 } };
      const expected = false; //la propiedad `a` es al menos objeto pero, la propiedad `aa` no es string
      const received = util.isValueType(data, [
        "undefined",
        "null",
        { a: ["boolean", { aa: ["string"] }] },
      ]);
      expect(received).toBe(expected);
    });
    it("case: is array (1 explicit array, empty invalid)", async () => {
      const data: any[] = [];
      const expected = false;
      //"array" se puede usar para determinar que es un array pero no vacio
      const received = util.isValueType(data, ["undefined", "null", "array"]);
      expect(received).toBe(expected);
    });
    it("case: is array (3 implicit array, empty valid)", async () => {
      const data: any[] = [];
      const expected = true; //se permite array vacio
      const received = util.isValueType(data, ["undefined", "null", []]);
      expect(received).toBe(expected);
    });
    it("case: is array (4 define [] as types is not empty)", async () => {
      const data = [1, 2, 3];
      const expected = true; //es un array con elementos de cualquier tipo
      const received = util.isValueType(data, ["undefined", "null", []]);
      expect(received).toBe(expected);
    });
    it("case: is array (5 all the same type)", async () => {
      const data = [1, 2, 3];
      const expected = false; //los elementos del array son solo números
      const received = util.isValueType(data, [
        "undefined",
        "null",
        ["boolean", "string"],
      ]);
      expect(received).toBe(expected);
    });
    it("case: is array (6 different type)", async () => {
      const data = [1, "hola", 3];
      const expected = false; //solo un elemento del array es string, para que sea valido todos los elementos del array deben ser "boolean" o "string"
      const received = util.isValueType(data, [
        "undefined",
        "null",
        ["boolean", "string"],
      ]);
      expect(received).toBe(expected);
    });
    it("case: is array (7 deep level and objects)", async () => {
      const data = [1, ["a", "b", "c"], { a: "hola" }];
      const expected = true;
      const received = util.isValueType(data, [
        ["number", ["string"], { a: ["string"] }],
      ]);
      expect(received).toBe(expected);
    });
    it("case: is tuple (1 explicit)", async () => {
      const data = ["clave", "valor"]; //tupla
      const expected = true;
      const received = util.isValueType(data, ["null", "tuple"], {
        tupleSize: 2,
      }); //❗si se verifica explícitamente "tuple", es obligatorio asignar el tamaño de la tupla❗
      expect(received).toBe(expected);
    });
    it("case: is tuple (2 implicit)", async () => {
      const data = ["clave", "valor"]; //tupla
      const expected = true;
      //❗si en el mismo nivel del esquema de `types` (en cualquier nivel pero que sea el mismo), se detecta que hay 2 o mas array internamente el metodo asume validacion de tupla❗
      const received = util.isValueType(data, [
        "null",
        ["string", "number"],
        ["string"],
      ]);
      expect(received).toBe(expected);
    });
    it("case: is tuple (2 implicit, tuple size is invalid)", async () => {
      const data = ["clave", "valor"]; //tupla
      const expected = false; // se le da prioridad a la configuración de
      // `tupleSize` dado que se está verificando una tupla de 3 elementos
      //es invalido
      const received = util.isValueType(
        data,
        ["null", ["string", "number"], ["string"]],
        { tupleSize: 3 },
      ); //se solicita 3 elementos
      expect(received).toBe(expected);
    });
    it("case: is function", async () => {
      const data = () => console.log("lo que sea"); //se verifica si es un tipo function
      const expected = true;
      const received = util.isValueType(data, ["function"]);
      expect(received).toBe(expected);
    });
    it("case: is custom callback", async () => {
      const data = "hola"; //se requiere validar si es especificamente tipo "hola" o es null
      const customFn = (v: any) => {
        const r = v === "hola";
        return r;
      };
      const expected = true;
      const received = util.isValueType(data, ["null", customFn]);
      expect(received).toBe(expected);
    });
  });
  describe("method: isEquivalentTo", async () => {
    it("case: exception is not tuple to compare", async () => {
      const expectedThrow = /is not tuple of compare values valid/;
      const recivedThrowFn = () =>
        util.isEquivalentTo("No es tupla" as any, {});
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: empty compare data", async () => {
      const expected = true;
      const received = util.isEquivalentTo([] as any, {});
      expect(received).toBe(expected);
    });
    it("case: one data compare data", async () => {
      const data1 = 1;
      const expected = false;
      const received = util.isEquivalentTo([data1] as any, {});
      expect(received).toBe(expected);
    });
    it("case: undefined key or keys path data", async () => {
      const expected = true;
      const received = util.isEquivalentTo([] as any, {
        keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
      });
      expect(received).toBe(expected);
    });
    it("case: null === undefined are not equivalent)", async () => {
      const data1 = null;
      const data2 = undefined;
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: boolean number are not equivalent", async () => {
      const data1 = 0;
      const data2 = false;
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: function === null are not equivalent", async () => {
      const data1 = () => 5;
      const data2 = null;
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: functions are not equivalent", async () => {
      const data1 = () => 5;
      const data2 = (p: any) => p;
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: functions are equivalent", async () => {
      const data1 = (p: any) => p;
      const data2 = (p: any) => p;
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: numbers are not equivalent", async () => {
      const data1 = 0;
      const data2 = 33;
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: string  === number are not equivalent", async () => {
      const data1 = "33"; //string
      const data2 = 33; //number
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: string as number are equivalent", async () => {
      const data1 = "33"; //string
      const data2 = 33; //number
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        isCompareStringToNumber: true, //❗permite comparacion de texto numerico con numero❗
      });
      expect(received).toBe(expected);
    });
    it("case: strings are equivalent", async () => {
      const data1 = "hola";
      const data2 = "hola";
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: strings are not equivalent (is case sensitive)", async () => {
      const data1 = "Hola";
      const data2 = "hola";
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {
        isCaseSensitiveForString: true,
      });
      expect(received).toBe(expected);
    });
    it("case: strings are equivalent (is not case sensitive)", async () => {
      const data1 = "Hola";
      const data2 = "hola";
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: object are strict equivalent", async () => {
      const data1 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047],
        },
        p3: ["A", "B"],
      };
      const data2 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047],
        },
        p3: ["A", "B"],
      };
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: object are not strict equivalent", async () => {
      const data1 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047, 2], //❗2❗
        },
        p3: ["A", "B"],
      };
      const data2 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047], //❗2 no está❗
        },
        p3: ["A", "B"],
      };
      const expected = true; //2 no esta en el array pero no se esta permitiendo analisis de tamaño del array
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: object are not strict equivalent", async () => {
      const data1 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047, 2], //❗2❗
        },
        p3: ["A", "B"],
      };
      const data2 = {
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047], //❗2 no está❗
        },
        p3: ["A", "B"],
      };
      const expected = false; //2 no esta en el array i es necesario comparar tamaños
      const received = util.isEquivalentTo([data1, data2], {
        isCompareLength: true,
      });
      expect(received).toBe(expected);
    });
    it("case: object are equivalent (by keyPath)", async () => {
      const data1 = {
        _id: "1d3nt1f13r", //identificador del objeto
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047],
        },
        p3: ["A", "B"],
      };
      const data2 = {
        _id: "1d3nt1f13r", //identificador del objeto
        p1: "adios",
        p2: {
          p21: -31,
          p22: "otro adios",
          p23: [-1023, -2047],
        },
        p3: ["a", "b"],
      };
      //❗apesar que sus propiedades tienen valor
      //diferente su propiedad "_id" existe en ambos
      //y tiene el mismo valor❗
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: "_id",
      });
      expect(received).toBe(expected);
    });
    it("case: object are not equivalent (by keyPath)", async () => {
      const data1 = {
        _id: "1d3nt1f13r", //identificador del objeto
        p1: "hola",
        p2: {
          p21: 31,
          p22: "otro hola",
          p23: [1023, 2047],
        },
        p3: ["A", "B"],
      };
      const data2 = {
        _id: "1d3nt1f13r-XXXXX", //identificador del objeto (diferente)
        p1: "adios",
        p2: {
          p21: -31,
          p22: "otro adios",
          p23: [-1023, -2047],
        },
        p3: ["a", "b"],
      };
      //❗apesar que sus propiedades tienen valor
      //diferente su propiedad "_id" existe en ambos
      //y tiene el mismo valor❗
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: "_id",
      }); //se va acomparar por "_id"
      expect(received).toBe(expected);
    });
    it("case: objects (some object or both) contains props undefined and no exists)", async () => {
      const data1 = {
        p1: "hola",
        p2: undefined,
        //❗no tiene p3 se asume que es undefined❗
      };
      const data2 = {
        p1: "hola",
        //❗no tiene p2 se asume que es undefined❗
        p3: undefined,
      };
      const expected = true; //porque aunque las propiedades no existen estas
      //se asumen como `undefined` al momento de compararlas
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: object are equivalent (by keysPath and deep)", async () => {
      const data1 = {
        _id: "1d3nt1f13r", //identificador del objeto
        p1: "hola",
        p2: {
          p21: 255,
          p22: "otro hola",
          p23: [1023, 2047],
          p24: {
            p241: 511,
          },
        },
        p3: ["A", "B"],
      };
      const data2 = {
        _id: "1d3nt1f13r", //identificador del objeto
        p1: "adios",
        p2: {
          p21: 256,
          p22: "otro adios",
          p23: [-1023, -2047],
          p24: {
            p241: 511,
          },
        },
        p3: ["a", "b"],
      };
      //❗apesar que sus propiedades tienen valor
      //diferente su propiedad "_id" existe en ambos
      //y tiene el mismo valor❗
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: ["_id", "p2.p24.p241"],
      }); //se va acomparar por "_id" y su valor
      expect(received).toBe(expected);
    });
    it("case: array are equivalent)", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: array are equivalent (is not sensitive (deep))", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola", //"l"
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A",
        31,
        {
          p1: "hoLa", //"L"
          p2: [1, 2],
        },
      ];
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: array are not equivalent (1)", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
        undefined, //❗undefined como item❗
      ];
      const data2 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
        //❗en array el undefined si se asume como un item❗
      ];
      const expected = true; //porque el elemento de valor `undefined` no existe pero no se exige tamaño del array
      const received = util.isEquivalentTo([data1, data2], {});
      expect(received).toBe(expected);
    });
    it("case: array are not equivalent (1)", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
        undefined, //❗undefined como item❗
      ];
      const data2 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
        //❗en array el undefined si se asume como un item❗
      ];
      const expected = false; //porque el elemento de valor `undefined`y se exige analizar tamaño del array
      const received = util.isEquivalentTo([data1, data2], {
        isCompareLength: true,
      });
      expect(received).toBe(expected);
    });
    it("case: array are equivalent (1 strict order))", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const data2 = [
        {
          p1: "hola",
          p2: [1, 2],
        },
        "A",
        31,
      ];
      const expected = false; //los arrays estan desordenados
      const received = util.isEquivalentTo([data1, data2], {
        isStrictArrayOrder: true, //negar desordenados
      });
      expect(received).toBe(expected);
    });
    it("case: array are equivalent (2 not strict order))", async () => {
      const data1 = [
        "A",
        31,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const data2 = [
        {
          p1: "hola",
          p2: [1, 2],
        },
        "A",
        31,
      ];
      const expected = true; //los arrays estan desordenados
      const received = util.isEquivalentTo([data1, data2], {
        isStrictArrayOrder: false, //aceptar desordenados
      });
      expect(received).toBe(expected);
    });
    it("case: array are equivalent (deep)", async () => {
      const data1 = [
        "A", //❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            1, //❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 2, //no importa si es equivalente
            },
          ],
        },
      ];
      const data2 = [
        "A", //❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            1, //❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 3, //no importa si es equivalente
            },
          ],
        },
      ];
      const expected = true;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: ["p2.p21"], //❗se toma como referencia el *primer* objeto
        //encontrado en el *primer* nivel del array
        //profundicaciones de array mayores no se han probado
        //ejemplo: [[{id:1}]] //el objeto esta 2 niveles del array raiz, no se ha probado
      });
      expect(received).toBe(expected);
    });
    it("case: array are not equivalent (deep 1)", async () => {
      const data1 = [
        "A", //❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            1, //❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 2, //no importa si es equivalente
            },
          ],
        },
      ];
      const data2 = [
        "B", //❌ ❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            1, //❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 3, //no importa si es equivalente
            },
          ],
        },
      ];
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: ["p2.p21"], //será ignorado porque uno de los elementos del array raiz no es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: array are not equivalent (deep 1)", async () => {
      const data1 = [
        "A", //❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            1, //❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 2, //no importa si es equivalente
            },
          ],
        },
      ];
      const data2 = [
        "A", //❗siempre comparará los item del array (no importa profundidad)❗
        31, //❗siempre comparará los item del array (no importa profundidad)❗
        {
          p1: "hola",
          p2: [
            2, //❌  ❗siempre comparará los item del array (no importa profundidad)❗
            {
              p21: 15, //✅ propiedad profunda a comparar
              p22: 3, //no importa si es equivalente
            },
          ],
        },
      ];
      const expected = false;
      const received = util.isEquivalentTo([data1, data2], {
        keyOrKeysPath: ["p2.p21"], //será ignorado porque uno de los elementos que acompañan al objeto en este nivel so es equivalente
      });
      expect(received).toBe(expected);
    });
  });
  describe("method: isGreaterTo", async () => {
    it("case: exception is not tuple to compare", async () => {
      const expectedThrow = /is not tuple of compare values valid/;
      const recivedThrowFn = () =>
        util.isGreaterTo("No es tupla" as any, {} as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: empty compare data", async () => {
      const expected = false;
      const received = util.isGreaterTo([] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: empty compare data (is allow equivalent)", async () => {
      const expected = true;
      const received = util.isGreaterTo([] as any, {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data", async () => {
      const data1 = 1;
      const expected = true;
      const received = util.isGreaterTo([data1] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data ( data undefined, is deny equvalent)", async () => {
      const data1 = undefined;
      const expected = false;
      const received = util.isGreaterTo([data1] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data ( data undefined, is allow equvalent)", async () => {
      const data1 = undefined;
      const expected = true;
      const received = util.isGreaterTo([data1] as any, {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: undefined key or keys path data", async () => {
      const expected = true;
      const received = util.isGreaterTo([1, 0] as any, {
        isAllowEquivalent: false,
        keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
      });
      expect(received).toBe(expected);
    });
    it("case: undefined === undefined (is deny equivalent))", async () => {
      const data1 = undefined;
      const data2 = undefined;
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: null > undefined)", async () => {
      const data1 = null;
      const data2 = undefined;
      const expected = true; //null pesa mas que undefined
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: booleans)", async () => {
      const data1 = true;
      const data2 = false;
      const expected = true; //true pesa mas que false
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: booleans (is deny equivalent))", async () => {
      const data1 = true;
      const data2 = true;
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: number > boolean)", async () => {
      const data1 = 0;
      const data2 = false;
      const expected = true; //number (0) pesa mas que false
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: numbers)", async () => {
      const data1 = 4;
      const data2 = 3;
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: numbers (is deny equivalent))", async () => {
      const data1 = 4;
      const data2 = 4;
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: string-number (is allow equivalent, is deny stringToNumber)", async () => {
      const data1 = 4;
      const data2 = "4";
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, // permitir equivalencia
        isCompareStringToNumber: false, //denegar conversion de texto numerico
      });
      expect(received).toBe(expected);
    });
    it("case: string-number (is allow equivalent, is allow stringToNumber)", async () => {
      const data1 = 4;
      const data2 = "4";
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, // permitir equivalencia
        isCompareStringToNumber: true, //permitir conversion de texto numerico
      });
      expect(received).toBe(expected);
    });
    it("case: string > number (is deny stringToNumber))", async () => {
      const data1 = "1";
      const data2 = 2;
      const expected = true; //"1" en string pesa mas que 2 en numero
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        isCompareStringToNumber: false, //❗denegar conversion de texto numerico❗
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is not case sensitive, is deny equivalent)", async () => {
      const data1 = "Hola";
      const data2 = "hola";
      const expected = false; //aunque "H" pesa mas que "h", al ser no sensitivo
      //esta comparando equivalencia y la equivalencia esta denegada
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is not case sensitive, is allow equivalent)", async () => {
      const data1 = "hola";
      const data2 = "Hola";
      const expected = true; //aunque "h" pesa menos que "H", al ser no sensitivo
      //esta comparando equivalencia y la equivalencia esta permitida
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true,
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is case sensitive, is allow equivalent)", async () => {
      const data1 = "hola";
      const data2 = "Hola";
      const expected = false; //"h" pesa menos que "H" y es sensitivo
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true,
        isCaseSensitiveForString: true,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (strings-number, is allow equivalent)", async () => {
      const data1 = "1";
      const data2 = "-10"; //el "-" pesa menos que "1"
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it('case: strings ("a" > "1")', async () => {
      const data1 = "a";
      const data2 = "1";
      const expected = true; //segun localCompare "a" pesa mas que "1"
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (similar words)", async () => {
      const data1 = "Edificio";
      const data2 = "Edificacion";
      const expected = true; //segun localCompare "Edifici" pesa mas que "Edifica" ("i" es mas pesado que "a")
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: object > string", async () => {
      const data1 = {};
      const data2 = "1";
      const expected = true; //asi objeto litearal sea vacio pesa mas que el string
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (is deny equivalent)", async () => {
      const data1 = {};
      const data2 = {};
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (without keysPath)", async () => {
      const data1 = { p: "2" };
      const data2 = { p: "1" };
      const expected = true; //comparara propiedad por propiedad (internamente
      //las ordenará y las comparará en orden alfabetico)
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (without keysPath)", async () => {
      const data1 = { p: "-2" }; //el "-" hace que pese mas
      const data2 = { p: "1" };
      const expected = false; //comparara propiedad por propiedad (internamente
      //las ordenará y las comparará en orden alfabetico)
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with keysPath)", async () => {
      const data1 = { p: "-2", q: 3 }; //se compara como strings
      const data2 = { p: "1", q: 2 }; //se compara como strings
      const expected = false; // se comparará por la propiedad `p` asi que el "-" pesa menos que "1"
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath)", async () => {
      const data1 = { age: 20, money: 500 };
      const data2 = { age: 19, money: 600 };
      const expected = true; // `age` es mayor en data1
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with one keysPath, is not allow Equivalent)", async () => {
      const data1 = { age: 20, money: 500 };
      const data2 = { age: 20, money: 600 };
      const expected = false; // `age` es igual y esta denegado la equivalencia
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath, is not allow Equivalent)", async () => {
      const data1 = { age: 20, money: 500 };
      const data2 = { age: 20, money: 600 };
      const expected = false; // `age` es igual, entonces sigue con money que no cumple el ser mayor
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age", "money"], //❗Importantisimo❗ el orden, se compara `age` primero y solo si es equivalente se evaluara `money`
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (1), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 2 } };
      const data2 = { live: 1, caracter: { name: "Ada", armor: 3 } };
      const expected = true; //al ser `live` equivalentes, la siguiente comparacion es "Leon" pesa mas que "Ada"
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name"], //❗Importantisimo❗ solo se comparará `"caracter.name"` si `"live"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (2), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 2 } };
      const data2 = { live: 1, caracter: { name: "Ada", armor: 3 } };
      const expected = true; //`name` no es equivalnete por lo tanto `armor` no se tiene en cuenta
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` son equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (3), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const expected = false; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente pero es denegado
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (3), is allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it('case: objects (with one keysPath and deep (3), object mode "only-keys", is allow Equivalent)', async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const data2 = {
        live: 1,
        power: 65535,
        caracter: { multiPower: 65535, name: "Leon", armor: 3 },
      };
      const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        //no importa que `data2` tenga mas propiedades (incluso si tienen valores grandes), no son tomadas en cuenta
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: array > object)", async () => {
      const data1 = { "0": 1, "1": 2 }; //objeto pesa menos
      const data2 = [1, 2]; // arrya pesa mas
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (any type items 1))", async () => {
      const data1 = [{ p1: "A" }, { p1: 31 }]; //elemento tipo objeto pesan mas
      const data2 = ["A", 31]; //elementos primitivos pesan menos
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (any type items 2)", async () => {
      const data1 = [{ p1: "A" }, { p1: 31 }]; //elementos tipo objeto pesan menos
      const data2 = [["A"], [31]]; //elementos tipo array pesan mas
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (1)))", async () => {
      const data1 = [
        "B", //✅ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const data2 = [
        "A", //✅ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (2)))", async () => {
      const data1 = [
        "B", //✅ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const data2 = [
        "A", //✅ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (3)))", async () => {
      const data1 = [
        "A", //❌ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const data2 = [
        "B", //❌ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (4)))", async () => {
      const data1 = [
        "A", //❗ es igual pasa a comparar al siguiente elemento❗
        31, //✅ es mayor
        true, //es mayor
      ];
      const data2 = [
        "A", //❗ es igual pasa a comparar al siguiente elemento❗
        0, //✅ es menor
        false, //es menor
      ];
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (posible deep))", async () => {
      const data1 = [
        "B", //✅ es mayor, los demas no importan
        0,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A", //✅ es menor, los demas no importan
        1,
        {
          p1: "HOLA",
          p2: [1, 2],
        },
      ];
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (deep))", async () => {
      const data1 = [
        "A",
        0,
        {
          p1: "hola", //❌ pesa menos, los demas no importan
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A",
        0,
        {
          p1: "HOLA", //❌ pesa mas, los demas no importan
          p2: [1, 2],
        },
      ];
      const expected = false;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (deep))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //equivalente
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola",
          p2: [1, 2],
        }, //equivalente
      ];
      const expected = true; //`{p1: "hola", p2:[1,2]}` es el ultimo elemento y se le permite ser equivalente
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keyPath and deep (1)))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive
          p2: [1, 2], //es menos, pero no es tomado en cuenta
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive
          p2: [10, 20], //es mayor, pero no es tomado en cuenta
        },
      ];
      const expected = true;
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p1"],
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keyPath and deep (2)))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive
          p2: [1, 2], //es menos, pero no es tomado en cuenta
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive
          p2: [10, 20], //es mayor, pero no es tomado en cuenta
        },
      ];
      const expected = true; //segun el orden
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p1", "p2"], //❗el orden importa❗,
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keysPath and deep))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive, pero no es tomado en cuenta
          p2: [1, 2], //es menos
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive, pero no es tomado en cuenta
          p2: [10, 20], //es mayor
        },
      ];
      const expected = false; //segun el orden
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p2", "p1"], //❗el orden importa❗,
      });
      expect(received).toBe(expected);
    });
    it("case: function > null)", async () => {
      const data1 = () => {};
      const data2 = null;
      const expected = true; //function pesa mas que null
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: functions)", async () => {
      const data1 = (p: any) => {
        return p;
      };
      const data2 = () => {
        return 5;
      };
      const expected = true; //RECORDAR:
      //❗compara funciones de acuerdo al tamaño que ocupa su string al pasarla
      //por stringify(), el string resultado de stringify() elimina caracteres
      //inecesarios (saltos de linea, tabs, espacios, etc)❗
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: boolean > function)", async () => {
      const data1 = false;
      const data2 = () => {};
      const expected = false; //false pesa menos que function
      const received = util.isGreaterTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
  });
  describe("method: isLesserTo", async () => {
    it("case: exception is not tuple to compare", async () => {
      const expectedThrow = /is not tuple of compare values valid/;
      const recivedThrowFn = () =>
        util.isGreaterTo("No es tupla" as any, {} as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: empty compare data", async () => {
      const expected = false;
      const received = util.isLesserTo([] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: empty compare data (is allow equivalent)", async () => {
      const expected = true;
      const received = util.isLesserTo([] as any, {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data", async () => {
      const data1 = 1;
      const expected = false;
      const received = util.isLesserTo([data1] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data ( data undefined, is deny equvalent)", async () => {
      const data1 = undefined;
      const expected = false;
      const received = util.isLesserTo([data1] as any, {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: one data compare data ( data undefined, is allow equvalent)", async () => {
      const data1 = undefined;
      const expected = true;
      const received = util.isLesserTo([data1] as any, {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: undefined key or keys path data", async () => {
      const expected = true;
      const received = util.isLesserTo([0, 1] as any, {
        isAllowEquivalent: false,
        keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
      });
      expect(received).toBe(expected);
    });
    it("case: undefined === undefined (is deny equivalent))", async () => {
      const data1 = undefined;
      const data2 = undefined;
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: undefined < null)", async () => {
      const data1 = undefined;
      const data2 = null;
      const expected = true; //undefined pesa menos que undefined
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: booleans)", async () => {
      const data1 = false;
      const data2 = true;
      const expected = true; //false pesa menos que true
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: booleans (is deny equivalent))", async () => {
      const data1 = false;
      const data2 = false;
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: boolean < number)", async () => {
      const data1 = false;
      const data2 = 0;
      const expected = true; //false pesa menos que number (incluso el 0)
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: numbers)", async () => {
      const data1 = 3;
      const data2 = 4;
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it("case: numbers (is deny equivalent))", async () => {
      const data1 = 4;
      const data2 = 4;
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, // denegado equivalencia
      });
      expect(received).toBe(expected);
    });
    it("case: string-number (is allow equivalent, is deny stringToNumber)", async () => {
      const data1 = "4"; //❌ pesa mas por ser string
      const data2 = 4;
      const expected = false; //string pesa mas que number
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, // permitir equivalencia
        isCompareStringToNumber: false, //denegar conversion de texto numerico
      });
      expect(received).toBe(expected);
    });
    it("case: string-number (is allow equivalent, is allow stringToNumber)", async () => {
      const data1 = "4";
      const data2 = 4;
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, // permitir equivalencia
        isCompareStringToNumber: true, //permitir conversion de texto numerico
      });
      expect(received).toBe(expected);
    });
    it("case: number < string (is deny stringToNumber))", async () => {
      const data1 = "1";
      const data2 = 2;
      const expected = false; //"1" en string pesa mas que 2 en numero
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        isCompareStringToNumber: false, //❗denegar conversion de texto numerico❗
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is not case sensitive, is deny equivalent)", async () => {
      const data1 = "hola";
      const data2 = "Hola";
      const expected = false; //aunque "h" pesa menos que "H", al ser no sensitivo
      //esta comparando equivalencia y la equivalencia esta denegada
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is not case sensitive, is allow equivalent)", async () => {
      const data1 = "Hola";
      const data2 = "hola";
      const expected = true; //aunque "H" pesa mas que "h", al ser no sensitivo
      //esta comparando equivalencia y la equivalencia esta permitida
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true,
        isCaseSensitiveForString: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (is case sensitive, is allow equivalent)", async () => {
      const data1 = "Hola";
      const data2 = "hola";
      const expected = false; //"H" pesa mas que "h" y es sensitivo
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true,
        isCaseSensitiveForString: true,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (strings-number, is allow equivalent)", async () => {
      const data1 = "-10";
      const data2 = "1";
      const expected = true; //el caracter "-" pesa menos que "1"
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true,
      });
      expect(received).toBe(expected);
    });
    it('case: strings ("1" < "a")', async () => {
      const data1 = "1";
      const data2 = "a";
      const expected = true; //segun localCompare "1" pesa menos que "a"
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: strings (similar words)", async () => {
      const data1 = "Edificio";
      const data2 = "Edificacion";
      const expected = false; //segun localCompare "Edifici" pesa mas que "Edifica" ("i" es mas pesado que "a")
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: string < object", async () => {
      const data1 = "1";
      const data2 = {};
      const expected = true; //asi objeto litearal sea vacio pesa mas que el string
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (is deny equivalent)", async () => {
      const data1 = {};
      const data2 = {};
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (without keysPath (1))", async () => {
      const data1 = { p: "1" };
      const data2 = { p: "2" };
      const expected = true; //comparará cada propiedad hasta que encuentre una no sea equivalente
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (without keysPath (2))", async () => {
      const data1 = { p: "1" };
      const data2 = { p: "-2" }; //el "-" hace que pese menos
      const expected = false; //comparará cada propiedad hasta que encuentre una no sea equivalente
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath)", async () => {
      const data1 = { p: "1", q: 2 }; //se compara como strings
      const data2 = { p: "-2", q: 1 }; //se compara como strings
      const expected = false; // se comparará por la propiedad `p` asi que el "-" pesa menos que "1"
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath)", async () => {
      const data1 = { age: 19, money: 600 };
      const data2 = { age: 20, money: 500 };
      const expected = true; // `age` es menor en data1
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with one keysPath, is not allow Equivalent)", async () => {
      const data1 = { age: 20, money: 500 };
      const data2 = { age: 20, money: 600 };
      const expected = false; // `age` es equivalente y esta denegado la equivalencia
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age"],
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath, is not allow Equivalent)", async () => {
      const data1 = { age: 20, money: 600 };
      const data2 = { age: 20, money: 500 };
      const expected = false; // `age` es igual, entonces sigue con money que no cumple el ser menor
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["age", "money"], //❗Importantisimo❗ el orden, se compara `age` primero y solo si es equivalente se evaluara `money`
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (1), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Ada", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 2 } };
      const expected = true; //al ser `live` equivalentes, la siguiente comparacion es "Ada" pesa menos que "Leon"
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name"], //❗Importantisimo❗ solo se comparará `"caracter.name"` si `"live"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (2), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Ada", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 2 } };
      const expected = true; //`name` no es equivalnete por lo tanto `armor` no se tiene en cuenta
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` son equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (3), is not allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const expected = false; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente pero es denegado
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: objects (with many keysPath and deep (3), is allow Equivalent)", async () => {
      const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it('case: objects (with one keysPath and deep (3), object mode "only-keys", is allow Equivalent)', async () => {
      const data1 = {
        live: 1,
        power: 65535,
        caracter: { multiPower: 65535, name: "Leon", armor: 3 },
      };
      const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
      const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
        //no importa que `data1` tenga mas propiedades (incluso si tienen valores grandes o pequeños), no son tomadas en cuenta
        keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
      });
      expect(received).toBe(expected);
    });
    it("case: object < array)", async () => {
      const data1 = [1, 2]; // array pesa mas
      const data2 = { "0": 1, "1": 2 }; //objeto pesa menos
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (any type items 1))", async () => {
      const data1 = ["A", 31]; //elementos primitivos pesan menos
      const data2 = [{ p1: "A" }, { p1: 31 }]; //elemento tipo objeto pesan mas
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (any type items 2)", async () => {
      const data1 = [["A"], [31]]; //elementos tipo array pesan mas
      const data2 = [{ p1: "A" }, { p1: 31 }]; //elementos tipo objeto pesan menos
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (1)))", async () => {
      const data1 = [
        "A", //✅ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const data2 = [
        "B", //✅ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (2)))", async () => {
      const data1 = [
        "A", //✅ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const data2 = [
        "B", //✅ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (3)))", async () => {
      const data1 = [
        "B", //❌ es mayor los demas elementos no importan
        0, //es menor
        false, //es menor
      ];
      const data2 = [
        "A", //❌ es menor los demas elementos no importan
        31, //es mayor
        true, //es mayor
      ];
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (of many type values (4)))", async () => {
      const data1 = [
        "A", //❗ es igual pasa a comparar al siguiente elemento❗
        0, //✅ es menor
        false, //es menor
      ];
      const data2 = [
        "A", //❗ es igual pasa a comparar al siguiente elemento❗
        31, //✅ es mayor
        true, //es mayor
      ];
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (posible deep))", async () => {
      const data1 = [
        "A", //✅ es menor, los demas no importan
        1,
        {
          p1: "HOLA",
          p2: [1, 2],
        },
      ];
      const data2 = [
        "B", //✅ es mayor, los demas no importan
        0,
        {
          p1: "hola",
          p2: [1, 2],
        },
      ];
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (deep))", async () => {
      const data1 = [
        "A",
        0,
        {
          p1: "HOLA", //❌ pesa menos, los demas no importan
          p2: [1, 2],
        },
      ];
      const data2 = [
        "A",
        0,
        {
          p1: "hola", //❌ pesa mas, los demas no importan
          p2: [1, 2],
        },
      ];
      const expected = false;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (deep))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola",
          p2: [1, 2],
        }, //equivalente
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola",
          p2: [1, 2],
        }, //equivalente
      ];
      const expected = true; //`{p1: "hola", p2:[1,2]}` es el ultimo elemento y se le permite ser equivalente
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keyPath and deep (1)))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive
          p2: [10, 20], //es mayor, pero no es tomado en cuenta
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive
          p2: [1, 2], //es menos, pero no es tomado en cuenta
        },
      ];
      const expected = true;
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p1"],
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keyPath and deep (2)))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive
          p2: [10, 20], //es mayor, pero no es tomado en cuenta
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive
          p2: [1, 2], //es menos, pero no es tomado en cuenta
        },
      ];
      const expected = true; //segun el orden
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p1", "p2"], //❗el orden importa❗,
      });
      expect(received).toBe(expected);
    });
    it("case: array (with keysPath and deep))", async () => {
      const data1 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "hola", //"h" pesa menos, es case sensitive, pero no es tomado en cuenta
          p2: [10, 20], //es mayor
        },
      ];
      const data2 = [
        "A", //equivalente
        0, //equivalente
        {
          p1: "Hola", //"H" pesa mas, es case sensitive, pero no es tomado en cuenta
          p2: [1, 2], //es menos
        },
      ];
      const expected = false; //segun el orden
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
        keyOrKeysPath: ["p2", "p1"], //❗el orden importa❗,
      });
      expect(received).toBe(expected);
    });
    it("case: null < function)", async () => {
      const data1 = null;
      const data2 = () => {};
      const expected = true; //null pesa manos que function
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: functions)", async () => {
      const data1 = () => {
        return 5;
      };
      const data2 = (p: any) => {
        return p;
      };
      const expected = true; //RECORDAR:
      //❗compara funciones de acuerdo al tamaño que ocupa su string al pasarla
      //por stringify(), el string resultado de stringify() elimina caracteres
      //inecesarios (saltos de linea, tabs, espacios, etc)❗
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
    it("case: function > array )", async () => {
      const data1 = () => {};
      const data2 = [1, 2, 3];
      const expected = false; //function pesa mas que array
      const received = util.isLesserTo([data1, data2], {
        isAllowEquivalent: false,
      });
      expect(received).toBe(expected);
    });
  });
});
