import { describe, expect, test, it } from "vitest";
import { UtilExtension } from "./extension-util";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
const util = UtilExtension.getInstance(undefined);

describe("Util Extension", async () => {
  describe("group: General", async () => {
    it("case: clone instance (lodash libreria))", async () => {
      class ClassA {
        private p2: number;
        constructor(public p1: string) {}
        public doAny(): string {
          return this.p1;
        }
      }
      const data = new ClassA("hola");
      const vExp = "hola";
      const recived = util.clone(data, "lodash").doAny();
      expect(recived).toBe(vExp);
    });
  });
});
