import { describe, expect, test, it } from "vitest";
import { UtilNative } from "../../src/native-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████

const util = UtilNative.getInstance(undefined);

describe("Util Native context: [Undefined and Null]", async () => {
  describe("method: isUndefined", async () => {
    it("case: 0 is not undefined", async () => {
      const data = 0;
      const expected = false;
      const received = util.isUndefined(data);
      expect(received).toBe(expected);
    });
    it("case: false is not undefined", async () => {
      const data = false;
      const expected = false;
      const received = util.isUndefined(data);
      expect(received).toBe(expected);
    });
    it("case: null is not undefined", async () => {
      const data = null;
      const expected = false;
      const received = util.isUndefined(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isNull", async () => {
    it("case: 0 is not null", async () => {
      const data = 0;
      const expected = false;
      const received = util.isNull(data);
      expect(received).toBe(expected);
    });
    it("case: false is not null", async () => {
      const data = false;
      const expected = false;
      const received = util.isNull(data);
      expect(received).toBe(expected);
    });
    it("case: undefined is not null", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isNull(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isUndefinedOrNull", async () => {
    it("case: 0 is not undefined or null", async () => {
      const data = 0;
      const expected = false;
      const received = util.isUndefinedOrNull(data);
      expect(received).toBe(expected);
    });
    it("case: false is not undefined or null", async () => {
      const data = false;
      const expected = false;
      const received = util.isUndefinedOrNull(data);
      expect(received).toBe(expected);
    });
    it("case: undefined is undefined or null", async () => {
      const data = undefined;
      const expected = true;
      const received = util.isUndefinedOrNull(data);
      expect(received).toBe(expected);
    });
    it("case: null is undefined or null", async () => {
      const data = null;
      const expected = true;
      const received = util.isUndefinedOrNull(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: isNotUndefinedAndNotNull", async () => {
    it("case: 0 is not undefined and Not null", async () => {
      const data = 0;
      const expected = true;
      const received = util.isNotUndefinedAndNotNull(data);
      expect(received).toBe(expected);
    });
    it("case: false is not undefined or null", async () => {
      const data = false;
      const expected = true;
      const received = util.isNotUndefinedAndNotNull(data);
      expect(received).toBe(expected);
    });
    it("case: undefined is undefined or null", async () => {
      const data = undefined;
      const expected = false;
      const received = util.isNotUndefinedAndNotNull(data);
      expect(received).toBe(expected);
    });
    it("case: null is undefined or null", async () => {
      const data = null;
      const expected = false;
      const received = util.isNotUndefinedAndNotNull(data);
      expect(received).toBe(expected);
    });
  });
  describe("method: undefinedToNull", async () => {
    it("case: primitive is undefined)", async () => {
      const data = undefined;
      const expected = null;
      const received = util.undefinedToNull(data);
      expect(received).toBe(expected);
    });
    it("case: primitive is not undefined (no convertion)", async () => {
      const data = 45;
      const expected = 45; // se mantiene
      const received = util.undefinedToNull(data);
      expect(received).toBe(expected);
    });
    it("case: primitive is null (no convertion)", async () => {
      const data = null;
      const expected = null; //se mantiene
      const received = util.undefinedToNull(data);
      expect(received).toBe(expected);
    });
    it("case: undefined array props to null (not deep convertion)", async () => {
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
        null, //solo cambia el primer nivel
        {
          p1: "hola",
          p2: undefined, //no cambia
          p3: {
            p31: undefined, //no cambia
            p32: 23,
            p33: {
              p331: false,
              p332: null,
              p333: undefined,
            },
          },
        },
      ];
      const received = util.undefinedToNull(data, false);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined array props to null (deep convertion)", async () => {
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
              p332: null, //ya es null
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
        null, // cambia
        {
          p1: "hola",
          p2: null, //cambia
          p3: {
            p31: null, //cambia
            p32: 23,
            p33: {
              p331: false,
              p332: null, //se mantiene
              p333: null, //cambia
            },
            p34: [
              null, //cambia
              {
                p341: null, //cambia
              },
            ],
          },
        },
      ];
      const received = util.undefinedToNull(data, true);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined object props to null (not deep convertion)", async () => {
      const data = {
        p1: "hola",
        p2: undefined,
        p3: {
          p31: undefined,
          p32: 23,
          p33: {
            p331: false,
            p332: null, //ya es null
            p333: undefined,
          },
        },
      };
      const expected = {
        p1: "hola",
        p2: null, //solo cambia el primer nivel
        p3: {
          p31: undefined,
          p32: 23,
          p33: {
            p331: false,
            p332: null, // no cambia
            p333: undefined, // no cambia
          },
        },
      };
      const received = util.undefinedToNull(data, false);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined object props to null (deep convertion)", async () => {
      const data = {
        p1: "hola",
        p2: undefined,
        p3: {
          p31: undefined,
          p32: 23,
          p33: {
            p331: false,
            p332: null, //ya es null
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
        p2: null, //cambia
        p3: {
          p31: null, //cambia
          p32: 23,
          p33: {
            p331: false,
            p332: null, //se mantiene
            p333: null, //cambia
          },
          p34: [
            null, //cambia
            {
              p341: null, //cambia
            },
          ],
        },
      };
      const received = util.undefinedToNull(data, true);
      expect(received).toMatchObject(expected);
    });
    it("case: deep conversion handles nesting without recursion", async () => {
      const depth = 20000;
      const data: any = { value: undefined };
      let current = data;
      for (let index = 0; index < depth; index++) {
        current.next = { value: undefined };
        current = current.next;
      }

      const received = util.undefinedToNull(data, true) as any;
      current = received;
      for (let index = 0; index <= depth; index++) {
        expect(current.value).toBeNull();
        if (index < depth) current = current.next;
      }
      expect(data.value).toBeUndefined();
    });
    it("case: deep conversion preserves circular references", async () => {
      const data: { value: undefined; self?: any } = { value: undefined };
      data.self = data;

      const received = util.undefinedToNull(data, true) as any;

      expect(received.value).toBeNull();
      expect(received.self).toBe(received);
    });
  });
  describe("method: nullToUndefined", async () => {
    it("case: primitive is null", async () => {
      const data = null;
      const expected = undefined;
      const received = util.nullToUndefined(data);
      expect(received).toBe(expected);
    });
    it("case: primitive is not null (no convertion)", async () => {
      const data = 45;
      const expected = 45;
      const received = util.nullToUndefined(data);
      expect(received).toBe(expected);
    });
    it("case: primitive is undefined (no convertion)", async () => {
      const data = undefined;
      const expected = undefined;
      const received = util.nullToUndefined(data);
      expect(received).toBe(expected);
    });
    it("case: undefined array props to null (not deep convertion)", async () => {
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
              p332: undefined, //ya es undefined
              p333: null,
            },
          },
        },
      ];
      const expected = [
        undefined, //solo cambia el primer nivel
        {
          p1: "hola",
          p2: null, //no cambia
          p3: {
            p31: null, //no cambia
            p32: 23,
            p33: {
              p331: false,
              p332: undefined, //se mantiene
              p333: null, //no cambia
            },
          },
        },
      ];
      const received = util.nullToUndefined(data, false);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined array props to null (deep convertion)", async () => {
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
        undefined, //cambia
        {
          p1: "hola",
          p2: undefined, //cambia
          p3: {
            p31: undefined, //cambia
            p32: 23,
            p33: {
              p331: false,
              p332: undefined, // se mantiene
              p333: undefined, //cambia
            },
            p34: [
              undefined, //cambia
              {
                p341: undefined, //cambia
              },
            ],
          },
        },
      ];
      const received = util.nullToUndefined(data, true);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined object props to null (not deep convertion)", async () => {
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
          p31: null, //no cambia
          p32: 23,
          p33: {
            p331: false,
            p332: undefined, // se mantiene
            p333: null, //no cambia
          },
        },
      };
      const received = util.nullToUndefined(data, false);
      expect(received).toMatchObject(expected);
    });
    it("case: undefined object props to null (deep convertion)", async () => {
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
        p2: undefined, //cambia
        p3: {
          p31: undefined, //cambia
          p32: 23,
          p33: {
            p331: false,
            p332: undefined, //se mantiene
            p333: undefined, //cambia
          },
          p34: [
            undefined, //cambia
            {
              p341: undefined, //cambia
            },
          ],
        },
      };
      const received = util.nullToUndefined(data, true);
      expect(received).toMatchObject(expected);
    });
    it("case: deep conversion handles nesting without recursion", async () => {
      const depth = 20000;
      const data: any = { value: null };
      let current = data;
      for (let index = 0; index < depth; index++) {
        current.next = { value: null };
        current = current.next;
      }

      const received = util.nullToUndefined(data, true) as any;
      current = received;
      for (let index = 0; index <= depth; index++) {
        expect(current.value).toBeUndefined();
        if (index < depth) current = current.next;
      }
      expect(data.value).toBeNull();
    });
    it("case: deep conversion preserves circular references", async () => {
      const data: { value: null; self?: any } = { value: null };
      data.self = data;

      const received = util.nullToUndefined(data, true) as any;

      expect(received.value).toBeUndefined();
      expect(received.self).toBe(received);
    });
  });
});
