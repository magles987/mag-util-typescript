import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Object]", async () => {
  describe("method: isObject", async () => {
    it("case: is object", async () => {
      const data = { p1: "loquesea" };
      const expected = true;
      const received = util.isObject(data);
      expect(received).toBe(expected);
    });
    it("case: is not object", async () => {
      const data = 10;
      const expected = false;
      const received = util.isObject(data);
      expect(received).toBe(expected);
    });
    it("case: is object empty (allowed)", async () => {
      const data = {};
      const expected = true;
      const received = util.isObject(data, true);
      expect(received).toBe(expected);
    });
    it("case: is object empty (not allowed)", async () => {
      const data = {};
      const expected = false;
      const received = util.isObject(data, false);
      expect(received).toBe(expected);
    });
    it("case: null and arrays are not plain objects", async () => {
      const data = [null, []];
      const expected = [false, false];
      const received = [
        util.isObject(data[0], true),
        util.isObject(data[1], true),
      ];
      expect(received[0]).toBe(expected[0]);
      expect(received[1]).toBe(expected[1]);
    });
    it("case: non-enumerable own properties make an object non-empty", async () => {
      const data = Object.defineProperty({}, "hidden", { value: 1 });
      const expected = true;
      const received = util.isObject(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: getPropertyPathsOfObject", async () => {
    it("case: throw error for invalid object", async () => {
      const invalidObj = "notAnObject";
      const expectedThrow = /is not object valid/;
      const receivedThrowFn = () =>
        util.getPropertyPathsOfObject(invalidObj as any);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: valid object with default options", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, 3],
        },
        f: "mundo",
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = [
        "a",
        "a.b",
        "a.b.c",
        "a.b.d",
        "a.e",
        "a.e.0",
        "a.e.1",
        "a.e.2",
        "f",
        "_privateProp",
        "g",
      ];
      const received = util.getPropertyPathsOfObject(obj);
      expect(received).toEqual(expected);
    });
    it("case: object without function and private properties", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, 3],
        },
        f: "mundo",
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = [
        "a",
        "a.b",
        "a.b.c",
        "a.b.d",
        "a.e",
        "a.e.0",
        "a.e.1",
        "a.e.2",
        "f",
      ];
      const received = util.getPropertyPathsOfObject(obj, {
        includeFunctionProps: false,
        includePrivateProps: false,
      });
      expect(received).toEqual(expected);
    });
    it("case: object with custom char separator", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, 3],
        },
        f: "mundo",
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = [
        "a",
        "a/b",
        "a/b/c",
        "a/b/d",
        "a/e",
        "a/e/0",
        "a/e/1",
        "a/e/2",
        "f",
        "_privateProp",
        "g",
      ];
      const received = util.getPropertyPathsOfObject(obj, {
        charSeparator: "/",
      });
      expect(received).toEqual(expected);
    });
    it("case: object with nested objects in array", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [{ x: 1 }, { y: 2 }, { z: 3 }],
        },
        f: "mundo",
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = [
        "a",
        "a.b",
        "a.b.c",
        "a.b.d",
        "a.e",
        "a.e.0",
        "a.e.0.x",
        "a.e.1",
        "a.e.1.y",
        "a.e.2",
        "a.e.2.z",
        "f",
        "_privateProp",
        "g",
      ];
      const received = util.getPropertyPathsOfObject(obj);
      expect(received).toEqual(expected);
    });
    it("case: excludes nested private paths", async () => {
      const obj = {
        _private: { secret: 1 },
        _privateArray: [{ secret: 2 }],
        visible: { value: 3 },
      };
      const expected = ["visible", "visible.value"];
      const received = util.getPropertyPathsOfObject(obj, {
        includePrivateProps: false,
      });
      expect(received).toEqual(expected);
    });
    it("case: excludes function values inside arrays", async () => {
      const obj = { items: [() => 1, "value"] };
      const received = util.getPropertyPathsOfObject(obj, {
        includeFunctionProps: false,
      });
      const expected = ["items", "items.1"];
      expect(received).toEqual(expected);
    });
    it("case: includes function values inside arrays", async () => {
      const obj = { items: [() => 1, "value"] };
      const received = util.getPropertyPathsOfObject(obj, {
        includeFunctionProps: true,
      });
      const expected = ["items", "items.0", "items.1"];
      expect(received).toEqual(expected);
    });
    it("case: includes paths inside nested arrays", async () => {
      const obj = { items: [[{ value: 1 }]] };
      const received = util.getPropertyPathsOfObject(obj);
      const expected = ["items", "items.0", "items.0.0", "items.0.0.value"];
      expect(received).toEqual(expected);
    });
    it("case: emits each parent before its descendants", async () => {
      const obj = {
        itemZ: { itemZZ: "valorZZ" },
        itemW: { itemWW: "valorWW" },
      };
      const expected = ["itemZ", "itemZ.itemZZ", "itemW", "itemW.itemWW"];
      const received = util.getPropertyPathsOfObject(obj);
      expect(received).toEqual(expected);
    });
    it("case: ignores symbols and non-enumerable properties", async () => {
      const symbolKey = Symbol("hidden");
      const obj = { visible: 1, [symbolKey]: 2 };
      Object.defineProperty(obj, "nonEnumerable", { value: 3 });
      expect(util.getPropertyPathsOfObject(obj)).toEqual(["visible"]);
    });
  });
  describe("method: isObjectWithProperties", async () => {
    it("case: is not object", async () => {
      const data = 10;
      const expected = false;
      const received = util.isObjectWithProperties(data as any, "p1");
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path)", async () => {
      const data = { p1: "hola", p2: 31 };
      const expected = true;
      const received = util.isObjectWithProperties(data, []); //se comporta como un `this.isObject(data, false)` normal
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path, is allow empty)", async () => {
      const data = {};
      const expected = true;
      const received = util.isObjectWithProperties(data, [], {
        allowEmpty: true, //se comporta como un `this.isObject(data, true)` normal
      });
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path, is deny empty)", async () => {
      const data = {};
      const expected = false;
      const received = util.isObjectWithProperties(data, [], {
        allowEmpty: false, //se comporta como un `this.isObject(data, false)` normal
      });
      expect(received).toBe(expected);
    });
    it("case: is object (is key path valid)", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = "p1";
      const expected = true;
      const received = util.isObjectWithProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object (is not key path valid)", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = "p3" as any;
      const expected = false;
      const received = util.isObjectWithProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: rejects non-string keys in key arrays", async () => {
      const data = { p1: "value" };
      const props = ["p1", 1] as any; //props[1] es un number, solo se permite array de strings
      const expectedThrow = /is not key or keys valid/;
      const receivedThrowFn = () => util.isObjectWithProperties(data, props);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: is object (is some key path valid then wrong)", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = ["p1", "p3" as any]; //"p3" no existe
      const expected = false; //deben existir todas las que se envíen en el parámetro `keyOrkeysPath`
      const received = util.isObjectWithProperties(data, props);
      expect(received).toBe(expected);
    });
    it('case: is object (is property as undefined, prop condition ("it-exist"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
      const props = ["p3"] as any;
      const expected = true; //se verifica que exista (asi tenga asignado undefined)
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "it-exist", //si la propiedad existe se valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (undefined value, prop condition "is-not-undefined")', async () => {
      const data = { p1: undefined };
      const props = "p1";
      const expected = false;
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "is-not-undefined",
      });
      expect(received).toBe(expected);
    });
    it('case: is object (undefined value, prop condition "is-not-null")', async () => {
      const data = { p1: undefined };
      const props = "p1";
      const expected = true;
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "is-not-null",
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as undefined, prop condition ("is-not-undefined-and-not-null"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
      const props = ["p3"] as any;
      const expected = false; //al ser undefined o null no es valida
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as null, prop condition ("it-exist"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: null, p4: undefined };
      const props = ["p3", "p4"] as any;
      const expected = true; //se verifica que exista (asi tenga asignado null)
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "it-exist", //si la propiedad existe se valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as null, prop condition ("is-not-undefined-and-not-null"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: null };
      const props = ["p3"] as any;
      const expected = false; //al ser undefined o null no es valida
      const received = util.isObjectWithProperties(data, props, {
        propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
      });
      expect(received).toBe(expected);
    });
  });
  describe("method: isObjectWithDeepProperties", async () => {
    it("case: is not object", async () => {
      const data = 10;
      const props = "p1";
      const expected = false;
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path)", async () => {
      const data = { p1: "hola", p2: 31 };
      const props = [] as any;
      const expected = true; //se comporta como un `this.isObject(data, false)` normal
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path, is allow empty)", async () => {
      const data = {};
      const props = [] as any;
      const expected = true; //se comporta como un `this.isObject(data, true)` normal
      const received = util.isObjectWithDeepProperties(data, props, {
        allowEmpty: true,
      });
      expect(received).toBe(expected);
    });
    it("case: is object (is not key or keys path, is deny empty)", async () => {
      const data = {};
      const props = [] as any;
      const expected = false; //se comporta como un `this.isObject(data, false)` normal
      const received = util.isObjectWithDeepProperties(data, props, {
        allowEmpty: false,
      });
      expect(received).toBe(expected);
    });
    it("case: is object (is key path valid, )", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = "p1";
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object (is not key path valid, )", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = "p3";
      const expected = false;
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object (is some key path valid, )", async () => {
      const data = { p1: "loquesea", p2: "otroDato" };
      const props = ["p1", "p3"];
      const expected = false; //deben existir todas las que se envíen en el parametro `keyOrkeysPath`
      const received = util.isObjectWithDeepProperties(
        data,
        props, //"p3" no existe
      );
      expect(received).toBe(expected);
    });
    it('case: is object (is property as undefined, prop condition ("it-exist"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
      const props = ["p3"];
      const expected = true; //se verifica que exista (asi tenga asignado undefined)
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist", //si la propiedad existe se valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as undefined, prop condition ("is-not-undefined-and-not-null"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
      const props = ["p3"];
      const expected = false; //sal ser undefined o null no es valida
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as null, prop condition ("it-exist"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: null };
      const props = ["p3"];
      const expected = true; //se verifica que exista (asi tenga asignado null)
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist", //si la propiedade existe se valida
      });
      expect(received).toBe(expected);
    });
    it('case: is object (is property as null, prop condition ("is-not-undefined-and-not-null"))', async () => {
      const data = { p1: "loquesea", p2: "otroDato", p3: null };
      const props = ["p3"];
      const expected = false; //al ser undefined o null no es valida
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "is-not-undefined-and-not-null",
      });
      expect(received).toBe(expected);
    });
    it("case: is objetc and properties valid (deep v1)", async () => {
      const data = { p1: "loquesea", p2: { p21: 3 } };
      const props = ["p2.p21", "p1"];
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is objetc and properties valid (deep v2)", async () => {
      const data = { p1: "loquesea", p2: { p21: 3 } };
      const props = [
        "p2.p21.p211", //p211 no existe (p21 tiene asignado un número)
        "p1",
      ];
      const expected = false;
      const received = util.isObjectWithDeepProperties(data, props);
      expect(received).toBe(expected);
    });
    it("case: is object and properties valid (deep v3)", async () => {
      const data = { p1: "loquesea", p2: { p2: { p2: null } } };
      const props = [
        "p2.p2.p2", //la misma propiedad en varios niveles
        "p1",
      ];
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist", //no importa que sea null
      });
      expect(received).toBe(expected);
    });
    it("case: is object and properties valid (with explicit number index)", async () => {
      const data = { p1: "loquesea", p2: [null, { pN: "hola" }] };
      const props = [
        "p2.1.pN", // el index especifico del elemento a buscar
        "p1",
      ];
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist",
      });
      expect(received).toBe(expected);
    });
    it("case: is object and properties valid (with explicit deep number index)", async () => {
      const data = { p1: "loquesea", p2: [null, [[[{ pN: "hola" }]]]] };
      const props = [
        "p2.1.0.0.0.pN", // los index específicos del elemento a buscar
        "p1",
      ];
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist",
      });
      expect(received).toBe(expected);
    });
    it("case: is object and properties valid (with wildcard index)", async () => {
      const data = {
        p1: "loquesea",
        p2: [
          null,
          undefined,
          "1",
          { pN: "hola" }, // seria el index 2
          "texto",
        ],
      };
      const props = [
        "p2.#.pN", //el caracter comodín "#" indica que el elemento puede estar en cualquier index (valida el primero que encuentre)
        "p1",
      ];
      const expected = true;
      const received = util.isObjectWithDeepProperties(data, props, {
        propCondition: "it-exist",
      });
      expect(received).toBe(expected);
    });
  });
  describe("method: isLiteralObject", async () => {
    it("case: is literal object", async () => {
      const data = { p1: "loquesea" };
      const expected = true;
      const received = util.isLiteralObject(data);
      expect(received).toBe(expected);
    });
    it("case: is not literal object (because is any)", async () => {
      const data = 10;
      const expected = false;
      const received = util.isLiteralObject(data);
      expect(received).toBe(expected);
    });
    it("case: is literal object empty", async () => {
      const data = {};
      const expected = true;
      const received = util.isLiteralObject(data);
      expect(received).toBe(expected);
    });
    it("case: is not literal object (because is instance (Date))", async () => {
      const data = new Date();
      const expected = false;
      const received = util.isLiteralObject(data);
      expect(received).toBe(expected);
    });
    it("case: is not literal object (because is instance (Custom))", async () => {
      class MiClase {}
      const data = new MiClase();
      const expected = false;
      const received = util.isLiteralObject(data);
      expect(received).toBe(expected);
    });
    it("case: own constructor property does not change literal classification", async () => {
      class FakeClass {}
      const data = { constructor: FakeClass };
      const expected = [true, false];
      const received = [util.isLiteralObject(data), util.isInstance(data)];
      expect(received[0]).toBe(expected[0]);
      expect(received[1]).toBe(expected[1]);
    });
    it("case: null-prototype objects are literal, not instances", async () => {
      const data = Object.create(null);
      const expected = [true, false];
      const received = [util.isLiteralObject(data), util.isInstance(data)];
      expect(received[0]).toBe(expected[0]);
      expect(received[1]).toBe(expected[1]);
    });
    it("case: an object with a custom prototype is not a class instance", async () => {
      const data = Object.create({ inherited: true });
      const expected = [false, false];
      const received = [util.isLiteralObject(data), util.isInstance(data)];
      expect(received[0]).toBe(expected[0]);
      expect(received[1]).toBe(expected[1]);
    });
  });
  describe("method: isInstance", async () => {
    it("case: is not instance (because is literal object)", async () => {
      const data = { p1: "loquesea" };
      const expected = false;
      const received = util.isInstance(data);
      expect(received).toBe(expected);
    });
    it("case: is not instance (because is any)", async () => {
      const data = 10;
      const expected = false;
      const received = util.isInstance(data);
      expect(received).toBe(expected);
    });
    it("case: is not instance (because is literal empty object)", async () => {
      const data = {};
      const expected = false;
      const received = util.isInstance(data);
      expect(received).toBe(expected);
    });
    it("case: is instance", async () => {
      const data = new Date();
      const expected = true;
      const received = util.isInstance(data);
      expect(received).toBe(expected);
    });
    it("case: is instance (empty class)", async () => {
      class MiClaseVacia {} //clase vacia
      const data = new MiClaseVacia();
      const expected = true;
      const received = util.isInstance(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: getClassName", async () => {
    it("case: is not instance exception", async () => {
      const data = {};
      const expectedThrow = /is not instance of class/;
      const recivedThrowFn = () => util.getClassName(data);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: get class name", async () => {
      class MiClaseParaName {} //clase vacia
      const data = new MiClaseParaName();
      const expected = "MiClaseParaName";
      const received = util.getClassName(data);
      expect(received).toBe(expected);
    });
    it("case: ignores an own constructor override", async () => {
      class OriginalClass {}
      class OverrideClass {}
      const data = new OriginalClass() as OriginalClass & {
        constructor: typeof OverrideClass;
      };
      data.constructor = OverrideClass;
      const expected = "OriginalClass";
      const received = util.getClassName(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: objKeyPropertiesToCase", async () => {
    it("case: converts keys from an object without a prototype", async () => {
      const data = Object.assign(Object.create(null), { first_name: "Ana" });
      const expected = { firstName: "Ana" };
      const received = util.objectKeysToCase(data, "Camel");
      expect(received).toStrictEqual(expected);
    });
    it("case: rejects keys that collide after conversion by default", async () => {
      const data = { first_name: "Ana", firstName: "Eva" };
      expect(() => util.objectKeysToCase(data, "Camel")).toThrowError(
        /Duplicate key detected after conversion: firstName/,
      );
    });
    it("case: allows converted-key collisions when requested", async () => {
      const data = { first_name: "Ana", firstName: "Eva" };
      const expected = { firstName: "Eva" };
      const received = util.objectKeysToCase(data, "Camel", true);
      expect(received).toStrictEqual(expected);
    });
    it("case: SnakeCase deep", async () => {
      const data = {
        "nombre propiedad_muy-especial-1": "loquesea",
        "nombre propiedad_muy-especial-2": {
          "nombre propiedadMuy-especial-21": {
            "nombre propiedadMuy-especial-211": "otro dato",
          },
        },
      };
      const expected = {
        nombre_propiedad_muy_especial_1: "loquesea",
        nombre_propiedad_muy_especial_2: {
          nombre_propiedad_muy_especial_21: {
            nombre_propiedad_muy_especial_211: "otro dato",
          },
        },
      };
      const received = util.objectKeysToCase(data, "Snake");
      expect(received).toStrictEqual(expected);
    });
    it("case: KebabCase deep", async () => {
      const data = {
        "nombre propiedad_muy-especial-1": "loquesea",
        "nombre propiedad_muy-especial-2": {
          "nombre propiedadMuy-especial-21": {
            nombre_propiedadMuy_especial_211: "otro dato",
          },
        },
      };
      const expected = {
        "nombre-propiedad-muy-especial-1": "loquesea",
        "nombre-propiedad-muy-especial-2": {
          "nombre-propiedad-muy-especial-21": {
            "nombre-propiedad-muy-especial-211": "otro dato",
          },
        },
      };
      const received = util.objectKeysToCase(data, "Kebab");
      expect(received).toStrictEqual(expected);
    });
    it("case: CamelCase deep", async () => {
      const data = {
        "nombre propiedad_muy-especial-1": "loquesea",
        "nombre propiedad_muy-especial-2": {
          "nombre propiedadMuy-especial-21": {
            "nombre_propiedadMuy-especial_211": "otro dato",
          },
        },
      };
      const expected = {
        nombrePropiedadMuyEspecial1: "loquesea",
        nombrePropiedadMuyEspecial2: {
          nombrePropiedadMuyEspecial21: {
            nombrePropiedadMuyEspecial211: "otro dato",
          },
        },
      };
      const received = util.objectKeysToCase(data, "Camel");
      expect(received).toStrictEqual(expected);
    });
    it("case: PascalCase deep", async () => {
      const data = {
        "nombre propiedad_muy-especial-1": "loquesea",
        "nombre propiedad_muy-especial-2": {
          "nombre propiedadMuy-especial-21": {
            "nombre_propiedadMuy-especial_211": "otro dato",
          },
        },
      };
      const expected = {
        NombrePropiedadMuyEspecial1: "loquesea",
        NombrePropiedadMuyEspecial2: {
          NombrePropiedadMuyEspecial21: {
            NombrePropiedadMuyEspecial211: "otro dato",
          },
        },
      };
      const received = util.objectKeysToCase(data, "Pascal");
      expect(received).toStrictEqual(expected);
    });
    it("case: Constant and Dot cases", async () => {
      const data = { user_name: "Ana" };
      expect(util.objectKeysToCase(data, "Constant")).toStrictEqual({
        USER_NAME: "Ana",
      });
      expect(util.objectKeysToCase(data, "Dot")).toStrictEqual({
        "user.name": "Ana",
      });
    });
    it("case: converts keys in objects inside arrays and keeps private keys", async () => {
      const data = { _private_name: "kept", items: [{ first_name: "Ana" }] };
      const expected = {
        privateName: "kept",
        items: [{ firstName: "Ana" }],
      };
      const received = util.objectKeysToCase(data, "Camel");
      expect(received).toStrictEqual(expected);
    });
    it("case: rejects an empty root object", async () => {
      expect(() => util.objectKeysToCase({}, "Snake")).toThrowError(
        /is not object valid/,
      );
    });
    it("case: is not object return exception", async () => {
      const data = 10;
      const expectedThrow = /is not object valid/;
      const receivedThrowFn = () => util.objectKeysToCase(data as any, "Snake");
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
  });
  describe("method: mutateToLiteralObject", async () => {
    it("case: is not object exception", async () => {
      const data = 10;
      const expectedThrow = /is not object valid/;
      const recivedThrowFn = () => util.mutateToLiteralObject(data as any, {});
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: basic object without function props", async () => {
      const data = {
        pBoolean: true,
        pNum: 0,
        pStr: "texto",
        pFunction: () => "loquesea",
      };
      const expected = {
        pBoolean: true,
        pNum: 0,
        pStr: "texto",
        // pFunction: () => "loquesea",
      };
      const received = util.mutateToLiteralObject(data, {}); //las funciones las elimina siempre
      expect(received).toMatchObject(expected);
    });
    it("case: basic object with private props", async () => {
      const data = {
        pBoolean: true,
        pNum: 0,
        pStr: "texto",
        pFunction: () => "loquesea",
        _pPrivate: 63,
        __pPrivate: "clave privada",
      };
      const expected = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        // pFunction: () => "loquesea",
        _pPrivate: 63,
        __pPrivate: "clave privada",
      };
      const received = util.mutateToLiteralObject(data, {
        isDeletePrivates: false, //NO eliminar privados
      });
      expect(received).toMatchObject(expected);
    });
    it("case: basic object without private props", async () => {
      const data = {
        pBoolean: true,
        pNum: 0,
        pStr: "texto",
        pFunction: () => "loquesea",
        _pPrivate: 63,
        __pPrivate: "clave privada",
      };
      const expected = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        // pFunction: () => "loquesea",
        // _pPrivate: 63,
        // __pPrivate: "clave privada",
      };
      const received = util.mutateToLiteralObject(data, {
        isDeletePrivates: true, //eliminar privados
      });
      expect(received).toMatchObject(expected);
    });
    it("case: deep object", async () => {
      const data = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        pFunction: () => "loquesea",
        _pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          pObj11: {},
        },
        pObj2: {
          p1Num: 2,
        },
      };
      const expected = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        // pFunction: () => "loquesea", //siempre elimina las funciones
        _pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          pObj11: {},
        },
        pObj2: {
          p1Num: 2,
        },
      };
      const received = util.mutateToLiteralObject(data, {});
      expect(received).toMatchObject(expected);
    });
    it("case: deep object (with key Path for delete)", async () => {
      const data = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        pFunction: () => "loquesea",
        _pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          pObj11: {},
        },
        pObj2: {
          p1Num: 2,
        },
      };
      const expected = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        // pFunction: () => "loquesea",
        //_pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          pObj11: {},
        },
        // pObj2: {
        //   p1Num: 2,
        // },
      };
      const received = util.mutateToLiteralObject(data, {
        isDeletePrivates: true,
        keyOrKeysPathForDelete: "pObj2", //eliminará toda la propiedad y sus subniveles
      });
      expect(received).toMatchObject(expected);
    });
    it("case: deep object (with key Path for delete v2)", async () => {
      const data = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        pFunction: () => "loquesea",
        _pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          _p1Private: 31,
          pObj11: {
            p11Bool: false,
            p11Num: 15,
          },
        },
        pObj2: {
          p1Num: 2,
        },
      };
      const expected = {
        //pStr: "texto",
        pNum: 0,
        pBoolean: true,
        // pFunction: () => "loquesea",
        // _pPrivate: 63,
        pObj1: {
          p1Str: "sub texto",
          p1Num: 1,
          //_p1Private: 31,
          // pObj11: {
          //   p11Bool: false,
          //   p11Num: 15,
          // },
        },
        // pObj2: {
        //   p1Num: 2,
        // },
      };
      const received = util.mutateToLiteralObject(data, {
        isDeletePrivates: true,
        keyOrKeysPathForDelete: [
          "pStr", //elimina la propiedad primitiva
          "pObj2", //eliminará toda la propiedad y sus subniveles (si los tiene)
          "pObj1.pObj11", //elimina toda las subpropiedad (la propiedad raiz `pObj1` se mantiene)
        ],
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: mutateToObjectLiteralOnlyFn", async () => {
    it("case: is not object exception", async () => {
      const data = 10;
      const expectedThrow = /is not object valid/;
      const recivedThrowFn = () =>
        util.mutateToObjectLiteralOnlyFn(data as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: is object only funtions", async () => {
      const data = {
        pStr: "texto",
        pNum: 0,
        pBoolean: true,
        pFunction: () => "loqueseaN1",
        pObj: {
          pStr: "texto",
          pNum: 0,
          pBoolean: true,
          pFunction: () => "loqueseaN2",
        },
      };
      const expected = {
        pFunction: () => "loqueseaN1",
        pObj: {
          pFunction: () => "loqueseaN2",
        },
      };
      const received = util.mutateToObjectLiteralOnlyFn(data) as typeof data;
      //no se puedn testear definicion de funciones por
      //lo tanto se verificaran llamando a las
      //funciones y esperando el resultado
      expect({
        resultN1: received.pFunction(),
        resultN2: received.pObj.pFunction(),
      }).toMatchObject({
        resultN1: expected.pFunction(),
        resultN2: expected.pObj.pFunction(),
      });
    });
  });
  describe("method: findObjectProperty", async () => {
    it("case: find existing property", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = 42;
      const received = util.findObjectProperty(obj, "a.b.c");
      expect(received).toBe(expected);
    });
    it("case: find existing property in array", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = "mundo";
      const received = util.findObjectProperty(obj, "a.e.2.f");
      expect(received).toBe(expected);
    });
    it("case: find non-existing property with default return value", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = "otro valor default";
      const received = util.findObjectProperty(obj, "a.b.x", {
        defaultReturnObj: "otro valor default", //se retorna este valor al no encontrar el solicitado
      });
      expect(received).toBe(expected);
    });
    it("case: find property with custom char separator", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expected = "mundo";
      const received = util.findObjectProperty(obj, "a/e/2/f", {
        charSeparator: "/",
      });
      expect(received).toBe(expected);
    });
    it("case: find property (same property at different levels)", async () => {
      const obj = {
        a: {
          xx: { xxx: { xxxx: { xxxxx: { p: "a-p" } } } },
        },
        b: { xx: { xxx: { xxxx: { p: "b-p" } } } },
        c: { p: "c-p" },
        d: { xx: { p: "d-p" } },
        e: { xx: { xxx: { p: "e-p" } } },
      };
      const pToFind = "p";
      //❗NO orden conocido❗, su respuesta depende de la último
      // path que haya procesado en el array de path en este
      // caso coincidencialmente es la propiedad `e` por ser
      // la última propiedad del objeto sin embargo tener
      // en cuenta que en los objetos, las propiedades NO
      // siempre conservan el orden. Esto también ocurre
      // si estuvieran en el mismo nivel
      const expected = "e-p"; //de la propiedad `e`
      const received = util.findObjectProperty(obj, pToFind);
      expect(received).toBe(expected);
    });
    it("case: find property (same property at same level)", async () => {
      const obj = {
        a: { xx: { p: "a-p" } },
        b: { xx: { p: "b-p" } },
        c: { p: "c-p" },
        d: { xx: { p: "d-p" } },
        e: { xx: { p: "e-p" } },
      };
      const pToFind = "p";
      //❗NO orden conocido❗, su respuesta depende de la ultimo
      // path que haya procesado en el array de path en este
      // caso coincidencialmente es la propiedad `e` por ser
      // la última propeidad del objeto sin embargo tener
      // en cuenta que en los objetos las propiedades NO
      // siempre conservan el orden.
      const expected = "e-p"; //de la propiedad `e`
      const received = util.findObjectProperty(obj, pToFind);
      expect(received).toBe(expected);
    });
    it("case: find property in object with wildcard", async () => {
      const obj = {
        a: {
          b: {
            c: 211,
            d: "2-1-1",
            e: { g: "dato g" },
          },
          c: {
            a: {
              c: 2221,
              d: "2-2-2-1",
            },
            c: 221,
            d: "2-2-1",
          },
          d: { p: { q: { r: "4111" } } },
        },
      };
      const expected = {
        s0: obj.a.c, //"a.c" búsqueda de control
        s1: obj.a.c, //"a.*0.c" el multiplicar el comodín por 0 es igual decir "a.c"
        s2: obj.a.c.c, //"a.*.c"
        s3: obj.a.c.c, //"a.*1.c" el multiplicar el comodín por 1 es igual decir "a.*.c"
        s4: obj.a.c.a.c, //"a.*.*.c"
        s5: obj.a.c.a.c, //"a.*2.c" el multiplicar el comodín por 2 es igual decir "a.*.*.c"
        s6: obj.a.d.p.q.r, //"a.*.*.*.r"
        s7: obj.a.d.p.q.r, //"a.*3.r" el multiplicar el comodín por 3 es igual decir "a.*.*.*.r"
        s8: obj.a.b, //"*.b"
      };
      const received = {
        s0: util.findObjectProperty(obj, "a.c"),
        s1: util.findObjectProperty(obj, "a.*0.c"),
        s2: util.findObjectProperty(obj, "a.*.c"),
        s3: util.findObjectProperty(obj, "a.*1.c"),
        s4: util.findObjectProperty(obj, "a.*.*.c"),
        s5: util.findObjectProperty(obj, "a.*2.c"),
        s6: util.findObjectProperty(obj, "a.*3.r"),
        s7: util.findObjectProperty(obj, "a.*.*.*.r"),
        s8: util.findObjectProperty(obj, "*.b"),
      };
      expect(received).toMatchObject(expected);
    });
    it("case: find property in object (sub arrays) with wildcard", async () => {
      const obj = {
        a: {
          b: [{ c: 211 }, { d: "2-1-1" }, { e: { g: "dato g" } }],
          c: {
            a: [{ c: 2221 }, { d: "2-2-2-1" }],
            c: 221,
            d: "2-2-1",
          },
        },
      };
      const expected = {
        s0: obj.a.c, //"a.c" CONTROL
        s1: obj.a.c.a, //"a.*.a"
        s2: obj.a.c.a, //"a.*1.a" el multiplicar el comodín por 1 es igual decir "a.*.c"
        s3: obj.a.c.a[0], //"a.c.a.0" seleccionando item 0
        s4: obj.a.c.a[0], //"a.*.a.0" seleccionando item 0 (con comodín) igual al anterior
        s5: obj.a.c.a[0], //"a.*.*.0" seleccionando item 0 (con 2 comodines) igual al anterior
        s6: obj.a.c.a[0], //"a.*2.0" seleccionando item 0 (con multiplicador de comodín) igual al anterior
        s7: obj.a.c.a[1].d, //"a.*2.*.d" seleccion de item ahora en comodín, busca en todos los items el que tenga propiedad `d`
        s8: obj.a.c.a[1].d, //"a.*3.d" seleccion de item ahora en comodín unido al multiplicador, igual al anterior
        s9: obj.a.c.a[0].d, //"a.*2.0.d" , este path no existe, el item 0 no tiene propiedad `d`, retorna undefined
      };
      const received = {
        s0: util.findObjectProperty(obj, "a.c"),
        s1: util.findObjectProperty(obj, "a.*.a"),
        s2: util.findObjectProperty(obj, "a.*1.a"),
        s3: util.findObjectProperty(obj, "a.c.a.0"),
        s4: util.findObjectProperty(obj, "a.*.a.0"),
        s5: util.findObjectProperty(obj, "a.*.*.0"),
        s6: util.findObjectProperty(obj, "a.*2.0"),
        s7: util.findObjectProperty(obj, "a.*2.*.d"),
        s8: util.findObjectProperty(obj, "a.*3.d"),
        s9: util.findObjectProperty(obj, "a.*2.0.d"), //no existe
      };
      expect(received).toMatchObject(expected);
    });
    it("case: find property in object with wildcard for array", async () => {
      const obj = {
        a: {
          b: [{ x: 1 }, { c: 211 }, { c: "2-1-1" }, { c: { g: "dato g" } }],
        },
      };
      const expected = 211; //es el primer item que cumple la búsqueda
      //el caracter "#" indica que busque en cualquiera de los
      // index del array y retorne el primero que coincida
      const received = util.findObjectProperty(obj, "a.b.#.c");
      expect(received).toBe(expected);
    });
    it("case: deep real data object", async () => {
      const obj = {
        workspace: "DevCorp Workspace",
        region: "LATAM",
        active: true,
        lastUpdated: "2026-09-30T15:30:00Z",
        metrics: {
          totalProjects: 3,
          totalBudget: 45000,
          efficiencyScore: 88.5,
        },
        projects: [
          {
            id: "PRJ-001",
            name: "API Gateway Refactor",
            status: "in_progress",
            budget: 15000,
            technologies: ["TypeScript", "Node.js", "Docker"],
            lead: {
              name: "Magner",
              role: "Senior Backend Dev", //esta subpropiedad se va a buscar
              experienceYears: 6,
            },
            tasks: [
              {
                id: "T-101",
                title: "Setup router middleware",
                completed: true,
                priority: "high",
                hoursSpent: 12,
              },
              {
                id: "T-102",
                title: "Implement rate limiting",
                completed: false,
                priority: "critical",
                hoursSpent: 8,
              },
              {
                id: "T-103",
                title: "Write unit tests",
                completed: false,
                priority: "medium",
                hoursSpent: 4,
              },
            ],
          },
          {
            id: "PRJ-002",
            name: "Client Dashboard UI",
            status: "completed",
            budget: 20000,
            technologies: ["React", "TypeScript", "Tailwind"],
            lead: {
              name: "Sofía",
              role: "Frontend Lead",
              experienceYears: 5,
            },
            tasks: [
              {
                id: "T-201",
                title: "Design system setup",
                completed: true,
                priority: "high",
                hoursSpent: 20,
              },
              {
                id: "T-202",
                title: "State management integration",
                completed: true,
                priority: "critical",
                hoursSpent: 16,
              },
            ],
          },
          {
            id: "PRJ-003",
            name: "Automated Backup CLI",
            status: "planned",
            budget: 10000,
            technologies: ["Node.js", "Bash", "TypeScript"],
            lead: {
              name: "Carlos",
              role: "DevOps Engineer",
              experienceYears: 4,
            },
            tasks: [
              {
                id: "T-301",
                title: "Define CLI schema",
                completed: false,
                priority: "medium",
                hoursSpent: 2,
              },
              {
                id: "T-302",
                title: "Integrate S3 storage sync",
                completed: false,
                priority: "high",
                hoursSpent: 0,
              },
            ],
          },
        ],
        tags: ["enterprise", "internal", "high-priority"],
      };
      const expected = "Senior Backend Dev";
      const received = util.findObjectProperty(obj, "projects.#.*.role");
      expect(received).toBe(expected);
    });
  });
  describe("method: findAllObjectProperties", async () => {
    it("case: find all properties (same property at different levels)", async () => {
      const obj = {
        a: {
          xx: { xxx: { xxxx: { xxxxx: { p: "a-p" } } } },
        },
        b: { xx: { xxx: { xxxx: { p: "b-p" } } } },
        c: { p: "c-p" },
        d: { xx: { p: "d-p" } },
        e: { xx: { xxx: { p: "e-p" } } },
      };
      const pToFind = "p";
      //❗NO orden conocido❗,dependrá del orden del array de allPaths
      const expected = ["a-p", "b-p", "c-p", "d-p", "e-p"];
      const received = util.findAllObjectProperties(obj, pToFind);
      expect(received).toEqual(expected);
    });
    it("case: find all properties (same property at same level)", async () => {
      const obj = {
        a: { xx: { p: "a-p" } },
        b: { xx: { p: "b-p" } },
        c: { p: "c-p" },
        d: { xx: { p: "d-p" } },
        e: { xx: { p: "e-p" } },
      };
      const pToFind = "p";
      //❗NO orden conocido❗,dependrá del orden del array de allPaths
      const expected = ["a-p", "b-p", "c-p", "d-p", "e-p"];
      const received = util.findAllObjectProperties(obj, pToFind);
      expect(received).toEqual(expected);
    });
    it("case: find properties in object with wildcard for array", async () => {
      const obj = {
        a: {
          b: [
            { x: 1 },
            { c: 211 },
            { c: "2-1-1" },
            { c: { g: "dato g" } },
            null,
          ],
        },
      };
      const expected = [211, "2-1-1", { g: "dato g" }]; //es el primer item que cumple la búsqueda
      //el caracter "#" indica que busque en cualquiera de los
      // index del array y retorne el primero que coincida
      const received = util.findAllObjectProperties(obj, "a.b.#.c");
      expect(received).toEqual(expected);
    });
    it("case: throw exception for invalid object", async () => {
      const invalidObj = "notAnObject";
      const expectedThrow = /is not object valid/;
      const receivedThrowFn = () =>
        util.findAllObjectProperties(invalidObj as any, "prop1");
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: throw exception for invalid key path", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expectedError = /is not key or keys path valid/;
      const receivedThrowFn = () =>
        util.findAllObjectProperties(obj, null as any);
      expect(receivedThrowFn).toThrowError(expectedError);
    });
    it("case: throw exception for invalid wildcard", async () => {
      const obj = {
        a: {
          b: {
            c: 42,
            d: "hola",
          },
          e: [1, 2, { f: "mundo" }],
        },
        _privateProp: "secreto",
        g: () => console.log("función"),
      };
      const expectedError = /Invalid use of wildcard/;
      const keyPath_error = "a.*b.c"; //el comodin debe estar separado con el caracter de separacion ( "a.+b.c" ❌, "a.+.b.c" ✅)
      const receivedThrowFn = () =>
        util.findAllObjectProperties(obj, keyPath_error);
      expect(receivedThrowFn).toThrowError(expectedError);
    });
    it("case: deep real data object", async () => {
      const obj = {
        workspace: "DevCorp Workspace",
        region: "LATAM",
        active: true,
        lastUpdated: "2026-09-30T15:30:00Z",
        metrics: {
          totalProjects: 3,
          totalBudget: 45000,
          efficiencyScore: 88.5,
        },
        projects: [
          {
            id: "PRJ-001",
            name: "API Gateway Refactor",
            status: "in_progress",
            budget: 15000,
            technologies: ["TypeScript", "Node.js", "Docker"],
            lead: {
              name: "Magner",
              role: "Senior Backend Dev", //esta subpropiedad se va a buscar
              experienceYears: 6,
            },
            tasks: [
              {
                id: "T-101",
                title: "Setup router middleware",
                completed: true,
                priority: "high",
                hoursSpent: 12,
              },
              {
                id: "T-102",
                title: "Implement rate limiting",
                completed: false,
                priority: "critical",
                hoursSpent: 8,
              },
              {
                id: "T-103",
                title: "Write unit tests",
                completed: false,
                priority: "medium",
                hoursSpent: 4,
              },
            ],
          },
          {
            id: "PRJ-002",
            name: "Client Dashboard UI",
            status: "completed",
            budget: 20000,
            technologies: ["React", "TypeScript", "Tailwind"],
            lead: {
              name: "Sofía",
              role: "Frontend Lead",
              experienceYears: 5,
            },
            tasks: [
              {
                id: "T-201",
                title: "Design system setup",
                completed: true,
                priority: "high",
                hoursSpent: 20,
              },
              {
                id: "T-202",
                title: "State management integration",
                completed: true,
                priority: "critical",
                hoursSpent: 16,
              },
            ],
          },
          {
            id: "PRJ-003",
            name: "Automated Backup CLI",
            status: "planned",
            budget: 10000,
            technologies: ["Node.js", "Bash", "TypeScript"],
            lead: {
              name: "Carlos",
              role: "DevOps Engineer",
              experienceYears: 4,
            },
            tasks: [
              {
                id: "T-301",
                title: "Define CLI schema",
                completed: false,
                priority: "medium",
                hoursSpent: 2,
              },
              {
                id: "T-302",
                title: "Integrate S3 storage sync",
                completed: false,
                priority: "high",
                hoursSpent: 0,
              },
            ],
          },
        ],
        tags: ["enterprise", "internal", "high-priority"],
      };
      const expected = [
        ["Senior Backend Dev", "Frontend Lead", "DevOps Engineer"],
        [
          "Setup router middleware",
          "Implement rate limiting",
          "Write unit tests",
          "Design system setup",
          "State management integration",
          "Define CLI schema",
          "Integrate S3 storage sync",
        ],
      ];
      const query = [
        //encuentra los roles dentro de la subpropiedad
        //"projects" (sabiendo que es un array puedo usar "#")
        //en cualquiera de sus items donde haya una subpropiedad
        // que desconozco el nombre (por lo tanto uso "*")
        //y en esta subpropiedad desconocida debería haber "role"
        "projects.#.*.role",
        //encuentra los títulos dentro de la subpropiedad
        // "projects" (voy a asumir que no tengo conocimiento
        // de la estructura) lo que si conozco es la cantidad de
        // niveles que hay que bajar para encontrar a "title" por
        // lo tanto uso multiplicador *3 niveles de profundidad
        "projects.*3.title",
      ];
      const received = [
        util.findAllObjectProperties(obj, query[0]),
        util.findAllObjectProperties(obj, query[1]),
      ];
      expect(received[0]).toEqual(expected[0]);
      expect(received[1]).toEqual(expected[1]);
    });
  });
  describe("method: deepMergeObjects", async () => {
    it("case: is not tuple exception", async () => {
      const data = 10;
      const expectedThrow = /is not tuple of objects valid/;
      const recivedThrowFn = () =>
        util.deepMergeObjects(data as any, { mode: "soft" });
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: special case is not tuple of objects", async () => {
      const data = [10, 15] as any as [object, object];
      const expected = 10; //retorna supuesto objeto base
      const received = util.deepMergeObjects(data, {
        mode: "soft",
        isNullAsUndefined: false,
      });
      expect(received).toBe(expected);
    });
    it("case: special case is not base object", async () => {
      const data = [10, { p1: 31 }] as any as [object, object];
      const expected = { p1: 31 }; //retorna el objeto a fusionar
      const received = util.deepMergeObjects(data, {
        mode: "soft",
        isNullAsUndefined: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: special case is not to merge object", async () => {
      const data = [{ p1: 31 }, 15] as any as [object, object];
      const expected = { p1: 31 }; //retorna el objeto base
      const received = util.deepMergeObjects(data, {
        mode: "soft",
        isNullAsUndefined: false,
      });
      expect(received).toMatchObject(expected);
    });
    it("case: is merge (objects with different structures)", async () => {
      const data = [
        {
          a: "does not spanish",
          b: 31,
          c: true,
        },
        {
          uno: "ahora si es español",
          dos: 22,
          tres: false,
        },
      ] as [object, object];
      const expected = {
        a: "does not spanish",
        b: 31,
        c: true,
        uno: "ahora si es español",
        dos: 22,
        tres: false,
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("soft")', async () => {
      const data = [
        {
          p1: "does not spanish",
          p2: 31,
          p3: true,
          p4: 255,
          p5: "A",
        },
        {
          p1: "ahora si es español",
          p2: 31,
          p3: false,
          p4: undefined,
          p5: null,
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p2: 31, //se fusionó
        p3: false, //se fusionó
        p4: 255, //al ser "soft" no lo debe fusionar
        p5: null, //al ser "soft" y isNullAsUndefined = false si debe fusionarlo
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
        isNullAsUndefined: false,
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("soft" and isNullAsUndefined)', async () => {
      const data = [
        {
          p1: "does not spanish",
          p2: 31,
          p3: true,
          p4: 255,
          p5: "A",
        },
        {
          p1: "ahora si es español",
          p2: 31,
          p3: false,
          p4: undefined,
          p5: null,
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p2: 31, //se fusionó
        p3: false, //se fusionó
        p4: 255, //al ser "soft" no lo debe fusionar
        p5: "A", //al ser "soft" y isNullAsUndefined = true no debe fusionarlo
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
        isNullAsUndefined: true,
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("soft", deep)', async () => {
      const data = [
        {
          p1: "does not spanish",
          p7: {
            p71: 7,
            p72: {
              p721: 63,
              p722: "dato profundo",
            },
          },
        },
        {
          p1: "ahora si es español",
          p7: {}, //Sin profundidad
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p7: {
          //no cambió
          p71: 7,
          p72: {
            p721: 63,
            p722: "dato profundo",
          },
        },
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("soft", deep(2))', async () => {
      const data = [
        {
          p1: "does not spanish",
          p7: {}, // sin profundidad
        },
        {
          p1: "ahora si es español",
          p7: {
            p71: 7,
            p72: {
              p721: 63,
              p722: "dato profundo",
            },
          },
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p7: {
          //se fusionó
          p71: 7,
          p72: {
            p721: 63,
            p722: "dato profundo",
          },
        },
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("soft", propiedad array)', async () => {
      const data = [
        {
          p1: "does not spanish",
          p7: {
            p71: 7,
            p72: {
              p721: 63,
              p722: "dato profundo",
            },
          },
        },
        {
          p1: "ahora si es español",
          p7: [1, 2, 3], //Array
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p7: [1, 2, 3], //se fusionó
      };
      const received = util.deepMergeObjects(data, {
        mode: "soft",
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("hard")', async () => {
      const data = [
        {
          p1: "does not spanish",
          p2: 31,
          p3: true,
          p4: 255,
          p5: "A",
          p6: "dato base",
          p7: {
            p71: 7,
            p72: {
              p721: 63,
              p722: "dato profundo",
            },
          },
        },
        {
          p1: "ahora si es español",
          p2: 31,
          p3: false,
          p4: undefined,
          p5: null,
          //p6: "", //no existe
          p7: {
            p71: 7,
            p72: {
              p721: null,
            },
          },
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p2: 31, //no cambió
        p3: false, //se fusionó
        p4: undefined, //al ser "hard" es fusionado
        p5: null, //al ser "hard" es fusionado
        p6: "dato base", //asi sea hard, si la propiedad no existe en el nuevo objeto esta no se añade
        p7: {
          p71: 7, //no cambió
          p72: {
            p721: null, //se fusionó
            p722: "dato profundo", ////no cambió
          },
        },
      };
      const received = util.deepMergeObjects(data, {
        mode: "hard",
      });
      expect(received).toMatchObject(expected);
    });
    it('case: is merge ("hard", subproperty type object empty)', async () => {
      const data = [
        {
          p1: "does not spanish",
          p7: {
            p71: 7,
            p72: {
              p721: 63,
              p722: "dato profundo",
            },
          },
        },
        {
          p1: "ahora si es español",
          p7: {}, //Sin profundidad
        },
      ] as [object, object];
      const expected = {
        p1: "ahora si es español", //se fusionó
        p7: {}, //se fusionó al ser "hard"
      };
      const received = util.deepMergeObjects(data, {
        mode: "hard",
      });
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: arrayEntriesToObject", async () => {
    it("case is not array of entry tuple", async () => {
      const data = 31;
      const expectedThrow = /contain tuples not valid/;
      const recivedThrowFn = () => util.arrayEntriesToObject(data as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: array contains tuples no valid", async () => {
      const data = [
        ["key1", { p1: true, p2: 31 }],
        ["key2"], //❌No es una tupla que cumpla [key, value]
        ["key3", 255],
      ] as Array<[any, any]>;
      const expectedThrow = /contain tuples not valid/;
      const recivedThrowFn = () => util.arrayEntriesToObject(data as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: is array of entries tuple", async () => {
      const data = [
        ["key1", { p1: true, p2: 31 }],
        ["key2", { q: "hola" }],
        ["key3", 255],
      ] as Array<[any, any]>;
      const expected = {
        key1: { p1: true, p2: 31 },
        key2: { q: "hola" },
        key3: 255,
      };
      const received = util.arrayEntriesToObject(data);
      expect(received).toMatchObject(expected);
    });
    it("case: accepts an empty entries array", async () => {
      const data = [] as any;
      const expected = {};
      const received = util.arrayEntriesToObject(data);
      expect(received).toStrictEqual(expected);
    });
    it("case: rejects nullish keys", async () => {
      expect(() => util.arrayEntriesToObject([[null, 1]])).toThrowError(
        /contain tuples not valid/,
      );
      expect(() => util.arrayEntriesToObject([[undefined, 1]])).toThrowError(
        /contain tuples not valid/,
      );
    });
    it("case: preserves __proto__ as an own data property", async () => {
      const received = util.arrayEntriesToObject([["__proto__", "value"]]);
      expect(Object.getPrototypeOf(received)).toBe(Object.prototype);
      expect(Object.prototype.hasOwnProperty.call(received, "__proto__")).toBe(
        true,
      );
      expect((received as any).__proto__).toBe("value");
    });
    it("case: preserves symbol keys", async () => {
      const key = Symbol("entry");
      const received = util.arrayEntriesToObject([[key, "value"]]);
      expect((received as any)[key]).toBe("value");
    });
  });
  describe("method: entriesToObject", async () => {
    it("case: converts an iterable of entries", async () => {
      const entries = new Map([["key", 1]]).entries();
      expect(util.entriesToObject(entries)).toStrictEqual({ key: 1 });
    });
    it("case: accepts an empty iterable", async () => {
      expect(util.entriesToObject(new Map().entries())).toStrictEqual({});
    });
    it("case: rejects null and non-iterable objects", async () => {
      expect(() => util.entriesToObject(null as any)).toThrowError(
        /is not entries/,
      );
      expect(() => util.entriesToObject({} as any)).toThrowError(
        /is not entries/,
      );
    });
    it("case: rejects invalid tuples in the iterable", async () => {
      const entries = [["key"]] as any;
      expect(() => util.entriesToObject(entries)).toThrowError(
        /contain tuples not valid/,
      );
    });
  });
  describe("method: mapToObject", async () => {
    it("case: is not map", async () => {
      const data = 31;
      const expectedThrow = /is not map valid/;
      const recivedThrowFn = () => util.mapToObject(data as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: map contains tuples no valid", async () => {
      const data = new Map<any, any>([
        ["key1", { p1: true, p2: 31 }],
        [], //❌No es una tupla que cumpla [key, value]
        ["key3", 255],
      ] as any);
      const expectedThrow = /contain tuples not valid/;
      const recivedThrowFn = () => util.mapToObject(data as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: map without value tuple ", async () => {
      const data = new Map<any, any>([
        ["key1", { p1: true, p2: 31 }],
        ["key2"], //❗es una tupla incompleta
        ["key3", 255],
      ] as any);
      const expected = {
        key1: { p1: true, p2: 31 },
        key2: undefined, //❗ el value pasa a ser undefined
        key3: 255,
      };
      const received = util.mapToObject(data);
      expect(received).toMatchObject(expected);
    });
    it("case: map ok", async () => {
      const data = new Map<any, any>([
        ["key1", { p1: true, p2: 31 }],
        ["key2", { q: "hola" }],
        ["key3", 255],
      ]);
      const expected = {
        key1: { p1: true, p2: 31 },
        key2: { q: "hola" },
        key3: 255,
      };
      const received = util.mapToObject(data);
      expect(received).toMatchObject(expected);
    });
  });
  describe("method: freezeObject", async () => {
    it("case: freeze object ok", async () => {
      const data = { p1: "hola" };
      const expected = true; //congelamiento exitoso
      const frozen = util.freezeObject(data); //congelado
      const received = Object.isFrozen(frozen); //javascript determina si ha sido congelado
      expect(received).toBe(expected);
    });
    it("case: deep-freezes nested empty objects and arrays", async () => {
      const data = { items: [{}, []] };
      const received = util.freezeObject(data);
      expect(Object.isFrozen(received.items)).toBe(true);
      expect(Object.isFrozen(received.items[0])).toBe(true);
      expect(Object.isFrozen(received.items[1])).toBe(true);
    });
    it("case: shallow mode leaves nested values unfrozen", async () => {
      const data = { items: [{ value: 1 }] };
      const received = util.freezeObject(data, false);
      expect(Object.isFrozen(received)).toBe(true);
      expect(Object.isFrozen(received.items)).toBe(false);
      expect(Object.isFrozen(received.items[0])).toBe(false);
    });
    it("case: handles circular references", async () => {
      const data: { self?: object } = {};
      data.self = data;
      const received = util.freezeObject(data);
      expect(Object.isFrozen(received)).toBe(true);
      expect(received.self).toBe(received);
    });
    it("case: deep-freezes arrays and nested objects", async () => {
      const data = [{ nested: [{}] }];
      const received = util.freezeObject(data);
      expect(Object.isFrozen(received)).toBe(true);
      expect(Object.isFrozen(received[0])).toBe(true);
      expect(Object.isFrozen(received[0].nested)).toBe(true);
      expect(Object.isFrozen(received[0].nested[0])).toBe(true);
    });
    it("case: returns primitive and null values unchanged", async () => {
      expect(util.freezeObject(1 as any)).toBe(1);
      expect(util.freezeObject(null as any)).toBeNull();
    });
  });
});
