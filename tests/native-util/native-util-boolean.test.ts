import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Booleans]", async () => {
  describe("method: isBoolean", async () => {
    it("case: 0 is not boolean", async () => {
      const data = 0;
      const expected = false;
      const received = util.isBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: undefined is not boolean", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: null is not boolean", async () => {
      const data = null;
      const expected = false;
      const received = util.isBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: false is boolean", async () => {
      const data = false;
      const expected = true;
      const received = util.isBoolean(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: castBoolean", async () => {
    it("case: any number to boolean", async () => {
      const data = 10;
      const expected = true;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it('case: number 0 to boolean (default "isZeroAsTrue")', async () => {
      const data = 0;
      const expected = true;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: number 0 to boolean (not isZeroAsTrue)", async () => {
      const data = 0;
      const expected = false;
      // al estar vacio [], no habilita isZeroAsTrue y 0 es considerado valor falseable
      const received = util.convertToBoolean(data, []);
      expect(received).toBe(expected);
    });
    it("case: undefined to boolean", async () => {
      const data = undefined; //falseable
      const expected = false;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it('case: null to boolean (not "isNullAsTrue")', async () => {
      const data = null; //falseable
      const expected = false;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it('case: null to boolean ( "isNullAsTrue")', async () => {
      const data = null;
      const expected = true; //considerar a null como valor no falseable
      const received = util.convertToBoolean(data, ["isNullAsTrue"]);
      expect(received).toBe(expected);
    });
    it("case: string to boolean", async () => {
      const data = "loquesea";
      const expected = true;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: empty string to boolean", async () => {
      const data = "";
      const expected = false;
      const received = util.convertToBoolean(data, ["isNullAsTrue"]);
      expect(received).toBe(expected);
    });
    it("case: empty string to boolean (isEmptyAsTrue)", async () => {
      const data = "";
      const expected = true;
      const received = util.convertToBoolean(data, ["isEmptyAsTrue"]);
      expect(received).toBe(expected);
    });
    it("case: object to boolean", async () => {
      const data = { p: "loquesea" };
      const expected = true;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: empty object to boolean", async () => {
      const data = {};
      const expected = false;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: empty object to boolean (isEmptyAsTrue)", async () => {
      const data = {};
      const expected = true;
      const received = util.convertToBoolean(data, ["isEmptyAsTrue"]);
      expect(received).toBe(expected);
    });
    it("case: array to boolean", async () => {
      const data = ["loquesea"];
      const expected = true;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: empty array to boolean", async () => {
      const data: any[] = [];
      const expected = false;
      const received = util.convertToBoolean(data);
      expect(received).toBe(expected);
    });
    it("case: empty array to boolean (isEmptyAsTrue)", async () => {
      const data: any[] = [];
      const expected = true;
      const received = util.convertToBoolean(data, ["isEmptyAsTrue"]);
      expect(received).toBe(expected);
    });
  });
});
