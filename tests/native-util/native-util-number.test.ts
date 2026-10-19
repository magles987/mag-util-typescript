import { describe, expect, test, it, vi } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Numbers]", async () => {
  describe("method: isNumber", async () => {
    it("case: any number", async () => {
      const data = 10;
      const expected = true;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: any boolean", async () => {
      const data = true;
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: any object", async () => {
      const data: object = {};
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: any array", async () => {
      const data: any[] = [];
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: undefined", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: null", async () => {
      const data = null;
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
    it("case: any string", async () => {
      const data = "loquesea";
      const expected = false;
      const received = util.isNumber(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isBigint", async () => {
    it("case: is bigint", async () => {
      const data = 9007199254740991n;
      const expected = true;
      const received = util.isBigint(data);
      expect(received).toBe(expected);
    });
    it("case: is any number", async () => {
      const data = 10;
      const expected = false;
      const received = util.isBigint(data);
      expect(received).toBe(expected);
    });
    it("case: is any", async () => {
      const data = null;
      const expected = false;
      const received = util.isBigint(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isIntegerNumber", async () => {
    it("case: is integer", async () => {
      const data = 103;
      const expected = true;
      const received = util.isIntegerNumber(data);
      expect(received).toBe(expected);
    });
    it("case: is integer (negative)", async () => {
      const data = -103;
      const expected = true;
      const received = util.isIntegerNumber(data);
      expect(received).toBe(expected);
    });
    it("case: is not integer", async () => {
      const data = 20.8;
      const expected = false;
      const received = util.isIntegerNumber(data);
      expect(received).toBe(expected);
    });
    it("case: is any", async () => {
      const data = "loquesea";
      const expected = false;
      const received = util.isIntegerNumber(data as any);
      expect(received).toBe(expected);
    });
  });
  describe("method: isFloatNumber", async () => {
    it("case: is float", async () => {
      const data = 10.3;
      const expected = true;
      const received = util.isFloatNumber(data);
      expect(received).toBe(expected);
    });
    it("case: is not integer", async () => {
      const data = 208;
      const expected = false;
      const received = util.isFloatNumber(data);
      expect(received).toBe(expected);
    });
    it("case: is any", async () => {
      const data = "loquesea";
      const expected = false;
      const received = util.isFloatNumber(data as any);
      expect(received).toBe(expected);
    });
  });
  describe("method: isNumberSign", async () => {
    it("case: any boolean", async () => {
      const data = true;
      const expected = false;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: any object", async () => {
      const data = {};
      const expected = false;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: any array", async () => {
      const data: any[] = [];
      const expected = false;
      const received = util.isNumberSign(data, "-");
      expect(received).toBe(expected);
    });
    it("case: undefined", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: null", async () => {
      const data = null;
      const expected = false;
      const received = util.isNumberSign(data, "-");
      expect(received).toBe(expected);
    });
    it("case: any string", async () => {
      const data = "loquesea";
      const expected = false;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: numeric string", async () => {
      const data = "10";
      const expected = false; //los string no tienen polaridad
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: is not positive", async () => {
      const data = -10;
      const expected = false;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: is not negative", async () => {
      const data = 10;
      const expected = false;
      const received = util.isNumberSign(data, "-");
      expect(received).toBe(expected);
    });
    it("case: is negative", async () => {
      const data = -10;
      const expected = true;
      const received = util.isNumberSign(data, "-");
      expect(received).toBe(expected);
    });
    it("case: is positive", async () => {
      const data = 10;
      const expected = true;
      const received = util.isNumberSign(data, "+");
      expect(received).toBe(expected);
    });
    it("case: 0 (is not positive or not negative)", async () => {
      const data = 0;
      const expected_positive = false;
      const expected_negative = false;
      const received_positive = util.isNumberSign(data, "+");
      const received_negative = util.isNumberSign(data, "-");
      expect(received_positive).toBe(expected_positive);
      expect(received_negative).toBe(expected_negative);
    });
    it("case: 0 (is positive or negative)", async () => {
      const data = 0;
      const isZeroIncluded = true; //incluirlo en cualquiera de las 2 polaridades
      const expected_positive = true;
      const expected_negative = true;
      const received_positive = util.isNumberSign(data, "+", isZeroIncluded);
      const received_negative = util.isNumberSign(data, "-", isZeroIncluded);
      expect(received_positive).toBe(expected_positive);
      expect(received_negative).toBe(expected_negative);
    });
    it("case: sing to exception", async () => {
      const data = 10;
      const expectedThrow = /is not sign/;
      const receivedThrowFn = () => util.isNumberSign(data, "#" as any, true);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
  });
  describe("method: isOddNumber", async () => {
    it("case: odd integer", async () => {
      const data = 7;
      const expected = true;
      const received = util.isOddNumber(data);
      expect(received).toBe(expected);
    });
    it("case: even integer", async () => {
      const data = 8;
      const expected = false;
      const received = util.isOddNumber(data);
      expect(received).toBe(expected);
    });
    it("case: decimal without rounding", async () => {
      const data = 7.5;
      const expected = false; //un número decimal no puede ser para ni impar
      const received = util.isOddNumber(data);
      expect(received).toBe(expected);
    });
    it("case: decimal rounded before checking parity", async () => {
      const data = 4.8;
      const expected = [true, false, true];
      const received = [
        util.isOddNumber(data, "round"),
        util.isOddNumber(data, "floor"),
        util.isOddNumber(data, "ceil"),
      ];
      expect(received[0]).toBe(expected[0]);
      expect(received[1]).toBe(expected[1]);
      expect(received[2]).toBe(expected[2]);
    });
    it("case: invalid number", async () => {
      expect(util.isOddNumber(Number.NaN)).toBe(false);
    });
  });
  describe("method: numberToBigint", async () => {
    it("case: integer number", async () => {
      expect(util.numberToBigint(7)).toBe(7n);
    });
    it("case: truncates positive decimal toward zero", async () => {
      expect(util.numberToBigint(7.9)).toBe(7n);
    });
    it("case: truncates negative decimal toward zero", async () => {
      expect(util.numberToBigint(-7.9)).toBe(-7n);
    });
    it("case: bigint is returned unchanged", async () => {
      expect(util.numberToBigint(9007199254740993n)).toBe(9007199254740993n);
    });
    it("case: non-finite number to exception", async () => {
      expect(() => util.numberToBigint(Number.POSITIVE_INFINITY)).toThrowError(
        /is not number or string-number valid/,
      );
    });
  });
  describe("method: bigintToNumber", async () => {
    it("case: bigint to number", async () => {
      expect(util.bigintToNumber(123n)).toBe(123);
    });
    it("case: number is returned unchanged", async () => {
      expect(util.bigintToNumber(-12.5)).toBe(-12.5);
    });
    it("case: unsafe bigint warns about possible precision loss", async () => {
      const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
      try {
        const received = util.bigintToNumber(
          BigInt(Number.MAX_SAFE_INTEGER) + 1n,
        );
        expect(received).toBe(9007199254740992);
        expect(warnSpy).toHaveBeenCalledOnce();
      } finally {
        vi.restoreAllMocks();
      }
    });
    it("case: invalid value to exception", async () => {
      expect(() => util.bigintToNumber(Number.NaN)).toThrowError(
        /is not number or string-number valid/,
      );
    });
  });
  describe("method: toggleNumberSign", async () => {
    it("case: positive number", async () => {
      expect(util.toggleNumberSign(5)).toBe(-5);
    });
    it("case: negative number", async () => {
      expect(util.toggleNumberSign(-10)).toBe(10);
    });
    it("case: zero is unchanged", async () => {
      expect(util.toggleNumberSign(0)).toBe(0);
      expect(Object.is(util.toggleNumberSign(-0), -0)).toBe(true);
    });
    it("case: non-finite number to exception", async () => {
      expect(() =>
        util.toggleNumberSign(Number.POSITIVE_INFINITY),
      ).toThrowError(/is not number valid/);
    });
  });
  describe("method: roundNumber", async () => {
    it("case is not number to exception", async () => {
      const data = "loquesea";
      const expectedThrow = /is not valid number/;
      const receivedThrowFn = () => util.roundNumber("round", data as any, 0);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case is not exponential number to exception", async () => {
      const data = 5;
      const expData = "loquesea";
      const expectedThrow = /is not valid exponential number/;
      const receivedThrowFn = () =>
        util.roundNumber("round", data as any, expData as any);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
    it("case non-integer exponent to exception", async () => {
      expect(() => util.roundNumber("round", 1.25, -1.5)).toThrowError(
        /is not exponential factor valid/,
      );
    });
    describe("cases round", async () => {
      //hacia arriba o hacia abajo
      it("case float number (0 exponent, basic use)", async () => {
        const data = 10.555555555555;
        const exp = 0; //se comporta como Math.round() normal
        const expected = 11; //el redondeo al entero mas cercano
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (tenth down)", async () => {
        const data = 10.12;
        const exp = -1; //solo decimas 0.x
        const expected = 10.1; //en round 10.1[2] ( 2 < 5) entonces 10.1
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth down)", async () => {
        const data = 10.12345;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.12; //en round 10.12[3]xx ( 3 < 5) entonces 10.12
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth up)", async () => {
        const data = 10.12645;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.13; //en round 10.12[6]xx ( 6 >= 5) entonces 10.13
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth equal)", async () => {
        const data = 10.12545;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.13; //en round 10.12[5]xx ( 5 == 5) entonces 10.13 (igualados redondea hacia arriba)
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (0.0)", async () => {
        const data = 0.0;
        const exp = -3; //milecimas (no importatia el que sea)
        const expected = 0; //en round .00[0] ( 0 < 5) entonces 0
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens down)", async () => {
        const data = 14;
        const exp = 1; //solo decenas
        const expected = 10; //en round 1[4] ( 4 < 5) entonces 10
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens up)", async () => {
        const data = 16;
        const exp = 1; //solo decenas
        const expected = 20; //en round 1[6] ( 6 >= 5) entonces 20
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (hundreds down)", async () => {
        const data = 126;
        const exp = 2; //solo centenas
        const expected = 100; //en round 1[2]6 ( 2 < 5) entonces 100
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands up)", async () => {
        const data = 1645;
        const exp = 3; //solo miles
        const expected = 2000; //en round 1[6]45 ( 6 >= 5) entonces 2000
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands- thousands down)", async () => {
        const data = 1645; //en escala de millares este numero es mas cercano a 0
        const exp = 6; //solo milllares
        const expected = 0; //en round [0]01645 ( 0 < 5) entonces 0
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number 0", async () => {
        const data = 0;
        const exp = 3; //miles (no importatia el que sea)
        const expected = 0; //en round [0]00 ( 0 < 5) entonces 0
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
    });
    describe("cases ceil", async () => {
      //hacia arriba
      it("case float number (tenth)", async () => {
        const data = 10.12;
        const exp = -1; //solo decimas 0.x
        const expected = 10.2; //en ceil 10.1[2] entonces 10.2
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth)", async () => {
        const data = 10.12345;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.13; //en ceil 10.12[3]xx entonces 10.13
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth)", async () => {
        const data = 10.12645;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.13; //en ceil .12[6]xx entonces 10.13
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (0.0)", async () => {
        const data = 0.0;
        const exp = -3; //milecimas (no importatia el que sea)
        const expected = 0; //en ceil .00[0] siempre 0
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens)", async () => {
        const data = 14;
        const exp = 1; //solo decenas
        const expected = 20; //en ceil 1[4]  entonces 20
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens)", async () => {
        const data = 16;
        const exp = 1; //solo decenas
        const expected = 20; //en ceil 1[6]  entonces 20
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (hundreds)", async () => {
        const data = 126;
        const exp = 2; //solo centenas
        const expected = 200; //en ceil 1[2]6  entonces 200
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands)", async () => {
        const data = 1645;
        const exp = 3; //solo miles
        const expected = 2000; //en ceil 1[6]45  entonces 2000
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands- thousands)", async () => {
        const data = 1645; //en escala de millares este numero es mas cercano a 0
        const exp = 6; //solo milllares
        const expected = 1000000; //en ceil [0]01645  entonces 1000000
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number 0", async () => {
        const data = 0;
        const exp = 3; //miles (no importatia el que sea)
        const expected = 0; //en ceil [0]00  entonces 0
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
    });
    describe("cases floor", async () => {
      //hacia abajo
      it("case float number (tenth)", async () => {
        const data = 10.12;
        const exp = -1; //solo decimas 0.x
        const expected = 10.1; //en floor .1[2] entonces 10.1
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth)", async () => {
        const data = 10.12345;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.12; //en floor 10.12[3]xx entonces 10.12
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (hundredth)", async () => {
        const data = 10.12645;
        const exp = -2; //solo centecimas 0.0x
        const expected = 10.12; //en floor 10.12[6]xx entonces 10.12
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case float number (0.0)", async () => {
        const data = 0.0;
        const exp = -3; //milecimas (no importatia el que sea)
        const expected = 0; //en floor .00[0] siempre 0
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens)", async () => {
        const data = 14;
        const exp = 1; //solo decenas
        const expected = 10; //en floor 1[4]  entonces 10
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (tens)", async () => {
        const data = 16;
        const exp = 1; //solo decenas
        const expected = 10; //en floor 1[6]  entonces 10
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (hundreds)", async () => {
        const data = 126;
        const exp = 2; //solo centenas
        const expected = 100; //en floor 1[2]6  entonces 100
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands)", async () => {
        const data = 1645;
        const exp = 3; //solo miles
        const expected = 1000; //en floor 1[6]45  entonces 1000
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number (thousands- thousands)", async () => {
        const data = 1645; //en escala de millares este numero es mas cercano a 0
        const exp = 6; //solo milllares
        const expected = 0; //en floor [0]01645  entonces 0
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case int number 0", async () => {
        const data = 0;
        const exp = 3; //miles (no importatia el que sea)
        const expected = 0; //en floor [0]00  entonces 0
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
    });
    describe("cases with negative numbers", async () => {
      it("case round follows Math.round tie behavior", async () => {
        const data = -1.5;
        const exp = 0;
        const expected = -1;
        const received = util.roundNumber("round", data, exp);
        expect(received).toBe(expected);
      });
      it("case floor rounds toward negative infinity", async () => {
        const data = -1.21;
        const exp = -1;
        const expected = -1.3;
        const received = util.roundNumber("floor", data, exp);
        expect(received).toBe(expected);
      });
      it("case ceil rounds toward positive infinity", async () => {
        const data = -1.21;
        const exp = -1;
        const expected = -1.2;
        const received = util.roundNumber("ceil", data, exp);
        expect(received).toBe(expected);
      });
    });
  });
  describe("method: isNumberInRange", async () => {
    it("case number in range (inclusive)", async () => {
      const data = -2;
      const range = [-10, 10] as [number, number];
      const isInclusive = true;
      const expected = true;
      const received = util.isNumberInRange(data, range, isInclusive);
      expect(received).toBe(expected);
    });
    it("case number in range (inclusive)", async () => {
      const data = -11;
      const range = [-10, 0] as [number, number];
      const isInclusive = true;
      const expected = false;
      const received = util.isNumberInRange(data, range, isInclusive);
      expect(received).toBe(expected);
    });
    it("case number in range (inclusive)", async () => {
      const data = -10;
      const range = [-10, 10] as [number, number];
      const isInclusive = true;
      const expected = true;
      const received = util.isNumberInRange(data, range, isInclusive);
      expect(received).toBe(expected);
    });
    it("case number in range (exclusive)", async () => {
      const data = -10;
      const range = [-10, 10] as [number, number];
      const isInclusive = false;
      const expected = false;
      const received = util.isNumberInRange(data, range, isInclusive);
      expect(received).toBe(expected);
    });
    it("case string in range (wrong)", async () => {
      const data = "hola";
      const range = [-10, 10] as [number, number];
      const isInclusive = false;
      const expected = false;
      const received = util.isNumberInRange(data as any, range, isInclusive);
      expect(received).toBe(expected);
    });
    it("case number in string range (exception)", async () => {
      const data = 10;
      const range = [-10, "hola"] as any;
      const isInclusive = false;
      const expectedThrow = /is not range tuple/;
      const receivedThrowFn = () =>
        util.isNumberInRange(data as any, range, isInclusive);
      expect(receivedThrowFn).toThrowError(expectedThrow);
    });
  });
  describe("method: adaptNumberToRange", async () => {
    it("case over range", async () => {
      const data = 15;
      const range = [-10, 10] as [number, number];
      const expected = 10;
      const received = util.adaptNumberToRange(data, range);
      expect(received).toBe(expected);
    });
    it("case below range", async () => {
      const data = -12;
      const range = [-10, 10] as [number, number];
      const expected = -10;
      const received = util.adaptNumberToRange(data, range);
      expect(received).toBe(expected);
    });
    it("case in range", async () => {
      const data = 2;
      const range = [-10, 10] as [number, number];
      const expected = 2;
      const received = util.adaptNumberToRange(data, range);
      expect(received).toBe(expected);
    });
    it("case is not number to exception", async () => {
      const data = "loquesea";
      const range = [0, 1];
      const expectedThrow = /is not number valid/;
      const recivedThrowFn = () =>
        util.adaptNumberToRange(data as any, range as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
    it("case is not range number to exception", async () => {
      const data = 0;
      const range = ["loquesea"];
      const expectedThrow = /is not range tuple/;
      const recivedThrowFn = () => util.adaptNumberToRange(data, range as any);
      expect(recivedThrowFn).toThrowError(expectedThrow);
    });
  });
});
