/**
 * @author MAG
 */
import lodash from "lodash";
import { UtilNative } from "./native-util";
import { TStrCase } from "./shared";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/** @info <hr>
 *
 * *Singleton*
 * utilidades comunes para la logica de aplicacion
 * ____
 */
export class Util_Logic extends UtilNative {
  /**Utilidades de lodash */
  public readonly lodash = lodash;
  /**
   * Almacena la instancia única de esta clase
   * ____
   */
  private static Util_Logic_instance: Util_Logic;
  /** */
  constructor() {
    super();
  }
  /**
   * devuelve la instancia única de esta clase
   * ya sea que la crea o la que ya a sido creada
   * ____
   */
  public static getInstance(): Util_Logic {
    Util_Logic.Util_Logic_instance =
      Util_Logic.Util_Logic_instance === undefined ||
      Util_Logic.Util_Logic_instance === null
        ? new Util_Logic()
        : Util_Logic.Util_Logic_instance;
    return Util_Logic.Util_Logic_instance;
  }
  //████Booleanos████████████████████████████████████████████████████
  //...aqui personalizacion
  //████Numeros██████████████████████████████████████████████████████
  //...aqui personalizacion
  //████Textos█████████████████████████████████████████████████████
  public override convertStringToCase(str: string, caseType: TStrCase): string {
    if (this.isNotString(str)) return str;
    switch (caseType) {
      //convertir a snakeCase
      case "Snake":
        return this.lodash.snakeCase(str);
        break;
      case "Kebab":
        return this.lodash.kebabCase(str);
        break;
      case "Camel":
        return this.lodash.camelCase(str);
        break;
      case "Pascal":
        return super.convertStringToCase(str, caseType);
        break;
      default:
        return str;
        break;
    }
  }
  //████Objetos██████████████████████████████████████████████████████
  //...personalizacion
  //█████Arrays██████████████████████████████████████████████████████
  //...personalizacion
  //████Fechas███████████████████████████████████████████████████████
  //...personalizacion
  //████Genericos████████████████████████████████████████████████████
  public override clone<T>(
    objOrArray: T,
    driver: "stringify" | "structuredClone" | "lodash" = "lodash"
  ): T {
    if (
      typeof objOrArray != "object" || //❗solo clona los objetos (incluye array)❗
      objOrArray === null
    ) {
      return objOrArray;
    }
    let dataCopia: T;
    if (driver === "lodash") {
      dataCopia = JSON.parse(JSON.stringify(objOrArray)); //metodo antiguo
    } else {
      dataCopia = super.clone(objOrArray, driver);
    }
    return dataCopia;
  }
}
