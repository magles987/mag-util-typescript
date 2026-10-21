import { describe, expect, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [String]", async () => {
  describe("method: isString", async () => {
    it("case: is string", async () => {
      const data = "loquesea";
      const expected = true;
      const received = util.isString(data);
      expect(received).toBe(expected);
    });
    it("case: is not string", async () => {
      const data = 10;
      const expected = false;
      const received = util.isString(data);
      expect(received).toBe(expected);
    });
    it("case: null is not string", async () => {
      const data = null;
      const expected = false;
      const received = util.isString(data);
      expect(received).toBe(expected);
    });
    it("case: is string empty (allowed)", async () => {
      const data = "";
      const expected = true;
      const received = util.isString(data, true);
      expect(received).toBe(expected);
    });
    it("case: is string empty (not allowed)", async () => {
      const data = "";
      const expected = false;
      const received = util.isString(data, false);
      expect(received).toBe(expected);
    });
  });
  describe("method: stringToNumber", async () => {
    it("case: integer numeric string", async () => {
      const data = "1000000";
      const expected = 1000000;
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it("case: int numeric string, wrong human format", async () => {
      const data = "1.000.000";
      const expected = 1000; //⚠️ los 3 últimos ceros los asume como decimal
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it("case: float numeric string, correct human format", async () => {
      const data = "1.000.000.00";
      const expected = 1000000; // los 2 últimos ceros los asume correctamente como decimal
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it("case: float numeric string, correct human format (v2)", async () => {
      const data = "1.000.000.99";
      const expected = 1000000.99; // los 2 últimos ceros los asume correctamente como decimal
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it("case: float numeric string, explicit not decimal point", async () => {
      const data = "1.000.000";
      const expected = 1000000;
      const received = util.stringToNumber(data, { isDecimalPoint: false });
      expect(received).toBe(expected);
    });
    it("case: float numeric string, explicit not decimal point(v2)", async () => {
      const data = "1.000.000.99";
      const expected = 100000099;
      const received = util.stringToNumber(data, { isDecimalPoint: false });
      expect(received).toBe(expected);
    });
    it('case: int numeric string, default "." char decimal point', async () => {
      const data = "1.000,000"; //el separador de decimales es ".", después del último "." todos los dígitos son asumidos como decimales
      const expected = 1;
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it('case: int numeric string, default "." char decimal point (v2)', async () => {
      const data = "1,000,000"; //el separador de miles es "," e internamente el separador de decimales es "."
      const expected = 1000000;
      const received = util.stringToNumber(data);
      expect(received).toBe(expected);
    });
    it('case: float numeric string, "," char decimal point, format human inverted', async () => {
      const data = "1.000.000,00"; //el separador de miles es "." y se personaliza como separador de decimales el ","
      const expected = 1000000;
      const received = util.stringToNumber(data, {
        isDecimalPoint: true,
        charDecimalPoint: ",", //personalización
      });
      expect(received).toBe(expected);
    });
  });
  describe("method: isStringAsNumber", async () => {
    it("case: accepts a cleaned finite numeric string", async () => {
      const data = " (1'000,500.25) ";
      const expected = true;
      const received = util.isStringAsNumber(data);
      expect(received).toBe(expected);
    });
    it("case: rejects a numeric prefix followed by text", async () => {
      const data = "12abc";
      const expected = false;
      const received = util.isStringAsNumber(data);
      expect(received).toBe(expected);
    });
    it("case: rejects a number because input must be a string", async () => {
      const data = 12;
      const expected = false;
      const received = util.isStringAsNumber(data);
      expect(received).toBe(expected);
    });
    it("case: accepts comma decimal with configured format", async () => {
      const data = "1.234,56";
      const expected = true;
      const received = util.isStringAsNumber(data, {
        isDecimalPoint: true,
        charDecimalPoint: ",",
      });
      expect(received).toBe(expected);
    });
    it("case: custom formatter can normalize the string", async () => {
      const data = "1,25";
      const expected = true;
      const received = util.isStringAsNumber(data, (value) =>
        value.replace(",", "."),
      );
      expect(received).toBe(expected);
    });
    it("case: false skips cleanup", async () => {
      const data = "1 2 3";
      const expected = false;
      const received = util.isStringAsNumber(data, false);
      expect(received).toBe(expected);
    });
  });
  describe("method: stringToBigint", async () => {
    it("case: string to bigint valid", async () => {
      const data = "54";
      const expected = 54n; //n indica que es biginteger
      const received = util.stringToBigint(data);
      expect(received).toBe(expected);
    });
    it("case: string to big exception (float numeric string no valid)", async () => {
      const data = "54.1"; //string con numero flotante
      const expectedThrow = /is not big numeric string valid/;
      const receivedThrowFn = () => util.stringToBigint(data);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: string to bigint exception (string only alphabetic)", async () => {
      const data = "loquesea";
      const expectedThrow = /is not big numeric string valid/;
      const receivedThrowFn = () => util.stringToBigint(data);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: reject comma decimal using configured decimal separator", async () => {
      const data = "1.234,56";
      const expectedThrow = /is not big numeric string valid/;
      const receivedThrowFn = () =>
        util.stringToBigint(data, {
          isDecimalPoint: true,
          charDecimalPoint: ",",
        });
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case: keep grouped integer using default formatting", async () => {
      const data = "98,765,432,109,876,543,210";
      const expected = 98765432109876543210n;
      const received = util.stringToBigint(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isStringAsBigInt", async () => {
    it("case: accepts a large integer numeric string", async () => {
      const data = "98765432109876543210";
      const expected = true;
      const received = util.isStringAsBigInt(data);
      expect(received).toBe(expected);
    });
    it("case: rejects decimal numeric string with default decimal separator", async () => {
      const data = "123.45";
      const expected = false;
      const received = util.isStringAsBigInt(data);
      expect(received).toBe(expected);
    });
    it("case: rejects comma decimal using configured decimal separator", async () => {
      const data = "1.234,56";
      const expected = false;
      const received = util.isStringAsBigInt(data, {
        isDecimalPoint: true,
        charDecimalPoint: ",",
      });
      expect(received).toBe(expected);
    });
    it("case: accepts grouped integer using default formatting", async () => {
      const data = "98,765,432,109,876,543,210";
      const expected = true;
      const received = util.isStringAsBigInt(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isStringLike (start)", async () => {
    it("case: is string", async () => {
      const data = "loquesea";
      const strS = "loq";
      const expected = true;
      const received = util.isStringLike(data, strS, {
        likeType: "start",
      });
      expect(received).toBe(expected);
    });
    it("case: is not isStringLike (end)", async () => {
      const data = "loquesea";
      const strS = "loq";
      const expected = false; //no termina con "loq"
      const received = util.isStringLike(data, strS, { likeType: "end" });
      expect(received).toBe(expected);
    });
    it("case: is isStringLike (between)", async () => {
      const data = "loquesea";
      const strS = "loq";
      const expected = true; //lo contiene (no importa si es al inicio, al final o en medio)
      const received = util.isStringLike(data, strS, {
        likeType: "between",
      });
      expect(received).toBe(expected);
    });
    it("case: is not isStringLike (end)", async () => {
      const data = "loquesea!";
      const strS = "sea";
      const expected = false; //no termina con "sea", termina con "sea!"
      const received = util.isStringLike(data, strS, { likeType: "end" });
      expect(received).toBe(expected);
    });
    it("case: treats regex characters as literal text", async () => {
      const data = "abc";
      const strS = ".";
      const expected = false;
      const received = util.isStringLike(data, strS, { likeType: "between" });
      expect(received).toBe(expected);
    });
    it("case: matches literal regex characters at the requested position", async () => {
      const data = "a.b";
      const strS = ".";
      const expected = true;
      const received = util.isStringLike(data, strS, { likeType: "between" });
      expect(received).toBe(expected);
    });
    it("case: empty search string matches an empty string", async () => {
      const data = "";
      const strS = "";
      const expected = true;
      const received = util.isStringLike(data, strS, { likeType: "between" });
      expect(received).toBe(expected);
    });
  });
  describe("method: capitalizeString", async () => {
    it("case: only word", async () => {
      const data = "loquesea";
      const expected = "Loquesea";
      const received = util.capitalizeString(data);
      expect(received).toBe(expected);
    });
    it("case: many words", async () => {
      const data = "lo que sea";
      const expected = "Lo que sea";
      const received = util.capitalizeString(data);
      expect(received).toBe(expected);
    });
    it("case: 1word", async () => {
      const data = "1palabra";
      const expected = "1palabra"; //no se puede capitalizar
      const received = util.capitalizeString(data);
      expect(received).toBe(expected);
    });
    it("case: empty string remains empty", async () => {
      const data = "";
      const expected = "";
      const received = util.capitalizeString(data);
      expect(received).toBe(expected);
    });
    it("case: non-string value throws", async () => {
      const data = 10;
      const received = () => util.capitalizeString(data as any);
      expect(received).toThrowError(/is not a valid string/);
    });
  });
  describe("method: convertStringToCase", async () => {
    it("case: Snake", async () => {
      const data = "_Hola como-Estas--que..bien_";
      const expected = "hola_como_estas_que_bien"; //⚠ No puede iniciar ni terminar con "_"
      const received = util.convertStringToCase(data, "Snake");
      expect(received).toBe(expected);
    });
    it("case: Snake (v2 acentos)", async () => {
      const data = "_Hola como-Estás";
      const expected = "hola_como_estás"; //se respetan los acentos
      const received = util.convertStringToCase(data, "Snake");
      expect(received).toBe(expected);
    });
    it("case: Snake (v3 number)", async () => {
      const data = "_Hola como123";
      const expected = "hola_como123"; // ❗los segmentos numéricos NO deben ser considerados como palabras independientes❗
      const received = util.convertStringToCase(data, "Snake");
      expect(received).toBe(expected);
    });
    it("case: Kebab", async () => {
      const data = "-Hola como_-_Estas--que..bien-";
      const expected = "hola-como-estas-que-bien"; //⚠ No puede iniciar ni terminar con "-"
      const received = util.convertStringToCase(data, "Kebab");
      expect(received).toBe(expected);
    });
    it("case: Camel", async () => {
      const data = "_Hola como__Estas-_que..bien-";
      const expected = "holaComoEstasQueBien";
      const received = util.convertStringToCase(data, "Camel");
      expect(received).toBe(expected);
    });
    it("case: Pascal", async () => {
      const data = "_Hola como__Estas-_que..bien-";
      const expected = "HolaComoEstasQueBien";
      const received = util.convertStringToCase(data, "Pascal");
      expect(received).toBe(expected);
    });
    it("case: Constant", async () => {
      const data = "_Hola como-Estas--que..bien_";
      const expected = "HOLA_COMO_ESTAS_QUE_BIEN";
      const received = util.convertStringToCase(data, "Constant");
      expect(received).toBe(expected);
    });
    it("case: Dot", async () => {
      const data = "_Hola como-Estas--que..bien_";
      const expected = "hola.como.estas.que.bien";
      const received = util.convertStringToCase(data, "Dot");
      expect(received).toBe(expected);
    });
  });
  describe("method: buildPath", async () => {
    it("case: default path", async () => {
      const data = ["ruta1", "ruta2"];
      const expected = "ruta1.ruta2";
      const received = util.buildPath(data);
      expect(received).toBe(expected);
    });
    it("case: default path with keys wrapped format", async () => {
      const data = [
        ".ruta1.", //separador al inicio y final
        ".ruta2", //separador solamente al inicio
        "ruta3.", //separador solamente al final
        "ru.ta4", // separado en medio
        ".ruta.5.", //separador al inicio final y medio
        "......ruta6...", //separadores al inicio y final
      ];
      const expected = "ruta1.ruta2.ruta3.ru.ta4.ruta.5.ruta6"; //es capas de evitar rutas mal formateadas como "ruta1..ruta2"
      const received = util.buildPath(data);
      expect(received).toBe(expected);
    });
    it("case: path char separator start", async () => {
      const data = ["ruta1", "ruta2"];
      const expected = "/ruta1/ruta2"; //"/" al inicio
      const received = util.buildPath(data, {
        charSeparator: "/",
        isStartWithSeparator: true,
      });
      expect(received).toBe(expected);
    });
    it("case: path char separator start with Init", async () => {
      const data = ["ruta1", "ruta2"];
      const pathInit = "inicio";
      const expected = "/inicio/ruta1/ruta2"; //"/" al inicio
      const received = util.buildPath(data, {
        charSeparator: "/",
        isStartWithSeparator: true,
        isJoinInitWithSeparator: true,
        pathInit,
      });
      expect(received).toBe(expected);
    });
    it("case: path with Init and without char separator start", async () => {
      const data = ["ruta1", "ruta2"];
      const pathInit = "inicio";
      const expected = "inicio/ruta1/ruta2"; //"/" No esta al inicio
      const received = util.buildPath(data, {
        charSeparator: "/",
        isStartWithSeparator: false, //no inicie
        isJoinInitWithSeparator: true,
        pathInit,
      });
      expect(received).toBe(expected);
    });
    it("case: path with char separator start and without join init", async () => {
      const data = ["ruta1", "ruta2"];
      const pathInit = "inicio";
      const expected = "/inicioruta1/ruta2"; //"/" inicia pero el pathInit no se une con el caracter separador
      const received = util.buildPath(data, {
        charSeparator: "/",
        isStartWithSeparator: true, //inicie
        isJoinInitWithSeparator: false, //no unir
        pathInit,
      });
      expect(received).toBe(expected);
    });
    it("case: path char separator finish with end", async () => {
      const data = ["ruta1", "ruta2"];
      const pathEnd = "finaliza";
      const expected = "ruta1/ruta2/finaliza/"; //"/" al finalizar
      const received = util.buildPath(data, {
        charSeparator: "/",
        isFinishWithSeparator: true,
        isJoinEndtWithSeparator: true,
        pathEnd,
      });
      expect(received).toBe(expected);
    });
    it("case: path with End and without char separator finish", async () => {
      const data = ["ruta1", "ruta2"];
      const pathEnd = "finaliza";
      const expected = "ruta1/ruta2/finaliza"; //"/" no esta al finalizar
      const received = util.buildPath(data, {
        charSeparator: "/",
        isFinishWithSeparator: false,
        isJoinEndtWithSeparator: true,
        pathEnd,
      });
      expect(received).toBe(expected);
    });
    it("case: path with char separator finish and without join end", async () => {
      const data = ["ruta1", "ruta2"];
      const pathEnd = "finaliza";
      const expected = "ruta1/ruta2finaliza/"; // finalizar con "/" pero el pathEnd no se une con el caracter separador
      const received = util.buildPath(data, {
        charSeparator: "/",
        isFinishWithSeparator: true, //inicie
        isJoinEndtWithSeparator: false, //no unir
        pathEnd,
      });
      expect(received).toBe(expected);
    });
    it("case: path with empty keys", async () => {
      const data = ["ruta1", "", "ruta3", "", "ruta5"];
      const pathInit = "inicio";
      const pathEnd = "finaliza";
      const expected = "inicio.ruta1.ruta3.ruta5.finaliza"; // no toma en cuenta los vacios
      const received = util.buildPath(data, {
        isJoinInitWithSeparator: true,
        isJoinEndtWithSeparator: true,
        pathInit,
        pathEnd,
      });
      expect(received).toBe(expected);
    });
    it("case: path ignores empty keys at the beginning", async () => {
      const data = ["", ".ruta1.", "ruta2"];
      const expected = "ruta1.ruta2";
      const received = util.buildPath(data);
      expect(received).toBe(expected);
    });
    it("case: path trims repeated multi-character separators", async () => {
      const data = ["ababruta1abab", "ruta2"];
      const expected = "ruta1abruta2";
      const received = util.buildPath(data, { charSeparator: "ab" });
      expect(received).toBe(expected);
    });
    it("case: empty array produces an empty path", async () => {
      const data: string[] = [];
      const expected = "";
      const received = util.buildPath(data);
      expect(received).toBe(expected);
    });
    it("case: non-array input throws", async () => {
      const received = () => util.buildPath("ruta" as any);
      expect(received).toThrowError(/is not array of strings valid/);
    });
  });
  describe("method: isKeyPath", async () => {
    it("case: number is not keyPath", async () => {
      const data = 0;
      const expected = false;
      const received = util.isKeyPath(data as any);
      expect(received).toBe(expected);
    });
    it("case: cannot started with char separator", async () => {
      const data = ".root.p1";
      const expected = false;
      const received = util.isKeyPath(data);
      expect(received).toBe(expected);
    });
    it("case: cannot finished with char separator", async () => {
      const data = "root.p1.";
      const expected = false;
      const received = util.isKeyPath(data);
      expect(received).toBe(expected);
    });
    it("case: cannot empty route", async () => {
      const data = "root..p1"; //" .. " si están seguidos es ruta vacia
      const expected = false;
      const received = util.isKeyPath(data);
      expect(received).toBe(expected);
    });
    it("case: validates every path in an array", async () => {
      const data = ["root.p1", "root.p2"];
      const expected = true;
      const received = util.isKeyPath(data);
      expect(received).toBe(expected);
    });
    it("case: rejects an array containing an invalid path", async () => {
      const data = ["root.p1", "root..p2"];
      const expected = false;
      const received = util.isKeyPath(data);
      expect(received).toBe(expected);
    });
    it("case: supports a custom separator", async () => {
      const data = "root::p1";
      const expected = true;
      const received = util.isKeyPath(data, "::");
      expect(received).toBe(expected);
    });
    it("case: empty separator throws", async () => {
      const received = () => util.isKeyPath("root.p1", "");
      expect(received).toThrowError(/is not char separator valid/);
    });
  });
});
