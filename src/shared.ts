/**tipos de conversiones de estandares de nomenclatura en codigo*/
export type TStrCase =
  | "Snake"
  | "Kebab"
  | "Camel"
  | "Pascal"
  | "Constant"
  | "Dot";
/**tipado extendido para los tipos primitivos, function, objeto o array*/
export type TExtPrimitiveTypes =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "null"
  | "object"
  | "array"
  | "tuple"
  | "function";
/**tipado interno para permitir la recursividad en el método isValueType */
interface IRecursiveObjectForTypes {
  [key: string]: TAExtValueType;
}
/**tipado base para recursividad de tipos en el método isValueType */
export type TExtValueType =
  | TExtPrimitiveTypes
  | IRecursiveObjectForTypes
  | TAExtValueType;
/**tipado para agrupación de tipos  */
export type TAExtValueType = Array<TExtValueType>;
/**opciones para evaluar tipo en grupo */
export interface IValueTypeOption {
  /** `allowNumber_String = false`: Permite que un string numérico sea validado como un número (por ejemplo, `"123"` siendo string, se permite analizar y validar como número). */
  allowNumber_String?: boolean;
  /** `allowBigint_String = false`: Permite que un string numérico gigante sea validado como un bigint. */
  allowBigint_String?: boolean;
  /** `allowStringEmpty = false`: Permite que un string vacío ( `""` ) sea considerado válido. */
  allowStringEmpty?: boolean;
  /** `allowObjectEmpty = false`: Permite que un string vacío ( `{}` ) sea considerado válido. */
  allowObjectEmpty?: boolean;
  /** `allowArrayEmpty = false`: Permite que un string vacío ( `[]` ) sea considerado válido.*/
  allowArrayEmpty?: boolean;
  /**`tupleSize = undefined`: Define el tamaño esperado de una tupla. Puede ser un número (tamaño fijo)
   * o un array de dos números `[min, max]` (tamaño variable).
   *
   * ❗este argumento es indispensable en caso que en algún nivel del esquema de `types` se verifique
   * el tipo `"tuple"` (asi explicitamente en texto), por el contrario si la verificacion de la
   * tupla se hace implicitamente (con varios items array), este argumento es opcional, pero si
   * se asigna tendrá prioridad de verificación❗.
   *
   */
  tupleSize?: number | [number, number];
}
/**estructura de configuración de opciones para métodos
 * `isEquevalentTo()`,
 * `isGreaterTo()`,
 * `isLesserTo()`
 * y sub métodos que dependan de estos
 * */
export interface IOptionEqGtLt {
  /**determina si la comparación permite
   * incluir equivalencia*/
  isAllowEquivalent: boolean;
  /**
   * Array opcional con las rutas identificadoras de las propiedades a usar como criterio de comparación. Ejemplo (se asume que el caracter separador de ruta es "."):
   *   - `["p1", "p2",..., "pn"]` - Claves identificadoras para el primer nivel de profundidad.
   *   - `["p1", "p2.21"]` - "p1" de primer nivel, "p2.p21" de segundo nivel de profundidad.
   *   - `["p1.p11.p111"]` - Claves identificadoras para el tercer nivel de profundidad.
   *
   * ⚠ Solo para objetos
   */
  keyOrKeysPath?: string | string[];
  /**`= this.charSeparatorLogicPath` El carácter separador a utilizar entre los elementos del path. */
  charSeparator?: string;
  /**
   * Predefinido en `false`
   *
   * para arrays, determina si
   * comparan entre si la cantidad de
   * elementos del array
   *
   */
  isCompareLength?: boolean;
  /**
   * Predefinido en `false`
   *
   * para objetos, determina si
   * comparan entre si la cantidad
   * de propiedades del objeto
   */
  isCompareSize?: boolean;
  /**
   * Predefinido en `false`
   *
   * permite comparacion de valores entre un numero y un string
   * siempre y cuando el string pueda transformarse en numero
   *
   * */
  isCompareStringToNumber?: boolean;
  /**
   * Predefinido en `true`
   *
   * Determina si es case sensitive (solo para
   * elementos string), si lo es la comparacion
   * es estricta
   * ````
   */
  isCaseSensitiveForString?: boolean;
}
/**Utilidad exclusiva de Typescript para capitzalizar la primera letra
 *
 * ejemplo:
 * ````
 *  // Utilidad para capitalizar la primera letra
 *  type CapitalizeFirstLetter<S extends string> = S extends `${infer First}${infer Rest}`
 *    ? `${Uppercase<First>}${Rest}`
 *    : S;
 *
 * //claves de los campos
 * type TKeyFields = "campo1" | "campo2";
 * //esquema a partir de los campos:
 * type TSchema = Record<`prefix${CapitalizeFirstLetter<TKeyFields>}`, string>;
 *
 * const s:TSchema = {prefixCampo1: string, prefixCampo2:string}
 * ````
 */
export type TCapitalizeFirstLetter<S extends string> =
  S extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : S;
