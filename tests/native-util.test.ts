import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
const util = UtilNative.getInstance(undefined);
describe("Util Pure", async () => {
  describe("group: undefined and null", async () => {
    describe("method: isUndefined", async () => {
      it("case: 0 is not undefined", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isUndefined(data);
        expect(recived).toBe(expected);
      });
      it("case: false is not undefined", async () => {
        const data = false;
        const expected = false;
        const recived = util.isUndefined(data);
        expect(recived).toBe(expected);
      });
      it("case: null is not undefined", async () => {
        const data = null;
        const expected = false;
        const recived = util.isUndefined(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isNull", async () => {
      it("case: 0 is not null", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isNull(data);
        expect(recived).toBe(expected);
      });
      it("case: false is not null", async () => {
        const data = false;
        const expected = false;
        const recived = util.isNull(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined is not null", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isNull(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isUndefinedOrNull", async () => {
      it("case: 0 is not undefined or null", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isUndefinedOrNull(data);
        expect(recived).toBe(expected);
      });
      it("case: false is not undefined or null", async () => {
        const data = false;
        const expected = false;
        const recived = util.isUndefinedOrNull(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined is undefined or null", async () => {
        const data = undefined;
        const expected = true;
        const recived = util.isUndefinedOrNull(data);
        expect(recived).toBe(expected);
      });
      it("case: null is undefined or null", async () => {
        const data = null;
        const expected = true;
        const recived = util.isUndefinedOrNull(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isNotUndefinedAndNotNull", async () => {
      it("case: 0 is not undefined and Not null", async () => {
        const data = 0;
        const expected = true;
        const recived = util.isNotUndefinedAndNotNull(data);
        expect(recived).toBe(expected);
      });
      it("case: false is not undefined or null", async () => {
        const data = false;
        const expected = true;
        const recived = util.isNotUndefinedAndNotNull(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined is undefined or null", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isNotUndefinedAndNotNull(data);
        expect(recived).toBe(expected);
      });
      it("case: null is undefined or null", async () => {
        const data = null;
        const expected = false;
        const recived = util.isNotUndefinedAndNotNull(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: undefinedToNull", async () => {
      it("case: primitive is undefined)", async () => {
        const data = undefined;
        const expected = null;
        const recived = util.undefinedToNull(data);
        expect(recived).toBe(expected);
      });
      it("case: primitive is not undefined", async () => {
        const data = 45;
        const expected = 45;
        const recived = util.undefinedToNull(data);
        expect(recived).toBe(expected);
      });
      it("case: primitive is null", async () => {
        const data = null;
        const expected = null;
        const recived = util.undefinedToNull(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined array props to null (not deep)", async () => {
        const data = [
          undefined,
          {
            p1: "hola",
            p2: undefined,
            p3: {
              p31: undefined,
              p32: 23,
              p33: {
                p331: false,
                p332: null,
                p333: undefined,
              },
            },
          },
        ];
        const expected = [
          null, //solo modifica el primer nivel
          {
            p1: "hola",
            p2: undefined,
            p3: {
              p31: undefined,
              p32: 23,
              p33: {
                p331: false,
                p332: null,
                p333: undefined,
              },
            },
          },
        ];
        const recived = util.undefinedToNull(data, false);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined array props to null (deep)", async () => {
        const data = [
          undefined,
          {
            p1: "hola",
            p2: undefined,
            p3: {
              p31: undefined,
              p32: 23,
              p33: {
                p331: false,
                p332: null,
                p333: undefined,
              },
              p34: [
                undefined,
                {
                  p341: undefined,
                },
              ],
            },
          },
        ];
        const expected = [
          null,
          {
            p1: "hola",
            p2: null,
            p3: {
              p31: null,
              p32: 23,
              p33: {
                p331: false,
                p332: null,
                p333: null,
              },
              p34: [
                null,
                {
                  p341: null,
                },
              ],
            },
          },
        ];
        const recived = util.undefinedToNull(data, true);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined object props to null (not deep)", async () => {
        const data = {
          p1: "hola",
          p2: undefined,
          p3: {
            p31: undefined,
            p32: 23,
            p33: {
              p331: false,
              p332: null,
              p333: undefined,
            },
          },
        };
        const expected = {
          p1: "hola",
          p2: null, //solo modifica el primer nivel
          p3: {
            p31: undefined,
            p32: 23,
            p33: {
              p331: false,
              p332: null,
              p333: undefined,
            },
          },
        };
        const recived = util.undefinedToNull(data, false);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined object props to null (deep)", async () => {
        const data = {
          p1: "hola",
          p2: undefined,
          p3: {
            p31: undefined,
            p32: 23,
            p33: {
              p331: false,
              p332: null,
              p333: undefined,
            },
            p34: [
              undefined,
              {
                p341: undefined,
              },
            ],
          },
        };
        const expected = {
          p1: "hola",
          p2: null,
          p3: {
            p31: null,
            p32: 23,
            p33: {
              p331: false,
              p332: null,
              p333: null,
            },
            p34: [
              null,
              {
                p341: null,
              },
            ],
          },
        };
        const recived = util.undefinedToNull(data, true);
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: nullToUndefined", async () => {
      it("case: primitive is null)", async () => {
        const data = null;
        const expected = undefined;
        const recived = util.nullToUndefined(data);
        expect(recived).toBe(expected);
      });
      it("case: primitive is not null", async () => {
        const data = 45;
        const expected = 45;
        const recived = util.nullToUndefined(data);
        expect(recived).toBe(expected);
      });
      it("case: primitive is undefined", async () => {
        const data = undefined;
        const expected = undefined;
        const recived = util.nullToUndefined(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined array props to null (not deep)", async () => {
        const data = [
          null,
          {
            p1: "hola",
            p2: null,
            p3: {
              p31: null,
              p32: 23,
              p33: {
                p331: false,
                p332: undefined,
                p333: null,
              },
            },
          },
        ];
        const expected = [
          undefined, //solo modifica el primer nivel
          {
            p1: "hola",
            p2: null,
            p3: {
              p31: null,
              p32: 23,
              p33: {
                p331: false,
                p332: undefined,
                p333: null,
              },
            },
          },
        ];
        const recived = util.nullToUndefined(data, false);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined array props to null (deep)", async () => {
        const data = [
          null,
          {
            p1: "hola",
            p2: null,
            p3: {
              p31: null,
              p32: 23,
              p33: {
                p331: false,
                p332: undefined,
                p333: null,
              },
              p34: [
                null,
                {
                  p341: null,
                },
              ],
            },
          },
        ];
        const expected = [
          undefined,
          {
            p1: "hola",
            p2: undefined,
            p3: {
              p31: undefined,
              p32: 23,
              p33: {
                p331: false,
                p332: undefined,
                p333: undefined,
              },
              p34: [
                undefined,
                {
                  p341: undefined,
                },
              ],
            },
          },
        ];
        const recived = util.nullToUndefined(data, true);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined object props to null (not deep)", async () => {
        const data = {
          p1: "hola",
          p2: null,
          p3: {
            p31: null,
            p32: 23,
            p33: {
              p331: false,
              p332: undefined,
              p333: null,
            },
          },
        };
        const expected = {
          p1: "hola",
          p2: undefined, //solo modifica el primer nivel
          p3: {
            p31: null,
            p32: 23,
            p33: {
              p331: false,
              p332: undefined,
              p333: null,
            },
          },
        };
        const recived = util.nullToUndefined(data, false);
        expect(recived).toMatchObject(expected);
      });
      it("case: undefined object props to null (deep)", async () => {
        const data = {
          p1: "hola",
          p2: null,
          p3: {
            p31: null,
            p32: 23,
            p33: {
              p331: false,
              p332: undefined,
              p333: null,
            },
            p34: [
              null,
              {
                p341: null,
              },
            ],
          },
        };
        const expected = {
          p1: "hola",
          p2: undefined,
          p3: {
            p31: undefined,
            p32: 23,
            p33: {
              p331: false,
              p332: undefined,
              p333: undefined,
            },
            p34: [
              undefined,
              {
                p341: undefined,
              },
            ],
          },
        };
        const recived = util.nullToUndefined(data, true);
        expect(recived).toMatchObject(expected);
      });
    });
  });
  describe("group: boolean", async () => {
    describe("method: isBoolean", async () => {
      it("case: 0 is not boolean", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined is not boolean", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: null is not boolean", async () => {
        const data = null;
        const expected = false;
        const recived = util.isBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: false is boolean", async () => {
        const data = false;
        const expected = true;
        const recived = util.isBoolean(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: castBoolean", async () => {
      it("case: any number to boolean", async () => {
        const data = 10;
        const expected = true;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it('case: number 0 to boolean (default "isZeroAsTrue")', async () => {
        const data = 0;
        const expected = true;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: number 0 to boolean (not isZeroAsTrue)", async () => {
        const data = 0;
        const expected = false;
        // al estar vacio [], no habilita isZeroAsTrue y 0 es considerado valor falseable
        const recived = util.convertToBoolean(data, []);
        expect(recived).toBe(expected);
      });
      it("case: undefined to boolean", async () => {
        const data = undefined; //falseable
        const expected = false;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it('case: null to boolean (not "isNullAsTrue")', async () => {
        const data = null; //falseable
        const expected = false;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it('case: null to boolean ( "isNullAsTrue")', async () => {
        const data = null;
        const expected = true; //considerar a null como valor no falseable
        const recived = util.convertToBoolean(data, ["isNullAsTrue"]);
        expect(recived).toBe(expected);
      });
      it("case: string to boolean", async () => {
        const data = "loquesea";
        const expected = true;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: empty string to boolean", async () => {
        const data = "";
        const expected = false;
        const recived = util.convertToBoolean(data, ["isNullAsTrue"]);
        expect(recived).toBe(expected);
      });
      it("case: empty string to boolean (isEmptyAsTrue)", async () => {
        const data = "";
        const expected = true;
        const recived = util.convertToBoolean(data, ["isEmptyAsTrue"]);
        expect(recived).toBe(expected);
      });
      it("case: object to boolean", async () => {
        const data = { p: "loquesea" };
        const expected = true;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: empty object to boolean", async () => {
        const data = {};
        const expected = false;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: empty object to boolean (isEmptyAsTrue)", async () => {
        const data = {};
        const expected = true;
        const recived = util.convertToBoolean(data, ["isEmptyAsTrue"]);
        expect(recived).toBe(expected);
      });
      it("case: array to boolean", async () => {
        const data = ["loquesea"];
        const expected = true;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: empty array to boolean", async () => {
        const data = [];
        const expected = false;
        const recived = util.convertToBoolean(data);
        expect(recived).toBe(expected);
      });
      it("case: empty array to boolean (isEmptyAsTrue)", async () => {
        const data = [];
        const expected = true;
        const recived = util.convertToBoolean(data, ["isEmptyAsTrue"]);
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: number", async () => {
    describe("method: isNumber", async () => {
      it("case: any number", async () => {
        const data = 10;
        const expected = true;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: any boolean", async () => {
        const data = true;
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: any object", async () => {
        const data = {};
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: any array", async () => {
        const data = [];
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: undefined", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: null", async () => {
        const data = null;
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: any string", async () => {
        const data = "loquesea";
        const expected = false;
        const recived = util.isNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: numberString (not allowString)", async () => {
        const data = "10";
        const expected = false;
        const recived = util.isNumber(data); //no esta activada permitir string numericos
        expect(recived).toBe(expected);
      });
      it("case: numberString (allowString)", async () => {
        const data = "10";
        const expected = true;
        const recived = util.isNumber(data, true); //activada permitir string numericos
        expect(recived).toBe(expected);
      });
    });
    describe("method: isNumberSign", async () => {
      it("case: any boolean", async () => {
        const data = true;
        const expected = false;
        const recived = util.isNumberSign(data, "+");
        expect(recived).toBe(expected);
      });
      it("case: any object", async () => {
        const data = {};
        const expected = false;
        const recived = util.isNumberSign(data, "+");
        expect(recived).toBe(expected);
      });
      it("case: any array", async () => {
        const data = [];
        const expected = false;
        const recived = util.isNumberSign(data, "-");
        expect(recived).toBe(expected);
      });
      it("case: undefined", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isNumberSign(data, "+");
        expect(recived).toBe(expected);
      });
      it("case: null", async () => {
        const data = null;
        const expected = false;
        const recived = util.isNumberSign(data, "-");
        expect(recived).toBe(expected);
      });
      it("case: any string", async () => {
        const data = "loquesea";
        const expected = false;
        const recived = util.isNumberSign(data, "+");
        expect(recived).toBe(expected);
      });
      it("case: numberString", async () => {
        const data = "-10";
        const expected = false;
        const recived = util.isNumberSign(data, "-"); //no esta activada permitir string numericos
        expect(recived).toBe(expected);
      });
      it("case: numberString", async () => {
        const data = "10";
        const expected = false;
        const recived = util.isNumberSign(data, "+"); //no esta activada permitir string numericos
        expect(recived).toBe(expected);
      });
      it("case: is not postive", async () => {
        const data = -10;
        const expected = false;
        const recived = util.isNumberSign(data, "+");
        expect(recived).toBe(expected);
      });
      it("case: is negative", async () => {
        const data = -10;
        const expected = true;
        const recived = util.isNumberSign(data, "-");
        expect(recived).toBe(expected);
      });
      it("case: is negative or 0", async () => {
        const data = 0;
        const expected = true;
        const recived = util.isNumberSign(data, "+", true);
        expect(recived).toBe(expected);
      });
      it("case: is not negative or 0", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isNumberSign(data, "-", false);
        expect(recived).toBe(expected);
      });
    });
    describe("method: stringToNumber", async () => {
      it("case: number to string exception", async () => {
        const data = "loquesea";
        const expectedThrow = /is not number or string-number valid/;
        const recivedThrowFn = () => util.stringToNumber(data);
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: number (int) to string valid", async () => {
        const data = "54";
        const expected = 54;
        const recived = util.stringToNumber(data);
        expect(recived).toBe(expected);
      });
      it("case: number (float) to string valid", async () => {
        const data = "54.5";
        const expected = 54.5;
        const recived = util.stringToNumber(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: roundNumber", async () => {
      it("case is not number to exception", async () => {
        const data = "loquesea";
        const expectedThrow = /is not number or string-number valid/;
        const recivedThrowFn = () => util.roundNumber("round", data as any, 0);
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      describe("cases round", async () => {
        //hacia arriba o hacia abajo
        it("case float number (0 exponent, basic use)", async () => {
          const data = 10.555555555555;
          const exp = 0; //se comporta como Math.round() normal
          const expected = 11; //el redondeo al entero mas cercano
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (tenth down)", async () => {
          const data = 10.12;
          const exp = -1; //solo decimas 0.x
          const expected = 10.1; //en round 10.1[2] ( 2 < 5) entonces 10.1
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth down)", async () => {
          const data = 10.12345;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.12; //en round 10.12[3]xx ( 3 < 5) entonces 10.12
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth up)", async () => {
          const data = 10.12645;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.13; //en round 10.12[6]xx ( 6 >= 5) entonces 10.13
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth equal)", async () => {
          const data = 10.12545;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.13; //en round 10.12[5]xx ( 5 == 5) entonces 10.13 (igualados redondea hacia arriba)
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (0.0)", async () => {
          const data = 0.0;
          const exp = -3; //milecimas (no importatia el que sea)
          const expected = 0; //en round .00[0] ( 0 < 5) entonces 0
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens down)", async () => {
          const data = 14;
          const exp = 1; //solo decenas
          const expected = 10; //en round 1[4] ( 4 < 5) entonces 10
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens up)", async () => {
          const data = 16;
          const exp = 1; //solo decenas
          const expected = 20; //en round 1[6] ( 6 >= 5) entonces 20
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (hundreds down)", async () => {
          const data = 126;
          const exp = 2; //solo centenas
          const expected = 100; //en round 1[2]6 ( 2 < 5) entonces 100
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands up)", async () => {
          const data = 1645;
          const exp = 3; //solo miles
          const expected = 2000; //en round 1[6]45 ( 6 >= 5) entonces 2000
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands- thousands down)", async () => {
          const data = 1645; //en escala de millares este numero es mas cercano a 0
          const exp = 6; //solo milllares
          const expected = 0; //en round [0]01645 ( 0 < 5) entonces 0
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number 0", async () => {
          const data = 0;
          const exp = 3; //miles (no importatia el que sea)
          const expected = 0; //en round [0]00 ( 0 < 5) entonces 0
          const recived = util.roundNumber("round", data, exp);
          expect(recived).toBe(expected);
        });
      });
      describe("cases ceil", async () => {
        //hacia arriba
        it("case float number (tenth)", async () => {
          const data = 10.12;
          const exp = -1; //solo decimas 0.x
          const expected = 10.2; //en ceil 10.1[2] entonces 10.2
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth)", async () => {
          const data = 10.12345;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.13; //en ceil 10.12[3]xx entonces 10.13
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth)", async () => {
          const data = 10.12645;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.13; //en ceil .12[6]xx entonces 10.13
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (0.0)", async () => {
          const data = 0.0;
          const exp = -3; //milecimas (no importatia el que sea)
          const expected = 0; //en ceil .00[0] siempre 0
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens)", async () => {
          const data = 14;
          const exp = 1; //solo decenas
          const expected = 20; //en ceil 1[4]  entonces 20
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens)", async () => {
          const data = 16;
          const exp = 1; //solo decenas
          const expected = 20; //en ceil 1[6]  entonces 20
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (hundreds)", async () => {
          const data = 126;
          const exp = 2; //solo centenas
          const expected = 200; //en ceil 1[2]6  entonces 200
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands)", async () => {
          const data = 1645;
          const exp = 3; //solo miles
          const expected = 2000; //en ceil 1[6]45  entonces 2000
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands- thousands)", async () => {
          const data = 1645; //en escala de millares este numero es mas cercano a 0
          const exp = 6; //solo milllares
          const expected = 1000000; //en ceil [0]01645  entonces 1000000
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number 0", async () => {
          const data = 0;
          const exp = 3; //miles (no importatia el que sea)
          const expected = 0; //en ceil [0]00  entonces 0
          const recived = util.roundNumber("ceil", data, exp);
          expect(recived).toBe(expected);
        });
      });
      describe("cases floor", async () => {
        //hacia abajo
        it("case float number (tenth)", async () => {
          const data = 10.12;
          const exp = -1; //solo decimas 0.x
          const expected = 10.1; //en floor .1[2] entonces 10.1
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth)", async () => {
          const data = 10.12345;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.12; //en floor 10.12[3]xx entonces 10.12
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (hundredth)", async () => {
          const data = 10.12645;
          const exp = -2; //solo centecimas 0.0x
          const expected = 10.12; //en floor 10.12[6]xx entonces 10.12
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case float number (0.0)", async () => {
          const data = 0.0;
          const exp = -3; //milecimas (no importatia el que sea)
          const expected = 0; //en floor .00[0] siempre 0
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens)", async () => {
          const data = 14;
          const exp = 1; //solo decenas
          const expected = 10; //en floor 1[4]  entonces 10
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (tens)", async () => {
          const data = 16;
          const exp = 1; //solo decenas
          const expected = 10; //en floor 1[6]  entonces 10
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (hundreds)", async () => {
          const data = 126;
          const exp = 2; //solo centenas
          const expected = 100; //en floor 1[2]6  entonces 100
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands)", async () => {
          const data = 1645;
          const exp = 3; //solo miles
          const expected = 1000; //en floor 1[6]45  entonces 1000
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number (thousands- thousands)", async () => {
          const data = 1645; //en escala de millares este numero es mas cercano a 0
          const exp = 6; //solo milllares
          const expected = 0; //en floor [0]01645  entonces 0
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
        it("case int number 0", async () => {
          const data = 0;
          const exp = 3; //miles (no importatia el que sea)
          const expected = 0; //en floor [0]00  entonces 0
          const recived = util.roundNumber("floor", data, exp);
          expect(recived).toBe(expected);
        });
      });
    });
    describe("method: isNumberInRange", async () => {
      it("case number in range (inclusive)", async () => {
        const data = -2;
        const range = [-10, 10] as [number, number];
        const isInclusive = true;
        const expected = true;
        const recived = util.isNumberInRange(data, range, isInclusive);
        expect(recived).toBe(expected);
      });
      it("case number in range (inclusive)", async () => {
        const data = -11;
        const range = [-10, 0] as [number, number];
        const isInclusive = true;
        const expected = false;
        const recived = util.isNumberInRange(data, range, isInclusive);
        expect(recived).toBe(expected);
      });
      it("case number in range (inclusive)", async () => {
        const data = -10;
        const range = [-10, 10] as [number, number];
        const isInclusive = true;
        const expected = true;
        const recived = util.isNumberInRange(data, range, isInclusive);
        expect(recived).toBe(expected);
      });
      it("case number in range (exclusive)", async () => {
        const data = -10;
        const range = [-10, 10] as [number, number];
        const isInclusive = false;
        const expected = false;
        const recived = util.isNumberInRange(data, range, isInclusive);
        expect(recived).toBe(expected);
      });
    });
    describe("method: adaptNumberToRange", async () => {
      it("case is not number to exception", async () => {
        const data = "loquesea";
        const expectedThrow = /is not number or string-number valid/;
        const recivedThrowFn = () =>
          util.adaptNumberToRange(data as any, [0, 1]);
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case is not range number to exception", async () => {
        const data = ["loquesea"];
        const expectedThrow = /is not tuple \[number, number\] valid/;
        const recivedThrowFn = () => util.adaptNumberToRange(0, data as any);
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case over range", async () => {
        const data = 15;
        const range = [-10, 10] as [number, number];
        const expected = 10;
        const recived = util.adaptNumberToRange(data, range);
        expect(recived).toBe(expected);
      });
      it("case below range", async () => {
        const data = -12;
        const range = [-10, 10] as [number, number];
        const expected = -10;
        const recived = util.adaptNumberToRange(data, range);
        expect(recived).toBe(expected);
      });
      it("case in range", async () => {
        const data = 2;
        const range = [-10, 10] as [number, number];
        const expected = 2;
        const recived = util.adaptNumberToRange(data, range);
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: string", async () => {
    describe("method: isString", async () => {
      it("case: is string", async () => {
        const data = "loquesea";
        const expected = true;
        const recived = util.isString(data);
        expect(recived).toBe(expected);
      });
      it("case: is not string", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isString(data);
        expect(recived).toBe(expected);
      });
      it("case: is string empty (allowed)", async () => {
        const data = "";
        const expected = true;
        const recived = util.isString(data, true);
        expect(recived).toBe(expected);
      });
      it("case: is string empty (not allowed)", async () => {
        const data = "";
        const expected = false;
        const recived = util.isString(data, false);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isStringLike (start)", async () => {
      it("case: is string", async () => {
        const data = "loquesea";
        const strS = "loq";
        const expected = true;
        const recived = util.isStringLike(data, strS, {
          likeType: "start",
        });
        expect(recived).toBe(expected);
      });
      it("case: is not isStringLike (end)", async () => {
        const data = "loquesea";
        const strS = "loq";
        const expected = false; //no termina con "loq"
        const recived = util.isStringLike(data, strS, { likeType: "end" });
        expect(recived).toBe(expected);
      });
      it("case: is isStringLike (between)", async () => {
        const data = "loquesea";
        const strS = "loq";
        const expected = true; //lo contiene (no importa si es al inicio, al final o en medio)
        const recived = util.isStringLike(data, strS, {
          likeType: "between",
        });
        expect(recived).toBe(expected);
      });
      it("case: is not isStringLike (end)", async () => {
        const data = "loquesea!";
        const strS = "sea";
        const expected = false; //no termina con "sea", termina con "sea!"
        const recived = util.isStringLike(data, strS, { likeType: "end" });
        expect(recived).toBe(expected);
      });
    });
    describe("method: capitalizeString", async () => {
      it("case: only word", async () => {
        const data = "loquesea";
        const expected = "Loquesea";
        const recived = util.capitalizeString(data);
        expect(recived).toBe(expected);
      });
      it("case: many words", async () => {
        const data = "lo que sea";
        const expected = "Lo que sea";
        const recived = util.capitalizeString(data);
        expect(recived).toBe(expected);
      });
      it("case: 1word", async () => {
        const data = "1palabra";
        const expected = "1palabra"; //no se puede capitalizar
        const recived = util.capitalizeString(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: convertStringToCase", async () => {
      it("case: Snake", async () => {
        const data = "_Hola como-Estas--que..bien_";
        const expected = "hola_como_estas_que_bien"; //⚠ No puede iniciar ni terminar con "_"
        const recived = util.convertStringToCase(data, "Snake");
        expect(recived).toBe(expected);
      });
      it("case: Kebab", async () => {
        const data = "-Hola como_-_Estas--que..bien-";
        const expected = "hola-como-estas-que-bien"; //⚠ No puede iniciar ni terminar con "-"
        const recived = util.convertStringToCase(data, "Kebab");
        expect(recived).toBe(expected);
      });
      it("case: Camel", async () => {
        const data = "_Hola como__Estas-_que..bien-";
        const expected = "holaComoEstasQueBien";
        const recived = util.convertStringToCase(data, "Camel");
        expect(recived).toBe(expected);
      });
      it("case: Pascal", async () => {
        const data = "_Hola como__Estas-_que..bien-";
        const expected = "HolaComoEstasQueBien";
        const recived = util.convertStringToCase(data, "Pascal");
        expect(recived).toBe(expected);
      });
    });
    describe("method: buildPath", async () => {
      it("case: default path", async () => {
        const data = ["ruta1", "ruta2"];
        const expected = "ruta1.ruta2";
        const recived = util.buildPath(data);
        expect(recived).toBe(expected);
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
        const recived = util.buildPath(data);
        expect(recived).toBe(expected);
      });
      it("case: path char separator start", async () => {
        const data = ["ruta1", "ruta2"];
        const expected = "/ruta1/ruta2"; //"/" al inicio
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isStartWithSeparator: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: path char separator start with Init", async () => {
        const data = ["ruta1", "ruta2"];
        const pathInit = "inicio";
        const expected = "/inicio/ruta1/ruta2"; //"/" al inicio
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isStartWithSeparator: true,
          isJoinInitWithSeparator: true,
          pathInit,
        });
        expect(recived).toBe(expected);
      });
      it("case: path with Init and without char separator start", async () => {
        const data = ["ruta1", "ruta2"];
        const pathInit = "inicio";
        const expected = "inicio/ruta1/ruta2"; //"/" No esta al inicio
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isStartWithSeparator: false, //no inicie
          isJoinInitWithSeparator: true,
          pathInit,
        });
        expect(recived).toBe(expected);
      });
      it("case: path with char separator start and without join init", async () => {
        const data = ["ruta1", "ruta2"];
        const pathInit = "inicio";
        const expected = "/inicioruta1/ruta2"; //"/" inicia pero el pathInit no se une con el caracter separador
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isStartWithSeparator: true, //inicie
          isJoinInitWithSeparator: false, //no unir
          pathInit,
        });
        expect(recived).toBe(expected);
      });
      it("case: path char separator finish with end", async () => {
        const data = ["ruta1", "ruta2"];
        const pathEnd = "finaliza";
        const expected = "ruta1/ruta2/finaliza/"; //"/" al finalizar
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isFinishWithSeparator: true,
          isJoinEndtWithSeparator: true,
          pathEnd,
        });
        expect(recived).toBe(expected);
      });
      it("case: path with End and without char separator finish", async () => {
        const data = ["ruta1", "ruta2"];
        const pathEnd = "finaliza";
        const expected = "ruta1/ruta2/finaliza"; //"/" no esta al finalizar
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isFinishWithSeparator: false,
          isJoinEndtWithSeparator: true,
          pathEnd,
        });
        expect(recived).toBe(expected);
      });
      it("case: path with char separator finish and without join end", async () => {
        const data = ["ruta1", "ruta2"];
        const pathEnd = "finaliza";
        const expected = "ruta1/ruta2finaliza/"; // finalizar con "/" pero el pathEnd no se une con el caracter separador
        const recived = util.buildPath(data, {
          charSeparator: "/",
          isFinishWithSeparator: true, //inicie
          isJoinEndtWithSeparator: false, //no unir
          pathEnd,
        });
        expect(recived).toBe(expected);
      });
      it("case: path with empty keys", async () => {
        const data = ["ruta1", "", "ruta3", "", "ruta5"];
        const pathInit = "inicio";
        const pathEnd = "finaliza";
        const expected = "inicio.ruta1.ruta3.ruta5.finaliza"; // no toma en cuenta los vacios
        const recived = util.buildPath(data, {
          isJoinInitWithSeparator: true,
          isJoinEndtWithSeparator: true,
          pathInit,
          pathEnd,
        });
        expect(recived).toBe(expected);
      });
    });
    describe("method: isKeyPath", async () => {
      it("case: number is not keyPath", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isKeyPath(data as any);
        expect(recived).toBe(expected);
      });
      it("case: cannot started with char separator", async () => {
        const data = ".root.p1";
        const expected = false;
        const recived = util.isKeyPath(data);
        expect(recived).toBe(expected);
      });
      it("case: cannot finished with char separator", async () => {
        const data = "root.p1.";
        const expected = false;
        const recived = util.isKeyPath(data);
        expect(recived).toBe(expected);
      });
      it("case: cannot empty route", async () => {
        const data = "root..p1"; //" .. " si están seguidos es ruta vacia
        const expected = false;
        const recived = util.isKeyPath(data);
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: object", async () => {
    describe("method: isObject", async () => {
      it("case: is object", async () => {
        const data = { p1: "loquesea" };
        const expected = true;
        const recived = util.isObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is not object", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is object empty (allowed)", async () => {
        const data = {};
        const expected = true;
        const recived = util.isObject(data, true);
        expect(recived).toBe(expected);
      });
      it("case: is object empty (not allowed)", async () => {
        const data = {};
        const expected = false;
        const recived = util.isObject(data, false);
        expect(recived).toBe(expected);
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
          "f",
          "_privateProp",
          "g",
          "a.b",
          "a.e.0",
          "a.e.1",
          "a.e.2",
          "a.e",
          "a.b.c",
          "a.b.d",
        ];
        const recived = util.getPropertyPathsOfObject(obj);
        expect(recived).toEqual(expected);
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
          "f",
          "a.b",
          "a.e.0",
          "a.e.1",
          "a.e.2",
          "a.e",
          "a.b.c",
          "a.b.d",
        ];
        const recived = util.getPropertyPathsOfObject(obj, {
          includeFunctionProps: false,
          includePrivateProps: false,
        });
        expect(recived).toEqual(expected);
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
          "f",
          "_privateProp",
          "g",
          "a/b",
          "a/e/0",
          "a/e/1",
          "a/e/2",
          "a/e",
          "a/b/c",
          "a/b/d",
        ];
        const recived = util.getPropertyPathsOfObject(obj, {
          charSeparator: "/",
        });
        expect(recived).toEqual(expected);
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
          "f",
          "_privateProp",
          "g",
          "a.b",
          "a.e.0",
          "a.e.1",
          "a.e.2",
          "a.e",
          "a.e.2.z",
          "a.e.1.y",
          "a.e.0.x",
          "a.b.c",
          "a.b.d",
        ];
        const recived = util.getPropertyPathsOfObject(obj);
        expect(recived).toEqual(expected);
      });
    });
    describe("method: isObjectWithProperties", async () => {
      it("case: is not object", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isObjectWithProperties(data as any, false, "p1");
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path)", async () => {
        const data = { p1: "hola", p2: 31 };
        const expected = true; //se comporta como un `this.isObject(data, false)` normal
        const recived = util.isObjectWithProperties(data);
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path, is allow empty)", async () => {
        const data = {};
        const expected = true; //se comporta como un `this.isObject(data, true)` normal
        const recived = util.isObjectWithProperties(data, true);
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path, is deny empty)", async () => {
        const data = {};
        const expected = false; //se comporta como un `this.isObject(data, false)` normal
        const recived = util.isObjectWithProperties(data, false);
        expect(recived).toBe(expected);
      });
      it("case: is objetc (is key path valids)", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = true;
        const recived = util.isObjectWithProperties(data, false, "p1");
        expect(recived).toBe(expected);
      });
      it("case: is objetc (is not key path valids)", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = false;
        const recived = util.isObjectWithProperties(data, false, "p3" as any);
        expect(recived).toBe(expected);
      });
      it("case: is object (is some key path valids, )", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = false; //deben existir todas las que se envien en el parametro `keyOrkeysPath`
        const recived = util.isObjectWithProperties(
          data,
          false,
          ["p1", "p3" as any] //"p3" no existe
        );
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as undefined, prop condition ("it-exist"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
        const expected = true; //se verifica que exista (asi tenga asignado undefined)
        const recived = util.isObjectWithProperties(data, false, ["p3"], {
          propCondition: "it-exist", //si la propiedade existe se valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as undefined, prop condition ("is-not-undefined-and-not-null"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
        const expected = false; //sal ser undefined o null no es valida
        const recived = util.isObjectWithProperties(data, false, ["p3"], {
          propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as null, prop condition ("it-exist"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: null };
        const expected = true; //se verifica que exista (asi tenga asignado null)
        const recived = util.isObjectWithProperties(data, false, ["p3"], {
          propCondition: "it-exist", //si la propiedade existe se valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as null, prop condition ("is-not-undefined-and-not-null"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: null };
        const expected = false; //al ser undefined o null no es valida
        const recived = util.isObjectWithProperties(data, false, ["p3"], {
          propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
        });
        expect(recived).toBe(expected);
      });
    });
    describe("method: isObjectWithDeepProperties", async () => {
      it("case: is not object", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isObjectWithDeepProperties(data, false, "p1");
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path)", async () => {
        const data = { p1: "hola", p2: 31 };
        const expected = true; //se comporta como un `this.isObject(data, false)` normal
        const recived = util.isObjectWithDeepProperties(data);
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path, is allow empty)", async () => {
        const data = {};
        const expected = true; //se comporta como un `this.isObject(data, true)` normal
        const recived = util.isObjectWithDeepProperties(data, true);
        expect(recived).toBe(expected);
      });
      it("case: is object (is not key or keys path, is deny empty)", async () => {
        const data = {};
        const expected = false; //se comporta como un `this.isObject(data, false)` normal
        const recived = util.isObjectWithDeepProperties(data, false);
        expect(recived).toBe(expected);
      });
      it("case: is object (is not keys path, is allow empty, mode )", async () => {
        const data = {};
        const expected = true; // permite vacios
        const recived = util.isObjectWithDeepProperties(
          data,
          true //permite vacios
        );
        expect(recived).toBe(expected);
      });
      it("case: is objetc (is key path valids, )", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = true;
        const recived = util.isObjectWithDeepProperties(data, false, "p1");
        expect(recived).toBe(expected);
      });
      it("case: is objetc (is not key path valids, )", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = false;
        const recived = util.isObjectWithDeepProperties(data, false, "p3");
        expect(recived).toBe(expected);
      });
      it("case: is object (is some key path valids, )", async () => {
        const data = { p1: "loquesea", p2: "otroDato" };
        const expected = false; //deben existir todas las que se envien en el parametro `keyOrkeysPath`
        const recived = util.isObjectWithDeepProperties(
          data,
          false,
          ["p1", "p3"] //"p3" no existe
        );
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as undefined, prop condition ("it-exist"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
        const expected = true; //se verifica que exista (asi tenga asignado undefined)
        const recived = util.isObjectWithDeepProperties(data, false, ["p3"], {
          propCondition: "it-exist", //si la propiedade existe se valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as undefined, prop condition ("is-not-undefined-and-not-null"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: undefined };
        const expected = false; //sal ser undefined o null no es valida
        const recived = util.isObjectWithDeepProperties(data, false, ["p3"], {
          propCondition: "is-not-undefined-and-not-null", //al ser undefined no es valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as null, prop condition ("it-exist"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: null };
        const expected = true; //se verifica que exista (asi tenga asignado null)
        const recived = util.isObjectWithDeepProperties(data, false, ["p3"], {
          propCondition: "it-exist", //si la propiedade existe se valida
        });
        expect(recived).toBe(expected);
      });
      it('case: is object (is property as null, prop condition ("is-not-undefined-and-not-null"))', async () => {
        const data = { p1: "loquesea", p2: "otroDato", p3: null };
        const expected = false; //al ser undefined o null no es valida
        const recived = util.isObjectWithDeepProperties(data, false, ["p3"], {
          propCondition: "is-not-undefined-and-not-null",
        });
        expect(recived).toBe(expected);
      });
      it("case: is objetc and properties valid (deep (1))", async () => {
        const data = { p1: "loquesea", p2: { p21: 3 } };
        const expected = true;
        const recived = util.isObjectWithDeepProperties(data, false, [
          "p2.p21",
          "p1",
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is objetc and properties valid (deep (2))", async () => {
        const data = { p1: "loquesea", p2: { p21: 3 } };
        const expected = false;
        const recived = util.isObjectWithDeepProperties(data, false, [
          "p2.p21.p211", //p211 no existe (p21 tiene asignado un nuero)
          "p1",
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is objetc and properties valid (deep (3))", async () => {
        const data = { p1: "loquesea", p2: { p2: { p2: null } } };
        const expected = true;
        const recived = util.isObjectWithDeepProperties(
          data,
          false,
          [
            "p2.p2.p2", //la misma propiedad en varios niveles
            "p1",
          ],
          {
            propCondition: "it-exist", //no importa que sea null
          }
        );
        expect(recived).toBe(expected);
      });
    });
    describe("method: isLiteralObject", async () => {
      it("case: is literal object", async () => {
        const data = { p1: "loquesea" };
        const expected = true;
        const recived = util.isLiteralObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is not literal object (because is any)", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isLiteralObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is literal object empty", async () => {
        const data = {};
        const expected = true;
        const recived = util.isLiteralObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is not literal object (because is instance (Date))", async () => {
        const data = new Date();
        const expected = false;
        const recived = util.isLiteralObject(data);
        expect(recived).toBe(expected);
      });
      it("case: is not literal object (because is instance (Custom))", async () => {
        class MiClase {}
        const data = new MiClase();
        const expected = false;
        const recived = util.isLiteralObject(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isInstance", async () => {
      it("case: is not instance (because is literal object)", async () => {
        const data = { p1: "loquesea" };
        const expected = false;
        const recived = util.isInstance(data);
        expect(recived).toBe(expected);
      });
      it("case: is not instance (because is any)", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isInstance(data);
        expect(recived).toBe(expected);
      });
      it("case: is not instance (because is literal empty object)", async () => {
        const data = {};
        const expected = false;
        const recived = util.isInstance(data);
        expect(recived).toBe(expected);
      });
      it("case: is instance", async () => {
        const data = new Date();
        const expected = true;
        const recived = util.isInstance(data);
        expect(recived).toBe(expected);
      });
      it("case: is instance (empty class)", async () => {
        class MiClaseVacia {} //clase vacia
        const data = new MiClaseVacia();
        const expected = true;
        const recived = util.isInstance(data);
        expect(recived).toBe(expected);
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
        const recived = util.getClassName(data);
        expect(recived).toBe(expected);
      });
    });
    describe("method: objKeyPropertiesToCase", async () => {
      it("case: is not object return exception", async () => {
        const data = 10;
        const expectedThrow = /is not object valid/;
        const recivedThrowFn = () =>
          util.objectKeysToCase(data as any, "Snake");
        expect(recivedThrowFn).toThrowError(expectedThrow);
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
        const recived = util.objectKeysToCase(data, "Snake");
        expect(recived).toStrictEqual(expected);
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
        const recived = util.objectKeysToCase(data, "Kebab");
        expect(recived).toStrictEqual(expected);
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
        const recived = util.objectKeysToCase(data, "Camel");
        expect(recived).toStrictEqual(expected);
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
        const recived = util.objectKeysToCase(data, "Pascal");
        expect(recived).toStrictEqual(expected);
      });
    });
    describe("method: mutateToLiteralObject", async () => {
      it("case: is not object exception", async () => {
        const data = 10;
        const expectedThrow = /is not object valid/;
        const recivedThrowFn = () =>
          util.mutateToLiteralObject(data as any, {});
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
        const recived = util.mutateToLiteralObject(data, {}); //las funciones las elimina siempre
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToLiteralObject(data, {
          isDeletePrivates: false, //NO eliminar privados
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToLiteralObject(data, {
          isDeletePrivates: true, //eliminar privados
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToLiteralObject(data, {});
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToLiteralObject(data, {
          isDeletePrivates: true,
          keyOrKeysPathForDelete: "pObj2", //eliminará toda la propiedad y sus subniveles
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToLiteralObject(data, {
          isDeletePrivates: true,
          keyOrKeysPathForDelete: [
            "pStr", //elimina la propiedad primitiva
            "pObj2", //eliminará toda la propiedad y sus subniveles (si los tiene)
            "pObj1.pObj11", //elimina toda las subpropiedad (la propiedad raiz `pObj1` se mantiene)
          ],
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.mutateToObjectLiteralOnlyFn(data) as typeof data;
        //no se puedn testear definicion de funciones por
        //lo tanto se verificaran llamando a las
        //funciones y esperando el resultado
        expect({
          resultN1: recived.pFunction(),
          resultN2: recived.pObj.pFunction(),
        }).toMatchObject({
          resultN1: expected.pFunction(),
          resultN2: expected.pObj.pFunction(),
        });
      });
    });
    describe("method: findObjectProperty", async () => {
      it("case: throw error for invalid object", async () => {
        const invalidObj = "notAnObject";
        const expectedThrow = /is not object valid/;
        const receivedThrowFn = () =>
          util.findObjectProperty(invalidObj as any, "prop1");
        expect(receivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: throw error for invalid key path", async () => {
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
        const expectedError = /is not key path valid/;
        const receivedThrowFn = () => util.findObjectProperty(obj, null as any);
        expect(receivedThrowFn).toThrowError(expectedError);
      });
      it("case: throw error for invalid wildcard", async () => {
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
          util.findObjectProperty(obj, keyPath_error);
        expect(receivedThrowFn).toThrowError(expectedError);
      });
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
          defaultReturnObj: "otro valor default",
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
        //❗NO orden conocido❗, su respuesta depende de la ultimo
        // path que haya procesado en el array de path en este
        // caso coincidencialmente es la propiedad `e` por ser
        // la última propeidad del objeto sin embargo tener
        // en cuenta que en los objetos las propiedades NO
        // siempre conservan el orden. Esto tambien ocurre
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
          s0: obj.a.c, //"a.c" CONTROL
          s1: obj.a.c, //"a.*0.c" el multiplicar el comodin por 0 es igual decir "a.c"
          s2: obj.a.c.c, //"a.*.c"
          s3: obj.a.c.c, //"a.*1.c" el multiplicar el comodin por 1 es igual decir "a.*.c"
          s4: obj.a.c.a.c, //"a.*.*.c"
          s5: obj.a.c.a.c, //"a.*2.c" el multiplicar el comodin por 2 es igual decir "a.*.*.c"
          s6: obj.a.d.p.q.r, //"a.*.*.*.r"
          s7: obj.a.d.p.q.r, //"a.*3.r" el multiplicar el comodin por 3 es igual decir "a.*.*.*.r"
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
          s2: obj.a.c.a, //"a.*1.a" el multiplicar el comodin por 1 es igual decir "a.*.c"
          s3: obj.a.c.a[0], //"a.c.a.0" seleccionando item 0
          s4: obj.a.c.a[0], //"a.*.a.0" seleccionando item 0 (con comodin) igual al anterior
          s5: obj.a.c.a[0], //"a.*.*.0" seleccionando item 0 (con 2 comodines) igual al anterior
          s6: obj.a.c.a[0], //"a.*2.0" seleccionando item 0 (con multiplicador de comodin) igual al anterior
          s7: obj.a.c.a[1].d, //"a.*2.*.d" seleccion de item ahora en comodin, busca en todos los items el que tenga propiedad `d`
          s8: obj.a.c.a[1].d, //"a.*3.d" seleccion de item ahora en comodin unido al multiplicador, igual al anterior
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
    });
    describe("method: findAllObjectProperties", async () => {
      it("case: throw error for invalid object", async () => {
        const invalidObj = "notAnObject";
        const expectedThrow = /is not object valid/;
        const receivedThrowFn = () =>
          util.findAllObjectProperties(invalidObj as any, "prop1");
        expect(receivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: throw error for invalid key path", async () => {
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
      it("case: throw error for invalid wildcard", async () => {
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
        const expected = ["e-p", "d-p", "c-p", "b-p", "a-p"]; //todas las subpropiedades que coincidan con el path
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
        const expected = ["e-p", "d-p", "c-p", "b-p", "a-p"]; //todas las subpropiedades que coincidan con el path
        const received = util.findAllObjectProperties(obj, pToFind);
        expect(received).toEqual(expected);
      });
      // it("case: find property in object with wildcard", async () => {
      //   const obj = {
      //     a: {
      //       b: {
      //         c: 211,
      //         d: "2-1-1",
      //         e: { g: "dato g" },
      //       },
      //       c: {
      //         a: {
      //           c: 2221,
      //           d: "2-2-2-1",
      //         },
      //         c: 221,
      //         d: "2-2-1",
      //       },
      //       d: { p: { q: { r: "4111" } } },
      //     },
      //   };
      //   const expected = {
      //     s0: obj.a.c, //"a.c" CONTROL
      //     s1: obj.a.c, //"a.*0.c" el multiplicar el comodin por 0 es igual decir "a.c"
      //     s2: obj.a.c.c, //"a.*.c"
      //     s3: obj.a.c.c, //"a.*1.c" el multiplicar el comodin por 1 es igual decir "a.*.c"
      //     s4: obj.a.c.a.c, //"a.*.*.c"
      //     s5: obj.a.c.a.c, //"a.*2.c" el multiplicar el comodin por 2 es igual decir "a.*.*.c"
      //     s6: obj.a.d.p.q.r, //"a.*.*.*.r"
      //     s7: obj.a.d.p.q.r, //"a.*3.r" el multiplicar el comodin por 3 es igual decir "a.*.*.*.r"
      //     s8: obj.a.b, //"*.b"
      //   };
      //   const received = {
      //     s0: util.findObjectProperty(obj, "a.c"),
      //     s1: util.findObjectProperty(obj, "a.*0.c"),
      //     s2: util.findObjectProperty(obj, "a.*.c"),
      //     s3: util.findObjectProperty(obj, "a.*1.c"),
      //     s4: util.findObjectProperty(obj, "a.*.*.c"),
      //     s5: util.findObjectProperty(obj, "a.*2.c"),
      //     s6: util.findObjectProperty(obj, "a.*3.r"),
      //     s7: util.findObjectProperty(obj, "a.*.*.*.r"),
      //     s8: util.findObjectProperty(obj, "*.b"),
      //   };
      //   expect(received).toMatchObject(expected);
      // });
      // it("case: find property in object (sub arrays) with wildcard", async () => {
      //   const obj = {
      //     a: {
      //       b: [{ c: 211 }, { d: "2-1-1" }, { e: { g: "dato g" } }],
      //       c: {
      //         a: [{ c: 2221 }, { d: "2-2-2-1" }],
      //         c: 221,
      //         d: "2-2-1",
      //       },
      //     },
      //   };
      //   const expected = {
      //     s0: obj.a.c, //"a.c" CONTROL
      //     s1: obj.a.c.a, //"a.*.a"
      //     s2: obj.a.c.a, //"a.*1.a" el multiplicar el comodin por 1 es igual decir "a.*.c"
      //     s3: obj.a.c.a[0], //"a.c.a.0" seleccionando item 0
      //     s4: obj.a.c.a[0], //"a.*.a.0" seleccionando item 0 (con comodin) igual al anterior
      //     s5: obj.a.c.a[0], //"a.*.*.0" seleccionando item 0 (con 2 comodines) igual al anterior
      //     s6: obj.a.c.a[0], //"a.*2.0" seleccionando item 0 (con multiplicador de comodin) igual al anterior
      //     s7: obj.a.c.a[1].d, //"a.*2.*.d" seleccion de item ahora en comodin, busca en todos los items el que tenga propiedad `d`
      //     s8: obj.a.c.a[1].d, //"a.*3.d" seleccion de item ahora en comodin unido al multiplicador, igual al anterior
      //     s9: obj.a.c.a[0].d, //"a.*2.0.d" , este path no existe, el item 0 no tiene propiedad `d`, retorna undefined
      //   };
      //   const received = {
      //     s0: util.findObjectProperty(obj, "a.c"),
      //     s1: util.findObjectProperty(obj, "a.*.a"),
      //     s2: util.findObjectProperty(obj, "a.*1.a"),
      //     s3: util.findObjectProperty(obj, "a.c.a.0"),
      //     s4: util.findObjectProperty(obj, "a.*.a.0"),
      //     s5: util.findObjectProperty(obj, "a.*.*.0"),
      //     s6: util.findObjectProperty(obj, "a.*2.0"),
      //     s7: util.findObjectProperty(obj, "a.*2.*.d"),
      //     s8: util.findObjectProperty(obj, "a.*3.d"),
      //     s9: util.findObjectProperty(obj, "a.*2.0.d"), //no existe
      //   };
      //   expect(received).toMatchObject(expected);
      // });
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
          isNullAsUndefined: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: special case is not base object", async () => {
        const data = [10, { p1: 31 }] as any as [object, object];
        const expected = { p1: 31 }; //retorna el objeto a fusionar
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
          isNullAsUndefined: false,
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: special case is not to merge object", async () => {
        const data = [{ p1: 31 }, 15] as any as [object, object];
        const expected = { p1: 31 }; //retorna el objeto base
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
          isNullAsUndefined: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
          isNullAsUndefined: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
          isNullAsUndefined: true,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "soft",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.deepMergeObjects(data, {
          mode: "hard",
        });
        expect(recived).toMatchObject(expected);
      });
      it('case: is merge ("hard", propiedad tipo objeto sin profundidad)', async () => {
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
        const recived = util.deepMergeObjects(data, {
          mode: "hard",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.arrayEntriesToObject(data);
        expect(recived).toMatchObject(expected);
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
        const recived = util.mapToObject(data);
        expect(recived).toMatchObject(expected);
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
        const recived = util.mapToObject(data);
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: freezeObject", async () => {
      it("case: freeze object ok", async () => {
        const data = { p1: "hola" };
        const expected = true; //congelamiento exitoso
        const frozen = util.freezeObject(data); //congelado
        const recived = Object.isFrozen(frozen); //javascript determina si ha sido congelado
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: array", async () => {
    describe("method: isArray", async () => {
      it("case: is array", async () => {
        const data = ["loquesea"];
        const expected = true;
        const recived = util.isArray(data);
        expect(recived).toBe(expected);
      });
      it("case: is not array", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isArray(data);
        expect(recived).toBe(expected);
      });
      it("case: is array empty (allowed)", async () => {
        const data = [];
        const expected = true;
        const recived = util.isArray(data, true);
        expect(recived).toBe(expected);
      });
      it("case: is array empty (not allowed)", async () => {
        const data = [];
        const expected = false;
        const recived = util.isArray(data, false);
        expect(recived).toBe(expected);
      });
    });
    describe("method: sortMixedArray", async () => {
      describe("cases: array of boolean", async () => {
        it("case: is booleans (asc)", async () => {
          const data = [false, true, true, false, true];
          const expected = [false, false, true, true, true];
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
        });
        it("case: is booleans (desc)", async () => {
          const data = [false, true, true, false, true];
          const expected = [true, true, true, false, false];
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
        });
      });
      describe("cases: array of number", async () => {
        it("case: is numbers (asc)", async () => {
          const data = [-1, -2, -5, -3, -4, 0, 4, 3, 5, 2, 1];
          const expected = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
        });
        it("case: is numbers (desc)", async () => {
          const data = [-1, -2, -5, -3, -4, 0, 4, 3, 5, 2, 1];
          const expected = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
        });
      });
      describe("cases: array of string", async () => {
        it("case: is strings (asc)", async () => {
          const data = ["pera", "manzana", "uva", "mango", "ñame"];
          const expected = ["mango", "manzana", "ñame", "pera", "uva"];
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
        });
        it("case: is strings (desc)", async () => {
          const data = ["pera", "manzana", "uva", "mango", "ñame"];
          const expected = ["uva", "pera", "ñame", "manzana", "mango"];
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
        });
        it("case: is strings (desc, is not case sensitive)", async () => {
          const data = ["juan", "ana", "Juan", "Ana"];
          const expected = ["juan", "Juan", "ana", "Ana"]; //"j" y "J" pesan igual por no ser sensitivo
          const recived = util.sortMixedArray(data, {
            direction: "desc",
            isCaseSensitiveForString: false,
          });
          expect(recived).toMatchObject(expected);
        });
        it("case: is strings (desc, is case sensitive)", async () => {
          const data = ["juan", "ana", "Juan", "Ana"];
          const expected = ["Juan", "juan", "Ana", "ana"]; //"J" pesa mas que "j", por ser sensitivo
          const recived = util.sortMixedArray(data, {
            direction: "desc",
            isCaseSensitiveForString: true,
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
            keyOrKeysPath: "id",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
            keyOrKeysPath: "id",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
            keyOrKeysPath: "p2.p22",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
            keyOrKeysPath: ["age", "name"],
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
            keyOrKeysPath: ["age", "name"],
            isCaseSensitiveForString: true,
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "asc",
            keyOrKeysPath: "id",
          });
          expect(recived).toMatchObject(expected);
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
          const recived = util.sortMixedArray(data, {
            direction: "desc",
            keyOrKeysPath: ["id", "p2.p21"],
          });
          expect(recived).toMatchObject(expected);
        });
      });
    });
    describe("method: removeArrayDuplicate", async () => {
      it("case: exception is not array to remove duplicates", async () => {
        const expectedThrow = /is not array to remove duplicates valid/;
        const recivedThrowFn = () => util.removeArrayDuplicate(0 as any, {});
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: exception is not configuration object", async () => {
        const expectedThrow = /is not object of configuration/;
        const recivedThrowFn = () => util.removeArrayDuplicate([], 0 as any);
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: exception is not conflict mode valid", async () => {
        const expectedThrow = /is not configuration's item conflict/;
        const recivedThrowFn = () =>
          util.removeArrayDuplicate([], {
            itemConflictMode: 0 as any, //una configuracion no valida
          });
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: empty array", async () => {
        const expected = [];
        const recived = util.removeArrayDuplicate([], {});
        expect(recived).toMatchObject(expected);
      });
      it("case: null undefined array", async () => {
        const data = [null, null, undefined, undefined];
        const expected = [null, undefined];
        const recived = util.removeArrayDuplicate(data, {});
        expect(recived).toMatchObject(expected);
      });
      it("case: boolea array", async () => {
        const data = [true, true, false, true, false];
        const expected = [true, false];
        const recived = util.removeArrayDuplicate(data, {});
        expect(recived).toMatchObject(expected);
      });
      it("case: number array", async () => {
        const data = [1, -1, 1, 2, -1, 2, 0, 0];
        const expected = [1, -1, 2, 0]; //se respeta el orden (o desorden) del array base
        //(tambien influye el modo de conflicto, predefinido "last")
        const recived = util.removeArrayDuplicate(data, {});
        expect(recived).toMatchObject(expected);
      });
      it("case: string-number array (is compare string as number, last conflict mode)", async () => {
        const data = [0, "1", 1, 2, "2", 0];
        const expected = [1, "2", 0]; //de los duplicados se toman los ultimos
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
          isCompareStringToNumber: true,
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: string-number array (is compare string as number, first conflict mode)", async () => {
        const data = [0, "1", 1, 2, "2", 0];
        const expected = [0, "1", 2]; //de los duplicados se toman los primeros
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCompareStringToNumber: true,
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: string-number array (is not compare string as number, last conflict mode)", async () => {
        const data = [0, "1", 1, 2, "2", 0];
        const expected = ["1", 1, 2, "2", 0]; //de los duplicados se toman los ultimos
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
          isCompareStringToNumber: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
          isCaseSensitiveForString: true,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
          isCaseSensitiveForString: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          keyOrKeysPath: "age",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "last",
          keyOrKeysPath: "age",
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: true,
          keyOrKeysPath: ["age", "name"],
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: false,
          keyOrKeysPath: ["age", "name"],
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: false,
          keyOrKeysPath: ["age", "pd.p1"],
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: true,
          isCompareLength: false,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: true,
          isCompareLength: true,
        });
        expect(recived).toMatchObject(expected);
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
        const recived = util.removeArrayDuplicate(data, {
          itemConflictMode: "first",
          isCaseSensitiveForString: false,
          isCompareLength: false,
        });
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: getArrayUnion", async () => {
      it("case: union array of boolean", async () => {
        const arrA = [true, false, true, true];
        const arrB = [false, false, true, true];
        const data = [arrA, arrB] as [any, any];
        const expected = [false, true];
        const recived = util.getArrayUnion(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of number", async () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 4, 5];
        const data = [arrA, arrB] as [any, any];
        const expected = [1, 2, 3, 4, 5];
        const recived = util.getArrayUnion(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string", async () => {
        const arrA = ["ana", "juan", "pedro"];
        const arrB = ["juan", "jacobo", "jose"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["ana", "pedro", "juan", "jacobo", "jose"];
        const recived = util.getArrayUnion(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string (is no sensitive)", async () => {
        const arrA = ["ana", "juan", "pedro"];
        const arrB = ["juan", "Ana", "jose"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["pedro", "juan", "Ana", "jose"];
        const recived = util.getArrayUnion(data, {
          isCaseSensitiveForString: false,
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string (mode last, is no sensitive)", async () => {
        const arrA = ["ana", "juan", "pedro"];
        const arrB = ["juan", "Ana", "jose"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["pedro", "juan", "Ana", "jose"];
        const recived = util.getArrayUnion(data, {
          isCaseSensitiveForString: false,
          itemConflictMode: "last",
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string (mode, first, is no sensitive)", async () => {
        const arrA = ["ana", "juan", "pedro"];
        const arrB = ["juan", "Ana", "jose"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["ana", "juan", "pedro", "jose"];
        const recived = util.getArrayUnion(data, {
          isCaseSensitiveForString: false,
          itemConflictMode: "first",
        });
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string (is sensitive)", async () => {
        const arrA = ["ana", "juan", "pedro"];
        const arrB = ["juan", "Ana", "jose"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["ana", "pedro", "juan", "Ana", "jose"];
        const recived = util.getArrayUnion(data, {
          isCaseSensitiveForString: true,
        });
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: getArrayIntersection", async () => {
      it("case: union array of boolean", async () => {
        const arrA = [true, false, true, true];
        const arrB = [false, false, false, false];
        const data = [arrA, arrB] as [any, any];
        const expected = [false];
        const recived = util.getArrayIntersection(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of number", async () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 4, 5];
        const data = [arrA, arrB] as [any, any];
        const expected = [3];
        const recived = util.getArrayIntersection(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string", async () => {
        const arrA = ["Juan", "ana", "Diana"];
        const arrB = ["Ana", "Pedro", "Andres"];
        const data = [arrA, arrB] as [any, any];
        const expected = []; //interseccion vacio ("ana" no es equivalente a "Ana" es case sensitive predefinidamente)
        const recived = util.getArrayIntersection(data, {});
        expect(recived).toMatchObject(expected);
      });
      it("case: union array of string (no sensitive)", async () => {
        const arrA = ["Juan", "ana", "Diana"];
        const arrB = ["Ana", "Pedro", "Andres"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["ana"]; //si no hay un orden establecido,
        //la interseccion retorna el elemento del array que representa *A*
        const recived = util.getArrayIntersection(data, {
          isCaseSensitiveForString: false,
        });
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: getArrayIntersection", async () => {
      it("case: intersection array of boolean", async () => {
        const arrA = [true, false, true, true];
        const arrB = [false, false, false, false];
        const data = [arrA, arrB] as [any, any];
        const expected = [false];
        const recived = util.getArrayIntersection(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: intersection array of number", async () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 4, 5];
        const data = [arrA, arrB] as [any, any];
        const expected = [3];
        const recived = util.getArrayIntersection(data);
        expect(recived).toMatchObject(expected);
      });
      it("case: intersection array of string", async () => {
        const arrA = ["Juan", "ana", "Diana"];
        const arrB = ["Ana", "Pedro", "Andres"];
        const data = [arrA, arrB] as [any, any];
        const expected = []; //interseccion vacio ("ana" no es equivalente a "Ana" es case sensitive predefinidamente)
        const recived = util.getArrayIntersection(data, {});
        expect(recived).toMatchObject(expected);
      });
      it("case: intersection array of string (no sensitive)", async () => {
        const arrA = ["Juan", "ana", "Diana"];
        const arrB = ["Ana", "Pedro", "Andres"];
        const data = [arrA, arrB] as [any, any];
        const expected = ["ana"]; //si no hay un orden establecido,
        //la interseccion retorna el elemento del array que representa *A*
        const recived = util.getArrayIntersection(data, {
          isCaseSensitiveForString: false,
        });
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: getArrayDifference", async () => {
      it("case: difference array of boolean (A)", async () => {
        const arrA = [true, false, true, true];
        const arrB = [false, false, false, false];
        const data = [arrA, arrB] as [any, any];
        const expected = [true];
        const recived = util.getArrayDifference(data, "difference_A");
        expect(recived).toMatchObject(expected);
      });
      it("case: difference array of boolean (B)", async () => {
        const arrA = [true, false, true, true];
        const arrB = [false, false, false, false];
        const data = [arrA, arrB] as [any, any];
        const expected = [];
        const recived = util.getArrayDifference(data, "difference_B");
        expect(recived).toMatchObject(expected);
      });
      it("case: difference array of number (A)", async () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 4, 5];
        const data = [arrA, arrB] as [any, any];
        const expected = [1, 2];
        const recived = util.getArrayDifference(data, "difference_A");
        expect(recived).toMatchObject(expected);
      });
      it("case: difference array of number (B)", async () => {
        const arrA = [1, 2, 3];
        const arrB = [3, 4, 5];
        const data = [arrA, arrB] as [any, any];
        const expected = [4, 5];
        const recived = util.getArrayDifference(data, "difference_B");
        expect(recived).toMatchObject(expected);
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
        const recived = util.searchItemsInArray(aData, aSearch, {});
        expect(recived).toMatchObject(expected);
      });
    });
    describe("method: freezeArray", async () => {
      it("case: freeze array ok", async () => {
        const data = ["hola"];
        const expected = true; //congelamiento exitoso
        const frozen = util.freezeArray(data); //congelado
        const recived = Object.isFrozen(frozen); //javascript determina si ha sido congelado
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: tuple", async () => {
    describe("method: isTuple", async () => {
      it("case: is not tuple", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isTuple(data as any, 0);
        expect(recived).toBe(expected);
      });
      it("case: is tuple by two elements", async () => {
        const data = ["hola", "adios"];
        const length = 2;
        const expected = true;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple but not two elements", async () => {
        const data = ["hola", "hello", "Salut"]; //3 elementos
        const length = 2;
        const expected = false; //por que se espera una tupla de 2 elementos
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple but not one element", async () => {
        const data = ["hola"]; //1 elementos
        const length = 2;
        const expected = false; //por que se espera una tupla de 2 elementos
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple and is range between one and three elements", async () => {
        const data = ["hola"]; //1 elementos
        const length = [1, 3] as [number, number]; //rango entre 1 y 3 elementos (siempre es incluyente)
        const expected = true;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple and is range between zero and two elements", async () => {
        const data = []; //0 elementos
        const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
        const expected = true;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple and is range between zero and two elements (no array)", async () => {
        const data = null; //no array contenedor
        const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
        const expected = false;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is tuple and is range between zero and two elements (no array)", async () => {
        const data = null; //no array contenedor
        const length = [0, 2] as [number, number]; //rango entre 0 y 2 elementos (siempre es incluyente)
        const expected = false;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
    });
    describe("method: isArrayTuple", async () => {
      it("case: is not array tuple", async () => {
        const data = 10;
        const expected = false;
        const recived = util.isArrayTuple(data as any, 0);
        expect(recived).toBe(expected);
      });
      it("case: is empty array tuple", async () => {
        const data = [];
        const expected = true;
        const isAllowEmpty = true;
        const recived = util.isArrayTuple(data as any, 0, isAllowEmpty);
        expect(recived).toBe(expected);
      });
      it("case: is tuple but not array tuple", async () => {
        const data = ["hola", "adios"]; //tuplas, pero no array de tuplas
        const length = 2;
        const expected = false;
        const recived = util.isArrayTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is array tuple by two elements", async () => {
        const data = [
          ["hola", "adios"],
          ["hello", "bye"],
          ["Kon'nichiwa", "Sayonara"],
        ];
        const length = 2;
        const expected = true;
        const recived = util.isArrayTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is array tuple but some item is not two elements", async () => {
        const data = [
          ["hola", "adios", "buenos dias"],
          ["hello", "bye"],
        ]; //una de las tuplas tiene 3 elelemntos
        const length = 2;
        const expected = false; //por que se espera que todas las tuplas sean de 2 elementos
        const recived = util.isArrayTuple(data, length);
        expect(recived).toBe(expected);
      });
      it("case: is array tuple and is items range between one and three elements", async () => {
        const data = [
          ["hola"],
          ["hello", "bye"],
          ["Kon'nichiwa", "Sayonara", "Ohayō"],
        ]; //tuplas entre 1 y 3 elementos
        const length = [1, 3] as [number, number]; //rango entre 1 y 3 elementos (siempre es incluyente)
        const expected = true;
        const recived = util.isTuple(data, length);
        expect(recived).toBe(expected);
      });
    });
  });
  describe("group: General", async () => {
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
        const recived = util.clone(data, "stringify");
        expect(recived).toStrictEqual(expected); //strict para verificar clonacion exacta
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
        const recived = util.clone(data, "structuredClone");
        expect(recived).toStrictEqual(expected); //strict para verificar clonacion exacta
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
        const recived = util.clone(data, "stringify");
        try {
          //siempre se dispara el error porque structuredClone no clona funciones
          const t = recived.pFn();
        } catch (error) {} //detectarlo y no hacer nada
        expect(recived)
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
        let recived = undefined;
        try {
          recived = util.clone(data, "structuredClone"); //❗structuredClone nisiquiera intenta la clonacion, lanza error❗
          const t = recived.pFn();
        } catch (error) {} //detectarlo y no hacer nada
        expect(recived)
          .not //no puede ser igual porque stringify no clona funciones
          .toStrictEqual(expected); //strict para verificar clonacion exacta
      });
      it("case: clone instance by stringify)", async () => {
        class ClassA {
          private p2: number;
          constructor(public p1: string) {}
          public doAny(): boolean {
            return true;
          }
        }
        const data = new ClassA("hola");
        const expected = new ClassA("hola");
        const recived = util.clone(data, "stringify");
        try {
          //siempre se dispara el error porque structuredClone no clona funciones
          const t = recived.doAny();
        } catch (error) {} //detectarlo y no hacer nada
        expect(recived)
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
        const recived = util.clone(data, "structuredClone");
        try {
          //siempre se dispara el error porque structuredClone no clona funciones
          const t = recived.doAny();
        } catch (error) {} //detectarlo y no hacer nada
        expect(recived)
          .not //no puede ser igual porque recived no es una instancia (no se clonaron las funciones)
          .toStrictEqual(expected);
      });
    });
    describe("method: isValueType", async () => {
      it("case: exception is not types array valid", async () => {
        const expectedThrow = /is not array types valid/;
        const recivedThrowFn = () => util.isValueType("lo que sea", null); //null no es array de tipos
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: exception is not types array valid (1)", async () => {
        const expectedThrow = /is not array types valid/;
        const recivedThrowFn = () => util.isValueType("lo que sea", null); //null no es array de tipos
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
        const recivedThrowFn = () => util.isValueType("lo que sea", [null]); //los tipos se expresan en texto ( "null" ) o los tipos de agrupacion especial `[]` o `{}`
        expect(recivedThrowFn).toThrowError(expectedThrow);
      });
      it("case: is undefined", async () => {
        const data = null;
        const expected = false;
        const recived = util.isValueType(data, ["undefined"]);
        expect(recived).toBe(expected);
      });
      it("case: is null", async () => {
        const data = undefined;
        const expected = false;
        const recived = util.isValueType(data, ["null"]);
        expect(recived).toBe(expected);
      });
      it("case: is boolean", async () => {
        const data = 0;
        const expected = false;
        const recived = util.isValueType(data, ["boolean"]);
        expect(recived).toBe(expected);
      });
      it("case: is number (1)", async () => {
        const data = true;
        const expected = false;
        const recived = util.isValueType(data, ["number"]);
        expect(recived).toBe(expected);
      });
      it("case: is number (2)", async () => {
        const data = "1";
        const expected = false;
        const recived = util.isValueType(data, ["number"]);
        expect(recived).toBe(expected);
      });
      it("case: is number (3)", async () => {
        const data = 1;
        const expected = true;
        const recived = util.isValueType(data, ["number"]);
        expect(recived).toBe(expected);
      });
      it("case: is number (4 string-number)", async () => {
        const data = "1";
        const expected = true;
        const recived = util.isValueType(data, ["number"], {
          allowNumber_String: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: is string (1)", async () => {
        const data = true;
        const expected = false;
        const recived = util.isValueType(data, ["string"]);
        expect(recived).toBe(expected);
      });
      it("case: is string (2)", async () => {
        const data = "hola";
        const expected = true;
        const recived = util.isValueType(data, ["string"]);
        expect(recived).toBe(expected);
      });
      it("case: is string (3 string empty invalid)", async () => {
        const data = "";
        const expected = false;
        const recived = util.isValueType(data, ["string"]);
        expect(recived).toBe(expected);
      });
      it("case: is string (4 string empty valid)", async () => {
        const data = "";
        const expected = true;
        const recived = util.isValueType(data, ["string"], {
          allowStringEmpty: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: is string (5 string empty invalid)", async () => {
        const data = "";
        const expected = false;
        const recived = util.isValueType(data, ["undefined", "null", "string"]);
        expect(recived).toBe(expected);
      });
      it("case: is object (1 explicit object, empty invalid)", async () => {
        const data = {};
        const expected = false; //No se permite objeto vácio ❗Comportamiento predefinido❗
        const recived = util.isValueType(data, ["undefined", "null", "object"]);
        expect(recived).toBe(expected);
      });
      it("case: is object (2 explicit object, empty valid)", async () => {
        const data = {};
        const expected = true; //se permite objeto vácio
        const recived = util.isValueType(
          data,
          ["undefined", "null", "object"],
          { allowObjectEmpty: true }
        );
        expect(recived).toBe(expected);
      });
      it("case: is object (3 implicit object, empty invalid)", async () => {
        const data = {};
        const expected = false; //No se permite objeto vácio ❗Comportamiento predefinido❗
        const recived = util.isValueType(data, ["undefined", "null", {}]);
        expect(recived).toBe(expected);
      });
      it("case: is object (4 implicit object, empty valid)", async () => {
        const data = {};
        const expected = true; //se permite objeto vácio
        const recived = util.isValueType(data, ["undefined", "null", {}], {
          allowObjectEmpty: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: is object (5 check subprop valid)", async () => {
        const data = { a: 1 };
        const expected = true; //la propiedad `a` es almenos es un número
        const recived = util.isValueType(data, [
          "undefined",
          "null",
          { a: ["string", "number"] },
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is object (6 define {} as types is not empty)", async () => {
        const data = { a: "lo que sea" };
        const expected = true; //el objeto tienen propiedades, no importan sus tipos
        const recived = util.isValueType(data, ["undefined", "null", {}]); //❗{}, no significa objeto vacio, significa objeto con cualquier tipo de propiedades❗
        expect(recived).toBe(expected);
      });
      it("case: is object (7 ignore others properties)", async () => {
        const data = { a: 1, b: "lo que sea" };
        const expected = true; //la propiedad `a` es almenos numero y las demas propiedades son ignoradas
        const recived = util.isValueType(data, [
          "undefined",
          "null",
          { a: ["boolean", "number"] },
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is object (8 deep level)", async () => {
        const data = { a: { aa: 1 } };
        const expected = false; //la propiedad `a` es almenos objeto pero, la propiedad `aa` no es string
        const recived = util.isValueType(data, [
          "undefined",
          "null",
          { a: ["boolean", { aa: ["string"] }] },
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is array (1 explicit array, empty invalid)", async () => {
        const data = [];
        const expected = false; //No se permite array vácio ❗Comportamiento predefinido❗
        const recived = util.isValueType(data, ["undefined", "null", "array"]);
        expect(recived).toBe(expected);
      });
      it("case: is array (2 explicit array, empty valid)", async () => {
        const data = [];
        const expected = true; //se permite array vácio
        const recived = util.isValueType(data, ["undefined", "null", "array"], {
          allowArrayEmpty: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: is array (3 implicit array, empty invalid)", async () => {
        const data = [];
        const expected = false; //No se permite array vácio ❗Comportamiento predefinido❗
        const recived = util.isValueType(data, ["undefined", "null", []]);
        expect(recived).toBe(expected);
      });
      it("case: is array (4 implicit array, empty valid)", async () => {
        const data = [];
        const expected = true; //se permite array vácio
        const recived = util.isValueType(data, ["undefined", "null", []], {
          allowArrayEmpty: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: is array (5 define [] as types is not empty)", async () => {
        const data = [1, 2, 3];
        const expected = true; //es un array con elementos de cualquier tipo
        const recived = util.isValueType(data, ["undefined", "null", []]); //❗[] en el esquema de `types` no significa que se permita array vacio, indica que los elementos del arrya pueden ser de cualquier tipo ❗
        expect(recived).toBe(expected);
      });
      it("case: is array (6 all the same type)", async () => {
        const data = [1, 2, 3];
        const expected = false; //los elementos del array son solo números
        const recived = util.isValueType(data, [
          "undefined",
          "null",
          ["boolean", "string"],
        ]); //❗[] en el esquema de `types` no significa que se permita array vacio, indica que los elementos del arrya pueden ser de cualquier tipo ❗
        expect(recived).toBe(expected);
      });
      it("case: is array (7 diferent type)", async () => {
        const data = [1, "hola", 3];
        const expected = false; //solo un elemento del array es string, para que sea valido todos los elementos del array deben ser "boolean" o "string"
        const recived = util.isValueType(data, [
          "undefined",
          "null",
          ["boolean", "string"],
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is array (8 deep level and objects)", async () => {
        const data = [1, ["a", "b", "c"], { a: "hola" }];
        const expected = true;
        const recived = util.isValueType(data, [
          ["number", ["string"], { a: ["string"] }],
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is tuple (1 explicit)", async () => {
        const data = ["clave", "valor"]; //tupla
        const expected = true;
        const recived = util.isValueType(data, ["null", "tuple"], {
          tupleSize: 2,
        }); //❗si se verifica explicitamente "tuple", es obligatorio asignar el tamaño de la tupla❗
        expect(recived).toBe(expected);
      });
      it("case: is tuple (2 implicit)", async () => {
        const data = ["clave", "valor"]; //tupla
        const expected = true;
        //❗si en el mismo nivel del esquema de `types` (en cualquier nivel pero que sea el mismo), se detecta que hay 2 o mas array internamente el metodo asume validacion de tupla❗
        const recived = util.isValueType(data, [
          "null",
          ["string", "number"],
          ["string"],
        ]);
        expect(recived).toBe(expected);
      });
      it("case: is tuple (2 implicit, tuple size is invalid)", async () => {
        const data = ["clave", "valor"]; //tupla
        const expected = false; // se le da prioridad a la configuracion de
        // `tupleSize` dado que se está verificando una tupla de 3 elementos
        //es invalido
        const recived = util.isValueType(
          data,
          ["null", ["string", "number"], ["string"]],
          { tupleSize: 3 }
        ); //se solicita 3 elementos
        expect(recived).toBe(expected);
      });
      it("case: is function", async () => {
        const data = () => console.log("lo que sea");
        const expected = true;
        const recived = util.isValueType(data, ["function"]);
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([] as any, {});
        expect(recived).toBe(expected);
      });
      it("case: one data compare data", async () => {
        const data1 = 1;
        const expected = false;
        const recived = util.isEquivalentTo([data1] as any, {});
        expect(recived).toBe(expected);
      });
      it("case: undefined key or keys path data", async () => {
        const expected = true;
        const recived = util.isEquivalentTo([] as any, {
          keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
        });
        expect(recived).toBe(expected);
      });
      it("case: null === undefined are not equivalent)", async () => {
        const data1 = null;
        const data2 = undefined;
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: boolean number are not equivalent", async () => {
        const data1 = 0;
        const data2 = false;
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: function === null are not equivalent", async () => {
        const data1 = () => 5;
        const data2 = null;
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: functions are not equivalent", async () => {
        const data1 = () => 5;
        const data2 = (p) => p;
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: functions are equivalent", async () => {
        const data1 = (p) => p;
        const data2 = (p) => p;
        const expected = true;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: numbers are not equivalent", async () => {
        const data1 = 0;
        const data2 = 33;
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: string  === number are not equivalent", async () => {
        const data1 = "33"; //string
        const data2 = 33; //number
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: string as number are equivalent", async () => {
        const data1 = "33"; //string
        const data2 = 33; //number
        const expected = true;
        const recived = util.isEquivalentTo([data1, data2], {
          isCompareStringToNumber: true, //❗permite comparacion de texto numerico con numero❗
        });
        expect(recived).toBe(expected);
      });
      it("case: strings are equivalent", async () => {
        const data1 = "hola";
        const data2 = "hola";
        const expected = true;
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: strings are not equivalent (is case sensitive)", async () => {
        const data1 = "Hola";
        const data2 = "hola";
        const expected = false;
        const recived = util.isEquivalentTo([data1, data2], {
          isCaseSensitiveForString: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings are equivalent (is not case sensitive)", async () => {
        const data1 = "Hola";
        const data2 = "hola";
        const expected = true;
        const recived = util.isEquivalentTo([data1, data2], {
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objetc are strict equivalent", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: objetc are not strict equivalent", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: objetc are not strict equivalent", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {
          isCompareLength: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: objetc are equivalent (by keyPath)", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: "_id",
        });
        expect(recived).toBe(expected);
      });
      it("case: objetc are not equivalent (by keyPath)", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: "_id",
        }); //se va acomparar por "_id"
        expect(recived).toBe(expected);
      });
      it("case: objetcs (some object or both) contains props undefined and no exists)", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
      });
      it("case: objetc are equivalent (by keysPath and deep)", async () => {
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: ["_id", "p2.p24.p241"],
        }); //se va acomparar por "_id" y su valor
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {});
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          isCompareLength: true,
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          isStrictArrayOrder: true, //negar desordenados
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          isStrictArrayOrder: false, //aceptar desordenados
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: ["p2.p21"], //❗se toma como referencia el *primer* objeto
          //encontrado en el *primer* nivel del array
          //profundicaciones de array mayores no se han probado
          //ejemplo: [[{id:1}]] //el objeto esta 2 niveles del array raiz, no se ha probado
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: ["p2.p21"], //será ignorado porque uno de los elementos del array raiz no es equivalente
        });
        expect(recived).toBe(expected);
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
        const recived = util.isEquivalentTo([data1, data2], {
          keyOrKeysPath: ["p2.p21"], //será ignorado porque uno de los elementos que acompañan al objeto en este nivel so es equivalente
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: empty compare data (is allow equivalent)", async () => {
        const expected = true;
        const recived = util.isGreaterTo([] as any, {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data", async () => {
        const data1 = 1;
        const expected = true;
        const recived = util.isGreaterTo([data1] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data ( data undefined, is deny equvalent)", async () => {
        const data1 = undefined;
        const expected = false;
        const recived = util.isGreaterTo([data1] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data ( data undefined, is allow equvalent)", async () => {
        const data1 = undefined;
        const expected = true;
        const recived = util.isGreaterTo([data1] as any, {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: undefined key or keys path data", async () => {
        const expected = true;
        const recived = util.isGreaterTo([1, 0] as any, {
          isAllowEquivalent: false,
          keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
        });
        expect(recived).toBe(expected);
      });
      it("case: undefined === undefined (is deny equivalent))", async () => {
        const data1 = undefined;
        const data2 = undefined;
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: null > undefined)", async () => {
        const data1 = null;
        const data2 = undefined;
        const expected = true; //null pesa mas que undefined
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: booleans)", async () => {
        const data1 = true;
        const data2 = false;
        const expected = true; //true pesa mas que false
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: booleans (is deny equivalent))", async () => {
        const data1 = true;
        const data2 = true;
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: number > boolean)", async () => {
        const data1 = 0;
        const data2 = false;
        const expected = true; //number (0) pesa mas que false
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: numbers)", async () => {
        const data1 = 4;
        const data2 = 3;
        const expected = true;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: numbers (is deny equivalent))", async () => {
        const data1 = 4;
        const data2 = 4;
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: string-number (is allow equivalent, is deny stringToNumber)", async () => {
        const data1 = 4;
        const data2 = "4";
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, // permitir equivalencia
          isCompareStringToNumber: false, //denegar conversion de texto numerico
        });
        expect(recived).toBe(expected);
      });
      it("case: string-number (is allow equivalent, is allow stringToNumber)", async () => {
        const data1 = 4;
        const data2 = "4";
        const expected = true;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, // permitir equivalencia
          isCompareStringToNumber: true, //permitir conversion de texto numerico
        });
        expect(recived).toBe(expected);
      });
      it("case: string > number (is deny stringToNumber))", async () => {
        const data1 = "1";
        const data2 = 2;
        const expected = true; //"1" en string pesa mas que 2 en numero
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          isCompareStringToNumber: false, //❗denegar conversion de texto numerico❗
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is not case sensitive, is deny equivalent)", async () => {
        const data1 = "Hola";
        const data2 = "hola";
        const expected = false; //aunque "H" pesa mas que "h", al ser no sensitivo
        //esta comparando equivalencia y la equivalencia esta denegada
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is not case sensitive, is allow equivalent)", async () => {
        const data1 = "hola";
        const data2 = "Hola";
        const expected = true; //aunque "h" pesa menos que "H", al ser no sensitivo
        //esta comparando equivalencia y la equivalencia esta permitida
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true,
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is case sensitive, is allow equivalent)", async () => {
        const data1 = "hola";
        const data2 = "Hola";
        const expected = false; //"h" pesa menos que "H" y es sensitivo
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true,
          isCaseSensitiveForString: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (strings-number, is allow equivalent)", async () => {
        const data1 = "1";
        const data2 = "-10"; //el "-" pesa menos que "1"
        const expected = true;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it('case: strings ("a" > "1")', async () => {
        const data1 = "a";
        const data2 = "1";
        const expected = true; //segun localCompare "a" pesa mas que "1"
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (similar words)", async () => {
        const data1 = "Edificio";
        const data2 = "Edificacion";
        const expected = true; //segun localCompare "Edifici" pesa mas que "Edifica" ("i" es mas pesado que "a")
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: object > string", async () => {
        const data1 = {};
        const data2 = "1";
        const expected = true; //asi objeto litearal sea vacio pesa mas que el string
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (is deny equivalent)", async () => {
        const data1 = {};
        const data2 = {};
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (without keysPath)", async () => {
        const data1 = { p: "2" };
        const data2 = { p: "1" };
        const expected = true; //comparara propiedad por propiedad (internamente
        //las ordenará y las comparará en orden alfabetico)
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (without keysPath)", async () => {
        const data1 = { p: "-2" }; //el "-" hace que pese mas
        const data2 = { p: "1" };
        const expected = false; //comparara propiedad por propiedad (internamente
        //las ordenará y las comparará en orden alfabetico)
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with keysPath)", async () => {
        const data1 = { p: "-2", q: 3 }; //se compara como strings
        const data2 = { p: "1", q: 2 }; //se compara como strings
        const expected = false; // se comparará por la propiedad `p` asi que el "-" pesa menos que "1"
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath)", async () => {
        const data1 = { age: 20, money: 500 };
        const data2 = { age: 19, money: 600 };
        const expected = true; // `age` es mayor en data1
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with one keysPath, is not allow Equivalent)", async () => {
        const data1 = { age: 20, money: 500 };
        const data2 = { age: 20, money: 600 };
        const expected = false; // `age` es igual y esta denegado la equivalencia
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath, is not allow Equivalent)", async () => {
        const data1 = { age: 20, money: 500 };
        const data2 = { age: 20, money: 600 };
        const expected = false; // `age` es igual, entonces sigue con money que no cumple el ser mayor
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age", "money"], //❗Importantisimo❗ el orden, se compara `age` primero y solo si es equivalente se evaluara `money`
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (1), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 2 } };
        const data2 = { live: 1, caracter: { name: "Ada", armor: 3 } };
        const expected = true; //al ser `live` equivalentes, la siguiente comparacion es "Leon" pesa mas que "Ada"
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name"], //❗Importantisimo❗ solo se comparará `"caracter.name"` si `"live"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (2), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 2 } };
        const data2 = { live: 1, caracter: { name: "Ada", armor: 3 } };
        const expected = true; //`name` no es equivalnete por lo tanto `armor` no se tiene en cuenta
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` son equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (3), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const expected = false; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente pero es denegado
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (3), is allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it('case: objects (with one keysPath and deep (3), object mode "only-keys", is allow Equivalent)', async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const data2 = {
          live: 1,
          power: 65535,
          caracter: { multiPower: 65535, name: "Leon", armor: 3 },
        };
        const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          //no importa que `data2` tenga mas propiedades (incluso si tienen valores grandes), no son tomadas en cuenta
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: array > object)", async () => {
        const data1 = { "0": 1, "1": 2 }; //objeto pesa menos
        const data2 = [1, 2]; // arrya pesa mas
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
      });
      it("case: array (any type items 1))", async () => {
        const data1 = [{ p1: "A" }, { p1: 31 }]; //elemento tipo objeto pesan mas
        const data2 = ["A", 31]; //elementos primitivos pesan menos
        const expected = true;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
      });
      it("case: array (any type items 2)", async () => {
        const data1 = [{ p1: "A" }, { p1: 31 }]; //elementos tipo objeto pesan menos
        const data2 = [["A"], [31]]; //elementos tipo array pesan mas
        const expected = false;
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p1"],
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p1", "p2"], //❗el orden importa❗,
        });
        expect(recived).toBe(expected);
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
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p2", "p1"], //❗el orden importa❗,
        });
        expect(recived).toBe(expected);
      });
      it("case: function > null)", async () => {
        const data1 = () => {};
        const data2 = null;
        const expected = true; //function pesa mas que null
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: functions)", async () => {
        const data1 = (p) => {
          return p;
        };
        const data2 = () => {
          return 5;
        };
        const expected = true; //RECORDAR:
        //❗compara funciones de acuerdo al tamaño que ocupa su string al pasarla
        //por stringify(), el string resultado de stringify() elimina caracteres
        //inecesarios (saltos de linea, tabs, espacios, etc)❗
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: boolean > function)", async () => {
        const data1 = false;
        const data2 = () => {};
        const expected = false; //false pesa menos que function
        const recived = util.isGreaterTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: empty compare data (is allow equivalent)", async () => {
        const expected = true;
        const recived = util.isLesserTo([] as any, {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data", async () => {
        const data1 = 1;
        const expected = false;
        const recived = util.isLesserTo([data1] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data ( data undefined, is deny equvalent)", async () => {
        const data1 = undefined;
        const expected = false;
        const recived = util.isLesserTo([data1] as any, {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: one data compare data ( data undefined, is allow equvalent)", async () => {
        const data1 = undefined;
        const expected = true;
        const recived = util.isLesserTo([data1] as any, {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: undefined key or keys path data", async () => {
        const expected = true;
        const recived = util.isLesserTo([0, 1] as any, {
          isAllowEquivalent: false,
          keyOrKeysPath: undefined, //se permite no enviar ningun clave identificadora
        });
        expect(recived).toBe(expected);
      });
      it("case: undefined === undefined (is deny equivalent))", async () => {
        const data1 = undefined;
        const data2 = undefined;
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: undefined < null)", async () => {
        const data1 = undefined;
        const data2 = null;
        const expected = true; //undefined pesa menos que undefined
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: booleans)", async () => {
        const data1 = false;
        const data2 = true;
        const expected = true; //false pesa menos que true
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: booleans (is deny equivalent))", async () => {
        const data1 = false;
        const data2 = false;
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: boolean < number)", async () => {
        const data1 = false;
        const data2 = 0;
        const expected = true; //false pesa menos que number (incluso el 0)
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: numbers)", async () => {
        const data1 = 3;
        const data2 = 4;
        const expected = true;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: numbers (is deny equivalent))", async () => {
        const data1 = 4;
        const data2 = 4;
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, // denegado equivalencia
        });
        expect(recived).toBe(expected);
      });
      it("case: string-number (is allow equivalent, is deny stringToNumber)", async () => {
        const data1 = "4"; //❌ pesa mas por ser string
        const data2 = 4;
        const expected = false; //string pesa mas que number
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, // permitir equivalencia
          isCompareStringToNumber: false, //denegar conversion de texto numerico
        });
        expect(recived).toBe(expected);
      });
      it("case: string-number (is allow equivalent, is allow stringToNumber)", async () => {
        const data1 = "4";
        const data2 = 4;
        const expected = true;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, // permitir equivalencia
          isCompareStringToNumber: true, //permitir conversion de texto numerico
        });
        expect(recived).toBe(expected);
      });
      it("case: number < string (is deny stringToNumber))", async () => {
        const data1 = "1";
        const data2 = 2;
        const expected = false; //"1" en string pesa mas que 2 en numero
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          isCompareStringToNumber: false, //❗denegar conversion de texto numerico❗
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is not case sensitive, is deny equivalent)", async () => {
        const data1 = "hola";
        const data2 = "Hola";
        const expected = false; //aunque "h" pesa menos que "H", al ser no sensitivo
        //esta comparando equivalencia y la equivalencia esta denegada
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is not case sensitive, is allow equivalent)", async () => {
        const data1 = "Hola";
        const data2 = "hola";
        const expected = true; //aunque "H" pesa mas que "h", al ser no sensitivo
        //esta comparando equivalencia y la equivalencia esta permitida
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true,
          isCaseSensitiveForString: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (is case sensitive, is allow equivalent)", async () => {
        const data1 = "Hola";
        const data2 = "hola";
        const expected = false; //"H" pesa mas que "h" y es sensitivo
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true,
          isCaseSensitiveForString: true,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (strings-number, is allow equivalent)", async () => {
        const data1 = "-10";
        const data2 = "1";
        const expected = true; //el caracter "-" pesa menos que "1"
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true,
        });
        expect(recived).toBe(expected);
      });
      it('case: strings ("1" < "a")', async () => {
        const data1 = "1";
        const data2 = "a";
        const expected = true; //segun localCompare "1" pesa menos que "a"
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: strings (similar words)", async () => {
        const data1 = "Edificio";
        const data2 = "Edificacion";
        const expected = false; //segun localCompare "Edifici" pesa mas que "Edifica" ("i" es mas pesado que "a")
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: string < object", async () => {
        const data1 = "1";
        const data2 = {};
        const expected = true; //asi objeto litearal sea vacio pesa mas que el string
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (is deny equivalent)", async () => {
        const data1 = {};
        const data2 = {};
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (without keysPath (1))", async () => {
        const data1 = { p: "1" };
        const data2 = { p: "2" };
        const expected = true; //comparará cada propiedad hasta que encuentre una no sea equivalente
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (without keysPath (2))", async () => {
        const data1 = { p: "1" };
        const data2 = { p: "-2" }; //el "-" hace que pese menos
        const expected = false; //comparará cada propiedad hasta que encuentre una no sea equivalente
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath)", async () => {
        const data1 = { p: "1", q: 2 }; //se compara como strings
        const data2 = { p: "-2", q: 1 }; //se compara como strings
        const expected = false; // se comparará por la propiedad `p` asi que el "-" pesa menos que "1"
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath)", async () => {
        const data1 = { age: 19, money: 600 };
        const data2 = { age: 20, money: 500 };
        const expected = true; // `age` es menor en data1
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with one keysPath, is not allow Equivalent)", async () => {
        const data1 = { age: 20, money: 500 };
        const data2 = { age: 20, money: 600 };
        const expected = false; // `age` es equivalente y esta denegado la equivalencia
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age"],
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath, is not allow Equivalent)", async () => {
        const data1 = { age: 20, money: 600 };
        const data2 = { age: 20, money: 500 };
        const expected = false; // `age` es igual, entonces sigue con money que no cumple el ser menor
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["age", "money"], //❗Importantisimo❗ el orden, se compara `age` primero y solo si es equivalente se evaluara `money`
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (1), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Ada", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 2 } };
        const expected = true; //al ser `live` equivalentes, la siguiente comparacion es "Ada" pesa menos que "Leon"
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name"], //❗Importantisimo❗ solo se comparará `"caracter.name"` si `"live"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (2), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Ada", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 2 } };
        const expected = true; //`name` no es equivalnete por lo tanto `armor` no se tiene en cuenta
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` son equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (3), is not allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const expected = false; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente pero es denegado
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: objects (with many keysPath and deep (3), is allow Equivalent)", async () => {
        const data1 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it('case: objects (with one keysPath and deep (3), object mode "only-keys", is allow Equivalent)', async () => {
        const data1 = {
          live: 1,
          power: 65535,
          caracter: { multiPower: 65535, name: "Leon", armor: 3 },
        };
        const data2 = { live: 1, caracter: { name: "Leon", armor: 3 } };
        const expected = true; //`armor` (que es el ultimo `keyOrKeysPath`) es equivalente y permitido
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //en este caso solo se aplicará al ultimo `keyOrKeysPath`
          //no importa que `data1` tenga mas propiedades (incluso si tienen valores grandes o pequeños), no son tomadas en cuenta
          keyOrKeysPath: ["live", "caracter.name", "caracter.armor"], //❗Importantisimo❗  solo se comparará `"caracter.armor"` si `"live"` y `"caracter.name"` es equivalente
        });
        expect(recived).toBe(expected);
      });
      it("case: object < array)", async () => {
        const data1 = [1, 2]; // array pesa mas
        const data2 = { "0": 1, "1": 2 }; //objeto pesa menos
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
      });
      it("case: array (any type items 1))", async () => {
        const data1 = ["A", 31]; //elementos primitivos pesan menos
        const data2 = [{ p1: "A" }, { p1: 31 }]; //elemento tipo objeto pesan mas
        const expected = true;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
      });
      it("case: array (any type items 2)", async () => {
        const data1 = [["A"], [31]]; //elementos tipo array pesan mas
        const data2 = [{ p1: "A" }, { p1: 31 }]; //elementos tipo objeto pesan menos
        const expected = false;
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: true, //solo afectará al ultimo elemento si los anteriores fueron equivalentes
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p1"],
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p1", "p2"], //❗el orden importa❗,
        });
        expect(recived).toBe(expected);
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
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
          keyOrKeysPath: ["p2", "p1"], //❗el orden importa❗,
        });
        expect(recived).toBe(expected);
      });
      it("case: null < function)", async () => {
        const data1 = null;
        const data2 = () => {};
        const expected = true; //null pesa manos que function
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: functions)", async () => {
        const data1 = () => {
          return 5;
        };
        const data2 = (p) => {
          return p;
        };
        const expected = true; //RECORDAR:
        //❗compara funciones de acuerdo al tamaño que ocupa su string al pasarla
        //por stringify(), el string resultado de stringify() elimina caracteres
        //inecesarios (saltos de linea, tabs, espacios, etc)❗
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
      it("case: function > array )", async () => {
        const data1 = () => {};
        const data2 = [1, 2, 3];
        const expected = false; //function pesa mas que array
        const recived = util.isLesserTo([data1, data2], {
          isAllowEquivalent: false,
        });
        expect(recived).toBe(expected);
      });
    });
  });
});
