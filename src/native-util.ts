/**
 * @author MAG magles978@gmail.com]
 *
 */
import * as Util_Node from "util";
import {
  TStrCase,
  IOptionEqGtLt,
  TAExtValueType,
  IValueTypeOption,
  TExtValueType,
  TRoundType,
  TStringToNumberFormatCleanOption,
} from "./shared-types";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/** Configuración opcional de la utilidad. */
export type TUtilBaseConfig = Partial<
  Pick<
    UtilNative,
    | "dfValue"
    | "charSeparatorLogicPath"
    | "charSeparatorUrlPath"
    | "charWildcardArrayItem"
    | "sepDateRegExp"
  >
>;
/** Utilidades nativas sin extensiones ni bibliotecas externas. */
export class UtilNative {
  /**Utilidades implícitas en Node JS*/
  public readonly util_Node = Util_Node;
  private _charSeparatorLogicPath = ".";
  /**
   * Carácter que separa los segmentos de una ruta lógica.
   *
   * @example
   * ```typescript
   * const charSeparatorLogicPath = ".";
   * const sp = charSeparatorLogicPath;
   * const path = `root${sp}object${sp}subObject`;
   * console.log(path); // salida "root.object.subobject"
   * ```
   */
  public get charSeparatorLogicPath() {
    return this._charSeparatorLogicPath;
  }
  /**
   * Actualiza el carácter que separa los segmentos de una ruta lógica.
   *
   * @example
   * ```typescript
   * const charSeparatorLogicPath = ".";
   * const sp = charSeparatorLogicPath;
   * const path = `root${sp}object${sp}subObject`;
   * console.log(path); // salida "root.object.subobject"
   * ```
   */
  protected set charSeparatorLogicPath(v: string) {
    if (!this.isString(v)) return; //no modifica si no es string
    this._charSeparatorLogicPath = v;
  }
  private _charSeparatorUrlPath = "/";
  /**
   * Carácter que separa los segmentos de una ruta URL.
   *
   * @example
   * ```typescript
   * const charSeparatorUrlPath = "/";
   * const sp = charSeparatorUrlPath;
   * const path = `root${sp}object${sp}subObject`;
   * console.log(path); // salida "root/object/subobject"
   * ```
   */
  public get charSeparatorUrlPath() {
    return this._charSeparatorUrlPath;
  }
  /**
   * Actualiza el carácter que separa los segmentos de una ruta URL.
   *
   * @example
   * ```typescript
   * const charSeparatorUrlPath = "/";
   * const sp = charSeparatorUrlPath;
   * const path = `root${sp}object${sp}subObject`;
   * console.log(path); // salida "root/object/subobject"
   * ```
   */
  protected set charSeparatorUrlPath(v: string) {
    if (!this.isString(v)) return; //no modifica si no es string
    this._charSeparatorUrlPath = v;
  }
  private _charWildcardArrayItem = "#";
  /**
   * Carácter comodín que representa cualquier índice de un array
   * en una ruta profunda.
   *
   * @example
   * ```typescript
   * const charSeparatorLogicPath = ".";
   * const sp = charSeparatorLogicPath;
   * const charWildcardArrayItem = "#";
   * const cw = charWildcardArrayItem;
   * const path = `root${sp}object${sp}arrayProp${sp}${cw}${sp}subPropN`;
   * console.log(path); // salida "root.object.arrayProp.#.subPropN" ,
   *                    //donde ese # indica que puede ser cualquier elemento de arrayProp
   * ```
   */
  public get charWildcardArrayItem() {
    return this._charWildcardArrayItem;
  }
  /**
   * Actualiza el carácter comodín que representa cualquier índice de un array.
   *
   * @example
   * ```typescript
   * const charSeparatorLogicPath = ".";
   * const sp = charSeparatorLogicPath;
   * const charWildcardArrayItem = "#";
   * const cw = charWildcardArrayItem;
   * const path = `root${sp}object${sp}arrayProp${sp}${cw}${sp}subPropN`;
   * console.log(path); // salida "root.object.arrayProp.#.subPropN" ,
   *                    //donde ese # indica que puede ser cualquier elemento de arrayProp
   * ```
   */
  protected set charWildcardArrayItem(v: string) {
    if (!this.isString(v)) return; //no modifica si no es string
    this._charWildcardArrayItem = v;
  }
  private _sepDateRegExp = /\-|\/|\.|\#|\_|\:/;
  /**
   * Expresión regular para dividir una fecha escrita como texto. Reconoce
   * los siguientes separadores:
   *
   * `"-"` ej. formato: `"dd-mm-yyyy"`
   *
   * `"/"` ej. formato: `dd/mm/yyyy`
   *
   * `"_"` ej. formato: `dd_mm_yyyy`
   *
   * `"#"` ej. formato: `dd#mm#yyyy`
   *
   * `"."` ej. formato: `dd.mm.yyyy`
   *
   * `":"` ej. formato: `dd:mm:yyyy`
   */
  public get sepDateRegExp() {
    return this._sepDateRegExp;
  }
  /**
   * Actualiza la expresión regular usada para dividir una fecha escrita como texto.
   *
   * `"-"` ej. formato: `"dd-mm-yyyy"`
   *
   * `"/"` ej. formato: `dd/mm/yyyy`
   *
   * `"_"` ej. formato: `dd_mm_yyyy`
   *
   * `"#"` ej. formato: `dd#mm#yyyy`
   *
   * `"."` ej. formato: `dd.mm.yyyy`
   *
   * `":"` ej. formato: `dd:mm:yyyy`
   */
  protected set sepDateRegExp(v: RegExp) {
    if (!(v instanceof RegExp)) {
      if (!this.isString(v)) return; //no modifica si no es string
      v = new RegExp(v); // intentará crearla de forma básica
    }
    this._sepDateRegExp = v;
  }
  /** Valor global que se devuelve cuando no se especifica otro valor predeterminado. */
  private _dfValue: null | undefined = undefined;
  /** Valor global que se devuelve cuando no se especifica otro valor predeterminado. */
  public get dfValue(): null | undefined {
    return this._dfValue;
  }
  /**valor predefinido global*/ //para uso de instancia
  protected set dfValue(v: null | undefined) {
    if (!this.isUndefinedOrNull(v)) return; //no modifica si no es undefined o null
    this._dfValue = v;
  }
  /**
   * Almacena la instancia única de esta clase
   */
  private static UtilNative_instance: UtilNative;
  /**
   * @param baseConfig Configuración inicial opcional de la utilidad.
   */
  protected constructor(baseConfig?: TUtilBaseConfig) {
    if (this.isObject(baseConfig)) {
      const bC = baseConfig as TUtilBaseConfig;
      this._dfValue = this.isUndefinedOrNull(bC.dfValue)
        ? bC.dfValue
        : this._dfValue;
      this._charSeparatorLogicPath = this.isString(bC.charSeparatorLogicPath)
        ? (bC.charSeparatorLogicPath as string)
        : this._charSeparatorLogicPath;
      this._charSeparatorUrlPath = this.isString(bC.charSeparatorUrlPath)
        ? (bC.charSeparatorUrlPath as string)
        : this._charSeparatorUrlPath;
      this._charWildcardArrayItem = this.isString(bC.charWildcardArrayItem)
        ? (bC.charWildcardArrayItem as string)
        : this._charWildcardArrayItem;
      this._sepDateRegExp = bC.sepDateRegExp ?? this._sepDateRegExp;
    }
  }
  /**
   * Devuelve la instancia única de esta clase. La configuración solo se aplica
   * cuando la instancia se crea por primera vez.
   * @param baseConfig Configuración inicial opcional de la utilidad.
   */
  public static getInstance(baseConfig?: TUtilBaseConfig): UtilNative {
    UtilNative.UtilNative_instance =
      UtilNative.UtilNative_instance === undefined ||
      UtilNative.UtilNative_instance === null
        ? new UtilNative(baseConfig)
        : UtilNative.UtilNative_instance;
    return UtilNative.UtilNative_instance;
  }
  //████ undefined and Null ██████████████████████████████████████████
  /**
   * Comprueba si un valor es `undefined`.
   * @param value Valor que se desea comprobar.
   * @returns `true` si el valor es `undefined`; de lo contrario, `false`.
   * @example
   * ```typescript
   * util.isUndefined(undefined); // true
   * util.isUndefined(null); // false
   * ```
   */
  public isUndefined(value: any): boolean {
    return value === undefined;
  }
  /**
   * Comprueba si un valor es `null`.
   * @param value Valor que se desea comprobar.
   * @returns `true` si el valor es `null`; de lo contrario, `false`.
   * @example
   * ```typescript
   * util.isNull(null); // true
   * util.isNull(undefined); // false
   * ```
   */
  public isNull(value: any): boolean {
    return value === null;
  }
  /**
   * Comprueba si un valor es `undefined` o `null`.
   * @param value Valor que se desea comprobar.
   * @returns `true` si el valor es `undefined` o `null`; de lo contrario, `false`.
   */
  public isUndefinedOrNull(value: any) {
    return this.isUndefined(value) || this.isNull(value);
  }
  /**
   * Comprueba si un valor no es ni `undefined` ni `null`.
   * @param value Valor que se desea comprobar.
   * @returns `true` si el valor no es `undefined` ni `null`; de lo contrario, `false`.
   */
  public isNotUndefinedAndNotNull(value: any) {
    return !this.isUndefined(value) && !this.isNull(value);
  }
  /**
   * Convierte `undefined` en `null` en valores primitivos, objetos literales y arrays.
   * Para objetos y arrays devuelve una copia superficial; con `isDeep: true`,
   * también procesa recursivamente los objetos literales y arrays anidados.
   * Las instancias de clase se devuelven sin cambios.
   *
   * @param value Valor primitivo, objeto o array que se va a procesar.
   * @param isDeep `false` por defecto. Si es `true`, procesa también los valores anidados.
   *
   * @returns `null` si `value` es `undefined`; en los demás casos, devuelve el valor
   * sin cambios o una copia del objeto/array con sus valores `undefined` convertidos a `null`.
   *
   * @example
   * ```typescript
   * const util = UtilNative.getInstance();
   * const obj = { a: undefined, b: { c: undefined } };
   * const r = util.undefinedToNull(obj, true);
   * console.log(r); // salida { a: null, b: { c: null } }
   * ```
   */
  public undefinedToNull<T>(value: T, isDeep = false): T {
    //caso primitivo
    if (typeof value !== "object")
      //debe analizarse objeto (incluyendo null y arrays)
      return this.isUndefined(value) ? (null as T) : value;
    //caso null directo
    if (this.isNull(value)) return null as T;

    // Si es un objeto instanciado (no literal y no array), lo devolvemos tal cual para no destruir su prototipo
    if (!Array.isArray(value) && !this.isLiteralObject(value)) return value;

    //caso objetos o arrays
    isDeep = this.convertToBoolean(isDeep);
    const clone = (source: object): any =>
      Array.isArray(source) ? [...source] : { ...source };
    const newObjOrArray = clone(value as object);
    const clones = new WeakMap<object, object>([
      [value as object, newObjOrArray],
    ]);
    const stack: Array<{ source: object; target: any }> = [
      { source: value as object, target: newObjOrArray },
    ];
    while (stack.length > 0) {
      const { target } = stack.pop()!;
      for (const key of Object.keys(target)) {
        const item = target[key];
        if (this.isUndefined(item)) {
          target[key] = null;
        } else if (
          isDeep &&
          typeof item === "object" &&
          !this.isNull(item) &&
          (Array.isArray(item) || this.isLiteralObject(item))
        ) {
          let itemClone = clones.get(item);
          if (!itemClone) {
            const newItemClone = clone(item);
            clones.set(item, newItemClone);
            stack.push({ source: item, target: newItemClone });
            itemClone = newItemClone;
          }
          target[key] = itemClone;
        }
      }
    }
    return newObjOrArray as T;
  }
  /**
   * Convierte `null` en `undefined` en valores primitivos, objetos literales y arrays.
   * Para objetos y arrays devuelve una copia superficial; con `isDeep: true`,
   * también procesa recursivamente los objetos literales y arrays anidados.
   * Las instancias de clase se devuelven sin cambios.
   *
   * @param value Valor primitivo, objeto o array que se va a procesar.
   * @param isDeep `false` por defecto. Si es `true`, procesa también los valores anidados.
   *
   * @returns `undefined` si `value` es `null`; en los demás casos, devuelve el valor
   * sin cambios o una copia del objeto/array con sus valores `null` convertidos a `undefined`.
   *
   * @example
   * ```typescript
   * const util = UtilNative.getInstance();
   * const obj = { a: null, b: { c: null } };
   * const r = util.nullToUndefined(obj, true);
   * console.log(r); // salida { a: undefined, b: { c: undefined } }
   * ```
   */
  public nullToUndefined<T>(
    value: T,
    isDeep = false, //solo permite el primer nivel
  ): T {
    //caso primitivo
    if (typeof value !== "object" || this.isNull(value))
      return this.isNull(value) ? (undefined as T) : value;

    // Si es un objeto instanciado (no literal y no array), lo devolvemos tal cual para no destruir su prototipo
    if (!Array.isArray(value) && !this.isLiteralObject(value)) return value;

    //caso objetos o arrays
    isDeep = this.convertToBoolean(isDeep);
    const clone = (source: object): any =>
      Array.isArray(source) ? [...source] : { ...source };
    const newObjOrArray = clone(value as object);
    const clones = new WeakMap<object, object>([
      [value as object, newObjOrArray],
    ]);
    const stack: Array<{ source: object; target: any }> = [
      { source: value as object, target: newObjOrArray },
    ];
    while (stack.length > 0) {
      const { target } = stack.pop()!;
      for (const key of Object.keys(target)) {
        const item = target[key];
        if (this.isNull(item)) {
          target[key] = undefined;
        } else if (
          isDeep &&
          typeof item === "object" &&
          (Array.isArray(item) || this.isLiteralObject(item))
        ) {
          let itemClone = clones.get(item);
          if (!itemClone) {
            const newItemClone = clone(item);
            clones.set(item, newItemClone);
            stack.push({ source: item, target: newItemClone });
            itemClone = newItemClone;
          }
          target[key] = itemClone;
        }
      }
    }
    return newObjOrArray as T;
  }
  //████ Booleanos ███████████████████████████████████████████████████
  /**
   * Comprueba si un valor es de tipo booleano.
   *
   * @param bool Valor que se desea comprobar.
   * @returns `true` si el valor es booleano; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * const v = true;
   * const r = isBoolean(v);
   * console.log(r); // salida: true
   * ```
   */
  public isBoolean(bool: unknown): bool is boolean {
    return typeof bool === "boolean";
  }
  /**
   * Convierte un valor a booleano y permite definir cómo tratar los valores vacíos,
   * el cero y `null`.
   *
   * @param anyToCast Valor que se desea convertir.
   * @param castExceptions `["isZeroAsTrue"]` por defecto. Excepciones opcionales:
   *   - `"isEmptyAsTrue"`: considera verdaderos los strings, objetos y arrays vacíos.
   *   - `"isZeroAsTrue"`: considera verdadero el número `0`.
   *   - `"isNullAsTrue"`: considera verdadero el valor `null`.
   * Si se proporciona el array, solo se aplican las excepciones incluidas en él.
   * @returns El valor convertido a booleano.
   *
   * @example
   * ```typescript
   * const v1 = "hello";
   * const r1 = convertToBoolean(v1);
   * console.log(r1); // salida: true
   *
   * const v2 = "";
   * const r2 = convertToBoolean(v2);
   * console.log(r2); // salida: false
   *
   * const v3 = "";
   * const r3 = convertToBoolean(v3, ["isEmptyAsTrue"]);
   * console.log(r3); // salida: true
   *
   * const v4 = null;
   * const r4 = convertToBoolean(v4, ["isNullAsTrue"]);
   * console.log(r4); // salida: true
   *
   * const v5 = 0;
   * //comportamiento predefinido (sin personalización)
   * const r5 = convertToBoolean(v5);
   * console.log(r5); // salida: true
   *
   * const v6 = 0;
   * //explícitamente se configura el tratamiento de 0
   * const r6 = convertToBoolean(v6, ["isZeroAsTrue"]);
   * console.log(r6); // salida: true
   *
   * const v7 = 0;
   * //verificación personalizada (no incluye tratamiento de 0 )
   * const r7 = convertToBoolean(v7, ["isEmptyAsTrue"]);
   * console.log(r7); // salida: false
   *
   * const v8 = 0;
   * //verificación personalizada (ahora incluye tratamiento de 0)
   * const r8 = convertToBoolean(v8, ["isEmptyAsTrue", "isZeroAsTrue"]);
   * console.log(r8); // salida: true
   *
   * ```
   */
  public convertToBoolean(
    anyToCast: any,
    castExceptions: Array<"isEmptyAsTrue" | "isZeroAsTrue" | "isNullAsTrue"> = [
      "isZeroAsTrue",
    ],
  ): boolean {
    let r = false;
    if (!Array.isArray(castExceptions))
      //❗❗❗Debe ser nativo❗❗❗
      throw new Error(
        `${castExceptions} is not array of cast exceptions valid`,
      );
    castExceptions = [...new Set(castExceptions)]; // eliminación básica de duplicados primitivos
    if (typeof anyToCast === "string") {
      r =
        anyToCast !== "" ||
        (anyToCast === "" && castExceptions.includes("isEmptyAsTrue"));
    } else if (typeof anyToCast === "object" && !this.isNull(anyToCast)) {
      //incluye arrays
      const isNotEmpty = Object.keys(anyToCast).length > 0;
      r =
        isNotEmpty || (!isNotEmpty && castExceptions.includes("isEmptyAsTrue"));
    } else if (anyToCast === 0) {
      //el caso especial de numero 0
      r = castExceptions.includes("isZeroAsTrue");
    } else if (this.isNull(anyToCast)) {
      //el caso especial de null
      r = castExceptions.includes("isNullAsTrue");
    } else {
      //lo demás
      r = !!anyToCast; //cast
    }
    return r;
  }
  //████ Números ██████████████████████████████████████████████████████
  /**
   * Comprueba si el valor es un número finito.
   *
   * @param num Valor que se desea comprobar.
   *
   * @returns `true` si el valor es un número finito.
   *
   * @example
   * ```typescript
   * const v1 = 10;
   * const r1 = isNumber(v1);
   * console.log(r1); // salida: true
   *
   * const v2 = "10";
   * const r2 = isNumber(v2);
   * console.log(r2); // salida: false
   * //Para convertirlo, se puede usar stringToNumber().
   *
   * const v3 = null;
   * const r3 = isNumber(v3);
   * console.log(r3); // salida: false
   *
   * const v4 = 10n; //bigint
   * const r4 = isNumber(v4);
   * console.log(r4); // salida: false
   *
   * ```
   */
  public isNumber(num: unknown): num is number {
    let r: boolean;
    if (typeof num === "number") {
      r = !isNaN(num) && isFinite(num);
    } else {
      r = false;
    }
    return r;
  }
  /**
   * Comprueba si el valor es de tipo `bigint`.
   *
   * @param bigNum Valor que se desea comprobar.
   *
   * @returns `true` si el valor es de tipo `bigint`; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * const v1 = 10;
   * const r1 = isBigint(v1);
   * console.log(r1); // salida: false
   *
   * const v2 = "1234567890123456789";
   * const r2 = isBigint(v2);
   * console.log(r2); // salida: false
   * //Para convertirlo, se puede usar stringToBigint().
   *
   * const v3 = null;
   * const r3 = isBigint(v3);
   * console.log(r3); // salida: false
   *
   * const v4 = 10n; //bigint
   * const r4 = isBigint(v4);
   * console.log(r4); // salida: true
   *
   * ```
   */
  public isBigint(bigNum: unknown): bigNum is bigint {
    let r = false;
    if (typeof bigNum === "bigint") {
      r = true;
    } else {
      r = false;
    }
    return r;
  }
  /**
   * Comprueba si un número válido es entero.
   * @param num Número que se desea comprobar.
   *
   * @returns `true` si el número es entero; de lo contrario, `false`.
   *
   * @example
   * ````typescript
   *
   * const v1 = 7;
   * const r1 = isIntegerNumber(v1);
   * console.log(r1); // salida: true
   *
   * const v2 = 7.1; //float
   * const r2 = isIntegerNumber(v2);
   * console.log(r2); // salida: false
   *
   * const v3 = "7";
   * const r3 = isIntegerNumber(v3);
   * console.log(r3); // salida: false
   *
   * const v4 = "lo que sea";
   * const r4 = isIntegerNumber(v4);
   * console.log(r4); // salida: false
   *
   * ````
   */
  public isIntegerNumber(num: number): boolean {
    if (!this.isNumber(num)) return false;
    return Number.isInteger(num);
  }
  /**
   * Comprueba si un número válido tiene parte decimal.
   * @param num Número que se desea comprobar.
   *
   * @returns `true` si el número tiene parte decimal; de lo contrario, `false`.
   *
   * @example
   * ````typescript
   *
   * const v1 = 7; //integer
   * const r1 = isFloatNumber(v1);
   * console.log(r1); // salida: false
   *
   * const v2 = 7.1; //float
   * const r2 = isFloatNumber(v2);
   * console.log(r2); // salida: true
   *
   * const v3 = "7";
   * const r3 = isFloatNumber(v3);
   * console.log(r3); // salida: false
   *
   * const v4 = "lo que sea";
   * const r4 = isFloatNumber(v4);
   * console.log(r4); // salida: false
   *
   * ````
   */
  public isFloatNumber(num: number): boolean {
    if (!this.isNumber(num)) return false;
    return !Number.isInteger(num); //❗se usa el de isInteger() negado❗
  }
  /**
   * Comprueba si un número tiene el signo solicitado. El cero no se considera
   * positivo ni negativo, salvo que se habilite su inclusión.
   *
   * @param num Valor que se desea comprobar; los valores que no sean números válidos dan `false`.
   * @param sign Signo que se desea comprobar: `"+"` o `"-"`.
   * @param isZeroIncluded `false` por defecto. Si es `true`, incluye el cero en ambos signos.
   *
   * @returns `true` si el número cumple la condición; de lo contrario, `false`.
   *
   * @example
   * ````typescript
   *
   * const v1 = 7;
   * const r1 = isNumberSign(v1, "-");
   * console.log(r1); // salida: false
   *
   * const v2 = 7.1;
   * const r2 = isNumberSign(v2, "+");
   * console.log(r2); // salida: true
   *
   * const v3 = "7"; //es un string (los string no tienen polaridad)
   * const r3 = isNumberSign(v3, "+");
   * console.log(r3); // salida: false
   *
   * const v4 = null;
   * const r4 = isNumberSign(v4, "-");
   * console.log(r4); // salida: false
   *
   * //❗el 0:❗
   * //En el ámbito matemático, el 0 no tiene polaridad
   *
   * const v5 = 0;
   * const r5 = isNumberSign(v5, "+");
   * console.log(r5); // salida: false
   *
   * const v6 = 0;
   * const r6 = isNumberSign(v6, "-");
   * console.log(r6); // salida: false
   *
   * //Si se requiere incluirlo en alguna de las dos polaridades:
   *
   * const v7 = 0;
   * const r7 = isNumberSign(v7, "+", true); //bandera de inclusión
   * console.log(r7); // salida: true
   *
   * const v8 = 0;
   * const r8 = isNumberSign(v8, "-", true); //bandera de inclusión
   * console.log(r8); // salida: true
   *
   * ````
   *
   */
  public isNumberSign(
    num: unknown,
    sign: "+" | "-",
    isZeroIncluded = false,
  ): boolean {
    // Si no es número su signo no puede comprobarse por lo tanto es false
    if (!this.isNumber(num)) return false;
    let r = false;
    if (sign === "+") r = isZeroIncluded ? num >= 0 : num > 0;
    else if (sign === "-") r = isZeroIncluded ? num <= 0 : num < 0;
    else throw new Error(`${sign} is not sign valid`);
    return r;
  }
  /**
   * Comprueba si un número es impar. Si tiene parte decimal, se puede indicar
   * un tipo de redondeo para ajustar el valor antes de comprobarlo.
   *
   * @param num Número que se desea evaluar.
   * @param roundType Tipo de redondeo: `"round"`, `"floor"` o `"ceil"`. Si se omite,
   * los valores decimales no se consideran impares.
   *
   * @returns `true` si el valor resultante es impar; si `num` no es válido, devuelve `false`.
   *
   * @example
   * ````typescript
   *
   * console.log(isOddNumber(7)); // Salida: true
   * console.log(isOddNumber(4)); // Salida: false
   * console.log(isOddNumber(4.8)); // Salida: false //⚠️un decimal no es ni par ni impar
   * console.log(isOddNumber(4.8, "round")); // Salida: true //redondeado a 5
   * console.log(isOddNumber(4.8, "floor")); // Salida: false //redondeado a 4
   * console.log(isOddNumber(4.8, "ceil")); // Salida: true //redondeado a 5
   * ````
   */
  public isOddNumber(
    num: number,
    roundType: TRoundType | undefined = undefined,
  ): boolean {
    //si no es un número su signo no puede comprobarse, por lo tanto es falso
    if (!this.isNumber(num)) return false;
    //los impares solo pueden ser enteros
    const isInteger = Number.isInteger(num);
    if (isInteger) {
      return num % 2 !== 0;
    } else {
      //verificar si se desea redondeo
      if (roundType) {
        num = this.roundNumber(roundType, num, 0); //debe ser a la unidad (no sub múltiplos ni sub divisores)
        return num % 2 !== 0;
      } else {
        return false; //los decimales no pueden ser impares
      }
    }
  }
  /**
   * Comprueba si un número es par. Si tiene parte decimal, se puede indicar
   * un tipo de redondeo para ajustar el valor antes de comprobarlo.
   *
   * @param num Número que se desea evaluar.
   * @param roundType Tipo de redondeo: `"round"`, `"floor"` o `"ceil"`. Si se omite,
   * los valores decimales no se consideran pares.
   *
   * @returns `true` si el valor resultante es par; si `num` no es válido, devuelve `false`.
   *
   * @example
   * ````typescript
   *
   * console.log(isEvenNumber(7)); // Salida: false
   * console.log(isEvenNumber(4)); // Salida: true
   * console.log(isEvenNumber(4.8)); // Salida: false //⚠️un decimal no es ni par ni impar
   * console.log(isEvenNumber(4.8, "round")); // Salida: false //redondeado a 5
   * console.log(isEvenNumber(4.8, "floor")); // Salida: true //redondeado a 4
   * console.log(isEvenNumber(4.8, "ceil")); // Salida: false //redondeado a 5
   * ````
   */
  public isEvenNumber(
    num: number,
    roundType: TRoundType | undefined = undefined,
  ): boolean {
    //si no es un número su signo no puede comprobarse, por lo tanto es falso
    if (!this.isNumber(num)) return false;
    //los pares solo pueden ser enteros
    const isInteger = Number.isInteger(num);
    if (isInteger) {
      return num % 2 === 0;
    } else {
      //verificar si se desea redondeo
      if (roundType) {
        num = this.roundNumber(roundType, num, 0); //debe ser a la unidad (no sub múltiplos ni sub divisores)
        return num % 2 === 0;
      } else {
        return false; //los decimales no pueden ser pares
      }
    }
  }
  /**
   * Convierte un número finito a `bigint`, truncando su parte decimal. Si recibe
   * un `bigint`, lo devuelve sin cambios.
   *
   * @param num Número o `bigint` que se desea convertir.
   * @returns El valor convertido a `bigint`.
   * @throws {Error} Si el valor no es un número finito ni un `bigint`.
   *
   * @example
   * ````typescript
   *
   * const util = UtilNative.getInstance();
   * const v1 = 7;
   * const r1 = util.numberToBigint(v1);
   * console.log(r1); // salida: 7n
   *
   * const v2 = 7.9; // La parte decimal se trunca, sin redondear.
   * const r2 = util.numberToBigint(v2);
   * console.log(r2); // salida: 7n
   * ````
   */
  public numberToBigint(num: number | bigint): bigint {
    //si es un bigint lo retorna sin cambios
    if (this.isBigint(num)) return num;
    //verificar que el valor sea o numérico
    if (!this.isNumber(num))
      throw new Error(`${num} is not number or string-number valid`);
    //convertir el numero a entero OBLIGATORIO
    num = Math.trunc(num);
    let r = BigInt(num);
    return r;
  }
  /**
   * Convierte un `bigint` a `number`. Si recibe un número finito, lo devuelve
   * sin cambios. La conversión de valores grandes puede perder precisión.
   *
   * ⚠️Si el `bigint` es demasiado grande para ser manejado como `number`,
   * la conversión puede resultar en una pérdida de precisión.
   *
   * @param bigNum `bigint` o número finito que se desea convertir.
   * @returns El valor como `number`.
   * @throws {Error} Si el valor no es un `bigint` ni un número finito.
   *
   * @example
   * ```typescript
   * const util = UtilNative.getInstance();
   *
   * console.log(util.bigintToNumber(123n)); // Salida: 123
   * console.log(util.bigintToNumber(BigInt(Number.MAX_SAFE_INTEGER))); // Salida: 9007199254740991
   * console.log(util.bigintToNumber(BigInt(Number.MAX_SAFE_INTEGER) + 1n)); // Salida: 9007199254740992 (con advertencia de pérdida de precisión)
   * ```
   */
  public bigintToNumber(bigNum: bigint | number): number {
    //si es un number lo retorna sin cambios
    if (this.isNumber(bigNum)) return bigNum;
    //verificar que el valor sea o bigint
    if (!this.isBigint(bigNum))
      throw new Error(`${bigNum} is not number or string-number valid`);
    // Advertencia: si el bigint es demasiado grande para ser manejado como number
    if (
      bigNum > BigInt(Number.MAX_SAFE_INTEGER) ||
      bigNum < BigInt(Number.MIN_SAFE_INTEGER)
    ) {
      console.warn(
        `${bigNum} is too large to be safely converted to number. Precision may be lost.`,
      );
    }
    let r = Number(bigNum);
    return r;
  }
  /**
   * Invierte el signo de un número dado.
   *
   * Recibe un número finito y devuelve el mismo valor con el signo invertido.
   * El cero se devuelve sin cambios. No convierte strings numéricos.
   *
   * @param num Número cuyo signo se desea invertir.
   * @returns El número con el signo invertido.
   * @throws {Error} Si el valor no es un número finito.
   *
   * @example
   * ```typescript
   * const numP = 5;
   * const numN = -10;
   *
   * console.log(toggleNumberSign(numP)); // Salida: -5
   * console.log(toggleNumberSign(numN)); // Salida: 10
   * console.log(toggleNumberSign(0)); // Salida: 0
   * ```
   */
  public toggleNumberSign(num: number): number {
    if (!this.isNumber(num)) throw new Error(`${num} is not number valid`);
    return num === 0 ? num : -num;
  }
  /**
   * Redondea un número en la posición decimal indicada.
   *
   * @param type Tipo de redondeo: `"round"`, `"floor"` o `"ceil"`, según las
   * funciones de `Math` correspondientes.
   *
   * @param num Número finito que se desea redondear.
   *
   * @param exponential Posición decimal, que debe ser un entero:
   * - Enteros Positivos:
   *   - `exp = 0`: Redondeo predefinido por la librería Math.
   *   - `exp = 1`: Redondeo en decenas.
   *   - `exp = 2`: Redondeo en centenas.
   *   - `exp = 3`: Redondeo en miles.
   *   - ...
   * - Enteros Negativos:
   *   - `exp = -1`: Redondeo en décimas.
   *   - `exp = -2`: Redondeo en centésimas.
   *   - `exp = -3`: Redondeo en milésimas.
   *   - ...
   *
   * @returns El número redondeado.
   * @throws {Error} Si `num` o `exponential` no son números válidos, o si `exponential`
   * no es un entero.
   *
   * @example
   * ````typescript
   * //Ejemplo básico (no hay diferencia con `Math.round()`):
   * let data;
   * let exp;
   * let r;
   * data = 10.555555555555;
   * exp = 0; //redondeo estandar (al entero mas cercano)
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 11
   * //Ejemplo redondeando decimas (x.0):
   * data = 10.12;
   * exp = -1; //decimas
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 10.1
   * //Ejemplo redondeando centesimas (x.x0):
   * data = 10.163;
   * exp = -2; //centesimas
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 10.16
   * //Ejemplo redondeando milesimas (x.xx0):
   * data = 10.1639;
   * exp = -3; //milesimas
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 10.164
   * //===============================
   * //Ejemplo redondeando decenas (x0):
   * data = 12;
   * exp = 1; //decenas
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 10 (el mas cercano a 12 de mitad hacia abajo)
   * //Ejemplo redondeando centenas (x00):
   * data = 160;
   * exp = 2; //centenas
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 200 (el mas cercano a 160 de mitad hacia arriba)
   * //Ejemplo redondeando miles (x000):
   * data = 1611;
   * exp = 3; //miles
   * r = roundNumber("round", data, exp);
   * console.log(r); //Salida 2000 (el mas cercano a 1611 de mitad hacia arriba)
   * //===============================
   * //Ejemplo redondeando estandar (hacia abajo `"floor"`) (x.0):
   * data = 1.6;
   * exp = 0; //estandar
   * r = roundNumber("floor", data, exp);
   * console.log(r); //Salida 1 (el mas cercano a 1.6 hacia abajo)
   * //Ejemplo redondeando decimas (hacia abajo `"floor"`) (x.0):
   * data = 1.66;
   * exp = -1; //decimas
   * r = roundNumber("floor", data, exp);
   * console.log(r); //Salida 1.6 (el mas cercano a 1.66 hacia abajo)
   * //===============================
   * //Ejemplo redondeando estandar (hacia arriba `"ceil"`) (x.0):
   * data = 1.2;
   * exp = 0; //estandar
   * r = roundNumber("ceil", data, exp);
   * console.log(r); //Salida 2 (redondeo hacia arriba)
   * //Ejemplo redondeando decimas (hacia abajo `"ceil"`) (x.0):
   * data = 1.62;
   * exp = -1; //decimas
   * r = roundNumber("ceil", data, exp);
   * console.log(r); //Salida 1.7 (redondeo hacia arriba a décimas)
   *
   * ````
   */
  public roundNumber(
    type: TRoundType,
    num: number,
    exponential: number,
  ): number {
    if (!this.isNumber(num)) throw new Error(`${num} is not valid number`);
    if (!this.isNumber(exponential))
      throw new Error(`${exponential} is not valid exponential number`);
    if (!this.isString(type, true))
      throw new Error(`${type} is not type valid`);
    let n = num;
    let exp = exponential;
    //se prohíben los exponentes no validos (incluyendo exponentes decimales)
    if (!this.isIntegerNumber(exp))
      throw new Error(`${exponential} is not exponential factor valid`);
    //caso especial si es 0 (no hay forma de redondear)
    if (n === 0) return n;
    // Si el exp es cero...
    if (+exp === 0) return Math[type](n);
    n = +n; //+num intentar convertir a numero cualquier cosa
    exp = +exp; //+exp intentar convertir a numero culaquier cosa
    // Si  el exp no es un entero
    if (!this.isNumber(exp) || exp % 1 !== 0) throw new Error("not round" + n);
    // Shift
    let aStrN = n.toString().split("e");
    n = Math[type](+(aStrN[0] + "e" + (aStrN[1] ? +aStrN[1] - exp : -exp)));
    // Shift back
    aStrN = n.toString().split("e");
    n = +(aStrN[0] + "e" + (aStrN[1] ? +aStrN[1] + exp : exp));
    return n;
  }
  /**
   * Comprueba si un número está dentro de un rango con límites inclusivos o exclusivos.
   *
   * @param num Número que se desea comprobar. Si no es válido, devuelve `false`.
   * @param range Tupla `[mínimo, máximo]` con dos números válidos.
   * @param isInclusive Si es `true`, incluye los límites; si es `false`, los excluye.
   *
   * @example
   * ```typescript
   * const num = 1;
   * let r: boolean;
   * r = isNumberInRange(num, [1,5], true); // Salida: true (es incluyente)
   * r = isNumberInRange(num, [1,5], false); // Salida: false (es excluyente)
   * ```
   * @returns `true` si el número está dentro del rango; de lo contrario, `false`.
   * @throws {Error} Si `range` no es una tupla de dos números válidos.
   */
  public isNumberInRange(
    num: number,
    range: [number, number],
    isInclusive: boolean,
  ): boolean {
    // determina si es un número al cual verificable el rango
    if (!this.isNumber(num)) return false;
    //❗❗NO se pude verificar con isTuple por redundancia cíclica❗❗, toca manualmente
    if (
      !Array.isArray(range) ||
      range.length !== 2 ||
      range.some((rng) => !this.isNumber(rng))
    )
      throw new Error(`${range} is not range tuple [number, number] valid`);
    const [min, max] = range;
    const r = isInclusive
      ? min <= num && num <= max // incluyente
      : min < num && num < max; //excluyente
    return r;
  }
  /**
   * Limita un número al intervalo definido: devuelve el mínimo o el máximo cuando
   * el número queda fuera del rango, y el propio número cuando queda dentro.
   *
   * @param num Número finito que se desea limitar.
   * @param range Tupla `[mínimo, máximo]` de números válidos, ordenada de menor a mayor.
   * @returns El número dentro del rango, incluidos sus límites.
   * @throws {Error} Si `num` no es finito o `range` no es una tupla de dos números válidos.
   *
   * @example
   * ````typescript
   * let num;
   * let r;
   *
   * //Dentro del rango:
   * num = 5;
   * r = adaptNumberToRange(num, [0,10]);
   * console.log(r);// Salida: 5
   *
   * //Fuera del rango, por encima:
   * num = 11;
   * r = adaptNumberToRange(num, [0,10]);
   * console.log(r);// Salida: 10
   *
   * //Fuera del rango, por debajo:
   * num = -2;
   * r = adaptNumberToRange(num, [0,10]);
   * console.log(r);// Salida: 0
   * ````
   */
  public adaptNumberToRange(num: number, range: [number, number]): number {
    if (!this.isNumber(num)) throw new Error(`${num} is not number valid`);
    //si el número está en el rango no hay que realizar proceso de acoplamiento
    if (this.isNumberInRange(num, range, true)) return num;
    const [min, max] = range;
    if (num < min || num > max) {
      num = num < min ? min : num;
      num = num > max ? max : num;
    }
    return num;
  }
  /**
   * Obtiene un reporte básico del tipo de número.
   *
   * @param {number | string} num - El número o cadena numérica a analizar.
   * @returns {object} - Retorna un objeto con las siguientes propiedades:
   *   - `polarity`: Indica si el número es "positive" o "negative".
   *   - `genericType`: Indica si el valor es un "number" o un "string-number".
   *   - `strictType`: Indica si el número es un "int", "bigInt" o "float".
   *
   * @example
   * ```typescript
   * let report = getTypeNumber("123");
   * console.log(report);
   * // Salida: { polarity: "positive", genericType: "string-number", strictType: "int" }
   *
   * report = getTypeNumber(-321.654);
   * console.log(report);
   * // Salida: { polarity: "negative", genericType: "number", strictType: "float" }
   * ```
   */
  /*----------------------------------------------------------------*/
  /*----------------------------------------------------------------*/
  /*---- <INICIO CONSTRUCCION> -------------------------------------*/
  /*
  public getNumberReport(num: number): {
    polarity: "positive" | "negative";
    genericType: "number" | "string-number";
    strictType: "int" | "bigInt" | "float";
  } {
    let r = {
      polarity: "" as "positive" | "negative",
      genericType: "" as "number" | "string-number",
      strictType: "" as "int" | "bigInt" | "float",
    };
    let n = this.stringToNumber(num);
    r.polarity = n < 0 ? "negative" : "positive"; //el `0` se considera positivo
    r.genericType = this.isString(num) ? "string-number" : "number";
    if (typeof n === "bigint") {
      r.strictType = "bigInt";
    } else {
      r.strictType = !Number.isInteger(n) ? "float" : "int";
    }
    return r;
  }
*/

  /*---- <FIN CONSTRUCCIÓN> ----------------------------------------*/
  /*----------------------------------------------------------------*/
  /*----------------------------------------------------------------*/
  //████ Textos █████████████████████████████████████████████████████
  /**
   * Comprueba si un valor es un string y permite configurar si se acepta vacío.
   *
   * @param str Valor que se desea comprobar.
   * @param allowEmpty `false` por defecto. Si es `true`, acepta también `""`.
   * @returns `true` si `str` es un string permitido; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * const value = "";
   * console.log(util.isString(value, true)); // true
   * console.log(util.isString(value)); // false
   * console.log(util.isString("texto")); // true
   * console.log(util.isString(10)); // false
   * ```
   */
  public isString(str: unknown, allowEmpty = false): str is string {
    allowEmpty = this.convertToBoolean(allowEmpty);
    const r = typeof str === "string" && (allowEmpty || str !== "");
    return r;
  }
  /**
   * Normaliza una cadena numérica aplicando las reglas internas de formato.
   *
   * Elimina espacios, paréntesis y comillas simples. Por defecto, interpreta
   * el último punto como separador decimal y elimina las comas como agrupadores.
   * Con `isDecimalPoint: true`, usa `charDecimalPoint` como separador decimal;
   * con `isDecimalPoint: false`, elimina puntos y comas.
   *
   * @param str Cadena numérica que se desea normalizar.
   * @param formatOption Opciones de separador decimal; si se omite, usa el punto.
   * @returns La cadena normalizada, sin convertirla a `number` ni a `bigint`.
   *
   * @example
   * ```typescript
   * const clean = this._cleanNumericString(" (1'000,500.25) ");
   * console.log(clean); // "1000500.25"
   * ```
   *
   * @example
   * ```typescript
   * const clean = this._cleanNumericString("1.000.500");
   * console.log(clean); // "1000.500"
   * ```
   */
  protected _cleanNumericString(
    str: string,
    formatOption?: TStringToNumberFormatCleanOption,
  ): string {
    //reconstrucción de las opciones
    const isDecimalPointSpecified = this.isBoolean(
      formatOption?.isDecimalPoint,
    );
    formatOption = (
      this.isObject(formatOption) ? formatOption : {}
    ) as TStringToNumberFormatCleanOption;
    formatOption = {
      ...formatOption,
      isDecimalPoint: this.isBoolean(formatOption.isDecimalPoint)
        ? formatOption.isDecimalPoint
        : true, //encendido predefinidamente
      charDecimalPoint: this.isString(formatOption.charDecimalPoint)
        ? formatOption.charDecimalPoint
        : ".", //como caracter separador de decimales
    } as TStringToNumberFormatCleanOption;
    //procesar formateo:
    let cleanStr = str.trim();
    // 1. Quitar paréntesis (ej: "(+57)" -> "+57")
    cleanStr = cleanStr.replace(/[()]/g, "");
    // 2. Quitar espacios internos (ej: "1 2 3" -> "123")
    cleanStr = cleanStr.replace(/\s+/g, "");
    // 3. Quitar comillas simples usadas como separador de miles (ej: "1'000'000" -> "1000000")
    cleanStr = cleanStr.replace(/'/g, "");
    if (isDecimalPointSpecified && !formatOption.isDecimalPoint) {
      cleanStr = cleanStr.replace(/[.,]/g, "");
    } else {
      const decimalSeparator = isDecimalPointSpecified
        ? formatOption.charDecimalPoint!
        : ".";
      const groupingSeparator = decimalSeparator === "." ? "," : ".";
      cleanStr = cleanStr.split(groupingSeparator).join("");
      const lastDecimalIndex = cleanStr.lastIndexOf(decimalSeparator);
      if (lastDecimalIndex !== -1) {
        const integerPart = cleanStr
          .substring(0, lastDecimalIndex)
          .split(decimalSeparator)
          .join("");
        const decimalPart = cleanStr.substring(lastDecimalIndex + 1);
        cleanStr = `${integerPart}.${decimalPart}`;
      }
    }
    return cleanStr;
  }
  /**
   * Comprueba si un string puede interpretarse como un número finito.
   *
   * Primero aplica la limpieza o el formateador indicado y luego valida la
   * cadena completa. Acepta enteros, decimales y notación exponencial, pero no
   * convierte el valor ni acepta strings vacíos o prefijos numéricos seguidos
   * de texto.
   *
   * @param str Valor que se desea analizar.
   * @param formatCleanOption Objeto de formato, función personalizada o `false` para omitir la limpieza. Si se omite, aplica el formato predeterminado.
   * @returns `true` si el string normalizado representa un número finito; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * console.log(util.isStringAsNumber("abc")); // false
   * console.log(util.isStringAsNumber(123)); // false (❗ya es un número, no puede considerarse como numeric-string❗)
   * console.log(util.isStringAsNumber("123")); // true
   * console.log(util.isStringAsNumber("12abc")); // false (no acepta prefijos numéricos)
   * console.log(util.isStringAsNumber("1 2 3")); // true (aplica limpieza predeterminada)
   * console.log(util.isStringAsNumber("1 2 3", false)); // false (no aplica formateo interno y al tener espacios no se considera numeric-string)
   * console.log(util.isStringAsNumber(" 1'000,500.25 ")); // true (aplica formateo interno para extraer el número 1000500.25
   * ```
   */
  public isStringAsNumber(
    str: unknown,
    formatCleanOption?:
      | TStringToNumberFormatCleanOption
      | ((str: string) => string)
      | false,
  ): str is string {
    if (!this.isString(str, false)) return false;
    //formatear el string antes de verificar si es posible la conversión
    if (this.isObject(formatCleanOption, true)) {
      str = this._cleanNumericString(
        str,
        formatCleanOption as TStringToNumberFormatCleanOption,
      );
    } else if (this.isFunction(formatCleanOption)) {
      const fn = formatCleanOption;
      str = fn(str);
    } else if (formatCleanOption === false) {
      //explícitamente no hacer nada
    } else {
      //con las opciones predefinidas
      str = this._cleanNumericString(
        str,
        {} as TStringToNumberFormatCleanOption,
      );
    }
    //ExReg exclusiva para verificacion del string numérico
    const strictNumericRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
    if (!strictNumericRegex.test(str as string)) return false;
    const parse = parseFloat(str as string);
    const r = !isNaN(parse) && isFinite(parse);
    return r;
  }
  /**
   * Determina si un valor puede considerarse una cadena valida para `bigint`.
   *
   * El valor se limpia según `applyFormatCleanStr` y debe representar un
   * entero; no acepta parte decimal ni notación exponencial. Configura el
   * separador decimal para evitar que se interprete como separador de miles.
   * Este método no convierte el valor y no acepta cadenas vacías.
   *
   * @param str Valor que se desea analizar.
   * @param applyFormatCleanStr `true` aplica la limpieza predeterminada; un objeto configura el separador decimal; una función aplica una limpieza personalizada; `false` no aplica limpieza.
   * @returns `true` si el string normalizado representa un entero válido para `bigint`; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * console.log(util.isStringAsBigInt(123n)); // false (❗ya es bigint, no puede considerarse un big-numeric-string❗)
   * console.log(util.isStringAsBigInt(" 1'000,000 ")); // true
   * console.log(util.isStringAsBigInt("123.45")); // false (los bigint son enteros únicamente)
   * console.log(util.isStringAsBigInt("1.234,56", {
   *   isDecimalPoint: true,
   *   charDecimalPoint: ",",
   * })); // false (rechaza el separador decimal configurado)
   * console.log(util.isStringAsBigInt("abc")); // false
   * ```
   */
  public isStringAsBigInt(
    str: unknown,
    applyFormatCleanStr:
      | boolean
      | TStringToNumberFormatCleanOption
      | ((str: string) => string) = true,
  ): str is string {
    if (!this.isString(str, false)) return false;
    //formatear el string antes de verificar si es posible la conversión
    if (this.isFunction(applyFormatCleanStr)) {
      str = applyFormatCleanStr(str);
    } else if (this.isObject(applyFormatCleanStr, true)) {
      str = this._cleanNumericString(
        str,
        applyFormatCleanStr as TStringToNumberFormatCleanOption,
      );
    } else if (this.isBoolean(applyFormatCleanStr)) {
      if (applyFormatCleanStr) str = this._cleanNumericString(str);
    }
    // Solo se aceptan enteros decimales.
    const strictIntegerRegex = /^[+-]?\d+$/;
    if (!strictIntegerRegex.test(str as string)) return false;
    let r: boolean;
    try {
      BigInt(str as string);
      r = true;
    } catch (error) {
      //❗❗❗No importa el error❗❗❗
      r = false;
    }
    return r;
  }
  /**
   * Convierte un numeric string a número, siempre que sea posible.
   *
   * ⚠️Es importante tener en cuenta si el string ya tienen implementado un formateo para no usar el interno o configurar de acuerdo a las necesidades el limpiador y formateador interno⚠️
   *
   * @param strNum String numérico o número finito. Los números se devuelven sin cambios.
   * @param formatCleanOption Objeto de formato, función personalizada o `false` para omitir la limpieza. Si se omite, aplica el formato predeterminado.
   *
   * @returns El valor convertido a `number`.
   * @throws {Error} Si el string no es numérico, no es finito o excede el tamaño admitido para `number`.
   *
   * @example
   * ```typescript
   * const v1 = "1000000";
   * const r1 = stringToNumber(v1); //formateo y limpieza predeterminado
   * console.log(r1); //Salida: 1000000
   *
   * const v2 = "1.000.000";
   * const r2 = stringToNumber(v2); //formateo y limpieza predeterminado
   * console.log(r2); //⚠️Salida: 1000 //⚠️El convertidor asume que el último "." es separador de decimales
   *
   * const v3 = "1.000.000";
   * const r3 = stringToNumber(v3, { isDecimalPoint: false }); //explícitamente limpiar y formatear asumiendo que es número entero
   * console.log(r3); //Salida: 1000000
   *
   * const v4 = "1'000,000"; //separadores de formato humano
   * const r4 = stringToNumber(v4); //predefinídamente solo "." es el caracter que separa decimales
   * console.log(r4); //Salida: 1000000
   *
   * const v5 = "1 000 000"; //separador de formato humano " "
   * const r5 = stringToNumber(v5);
   * console.log(r5); //Salida: 1000000
   *
   * const v6 = "1.000.000.00"; //Los últimos dos ceros se asumen como decimales
   * const r6 = stringToNumber(v6);
   * console.log(r6); //Salida: 1000000
   *
   * const v7 = "1.000.000.90";
   * const r7 = stringToNumber(v7, {isDecimalPoint: false}); //el convertidor asume que el número es totalmente entero
   * console.log(r7); //⚠️Salida: 100000090 // los dos últimos dígitos se agregan al entero
   *
   * const v8 = "1.000,000";
   * const r8 = stringToNumber(v8);
   * console.log(r8); //⚠️Salida: 1 // los dígitos después del último "." los asume como decimales
   *
   * const v9 = "(+1) 8000 1213";
   * const r9 = stringToNumber(v9);
   * console.log(r9); //Salida: 180001213
   *
   * const v10 = "1'000.000,99";
   * const r10 = stringToNumber(v10);
   * console.log(r10); //⚠️Salida: 1000.00099 //se asume el último "." como el separador de decimales
   *
   * const v11 = "1'000.000,99";
   * //caracter de separación decimal personalizado
   * const r11 = stringToNumber(v11, {isDecimalPoint: true, charDecimalPoint: ","});
   * console.log(r11); //Salida: 1000000.99
   *
   * const v12 = "1000.99";
   * const r12 = stringToNumber(v12, false); // No se aplica limpieza interna
   * console.log(r12); //Salida: 1000.99
   *
   * const v13 = "1,000.99";
   * const fn13 = (str:string)=>{
   *   //...aqui limpieza y formateo totalmente personalizado
   *   return str;
   * }
   * const r13 = stringToNumber(v13, fn13); //función con limpieza y formateo personalizado
   * console.log(r13); //Salida: 1000.99
   *
   * ```
   */
  public stringToNumber(
    strNum: string | number,
    formatCleanOption?:
      | TStringToNumberFormatCleanOption
      | ((str: string) => string)
      | false,
  ): number {
    // Si el valor ya es un número, devolverlo sin cambios
    if (this.isNumber(strNum)) return strNum;
    //formatear el string antes de verificar si es posible la conversión
    if (this.isObject(formatCleanOption, true)) {
      strNum = this._cleanNumericString(
        strNum,
        formatCleanOption as TStringToNumberFormatCleanOption,
      );
    } else if (this.isFunction(formatCleanOption)) {
      const fn = formatCleanOption;
      strNum = fn(strNum);
    } else if (formatCleanOption === false) {
      //explícitamente no hacer nada
    } else {
      //con las opciones predefinidas
      strNum = this._cleanNumericString(
        strNum,
        {} as TStringToNumberFormatCleanOption,
      );
    }
    //verifica si es un string que se pueda convertir en número (ya no se requiere la limpieza)
    if (!this.isStringAsNumber(strNum, false))
      throw new Error(`${strNum} is not numeric string valid`);
    // Verificar si el string es demasiado grande para ser manejado como number
    const maxLenSafeInteger = Number.MAX_SAFE_INTEGER.toString().length;
    const strLen = (strNum as string).length;
    if (maxLenSafeInteger < strLen)
      throw new Error(
        `${strNum} is too large string-number for number, please use \` .stringToBigint() \` method`,
      );
    //determinar si es un flotante
    const floatNum = parseFloat(strNum as string);
    if (!isNaN(floatNum)) return floatNum;
    //determinar si es un entero
    const intNum = parseInt(strNum as string, 10);
    if (!isNaN(intNum)) return intNum;
    //!No se encontró forma de convertirlo!
    throw new Error(`${strNum} is unknown format, don't possible conversion`);
  }
  /**
   * Convierte un numeric string entero a `bigint`. Rechaza partes decimales
   * y notación exponencial. El separador decimal puede configurarse para que
   * los formatos con punto o coma decimal no se interpreten como agrupación.
   *
   * @param {string | bigint} strBigNum - El string numérico o `bigint` a convertir.
   * @param applyFormatCleanStr `true` aplica la limpieza predeterminada; un objeto configura el separador decimal; una función aplica una limpieza personalizada; `false` no aplica limpieza.
   *
   * @returns {bigint} - El valor convertido a `bigint`.
   * @throws {Error} - Lanza un error si el valor no es un `bigint` o un string numérico válido.
   *
   * @example
   * ```typescript
   * const v1 = "98765432109876543210";
   * const r1 = stringToBigint(v1); //formateo y limpieza predeterminado
   * console.log(r1); //Salida: 98765432109876543210n
   *
   * const v2 = "9 8 7 6 5 4 3 2 1 0 9 8 7 6 5 4 3 2 1 0";
   * const r2 = stringToBigint(v2); //formateo y limpieza predeterminado
   * console.log(r2); //Salida: 98765432109876543210n
   *
   * const v3 = "98,765,432,109,876,543,210";
   * const r3 = stringToBigint(v3); //formateo y limpieza predeterminado
   * console.log(r3); //Salida: 98765432109876543210n
   *
   * const v4 = "9876543210.9876543210";
   * const r4 = stringToBigint(v4); //formateo y limpieza predeterminado
   * console.log(r4); //Lanza error, no se permite decimales
   *
   * ```
   */
  public stringToBigint(
    strBigNum: string | bigint,
    applyFormatCleanStr:
      | boolean
      | TStringToNumberFormatCleanOption
      | ((str: string) => string) = true,
  ): bigint {
    //si el valor ya es bigint lo retorna sin cambios
    if (this.isBigint(strBigNum)) return strBigNum;
    //formatear el string antes de verificar si es posible la conversión
    if (this.isFunction(applyFormatCleanStr)) {
      strBigNum = applyFormatCleanStr(strBigNum);
    } else if (this.isObject(applyFormatCleanStr, true)) {
      strBigNum = this._cleanNumericString(
        strBigNum,
        applyFormatCleanStr as TStringToNumberFormatCleanOption,
      );
    } else if (this.isBoolean(applyFormatCleanStr)) {
      if (applyFormatCleanStr) strBigNum = this._cleanNumericString(strBigNum);
    }
    if (!this.isStringAsBigInt(strBigNum, false))
      throw new Error(`${strBigNum} is not big numeric string valid`);
    return BigInt(strBigNum);
  }
  /**
   * Comprueba si un string coincide literalmente con otro al inicio, al final
   * o en cualquier posición.
   *
   * @param str String donde se desea buscar.
   * @param strToSearch Texto literal que se desea encontrar; no se interpreta como expresión regular.
   * @param option Define `likeType`: `"start"`, `"end"` o `"between"`.
   * @returns `true` si coincide con el tipo solicitado; de lo contrario, `false`.
   * @throws {Error} Si `likeType` no es válido.
   *
   * @example
   * ```typescript
   * const text = "Hello, world!";
   * console.log(util.isStringLike(text, "Hello", { likeType: "start" })); // true
   *
   * console.log(util.isStringLike(text, "world", { likeType: "end" })); // false
   *
   * console.log(util.isStringLike(text, "lo, wo", { likeType: "between" })); // true
   *
   * console.log(util.isStringLike("a.b", ".", { likeType: "between" })); // true
   * ```
   */
  public isStringLike(
    str: string,
    strToSearch: string,
    option: { likeType: "start" | "end" | "between" },
  ): boolean {
    let r = false;
    if (!this.isString(str, true) || !this.isString(strToSearch, true))
      return r;
    //construir option
    const dfOp: typeof option = {
      likeType: "between",
    };
    const op = option;
    if (!this.isObject(op)) {
      option = dfOp;
    } else {
      option = {
        ...op,
        likeType: this.isString(op.likeType) ? op.likeType : dfOp.likeType,
      };
    }
    const { likeType } = option;
    if (likeType !== "start" && likeType !== "end" && likeType !== "between") {
      throw new Error(`${likeType} is not like-type valid`);
    }
    r =
      likeType === "start"
        ? str.startsWith(strToSearch)
        : likeType === "end"
          ? str.endsWith(strToSearch)
          : str.includes(strToSearch);
    return r;
  }
  /**
   * Convierte un string a uno de los formatos de nomenclatura habituales en programación.
   *
   * @param str String que se desea convertir.
   * @param caseType Formato destino: `"Snake"`, `"Kebab"`, `"Camel"`, `"Pascal"`, `"Constant"` o `"Dot"`.
   * @returns El string con el formato solicitado. Si `str` no es un string no vacío, lo devuelve sin cambios.
   *
   * @example
   * ```typescript
   * let a;
   * let r;
   * a = "hola como estas";
   * r = convertStringToCase(a, "Snake");
   * console.log(r); // salida "hola_como_estas"
   * r = convertStringToCase(a, "Kebab");
   * console.log(r); // salida "hola-como-estas"
   * r = convertStringToCase(a, "Camel");
   * console.log(r); // salida "holaComoEstas"
   * r = convertStringToCase(a, "Pascal");
   * console.log(r); // salida "HolaComoEstas"
   * r = convertStringToCase(a, "Constant");
   * console.log(r); // salida "HOLA_COMO_ESTAS"
   * r = convertStringToCase(a, "Dot");
   * console.log(r); // salida "hola.como.estas"
   * ```
   */
  public convertStringToCase(str: string, caseType: TStrCase): string {
    if (!this.isString(str)) return str; //no usar throw
    if (!this.isString(caseType))
      throw new Error(`${caseType} is not case convertion type valid`);
    //adapta casos especial como snake o kebab
    const adaptCasesWithSeparateChartFn = (
      type: Extract<TStrCase, "Snake" | "Kebab" | "Constant" | "Dot">,
      str: string,
      reOtherCase: RegExp,
      sp: string,
    ) => {
      str = str.replace(/([a-z0-9])([A-ZÑ])/g, `$1${sp}$2`);
      str = str.replace(reOtherCase, sp);
      return str
        .split(sp)
        .filter((word) => word.trim() !== "")
        .join(sp)
        .toLowerCase();
    };
    //adapta caso especiales de camel y Pascal
    const adaptCasesWithoutSeparateChartFn = (
      type: Extract<TStrCase, "Camel" | "Pascal">,
      str: string,
    ) => {
      let isInitialCamelWord = true; //flag especial para camel, determina si es la palabara inicial (NO vacia)
      str = str
        .split(/[\s.:,;#*/><\-_]/g) //caracteres separadores de otros Case
        .map((word) => {
          let charts = word.split("");
          if (type === "Pascal") {
            if (charts.length <= 0) return ""; //este caso se da cuando el separador esta repetido y hace que la palabra sea vacia
            charts[0] = charts[0].toLocaleUpperCase();
          } else if (type === "Camel") {
            if (charts.length <= 0) return "";
            if (isInitialCamelWord) {
              //determina si es la palabra inicial
              charts[0] = charts[0].toLocaleLowerCase();
              isInitialCamelWord = false;
            } else {
              charts[0] = charts[0].toLocaleUpperCase();
            }
          } else {
          }
          word = charts.join(""); //reconstruir la palabra
          return word;
        })
        .reduce((preWord, currentWord) => {
          const r = `${preWord}${currentWord}`;
          return r;
        }, "");
      return str;
    };
    switch (caseType) {
      //convertir a snakeCase
      case "Snake":
        str = adaptCasesWithSeparateChartFn(
          "Snake",
          str,
          /[\s.:,;#*/><\-]/g,
          "_",
        );
        return str;
        break;

      case "Kebab":
        str = adaptCasesWithSeparateChartFn(
          "Kebab",
          str,
          /[\s.:,;#*/><_]/g,
          "-",
        );
        return str;
        break;

      case "Camel":
        str = adaptCasesWithoutSeparateChartFn("Camel", str);
        return str;
        break;

      case "Pascal":
        str = str = adaptCasesWithoutSeparateChartFn("Pascal", str);
        return str;
        break;
      //convertir a CONSTANT_CASE
      case "Constant":
        str = adaptCasesWithSeparateChartFn(
          "Constant",
          str,
          /[\s.:,;#*/><\-]/g,
          "_",
        );
        return str.toUpperCase(); // Convertimos todo a mayúsculas
        break;
      //convertir a dot.case
      case "Dot":
        str = adaptCasesWithSeparateChartFn(
          "Dot",
          str,
          /[\s.:,;#*/><\-_]/g,
          ".",
        );
        return str.toLowerCase(); // Convertimos todo a minúsculas
        break;
      default:
        return str;
        break;
    }
  }
  /**
   * Convierte a mayúscula la primera letra de un string y conserva el resto.
   *
   * Si recibe una frase, solo cambia la primera letra. Un string vacío se
   * devuelve vacío; un valor que no sea string produce un error.
   *
   * @param word String que se desea capitalizar.
   * @returns El string con su primera letra en mayúscula.
   * @throws {Error} Si `word` no es un string.
   *
   * @example
   * ````typescript
   * const txt = "hola mundo";
   * const r = capitalizeString(txt);
   * console.log(r); // "Hola mundo"
   * console.log(capitalizeString("")); // ""
   * ````
   */
  public capitalizeString(word: string): string {
    if (!this.isString(word, true))
      // "" no lanza throw
      throw new Error(`${word} is not a valid string`);
    const r = word.charAt(0).toUpperCase() + word.slice(1);
    return r;
  }
  /**
   * Construye una ruta a partir de segmentos de string, omitiendo los vacíos
   * y recortando separadores repetidos al inicio y al final de cada segmento.
   *
   * @param aKeys Segmentos de la ruta; se permite un array vacío.
   * @param option Opciones de construcción:
   *   - `charSeparator`: separador entre segmentos; por defecto `charSeparatorLogicPath`.
   *   - `pathInit` y `pathEnd`: prefijo y sufijo opcionales (`string` o `number`).
   *   - `isStartWithSeparator` y `isFinishWithSeparator`: agregan separador al inicio o al final.
   *   - `isJoinInitWithSeparator` y `isJoinEndtWithSeparator`: unen el prefijo o sufijo con el separador.
   * @returns La ruta construida.
   * @throws {Error} Si `aKeys` no es un array de strings.
   *
   * @example
   * ```typescript
   * const keys = ["home", "user", "documents"];
   * let path: string;
   * //ejemplo 1:
   * path = buildPath(keys, { charSeparator: "/", isStartWithSeparator: true });
   * console.log(path); // salida: "/home/user/documents"
   *
   * //ejemplo 2:
   * path = buildPath(keys, {
   *   charSeparator: "/",
   *   isStartWithSeparator: false, //no inicializar con "/"
   *   isFinishWithSeparator: true, //si finalizar con "/"
   * });
   * console.log(path); // salida: "home/user/documents/"
   *
   * //ejemplo 3:
   * path = buildPath(keys, {
   *   charSeparator: "/",
   *   isStartWithSeparator: false, //no inicializar con "/"
   *   isFinishWithSeparator: true, //si finalizar con "/"
   *   pathInit: "..",
   *   isJoinInitWithSeparator: true //unir ".." al path con "/"
   * });
   * console.log(path); // salida: "../home/user/documents/"
   * ```
   */
  public buildPath(
    aKeys: string[],
    option?: {
      /**`= this.charSeparatorLogicPath` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
      /** `= ""` El prefijo a añadir al inicio del path.*/
      pathInit?: string;
      /** `= ""` El sufijo a añadir al final del path.*/
      pathEnd?: string;
      /** `= false` Determina si el path debe iniciar con el caracter separador */
      isStartWithSeparator?: boolean;
      /**`= false` Determina si el path debe terminar con el caracter separador */
      isFinishWithSeparator?: boolean;
      /**`= false` Determina si el `pathInit` debe unirse al path con caracter separador.*/
      isJoinInitWithSeparator?: boolean;
      /**`= false` Determina si el `pathEnd` debe unirse al path con caracter separador.*/
      isJoinEndtWithSeparator?: boolean;
    },
  ): string {
    if (
      !this.isValueType(aKeys, [["string"], []], {
        allowStringEmpty: true,
      })
    ) {
      throw new Error(`${aKeys} is not array of strings valid`);
    }
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath, //❗default❗
      isStartWithSeparator: this.isBoolean(op.isStartWithSeparator)
        ? op.isStartWithSeparator
        : false, //default, ❗No inicia con caracter separador❗,
      isFinishWithSeparator: this.isBoolean(op.isFinishWithSeparator)
        ? op.isFinishWithSeparator
        : false, //default, ❗No termina con caracter separador❗
      isJoinInitWithSeparator: this.isBoolean(op.isJoinInitWithSeparator)
        ? op.isJoinInitWithSeparator
        : false, //default, no une con caracter separador
      isJoinEndtWithSeparator: this.isBoolean(op.isJoinEndtWithSeparator)
        ? op.isJoinEndtWithSeparator
        : false, //default, no une con caracter separador
      pathInit: this.isValueType(op.pathInit, ["number", "string"])
        ? op.pathInit
        : "",
      pathEnd: this.isValueType(op.pathEnd, ["number", "string"])
        ? op.pathEnd
        : "",
    };
    const {
      charSeparator: sp,
      isStartWithSeparator,
      isFinishWithSeparator,
      isJoinInitWithSeparator,
      isJoinEndtWithSeparator,
      pathEnd,
      pathInit,
    } = op;
    // Escapar el separador si es un carácter especial en regex
    const eSp = sp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`^(?:${eSp})+|(?:${eSp})+$`, "g");
    let aKeys_clon = [...aKeys]; //clonacion sencilla
    //reducir:
    let path = aKeys_clon.reduce((prePath, cKey) => {
      const keyCC = cKey.replace(re, "");
      if (keyCC === "") return prePath;
      return prePath === "" ? keyCC : `${prePath}${sp}${keyCC}`;
    }, "");
    //formateo adicional:
    // Agregar prefijo y sufijo (eliminando separadores duplicados)
    if (pathInit !== "") {
      const cleanPathInit = pathInit.replace(re, "");
      path = isJoinInitWithSeparator
        ? `${cleanPathInit}${sp}${path}`
        : `${cleanPathInit}${path}`;
    }
    if (pathEnd !== "") {
      const cleanPathEnd = pathEnd.replace(re, "");
      path = isJoinEndtWithSeparator
        ? `${path}${sp}${cleanPathEnd}`
        : `${path}${cleanPathEnd}`;
    }
    // Agregar separadores al inicio y final si es necesario
    if (isStartWithSeparator) path = `${sp}${path}`;
    if (isFinishWithSeparator) path = `${path}${sp}`;
    return path;
  }
  /**
   * Comprueba si una ruta o una lista de rutas está correctamente construida.
   *
   * Cada ruta debe tener segmentos no vacíos y no puede comenzar ni terminar
   * con el separador ni contener separadores consecutivos.
   *
   * @param keyOrKeysPath Ruta o lista de rutas que se desea validar.
   * @param separator Separador usado en las rutas; por defecto es `charSeparatorLogicPath`.
   * @returns `true` si todas las rutas son válidas; de lo contrario, `false`.
   * @throws {Error} Si `separator` es vacío o no es un string.
   *
   * @example
   * ```typescript
   * util.isKeyPath("prop1.prop2.propN"); // true
   * util.isKeyPath(".prop1..prop2"); // false
   * util.isKeyPath(["prop1.prop2", "prop3.prop4"]); // true
   * util.isKeyPath(["prop1.prop2", ".prop3..prop4"]); // false
   * util.isKeyPath("prop1::prop2", "::"); // true
   * ```
   */
  public isKeyPath(
    keyOrKeysPath: string | string[],
    separator: string = this.charSeparatorLogicPath,
  ): boolean {
    if (!this.isString(separator))
      //el separador no puede ser "" vacio
      throw new Error(`${separator} is not char separator valid`);
    keyOrKeysPath = this.castArrayByConditionType(keyOrKeysPath, "string", []);
    if (keyOrKeysPath.length === 0) return false;
    // Función auxiliar para validar un `keyPath` individual
    const isValidSingleKeyPath = (path: string): boolean => {
      // Verificar que no comience ni termine con el separador
      if (path.startsWith(separator) || path.endsWith(separator)) return false;
      // Verificar que no contenga separadores consecutivos
      if (path.includes(`${separator}${separator}`)) return false;
      // Verificar que cada segmento sea una cadena no vacía
      const segments = path.split(separator);
      return segments.every((segment) => segment.trim() !== "");
    };
    let r = keyOrKeysPath.every(isValidSingleKeyPath);
    return r;
  }
  //████ Objetos ████████████████████████████████████████████████████
  /**
   * Comprueba si el valor es un objeto no nulo y no es un array.
   *
   * Por defecto, también requiere que tenga al menos una propiedad propia,
   * enumerable o no enumerable. Con `allowEmpty: true` acepta objetos vacíos.
   * Las instancias también cuentan como objetos si tienen propiedades propias.
   *
   * @param value Valor que se desea comprobar.
   * @param allowEmpty `false` por defecto. Si es `true`, permite objetos sin propiedades propias.
   * @returns `true` si cumple el criterio; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * console.log(util.isObject({ value: 1 })); // true
   * console.log(util.isObject({})); // false
   * console.log(util.isObject({}, true)); // true
   * console.log(util.isObject([], true)); // false
   * console.log(util.isObject(null, true)); // false
   * ```
   */
  public isObject(
    value: unknown,
    allowEmpty = false,
  ): value is Record<string, any> {
    allowEmpty = this.convertToBoolean(allowEmpty);
    // Verificar si es un objeto (excluyendo null y arrays)
    const isObj =
      typeof value === "object" && !this.isNull(value) && !Array.isArray(value);
    if (!isObj) return false;
    // Si allowEmpty es true, no es necesario verificar si el objeto está vacío
    if (allowEmpty) return true;
    // Verificar si el objeto tiene propiedades (incluyendo no enumerables)
    return Object.getOwnPropertyNames(value).length > 0;
  }
  /**
   * Obtiene las rutas de las propiedades propias enumerables de un objeto,
   * incluyendo propiedades anidadas y los índices de arrays. Devuelve primero
   * cada ruta padre y recorre sus descendientes antes de pasar al siguiente
   * hermano. Las referencias cíclicas se omiten mientras están en el recorrido.
   *
   * @param {TObj} obj - El objeto del cual se obtendrán los paths de las propiedades.
   * @param {object} [option] - Opciones para personalizar la obtención de paths:
   *   - `charSeparator`: separador de segmentos; por defecto `charSeparatorLogicPath`.
   *   - `includeFunctionProps`: incluye propiedades función; por defecto `true`.
   *   - `includePrivateProps`: incluye claves que comienzan con `_`; por defecto `true`.
   *
   * @returns Un array de rutas. Solo recorre claves propias enumerables de tipo string; omite símbolos y propiedades no enumerables.
   *
   * @throws {Error} Si `obj` no es un objeto no vacío.
   *
   * @example
   * ```typescript
   * const obj = {
   *   a: {
   *     b: {
   *       c: 42,
   *       d: "hola",
   *     },
   *     e: [1, 2, 3],
   *   },
   *   f: "mundo",
   *   _privateProp: "secreto",
   *   g: () => console.log("función"),
   * };
   *
   * const util = new UtilNative(null);
   *
   * // Obtener todos los paths (incluyendo funciones y propiedades privadas)
   * const paths1 = util.getPropertyPathsOfObject(obj);
   * console.log(paths1);
   * // Salida esperada:
   * // [
   * //   "a",
   * //   "a.b",
   * //   "a.b.c",
   * //   "a.b.d",
   * //   "a.e",
   * //   "a.e.0",
   * //   "a.e.1",
   * //   "a.e.2",
   * //   "f",
   * //   "_privateProp",
   * //   "g"
   * // ]
   *
   * // Obtener todas las rutas (excluyendo funciones y claves privadas, también anidadas)
   * const paths2 = util.getPropertyPathsOfObject(obj, {
   *   includeFunctionProps: false,
   *   includePrivateProps: false,
   * });
   * console.log(paths2);
   * // Salida esperada:
   * // [
   * //   "a",
   * //   "a.b",
   * //   "a.b.c",
   * //   "a.b.d",
   * //   "a.e",
   * //   "a.e.0",
   * //   "a.e.1",
   * //   "a.e.2",
   * //   "f"
   * // ]
   *
   * // Obtener todos los paths con un separador personalizado
   * const paths3 = util.getPropertyPathsOfObject(obj, {
   *   charSeparator: "/",
   * });
   * console.log(paths3);
   * // Salida esperada:
   * // [
   * //   "a",
   * //   "a/b",
   * //   "a/b/c",
   * //   "a/b/d",
   * //   "a/e",
   * //   "a/e/0",
   * //   "a/e/1",
   * //   "a/e/2",
   * //   "f",
   * //   "_privateProp",
   * //   "g"
   * // ]
   * ```
   */
  public getPropertyPathsOfObject<TObj extends object>(
    obj: TObj,
    option?: {
      /** `= "."` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
      /** `= true` Incluir paths de propiedades de tipo Function. */
      includeFunctionProps?: boolean;
      /** `= true` Incluir paths de propiedades consideradas privadas (que tienen prefijo "_") */
      includePrivateProps?: boolean;
    },
  ): string[] {
    if (!this.isObject(obj)) throw new Error(`${obj} is not object valid`);
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      includeFunctionProps: this.isBoolean(op.includeFunctionProps)
        ? op.includeFunctionProps
        : true,
      includePrivateProps: this.isBoolean(op.includePrivateProps)
        ? op.includePrivateProps
        : true,
    };
    const { charSeparator, includeFunctionProps, includePrivateProps } = op;
    const paths: string[] = [];
    type TPathTraversalTask =
      | { type: "visit"; value: object; path: string }
      | { type: "emit"; path: string }
      | { type: "leave"; value: object };
    const stack: TPathTraversalTask[] = [
      { type: "visit", value: obj, path: "" },
    ];
    const activeObjects = new WeakSet<object>();
    while (stack.length > 0) {
      const task = stack.pop()!;
      if (task.type === "emit") {
        paths.push(task.path);
        continue;
      }
      if (task.type === "leave") {
        activeObjects.delete(task.value);
        continue;
      }
      if (activeObjects.has(task.value)) continue;
      activeObjects.add(task.value);
      stack.push({ type: "leave", value: task.value });

      if (Array.isArray(task.value)) {
        for (let index = task.value.length - 1; index >= 0; index--) {
          const item = task.value[index];
          if (!includeFunctionProps && this.isFunction(item)) continue;
          const itemPath = `${task.path}${charSeparator}${index}`;
          if (
            (this.isObject(item, true) || Array.isArray(item)) &&
            typeof item === "object" &&
            item !== null
          ) {
            stack.push({ type: "visit", value: item, path: itemPath });
          }
          stack.push({ type: "emit", path: itemPath });
        }
        continue;
      }

      const currentObj = task.value as Record<string, any>;
      const keys = Object.keys(currentObj);
      for (let index = keys.length - 1; index >= 0; index--) {
        const key = keys[index];
        const value = currentObj[key];
        if (!includeFunctionProps && this.isFunction(value)) continue;
        if (!includePrivateProps && key.startsWith("_")) continue;
        const path = task.path ? `${task.path}${charSeparator}${key}` : key;
        if (
          (this.isObject(value, true) || Array.isArray(value)) &&
          typeof value === "object" &&
          value !== null
        ) {
          stack.push({ type: "visit", value, path });
        }
        stack.push({ type: "emit", path });
      }
    }
    return paths;
  }
  /**
   * Comprueba claves del primer nivel; no interpreta rutas profundas y no acepta
   * arrays como objeto principal. Todas las claves solicitadas deben cumplir
   * `propCondition`. La comprobación `"it-exist"` usa `in`, por lo que también
   * considera propiedades heredadas.
   *
   * @param obj Objeto cuyas propiedades se comprueban.
   * @param keyOrKeys Clave no vacía, lista de claves no vacías o lista vacía. Si la lista está vacía, solo valida el objeto.
   * @param option `propCondition` (`"it-exist"`, `"is-not-undefined"`, `"is-not-null"` o `"is-not-undefined-and-not-null"`); `allowEmpty` permite `{}`.
   * @returns `true` si el objeto y todas las claves cumplen; de lo contrario, `false`.
   * @throws {Error} Si `keyOrKeys` no es una clave string o una lista de strings.
   *
   * @example
   * ```typescript
   * const obj = { present: undefined, empty: null, nested: { value: 1 } };
   * util.isObjectWithProperties(obj, "present", { propCondition: "it-exist" }); // true
   * util.isObjectWithProperties(obj, "present", { propCondition: "is-not-undefined" }); // false
   * util.isObjectWithProperties(obj, "empty", { propCondition: "is-not-null" }); // false
   * util.isObjectWithProperties(obj, "nested.value"); // false: no busca rutas
   * util.isObjectWithProperties({}, [], { allowEmpty: true }); // true
   * ```
   */
  public isObjectWithProperties<TObj extends object>(
    obj: TObj,
    keyOrKeys: keyof TObj | Array<keyof TObj>,
    option?: {
      /** `= "is-not-undefined-and-not-null"` Determina la condición que debe cumplir cada propiedad referenciada en `keyOrKeys` */
      propCondition?:
        | "it-exist"
        | "is-not-undefined"
        | "is-not-null"
        | "is-not-undefined-and-not-null";
      /**`= false`, Determina si se permite que un objeto vacío sea válido. */
      allowEmpty?: boolean;
    },
  ): boolean {
    if (
      this.isNotUndefinedAndNotNull(keyOrKeys) &&
      !this.isString(keyOrKeys) && //❗Obligario negar string vacio❗
      !this.isArray(keyOrKeys, true) //❗Obligario permitir array vacio❗
    )
      throw new Error(`${keyOrKeys as any} is not key or keys valid`);
    if (
      Array.isArray(keyOrKeys) &&
      !keyOrKeys.every((key) => this.isString(key))
    )
      throw new Error(`${keyOrKeys as any} is not key or keys valid`);
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      propCondition:
        op.propCondition === "is-not-null" ||
        op.propCondition === "is-not-undefined" ||
        op.propCondition === "it-exist" ||
        op.propCondition === "is-not-undefined-and-not-null"
          ? op.propCondition
          : "is-not-undefined-and-not-null", //default
      allowEmpty: this.isBoolean(op.allowEmpty) ? op.allowEmpty : false,
    };
    const { propCondition, allowEmpty } = op;
    //validación del objeto vacio
    if (!this.isObject(obj, allowEmpty)) return false;
    let keys = this.castArrayByConditionType(keyOrKeys, "string", []);
    keys = [...new Set(keys)]; //eliminacion de repetidos sencilla
    let r = false;
    if (keys.length > 0) {
      r = keys.every((key) => {
        let r =
          propCondition === "it-exist"
            ? key in obj
            : propCondition === "is-not-undefined"
              ? !this.isUndefined(obj[key])
              : propCondition === "is-not-null"
                ? !this.isNull(obj[key])
                : this.isNotUndefinedAndNotNull(obj[key]);
        return r;
      });
    } else {
      r = true;
    }
    return r;
  }
  /**
   * Verifica si un valor es un objeto y si determinadas propiedades cumplen una condición específica, permitiendo rutas profundas.
   *
   * ⚠ **No** reconoce arrays directamente como objetos, pero permite el uso de comodines para verificar elementos dentro de arrays.
   *
   * @param {any} obj El objeto a verificar.
   * @param {string | string[]} keyOrKeysPath Las claves identificadoras de las propiedades a verificar, permitiendo rutas profundas separadas por `charSeparator`.
   * @param {object} [option] Objeto de opciones para configurar la verificación con las siguientes propiedades:
   * - `propCondition = "is-not-undefined-and-not-null"` Determina la condición que debe cumplir cada propiedad referenciada en `keyOrKeysPath`.
   * - `"it-exist"` verifica si la propiedad existe (aunque tenga asignado `undefined` o `null`).
   * - `"is-not-undefined"` verifica que la propiedad no sea `undefined`.
   * - `"is-not-null"` verifica que la propiedad no sea `null`.
   * - `"is-not-undefined-and-not-null"` (predefinido) verifica que la propiedad no sea `undefined` ni `null`.
   * - `charSeparator = "."` El carácter separador a utilizar entre los elementos del path.
   * - `charWildcard = "#"` El carácter comodín para las rutas con profundidad en arrays cuando no se conoce el índice específico.
   * @returns {boolean} Retorna `true` si es un objeto y las propiedades cumplen la condición, `false` de lo contrario.
   *
   * @example
   * ```typescript
   * const util = util.getInstance();
   * let obj;
   * let r;
   *
   * // Ejemplo básico (evalúa como `isObject()`):
   * obj = { p1: "hola", p2: 31 };
   * r = util.isObjectWithDeepProperties(obj);
   * console.log(r); // Salida: `true`, es un objeto
   *
   * // Ejemplo verificando propiedad (no undefined y no null):
   * obj = { p1: "hola", p2: 31 };
   * r = util.isObjectWithDeepProperties(obj, "p1", { propCondition: "is-not-undefined-and-not-null" });
   * console.log(r); // Salida: `true`, es un objeto y `p1` no es undefined o null
   *
   * // Ejemplo verificando propiedad (es undefined o es null):
   * obj = { p1: "hola", p2: 31 };
   * r = util.isObjectWithDeepProperties(obj, "p3", { propCondition: "is-not-undefined-and-not-null" });
   * console.log(r); // Salida: `false`, es un objeto pero `p3` es undefined
   *
   * // Ejemplo diferencias de comprobación ("it-exist"):
   * obj = { p1: "hola", p2: 31, p3: undefined };
   * r = util.isObjectWithDeepProperties(obj, "p3", { propCondition: "it-exist" });
   * console.log(r); // Salida: `true`, es un objeto y `p3` existe (a pesar de tener asignado undefined)
   *
   * // Ejemplo diferencias de comprobación ("is-not-undefined"):
   * obj = { p1: "hola", p2: 31, p3: undefined };
   * r = util.isObjectWithDeepProperties(obj, "p3", { propCondition: "is-not-undefined" });
   * console.log(r); // Salida: `false`, es un objeto y `p3` tiene asignado undefined
   *
   * // Ejemplo comprobación profunda:
   * obj = { p1: "hola", p2: { p21: 3 } };
   * r = util.isObjectWithDeepProperties(obj, "p2.p21", { propCondition: "is-not-undefined-and-not-null" });
   * console.log(r); // Salida: `true`, permite verificación profunda (hasta 16 niveles probados)
   * ```
   */
  public isObjectWithDeepProperties(
    obj: any,
    keyOrKeysPath: string | string[],
    option?: {
      /** `= "is-not-undefined-and-not-null"` Determina la condición que debe cumplir cada propiedad referenciada en `keyOrKeys` */
      propCondition?:
        | "it-exist"
        | "is-not-undefined"
        | "is-not-null"
        | "is-not-undefined-and-not-null";
      /**`= "."` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
      /**`= false`, Determina si se permite que un objeto vacío sea válido. */
      allowEmpty?: boolean;
    },
  ): boolean {
    // Validación de keyOrKeysPath
    if (
      this.isNotUndefinedAndNotNull(keyOrKeysPath) &&
      !this.isString(keyOrKeysPath) && //❗Obligario negar string vacio❗
      !this.isArray(keyOrKeysPath, true) //❗Obligario permitir array vacio❗
    ) {
      throw new Error(`${keyOrKeysPath} is not key or keys path valid`);
    }
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      propCondition:
        op.propCondition === "is-not-null" ||
        op.propCondition === "is-not-undefined" ||
        op.propCondition === "it-exist" ||
        op.propCondition === "is-not-undefined-and-not-null"
          ? op.propCondition
          : "is-not-undefined-and-not-null", //default
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      allowEmpty: this.isBoolean(op.allowEmpty) ? op.allowEmpty : false,
    };
    const { propCondition, allowEmpty, charSeparator } = op;
    //caracter especial para representar cualquier index
    const charWildcardForIndex = "#";
    //caracter especial para representar el multiplicador de niveles
    const charWildcardForMultiply = "*";
    // Convertir keyOrKeysPath a un array de rutas
    let keysPath = this.castArrayByConditionType(keyOrKeysPath, "string", []);
    // Eliminar duplicados
    keysPath = [...new Set(keysPath)];
    // Validación del objeto vacio
    if (!this.isObject(obj, allowEmpty)) return false;
    // Verificar cada ruta
    for (const keyPath of keysPath) {
      const keys = keyPath.split(charSeparator);
      let currentObj = obj;
      // Recorrer la ruta de claves
      for (let idx = 0; idx < keys.length; idx++) {
        const key = keys[idx];
        if (key === charWildcardForIndex) {
          if (!Array.isArray(currentObj)) return false;
          for (const element of currentObj) {
            const remainingPath = keys.slice(idx + 1).join(charSeparator);
            if (
              this.isObjectWithDeepProperties(element, remainingPath, { ...op })
            ) {
              return true;
            }
          }
          return false;
        }
        // Si es comodín multiplicador "*" o "*N"
        if (key.startsWith(charWildcardForMultiply)) {
          const num = parseInt(key.substring(1));
          const depth = isNaN(num) || num < 1 ? 1 : num;
          const remainingPath = keys.slice(idx + 1).join(charSeparator);

          // Función recursiva interna para explorar subniveles de objetos o arrays
          const searchInDepth = (curr: any, currentDepth: number): boolean => {
            if (this.isUndefinedOrNull(curr)) return false;
            if (currentDepth === depth) {
              if (!remainingPath) return true;
              return this.isObjectWithDeepProperties(curr, remainingPath, {
                ...op,
              });
            }
            if (Array.isArray(curr)) {
              return curr.some((item) => searchInDepth(item, currentDepth + 1));
            }
            if (this.isObject(curr, true)) {
              return Object.values(curr).some((val) =>
                searchInDepth(val, currentDepth + 1),
              );
            }
            return false;
          };

          return searchInDepth(currentObj, 0);
        }
        // Verificar si la clave existe en el objeto actual
        const isArray = Array.isArray(currentObj);
        const isArrayIndex =
          isArray &&
          /^(0|[1-9]\d*)$/.test(key) &&
          Number(key) < currentObj.length &&
          Object.prototype.hasOwnProperty.call(currentObj, key);
        if (
          this.isUndefinedOrNull(currentObj) ||
          (!isArray && !this.isObject(currentObj, true)) ||
          (isArray ? !isArrayIndex : !(key in currentObj))
        )
          return false; // La ruta no existe
        // Verificar la condición de la propiedad
        if (idx === keys.length - 1) {
          const value = currentObj[key];
          switch (propCondition) {
            case "it-exist":
              if (!(key in currentObj)) return false;
              break;
            case "is-not-undefined":
              if (this.isUndefined(value)) return false;
              break;
            case "is-not-null":
              if (this.isNull(value)) return false;
              break;
            case "is-not-undefined-and-not-null":
              if (this.isUndefinedOrNull(value)) return false;
              break;
          }
        }
        // Mover al siguiente nivel del objeto
        currentObj = currentObj[key];
      }
    }
    return true; // Todas las rutas son válidas
  }
  /**
   * Comprueba si el valor es un objeto literal por su prototipo. Acepta objetos
   * con prototipo `Object.prototype` o `null`, incluidos los objetos vacíos.
   * No considera literales los arrays ni los objetos con otros prototipos.
   *
   * @param obj Valor que se desea comprobar.
   * @returns `true` si es un objeto literal; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * let obj;
   * let r;
   *
   * //comprobando literal
   * obj = { a: 1, b: 2 };
   * r = isLiteralObject(obj);
   * console.log(r); // salida: true
   *
   * //comprobando instancia
   * class MyClass{};
   * obj = new MyClass();
   * r = isLiteralObject(obj);
   * console.log(r); // salida: false
   *
   * //comprobando literal
   * obj = {}; //vacío
   * r = isLiteralObject(obj);
   * console.log(r); // salida: true
   *
   * obj = Object.create(null);
   * r = util.isLiteralObject(obj); // true
   * console.log(r); // salida: true
   * ```
   */
  public isLiteralObject(obj: unknown) {
    // Verificar si es un objeto (incluyendo objetos vacíos)
    if (!this.isObject(obj, true)) return false;
    // Verificar que el prototipo sea el prototipo base de Object
    const proto = Object.getPrototypeOf(obj);
    return proto === Object.prototype || this.isNull(proto);
  }
  /**
   * Comprueba si un objeto tiene un prototipo cuyo constructor es una función
   * distinta de `Object`. Los objetos con prototipo `Object.prototype` o `null`
   * y los arrays no se consideran instancias.
   *
   * @param obj Valor que se desea comprobar.
   * @returns `true` si cumple el criterio de instancia; de lo contrario, `false`.
   *
   * @example
   * ```typescript
   * let obj;
   * let r;
   * class MyClass {};
   *
   * //comprobando instancia
   * obj = new MyClass();
   * r = isInstance(obj);
   * console.log(r); // salida: true
   *
   * //comprobando literal
   * obj = {p1:"hola"};
   * r = isInstance(obj);
   * console.log(r); // salida: false
   *
   * //comprobando literal vacio
   * obj = {};
   * r = isInstance(obj);
   * console.log(r); // salida: false
   *
   * //comprobando instancia por Object
   * obj = Object.create(null);
   * r = isInstance(obj);
   * console.log(r); // salida: false
   * ```
   */
  public isInstance(obj: unknown) {
    if (!this.isObject(obj, true)) return false;
    const constructor = Object.getPrototypeOf(obj)?.constructor;
    return typeof constructor === "function" && constructor !== Object;
  }
  /**
   * Obtiene el nombre del constructor de una instancia.
   *
   * @param instance Instancia cuyo constructor se consulta.
   * @returns El nombre del constructor.
   * @throws {Error} Si `instance` no cumple el criterio de `isInstance`.
   *
   * @example
   * ```typescript
   * class MyClass {};
   * const obj = new MyClass();
   * const className = getClassName(obj);
   * console.log(className); // salida: "MyClass"
   * ```
   */
  public getClassName<TInst extends object>(instance: TInst): string {
    if (!this.isInstance(instance))
      throw new Error(`${instance} is not instance of class`);
    const name = Object.getPrototypeOf(instance).constructor.name;
    return name;
  }
  /**
   * Convierte recursivamente las claves propias enumerables de un objeto y de
   * los objetos dentro de arrays. Los valores que no sean objetos se conservan.
   * No elimina claves con prefijo `_`. Por defecto, lanza un error si dos claves
   * quedan iguales después de convertirlas.
   *
   * @param objBase Objeto no vacío cuyas claves se convertirán.
   * @param caseType Formato destino: `TStrCase`.
   * @param allowDuplicates `false` por defecto. Si es `true`, permite colisiones y conserva el último valor.
   * @returns Un objeto nuevo con las claves convertidas.
   * @throws {Error} Si el objeto base no es válido, el formato no es válido o hay claves duplicadas tras la conversión.
   *
   * @example
   * ```typescript
   * const obj = {
   *   user_name: "John",
   *   user_details: {
   *     first_name: "John",
   *     last_name: "Doe",
   *     addresses: [
   *       { street_name: "Main St", city_name: "Metropolis" },
   *       { street_name: "Second St", city_name: "Gotham" },
   *     ],
   *   },
   * };
   *
   * // Convertir a camelCase
   * const camelCaseObj = util.objectKeysToCase(obj, "Camel");
   * console.log(camelCaseObj);
   * // Salida:
   * // {
   * //   userName: "John",
   * //   userDetails: {
   * //     firstName: "John",
   * //     lastName: "Doe",
   * //     addresses: [
   * //       { streetName: "Main St", cityName: "Metropolis" },
   * //       { streetName: "Second St", cityName: "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Convertir a snake_case
   * const snakeCaseObj = util.objectKeysToCase(obj, "Snake");
   * console.log(snakeCaseObj);
   * // Salida:
   * // {
   * //   user_name: "John",
   * //   user_details: {
   * //     first_name: "John",
   * //     last_name: "Doe",
   * //     addresses: [
   * //       { street_name: "Main St", city_name: "Metropolis" },
   * //       { street_name: "Second St", city_name: "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Convertir a kebab-case
   * const kebabCaseObj = util.objectKeysToCase(obj, "Kebab");
   * console.log(kebabCaseObj);
   * // Salida:
   * // {
   * //   "user-name": "John",
   * //   "user-details": {
   * //     "first-name": "John",
   * //     "last-name": "Doe",
   * //     addresses: [
   * //       { "street-name": "Main St", "city-name": "Metropolis" },
   * //       { "street-name": "Second St", "city-name": "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Convertir a PascalCase
   * const pascalCaseObj = util.objectKeysToCase(obj, "Pascal");
   * console.log(pascalCaseObj);
   * // Salida:
   * // {
   * //   UserName: "John",
   * //   UserDetails: {
   * //     FirstName: "John",
   * //     LastName: "Doe",
   * //     Addresses: [
   * //       { StreetName: "Main St", CityName: "Metropolis" },
   * //       { StreetName: "Second St", CityName: "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Convertir a CONSTANT_CASE
   * const constantCaseObj = util.objectKeysToCase(obj, "Constant");
   * console.log(constantCaseObj);
   * // Salida:
   * // {
   * //   USER_NAME: "John",
   * //   USER_DETAILS: {
   * //     FIRST_NAME: "John",
   * //     LAST_NAME: "Doe",
   * //     ADDRESSES: [
   * //       { STREET_NAME: "Main St", CITY_NAME: "Metropolis" },
   * //       { STREET_NAME: "Second St", CITY_NAME: "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Convertir a dot.case
   * const dotCaseObj = util.objectKeysToCase(obj, "Dot");
   * console.log(dotCaseObj);
   * // Salida:
   * // {
   * //   "user.name": "John",
   * //   "user.details": {
   * //     "first.name": "John",
   * //     "last.name": "Doe",
   * //     addresses: [
   * //       { "street.name": "Main St", "city.name": "Metropolis" },
   * //       { "street.name": "Second St", "city.name": "Gotham" },
   * //     ],
   * //   },
   * // }
   *
   * // Ejemplo con allowDuplicates activado
   * const objWithDuplicates = {
   *   user_name: "John",
   *   userName: "Jane", // Clave que se convertirá a "userName" (duplicada)
   * };
   *
   * const convertedObjWithDuplicates = util.objectKeysToCase(objWithDuplicates, "Camel", true);
   * console.log(convertedObjWithDuplicates);
   * // Salida:
   * // {
   * //   userName: "Jane", // El último valor sobrescribe al primero
   * // }
   *
   * // Ejemplo con allowDuplicates desactivado (lanzará un error)
   * try {
   *   const convertedObjWithoutDuplicates = util.objectKeysToCase(objWithDuplicates, "Camel");
   * } catch (error) {
   *   console.error(error.message); // Salida: "Duplicate key detected after conversion: userName"
   * }
   * ```
   */
  public objectKeysToCase(
    objBase: object,
    caseType: TStrCase,
    allowDuplicates: boolean = false,
  ): object {
    if (!this.isObject(objBase, false))
      throw new Error(`${objBase} is not object valid`);
    // Usamos una pila para manejar la iteración en lugar de recursión
    const stack: Array<{ obj: object; result: object }> = [];
    const result = {} as object;
    // Inicializamos la pila con el objeto base
    stack.push({ obj: objBase, result });
    while (stack.length > 0) {
      const { obj, result: currentResult } = stack.pop()!;
      for (const key of Object.keys(obj)) {
        const keyC = this.convertStringToCase(key, caseType);
        if (
          !allowDuplicates &&
          Object.prototype.hasOwnProperty.call(currentResult, keyC)
        ) {
          throw new Error(`Duplicate key detected after conversion: ${keyC}`);
        }
        const value = (obj as any)[key];
        if (this.isObject(value)) {
          const nestedResult = {} as object;
          (currentResult as any)[keyC] = nestedResult;
          stack.push({ obj: value, result: nestedResult });
        } else if (Array.isArray(value)) {
          (currentResult as any)[keyC] = value.map((item) =>
            this.isObject(item)
              ? this.objectKeysToCase(item, caseType, allowDuplicates)
              : item,
          );
        } else {
          (currentResult as any)[keyC] = value;
        }
      }
    }
    return result;
  }
  /**
   * Convierte una instancia en un objeto literal, eliminando funciones,
   * constructores y propiedades que tengan el prefijo `"_"` (que indica privado),
   * así como las propiedades especificadas en la configuración `keyOrKeysPathForDelete`.
   *
   * ❗ Este método está diseñado para la conversión de instancias, pero también puede
   * usarse para convertir objetos literales a objetos literales, sin clonación. ❗
   *
   * @param {object} obj - La instancia a convertir.
   * @param {object} [option] - Configuración opcional para el proceso de conversión con las siguientes propiedades:
   * - `isDeletePrivates = false` Determina si se eliminan propiedades (privadas) con prefijo `"_"`
   * - `keyOrKeysPathForDelete = []` claves identificadoras de propiedades que deben eliminarse.
   * - `charSeparator = "."` El carácter separador a utilizar entre los elementos del path.
   * @returns {object} - Retorna la instancia literal.
   *
   * @example
   * ```typescript
   * const obj = {
   * a: 1,
   * _b: 2,
   * c: () => {},
   * d: [1, () => {}, Symbol("test")],
   * e: { f: 3, g: () => {} }
   * };
   *
   * const result = mutateToLiteralObject(obj, {
   * isDeletePrivates: true,
   * keyOrKeysPathForDelete: ["e.f"]
   * });
   *
   * console.log(result);
   * // Salida: { a: 1, d: [1], e: { g: () => {} } }
   * ```
   *
   */
  public mutateToLiteralObject<TObj extends object, TExtractObj extends object>(
    obj: TObj,
    option: {
      /**`= false` Determina si se eliminan propiedades (privadas) con prefijo `"_"` */
      isDeletePrivates?: boolean;
      /**`= []` claves identificadoras de propiedades que deben eliminarse. */
      keyOrKeysPathForDelete?: string | string[];
      /**`= "."` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
    },
  ): TExtractObj {
    if (!this.isObject(obj, true)) {
      throw new Error(`${obj} is not object valid`);
    }
    //constructor de opciones
    let op = this.isObject(option, true) ? option : ({} as typeof option); //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      isDeletePrivates: this.convertToBoolean(op.isDeletePrivates),
      keyOrKeysPathForDelete: this.isArray(op.keyOrKeysPathForDelete, true)
        ? [...new Set(op.keyOrKeysPathForDelete as string[])] // Eliminar duplicados
        : this.isString(op.keyOrKeysPathForDelete)
          ? [op.keyOrKeysPathForDelete]
          : ([] as any[]), //predefinido []
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
    };
    const { isDeletePrivates, keyOrKeysPathForDelete, charSeparator: sp } = op;
    const keysPathForDelete = keyOrKeysPathForDelete as string[]; //para dejar tipado de array
    // Crear una pila para manejar la iteración
    const stack: Array<{ target: any; source: any; path: string }> = [];
    const result = {};
    // Inicializar la pila con el objeto raíz
    stack.push({ target: result, source: obj, path: "" });
    while (stack.length > 0) {
      const { target, source, path } = stack.pop()!;
      for (const key in source) {
        if (this.isFunction(source[key]) || typeof source[key] === "symbol") {
          continue; // Eliminar funciones y símbolos
        }
        if (isDeletePrivates && key.startsWith("_")) {
          continue; // Eliminar propiedades privadas
        }
        // Verificar si la clave está en keyOrKeysPathForDelete
        const fullPath = path ? `${path}${sp}${key}` : key;
        const shouldDelete = keysPathForDelete.some((keyPath) => {
          return keyPath === fullPath;
        });
        if (shouldDelete) {
          continue; // Eliminar propiedades específicas
        }
        // Manejar arrays
        if (Array.isArray(source[key])) {
          target[key] = (source[key] as any[]).filter(
            (item) => !this.isFunction(item) && typeof item !== "symbol",
          );
        } else if (this.isObject(source[key], true)) {
          // Crear un nuevo objeto para el subobjeto
          target[key] = {};
          // Agregar el subobjeto a la pila para procesarlo después
          stack.push({
            target: target[key],
            source: source[key],
            path: fullPath,
          });
        } else {
          // Copiar el valor de la propiedad
          target[key] = source[key];
        }
      }
    }
    return result as any;
  }
  /**
   * Extrae todas las propiedades de tipo función de un objeto (o subobjetos) y devuelve un nuevo objeto literal
   * que contiene solo esas funciones. Opcionalmente, permite vincular un contexto (`thisBind`) a las funciones extraídas.
   *
   * ⚠ **Importante**:
   * - Este método no modifica el objeto original.
   * - Las funciones extraídas pueden ser vinculadas a un contexto específico usando `thisBind`.
   * - El método maneja objetos anidados de forma iterativa, evitando problemas de desbordamiento de pila (`stack overflow`).
   *
   * @param {object} obj - El objeto del cual se extraerán las propiedades de tipo función.
   * @param {any} thisBind - (Opcional) El contexto al cual se vincularán las funciones extraídas.
   *                         Si se proporciona, las funciones se vincularán a este contexto usando `.bind(thisBind)`.
   * @returns {object} - Un nuevo objeto literal que contiene solo las propiedades de tipo función del objeto original.
   *                     Si el objeto original contiene subobjetos, estos se procesarán recursivamente.
   *
   * @throws {Error} - Lanza un error si `obj` no es un objeto válido.
   *
   * @example
   * ```typescript
   * const obj = {
   *     name: "John",
   *     age: 30,
   *     greet() {
   *         console.log(`Hello, my name is ${this.name}`);
   *     },
   *     address: {
   *         city: "New York",
   *         getCity() {
   *             return this.city;
   *         }
   *     }
   * };
   *
   * const context = { name: "Alice" };
   * const functionsOnly = util.mutateToObjectLiteralOnlyFn(obj, context);
   *
   * console.log(functionsOnly);
   * // Salida:
   * // {
   * //   greet: [Function: bound greet],
   * //   address: {
   * //     getCity: [Function: bound getCity]
   * //   }
   * // }
   *
   * functionsOnly.greet(); // "Hello, my name is Alice"
   * console.log(functionsOnly.address.getCity()); // "New York"
   * ```
   *
   * @example
   * ```typescript
   * // Ejemplo sin contexto (`thisBind`)
   * const obj = {
   *     sayHello() {
   *         console.log("Hello!");
   *     }
   * };
   *
   * const functionsOnly = util.mutateToObjectLiteralOnlyFn(obj);
   * functionsOnly.sayHello(); // "Hello!"
   * ```
   *
   * @example
   * ```typescript
   * // Ejemplo con subobjetos
   * const obj = {
   *     utils: {
   *         add(a: number, b: number) {
   *             return a + b;
   *         },
   *         multiply(a: number, b: number) {
   *             return a * b;
   *         }
   *     }
   * };
   *
   * const functionsOnly = util.mutateToObjectLiteralOnlyFn(obj);
   * console.log(functionsOnly.utils.add(2, 3)); // 5
   * console.log(functionsOnly.utils.multiply(2, 3)); // 6
   * ```
   */
  public mutateToObjectLiteralOnlyFn<
    TObj extends object,
    TExtractObj extends object,
  >(obj: TObj, thisBind?: any): TExtractObj {
    if (!this.isObject(obj)) throw new Error(`${obj} is not object valid`);
    const stack: Array<{ target: any; source: any }> = [];
    const result = {};
    // Inicializar la pila con el objeto raíz
    stack.push({ target: result, source: obj });
    while (stack.length > 0) {
      const { target, source } = stack.pop()!;
      for (const key in source) {
        if (this.isFunction(source[key]) && key !== "constructor") {
          // Si es una función, agregarla al objeto target
          target[key] = this.isObject(thisBind)
            ? (source[key] as Function).bind(thisBind)
            : source[key];
        } else if (this.isObject(source[key])) {
          // Si es un objeto, crear un nuevo objeto en target y agregarlo a la pila
          target[key] = {};
          stack.push({ target: target[key], source: source[key] });
        }
      }
    }
    return result as any;
  }
  /**
   * verificar si un path coincide con el keyPath (soporta comodines),
   * para los métodos de búsqueda de subpropiedades como `findObjectProperty()`
   *  y `findAllObjectProperties()`
   *
   * @param charSeparator El carácter separador a utilizar entre los elementos del path.
   * @param wildcard El carácter que representa el comodín.
   * @param useWildcards si está habilitado el comodín
   * @param path Fragmento de la ruta (según iteración)
   * @param keyPath Fragmento de la ruta sin iterar
   * @returns si el path coincidió
   */
  private isPathMatch(
    charSeparator: string,
    wildcard: string,
    useWildcards: boolean,
    path: string,
    keyPath: string,
  ): boolean {
    // Determinar búsqueda básica
    if (!useWildcards) return path.includes(keyPath);
    // Eliminar todas las ocurrencias de *0 en el keyPath
    keyPath = keyPath
      .replace(
        new RegExp(
          `\\${charSeparator}\\${wildcard}0(\\${charSeparator}|$)`,
          "g",
        ),
        `${charSeparator}`,
      )
      .replace(new RegExp(`^\\${wildcard}0\\${charSeparator}`, "g"), "");
    // Escape de caracteres especiales de Regex excluyendo los comodines * y #
    // Reemplazar '.' con charSeparator escapado
    const sepEscaped = charSeparator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regexPattern = keyPath
      .split(charSeparator)
      .map((segment) => {
        if (segment === "#") {
          return `[^\\${charSeparator}]+`;
        }
        if (segment.startsWith(wildcard)) {
          const num = parseInt(segment.substring(1));
          if (isNaN(num) || num === 1) return `[^\\${charSeparator}]+`;
          return `(?:[^\\${charSeparator}]+\\${charSeparator}){${num - 1}}[^\\${charSeparator}]+`;
        }
        // Segmento normal
        return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join(sepEscaped);

    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(path);
  }
  /**
   * verifica la fiabilidad del path con comodines para los métodos de
   * búsqueda de subpropiedades como `findObjectProperty()` y `findAllObjectProperties()`
   *
   * @param charSeparator El carácter separador a utilizar entre los elementos del path.
   * @param wildcard El carácter que representa el comodín.
   * @param keyPath Fragmento de la ruta sin iterar
   * @returns si los comodines en el path tienen formato valido
   */
  private isWildcardValid(
    charSeparator: string,
    wildcard: string,
    keyPath: string,
  ): boolean {
    const segments = keyPath.split(charSeparator);
    const lastSegment = segments[segments.length - 1];
    // No puede terminar en comodín multiplicador '*' ni '*N'
    if (lastSegment.startsWith(wildcard)) {
      throw new Error(
        `Invalid use of wildcard '${wildcard}' at the end of keyPath: ${keyPath}`,
      );
    }
    for (const segment of segments) {
      if (segment === "#") continue;
      // Verificar si el segmento contiene un comodín '*'
      if (segment.includes(wildcard)) {
        // Es Comodín0 al inicio del path
        if (segment === `${wildcard}0` && segments.indexOf(segment) === 0)
          throw new Error(
            `Invalid use of wildcard '${wildcard}' at the start of the keyPath: ${keyPath}`,
          );
        // Es Número antes del comodín (por ejemplo, "2*")
        if (new RegExp(`^\\d+\\${wildcard}`).test(segment))
          throw new Error(
            `Invalid use of wildcard '${wildcard}' with number before it in segment '${segment}': ${keyPath}`,
          );
        // Es Comodín con número negativo (por ejemplo, "*-1")
        const numStr = segment.substring(1); // Extraer el número después del *
        if (numStr.length > 0) {
          const num = parseInt(numStr);
          if (isNaN(num) || num < 0)
            throw new Error(
              `Invalid use of wildcard '${wildcard}' with invalid number '${numStr}' in segment '${segment}': ${keyPath}`,
            );
        }
      }
    }
    return true; // Si pasa todas las validaciones, retornar true
  }
  /**
   * Busca una propiedad en un objeto (o subobjetos) usando una ruta de claves (`keyPath`).
   * Si la propiedad no se encuentra, devuelve un valor predeterminado (`option.defaultReturnObj`).
   *
   * ⚠ **Importante**:
   * - La búsqueda se basa en una ruta (path) parcial de la subpropiedad. Si se desconoce el nombre de alguna propiedad padre (también llamado subnivel), se puede usar el comodín `"*"`. Si son varios subniveles desconocidos, se puede usar un multiplicador de comodín como `"*3"` (significa 3 niveles desconocidos).
   * - El uso del multiplicador siempre debe ser un número entero positivo. Si se usa `"*0"`, esto anula el comodín. Por ejemplo, si el fragmento de path es `"a.b.*0.d"`, se asume como `"a.b.d"` (omitiéndose el comodín).
   * - El comodín `"*0"` **no puede inicializar el path**. Por ejemplo, el path `"*0.b.c.d"` es inválido.
   * - El comodín utilizado es `"*"`, y el `charSeparator` no puede asignársele el mismo carácter.
   * - Se prefiere una ruta exacta. Si no existe y varias rutas parciales coinciden, se selecciona la última según el orden del recorrido de `getPropertyPathsOfObject()`.
   *
   * @param {object} objBase  El objeto en el cual se buscará la propiedad.
   * @param {string} keyPath  La ruta de claves que identifica la propiedad a buscar (por ejemplo, `"a.b.c"`).
   * @param {object} [option]  Configuración opcional para la búsqueda:
   *   - `defaultReturnObj = this.dfValue`   El valor predeterminado a devolver si la propiedad no se encuentra.
   *   - `charSeparator = this.charSeparatorLogicPath` - El carácter separador a utilizar entre los elementos del path.
   *   - `allPathsBase = this.getPropertyPathsOfObject(objBase, {charSeparator})`  Array completo de paths en caso de ya tenerlos para no procesar nuevamente. Por defecto, se calcula automáticamente usando `getPropertyPathsOfObject()`.
   * @returns {any} - Retorna el valor de la propiedad si se encuentra, o `option.defaultReturnObj` si no se encuentra.
   * @throws {Error} - Lanza un error si `objBase` no es un objeto válido o si `keyPath` no es una cadena válida.
   * @throws {Error} - Lanza un error si `charSeparator` es igual al comodín `"*"`.
   * @throws {Error} - Lanza un error si el comodín `"*0"` se usa al inicio del path.
   * @throws {Error} - Lanza un error si el multiplicador del comodín no es un número entero positivo.
   *
   * @example
   * ```typescript
   * const obj = {
   *   a: {
   *     b: {
   *       c: 42
   *     }
   *   }
   * };
   *
   * // Ejemplo básico:
   * const value = util.findObjectProperty(obj, "a.b.c");
   * console.log(value); // Salida: 42
   *
   * // Ejemplo con valor predeterminado:
   * const notFound = util.findObjectProperty(obj, "x.y.z", { defaultReturnObj: "Not found" });
   * console.log(notFound); // Salida: "Not found"
   *
   * // Ejemplo con comodín:
   * const obj2 = {
   *   a: {
   *     b: [
   *       { c: 1 },
   *       { c: 2 },
   *       { c: 3 }
   *     ]
   *   }
   * };
   *
   * const valueWithWildcard = util.findObjectProperty(obj2, "a.b.*.c");
   * console.log(valueWithWildcard); // Salida: 3 (último elemento que coincide con el path)
   *
   * // Ejemplo con multiplicador de comodín:
   * const obj3 = {
   *   a: {
   *     b: {
   *       c: {
   *         d: 100
   *       }
   *     }
   *   }
   * };
   *
   * const valueWithMultiplier = util.findObjectProperty(obj3, "a.*2.d");
   * console.log(valueWithMultiplier); // Salida: 100
   * ```
   */
  public findObjectProperty(
    objBase: object,
    keyPath: string,
    option?: {
      /** `= this.dfValue` El valor retornado en caso de no encontrar la propiedad en el objeto. */
      defaultReturnObj?: any;
      /** `= "."` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
      /**`= this.getPropertyPathsOfObject(objBase, {charSeparator})` Array completo de paths en caso de ya tenerlos para no procesar nuevamente*/
      allPathsBase?: string[];
    },
  ): any {
    if (!this.isObject(objBase))
      throw new Error(`${objBase} is not object valid`);
    if (!this.isString(keyPath))
      throw new Error(`${keyPath} is not key path valid`);
    // Constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >;
    op = {
      defaultReturnObj: !this.isUndefined(op.defaultReturnObj)
        ? op.defaultReturnObj
        : this.dfValue,
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      allPathsBase: this.isArray(op.allPathsBase)
        ? op.allPathsBase
        : this.getPropertyPathsOfObject(objBase, {
            charSeparator: this.isString(op.charSeparator)
              ? op.charSeparator
              : this.charSeparatorLogicPath,
          }),
    };
    const {
      defaultReturnObj: dfValue,
      charSeparator,
      allPathsBase: allPaths,
    } = op;
    //configuración comodín
    //caracter especial para representar cualquier index
    const charWildcardForIndex = "#";
    //caracter especial para representar el multiplicador de niveles
    const charWildcardForMultiply = "*";
    if (
      charSeparator === charWildcardForMultiply ||
      charSeparator === charWildcardForIndex
    )
      throw new Error(`character separator cannot be wildcard`);
    const useWildcard =
      (new RegExp(`\\${charWildcardForMultiply}`).test(keyPath) ||
        keyPath.split(charSeparator).includes(charWildcardForIndex)) &&
      this.isWildcardValid(charSeparator, charWildcardForMultiply, keyPath);
    // Buscar el path que coincida con el keyPath
    let foundPath = useWildcard
      ? undefined
      : allPaths.find((path) => path === keyPath);
    if (!foundPath) {
      const isArrayWildcardSearch = keyPath
        .split(charSeparator)
        .includes(charWildcardForIndex);
      if (isArrayWildcardSearch) {
        for (let index = 0; index < allPaths.length; index++) {
          if (
            this.isPathMatch(
              charSeparator,
              charWildcardForMultiply,
              useWildcard,
              allPaths[index],
              keyPath,
            )
          ) {
            foundPath = allPaths[index];
            break;
          }
        }
      } else {
        for (let index = allPaths.length - 1; index >= 0; index--) {
          if (
            this.isPathMatch(
              charSeparator,
              charWildcardForMultiply,
              useWildcard,
              allPaths[index],
              keyPath,
            )
          ) {
            foundPath = allPaths[index];
            break;
          }
        }
      }
    }
    // Si se encuentra el path, obtener el valor de la propiedad
    if (foundPath) {
      const keys = foundPath.split(charSeparator);
      let currentObj = objBase;
      // Recorrer el path para obtener el valor
      for (const key of keys) {
        if (currentObj && key in currentObj) {
          currentObj = currentObj[key];
        } else {
          return dfValue; // Si no existe la propiedad, devolver el valor predeterminado
        }
      }
      return currentObj; // Devolver el valor encontrado
    }
    return dfValue; // Si no se encuentra el path, devolver el valor predeterminado
  }
  /**
   * Busca todas las propiedades en un objeto (o subobjetos) que coincidan con uno o más fragmentos de paths (`keyPaths`).
   * Retorna un array con los valores de todas las propiedades que coinciden.
   *
   * ⚠ **Importante**:
   * - La búsqueda se basa en rutas (paths) parciales de las subpropiedades. Si se desconoce el nombre de alguna propiedad padre (también llamado subnivel), se puede usar el comodín `"*"`. Si son varios subniveles desconocidos, se puede usar un multiplicador de comodín como `"*3"` (significa 3 niveles desconocidos).
   * - El uso del multiplicador siempre debe ser un número entero positivo. Si se usa `"*0"`, esto anula el comodín. Por ejemplo, si el fragmento de path es `"a.b.*0.d"`, se asume como `"a.b.d"` (omitiéndose el comodín).
   * - El comodín `"*0"` **no puede inicializar el path**. Por ejemplo, el path `"0*.b.c.d"` es inválido.
   * - El comodín utilizado es `"*"`, y el `charSeparator` no puede asignársele el mismo carácter.
   * - Si varias rutas coinciden, se incluyen todas en el orden producido por `getPropertyPathsOfObject()` (profundidad primero, padre antes que descendientes).
   *
   * @param {object} objBase - El objeto en el cual se buscarán las propiedades.
   * @param {string | string[]} keyPaths - La ruta o rutas de claves que identifican las propiedades a buscar (por ejemplo, `"a.b.c"` o `["a.b.c", "x.y.z"]`).
   * @param {object} [option] - Configuración opcional para la búsqueda:
   *   - `defaultReturnObj = this.dfValue`   El valor predeterminado a devolver si la propiedad no se encuentra.
   *   - `charSeparator = this.charSeparatorLogicPath` - El carácter separador a utilizar entre los elementos del path.
   *   - `allPathsBase = this.getPropertyPathsOfObject(objBase, {charSeparator})`  Array completo de paths en caso de ya tenerlos para no procesar nuevamente. Por defecto, se calcula automáticamente usando `getPropertyPathsOfObject()`.
   * @returns {any[]} - Retorna un array con los valores de todas las propiedades que coinciden con los fragmentos de paths proporcionados.
   * @throws {Error} - Lanza un error si `objBase` no es un objeto válido o si `keyPaths` no es una cadena o un array de cadenas válido.
   * @throws {Error} - Lanza un error si `charSeparator` es igual al comodín `"*"`.
   * @throws {Error} - Lanza un error si el comodín `"*0"` se usa al inicio del path.
   * @throws {Error} - Lanza un error si el multiplicador del comodín no es un número entero positivo.
   *
   * @example
   * ```typescript
   * const obj = {
   *   a: {
   *     b: {
   *       c: 42,
   *       d: 100
   *     },
   *     x: {
   *       y: {
   *         z: 200
   *       }
   *     }
   *   }
   * };
   *
   * // Ejemplo básico:
   * const values = util.findAllObjectProperties(obj, "a.b.*");
   * console.log(values); // Salida: [42, 100] (todas las propiedades bajo "a.b")
   *
   * // Ejemplo con múltiples fragmentos:
   * const valuesMultiple = util.findAllObjectProperties(obj, ["a.b.c", "a.x.y.z"]);
   * console.log(valuesMultiple); // Salida: [42, 200] (coincidencias para ambos fragmentos)
   *
   * // Ejemplo con comodín:
   * const obj2 = {
   *   a: {
   *     b: [
   *       { c: 1 },
   *       { c: 2 },
   *       { c: 3 }
   *     ]
   *   }
   * };
   *
   * const valuesWithWildcard = util.findAllObjectProperties(obj2, "a.b.*.c");
   * console.log(valuesWithWildcard); // Salida: [1, 2, 3] (todas las coincidencias)
   * ```
   */
  public findAllObjectProperties(
    objBase: object,
    keyPaths: string | string[],
    option?: {
      /** `= this.dfValue` El valor retornado en caso de no encontrar la propiedad en el objeto. */
      defaultReturnObj?: any;
      /** `= "."` El carácter separador a utilizar entre los elementos del path. */
      charSeparator?: string;
      /**`= this.getPropertyPathsOfObject(objBase, {charSeparator})` Array completo de paths en caso de ya tenerlos para no procesar nuevamente*/
      allPathsBase?: string[];
    },
  ): any[] {
    if (!this.isObject(objBase))
      throw new Error(`${objBase} is not object valid`);
    if (!this.isArray(keyPaths) && !this.isString(keyPaths))
      throw new Error(`${keyPaths} is not key or keys path valid`);
    keyPaths = Array.isArray(keyPaths) ? keyPaths : [keyPaths];
    // Constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >;
    op = {
      defaultReturnObj: !this.isUndefined(op.defaultReturnObj)
        ? op.defaultReturnObj
        : this.dfValue,
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      allPathsBase: this.isArray(op.allPathsBase)
        ? op.allPathsBase
        : this.getPropertyPathsOfObject(objBase, {
            charSeparator: this.isString(op.charSeparator)
              ? op.charSeparator
              : this.charSeparatorLogicPath,
          }),
    };
    const {
      defaultReturnObj: dfValue,
      charSeparator,
      allPathsBase: allPaths,
    } = op;
    //configuración comodín
    //caracter especial para representar cualquier index
    const charWildcardForIndex = "#";
    //caracter especial para representar el multiplicador de niveles
    const charWildcardForMultiply = "*";
    if (
      charSeparator === charWildcardForMultiply ||
      charSeparator === charWildcardForIndex
    )
      throw new Error(`character separator cannot be wildcard`);
    return keyPaths.flatMap((keyPath) => {
      const useWildcard =
        (new RegExp(`\\${charWildcardForMultiply}`).test(keyPath) ||
          keyPath.split(charSeparator).includes(charWildcardForIndex)) &&
        this.isWildcardValid(charSeparator, charWildcardForMultiply, keyPath);
      // Buscar el path que coincida con el keyPath
      const foundPaths = allPaths.filter((path) =>
        this.isPathMatch(
          charSeparator,
          charWildcardForMultiply,
          useWildcard,
          path,
          keyPath,
        ),
      );
      return foundPaths.map((foundPath) => {
        // Si se encuentra el path, obtener el valor de la propiedad
        if (foundPath) {
          const keys = foundPath.split(charSeparator);
          let currentObj = objBase;
          // Recorrer el path para obtener el valor
          for (const key of keys) {
            if (currentObj && key in currentObj) {
              currentObj = currentObj[key];
            } else {
              return dfValue; // Si no existe la propiedad, devolver el valor predeterminado
            }
          }
          return currentObj; // Devolver el valor encontrado
        }
        return dfValue; // Si no se encuentra el path, devolver el valor predeterminado
      });
    });
  }
  /**
   * Fusiona 2 objetos a nivel profundo, donde el nuevo objeto será fusionado
   * al objeto base. Las propiedades de nuevo objeto serán sobreescritas en las
   * propiedades de en el objeto base de acuerdo a la configuración `mode`.
   *
   * ⚠ **No** aplica para profundidad en arrays (ni en propiedades ni subpropiedades).
   *
   * @param {[T, T?]} tObjToMerge Tupla que representa:
   *   - `tObjToMerge[0]`: Objeto base al cual se fusionará el nuevo objeto.
   *   - `tObjToMerge[1]`: Objeto a fusionar con el objeto base.
   * @param {object} option - Configuración para el proceso de fusión:
   *   - `mode`: Modo de fusión par a los objetos
   *   - `isNullAsUndefined` Determina si se debe asumir que
   *     el valor `null` tiene el mismo peso comparativo que el valor `undefined`.
   * @returns {T} Retorna el objeto fusionado.
   *
   * **⚠** casos especiales de retorno:
   * - Si el objeto base no es de tipo objeto retorna el objeto a fusionar
   * - Si el objeto a fusionar no es de tipo objeto retorna el base
   * - Si ninguno es de tipo objeto, retorna el contenido de objeto base
   *
   * @example
   * ````typescript
   * let baseObj;
   * let newObj;
   * let r;
   *
   * // fusion en modo "soft"
   * baseObj = {
   *   p1: "does not spanish",
   *   p2: 31,
   *   p3: true,
   *   p4: 255,
   *   p5: "A",
   * },
   * newObj = {
   *   p1: "ahora si es español",
   *   p2: 31,
   *   p3: false,
   *   p4: undefined,
   *   p5: null,
   * }
   * r = deepMergeObjects([baseObj, newObj], {mode: "soft"});
   * console.log(r); //Salida:
   * //{
   * //  p1: "ahora si es español", //se fusionó
   * //  p2: 31, //se fusionó
   * //  p3: false, //se fusionó
   * //  p4: 255, //al ser "soft" no lo debe fusionar
   * //  p5: null, //al ser "soft" y no esta habilitado `isNullAsUndefined` si debe fusionarlo
   * //}
   *
   * // fusion en modo "hard"
   * baseObj = {
   *   p1: "does not spanish",
   *   p2: 31,
   *   p3: true,
   *   p4: 255,
   *   p5: "A",
   * },
   * newObj = {
   *   p1: "ahora si es español",
   *   p2: 31,
   *   p3: false,
   *   p4: undefined,
   *   p5: null,
   * }
   * r = deepMergeObjects([baseObj, newObj], {mode: "hard"});
   * console.log(r); //Salida:
   * //{
   * //  p1: "ahora si es español", //se fusionó
   * //  p2: 31, //se fusionó
   * //  p3: false, //se fusionó
   * //  p4: undefined, //al ser "hard" lo fusiona
   * //  p5: null, //al ser "hard" lo fusiona
   * //}
   *
   * ````
   *
   */
  public deepMergeObjects<T>(
    tObjToMerge: [T, T?],
    option: {
      /**
       * determina el modo de fusion
       *
       * - modo `"soft"`: sobrescribe la propiedad en
       * `objBase` solo si esta misma propiedad
       * en `objNew` **no** tiene valor como
       * `undefined` o `null`
       *
       * - modo `"hard"`: sobrescribe la propiedad en
       * `objBase` sin importar si el valor es
       * `undefined` o `null`
       */
      mode: "soft" | "hard";
      /**( solo en modo `"soft"`) determina
       * si se debe asumir que el valor `null` tiene el mismo peso
       * comparativo que el valor `undefined`
       */
      isNullAsUndefined?: boolean;
    },
  ): T {
    if (!this.isTuple(tObjToMerge, 2))
      throw new Error(`${tObjToMerge} is not tuple of objects valid`);
    // Constructor de opciones
    let op = this.isObject(option, true) ? option : ({} as typeof option);
    op = {
      mode: op.mode === "soft" || op.mode === "hard" ? op.mode : "hard",
      isNullAsUndefined: this.isBoolean(op.isNullAsUndefined)
        ? op.isNullAsUndefined
        : false,
    };
    const { mode, isNullAsUndefined } = op;
    // Iniciar proceso
    let [objBase, objNew] = tObjToMerge;
    const isObjBase = this.isObject(objBase, true);
    const isObjNew = this.isObject(objNew, true);
    // Casos especiales (alguno o ambos no son objetos)
    if (!isObjBase || !isObjNew) {
      if (!isObjBase && isObjNew) return objNew;
      if (!isObjNew && isObjBase) return objBase;
      return objBase;
    }
    // Pila para manejar la recursividad
    const stack: Array<{ base: any; new: any; target: any }> = [];
    const result = {} as T;
    stack.push({ base: objBase, new: objNew, target: result });
    while (stack.length > 0) {
      const { base, new: newObj, target } = stack.pop()!;
      const keysB = Object.keys(base);
      const keysN = Object.keys(newObj);
      const uKeys = [...new Set([...keysB, ...keysN])];
      for (const key of uKeys) {
        const propB = base[key];
        const propN = newObj[key];
        if (this.isObject(propB, true) && this.isObject(propN, true)) {
          target[key] = {};
          stack.push({ base: propB, new: propN, target: target[key] });
        } else {
          if (mode === "soft") {
            target[key] =
              this.isUndefined(propB) ||
              (isNullAsUndefined && this.isNull(propB))
                ? propN
                : this.isUndefined(propN) ||
                    (isNullAsUndefined && this.isNull(propN))
                  ? propB
                  : propN;
          } else if (mode === "hard") {
            const isPropB = key in base;
            const isPropN = key in newObj;
            target[key] = isPropN ? propN : propB;
          } else {
            throw new Error(`${mode} is not mode for merge valid`);
          }
        }
      }
    }
    return result;
  }
  /**
   * Convierte un array de tuplas tipo entry (`[key, value]`) en un objeto.
   *
   * - Cada entrada debe ser una tupla de exactamente dos elementos `[key, value]`.
   * - `key` no puede ser `null` ni `undefined`; los demás tipos de clave siguen
   *   las reglas de conversión de propiedades de JavaScript (los símbolos se conservan).
   * - Se permiten arrays vacíos; en ese caso retorna `{}`.
   *
   * @param {Array<[any, any]>} aEntryTuple - El array de tuplas que se va a convertir en un objeto. Cada tupla consta de dos elementos de tipo `[key, value]`.
   * @throws {Error} Si el argumento no es un array de tuplas válido o contiene una clave nula.
   * @returns Un objeto nuevo con una propiedad por cada entrada. Las claves repetidas conservan el último valor.
   *
   * @example
   * ```
   * const entries: Array<[string, unknown]> = [["key1", "value1"], ["key2", 2]];
   * const obj = util.arrayEntriesToObject(entries);
   * console.log(obj); // { key1: "value1", key2: 2 }
   * console.log(util.arrayEntriesToObject([])); // {}
   * ```
   */
  public arrayEntriesToObject(aEntryTuple: Array<[any, any]>): object {
    //❗ se permite arrays vacios❗
    if (!this.isArrayTuple(aEntryTuple, 2, true))
      throw new Error(`${aEntryTuple} contain tuples not valid`);
    const obj = aEntryTuple.reduce((a_obj, [key, value]) => {
      // la key debe ser un identificador
      if (this.isUndefinedOrNull(key))
        throw new Error(`${key} contain tuples not valid`);
      Object.defineProperty(a_obj, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true,
      });
      return a_obj;
    }, {}); //si el array es vacio retornaria un objeto literal vacio
    return obj;
  }
  /**
   * Convierte un iterable de tuplas en un objeto. Cada elemento debe contener
   * exactamente `[key, value]`; las reglas de clave son las mismas que en
   * `arrayEntriesToObject`.
   *
   * @param entry Iterable de tuplas que se desea convertir.
   * @throws {Error} Si `entry` no es iterable o contiene tuplas inválidas.
   * @returns Un objeto nuevo con una propiedad por cada entrada.
   *
   * @example
   * ```typescript
   * const entries = new Map([["key1", "value1"], ["key2", "value2"]]).entries();
   * const obj = util.entriesToObject(entries);
   * console.log(obj); // { key1: "value1", key2: "value2" }
   * ```
   */
  public entriesToObject(entry: IterableIterator<[any, any]>): object {
    //⚠ Obligatorio probar primitivo
    if (
      typeof entry !== "object" ||
      this.isNull(entry) ||
      typeof (entry as any)[Symbol.iterator] !== "function"
    )
      throw new Error(`${entry} is not entries (:IterableIterator) valid`);
    const arrayOfEntries = Array.from(entry);
    const obj = this.arrayEntriesToObject(arrayOfEntries);
    return obj;
  }
  /**
   * Convierte un `Map` en un objeto literal mediante sus entradas. Las claves
   * `null` o `undefined` no son válidas; las demás se convierten según las
   * reglas de propiedades de JavaScript. Si varias claves producen la misma
   * propiedad, prevalece el último valor.
   *
   * @param map `Map` que se desea convertir.
   * @throws {Error} Si `map` no es una instancia de `Map` o contiene una clave no válida.
   * @returns Un objeto literal con las entradas del `Map`.
   *
   * @example
   * ```typescript
   * const map = new Map([["key1", "value1"], ["key2", "value2"]]);
   * const obj = util.mapToObject(map);
   * console.log(obj); // { key1: "value1", key2: "value2" }
   * ```
   */
  public mapToObject(map: Map<any, any>): object {
    if (!(map instanceof Map)) throw new Error(`${map} is not map valid`);
    const entries = map.entries();
    const obj = this.entriesToObject(entries);
    return obj;
  }
  /**
   * Congela el valor recibido y, por defecto, recorre también los valores de
   * propiedades propias enumerables (incluidos índices de arrays) que sean
   * objetos o arrays. El recorrido admite ciclos. Con `isAllowDeepLevel: false`,
   * solo congela el valor raíz. Devuelve el mismo objeto o array, sin clonarlo.
   *
   * @param obj Objeto o array que se desea congelar.
   * @param isAllowDeepLevel `true` por defecto. Si es `false`, congela solo la raíz.
   * @returns El mismo valor recibido, ya congelado. Los valores primitivos o `null` no cambian.
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: { c: 2 } };
   * const frozenObj = freezeObject(obj);
   * //verifica si esta congelado
   * console.log(Object.isFrozen(frozenObj)); // salida: true
   * console.log(Object.isFrozen(frozenObj.b)); // salida: true
   *
   * const shallow = util.freezeObject({ nested: {} }, false);
   * console.log(Object.isFrozen(shallow.nested)); // salida: false
   * ```
   */
  public freezeObject<TObject extends object | any[]>(
    obj: TObject,
    isAllowDeepLevel = true,
  ): TObject {
    // Verificación primitiva (incluye arrays)
    if (typeof obj !== "object" || this.isNull(obj)) return obj;
    if (!isAllowDeepLevel) return Object.freeze(obj) as TObject;
    const stack: object[] = [obj];
    const visited = new WeakSet<object>();
    while (stack.length > 0) {
      const currentObj = stack.pop()!;
      if (visited.has(currentObj)) continue;
      visited.add(currentObj);
      for (const key of Object.keys(currentObj)) {
        const value = (currentObj as Record<string, unknown>)[key];
        if (value !== null && typeof value === "object") stack.push(value);
      }
      Object.freeze(currentObj);
    }
    return obj;
  }
  //█████ Arreglos ██████████████████████████████████████████████████████
  /**
   * Determina si es un array, con la opción de aceptar o no arrays vacíos.`
   *
   * @param {any} value El valor a analizar.
   * @param {boolean} allowEmpty = `false`, Determina si se permite que el array esté vacio `[]`
   * @returns {boolean} Retorna `true` si el valor es un array, `false` de lo contrario.
   *
   * @example
   * ```typescript
   * let a;
   *
   * //array vacio
   * a = [];
   * isArray(a, true); // salida `true` (es un array válido aunque esté vacío)
   * isArray(a, false); // salida `false` (NO es un array válido porque está vacío)
   * !isArray(a); // salida `true` permite vacios y cualquier tipo de valor menos array
   * !isArray(a, true) //salida `false` niega permitir vacios
   * !isArray(a, false) //salida `true` niega a negar vacios (vacios aprobados)
   *
   * //ejemplo objeto:
   * a = {};
   * console.log(isObject(a)); // salida `false` (un objeto (vacío o poblado) no lo considera array)
   * ```
   */
  public isArray(value: unknown, allowEmpty = false): boolean {
    allowEmpty = this.convertToBoolean(allowEmpty);
    const r = Array.isArray(value) && (allowEmpty || value.length > 0);
    return r;
  }
  /**
   * Permite verificar y transformar (si aún no está transformado) un valor en un array
   * de ese mismo valor, a partir del extracto de esquema de tipo de datos.
   *
   * @param value El valor a transformar.
   * @param queryExtractType El esquema (sencillo o extracto) del tipo de array que
   *        se debe verificar para poder transformar.
   * @param defaultValue `= this.dfValue` Valor por defecto que se asignará si el `value` no
   *        cumple con las condiciones.
   * @param option Opciones adicionales para la validación de tipo de datos.
   *
   * @throws Error `"${extractType} is not extract of types valid"`
   *         Si el esquema proporcionado no es válido.
   *
   * @example
   * ````typescript
   *
   * let result;
   *
   * // Transformando un string a un array de strings
   * result = util.castArrayByConditionType("hello", "string");
   * console.log(result); // Salida: ["hello"]
   *
   * // Manteniendo un array existente si cumple con el tipo
   * result = util.castArrayByConditionType(["item1", "item2"], "string");
   * console.log(result); // Salida: ["item1", "item2"]
   *
   * // Retornando el valor por defecto si el tipo no es adecuado
   * result = util.castArrayByConditionType(42, "string");
   * console.log(result); // Salida: [] vacio
   *
   * // Retornando el valor por defecto (personalizado) si el tipo no es adecuado
   * result = util.castArrayByConditionType(true, "string", ["hola"]);
   * console.log(result); // Salida: ["hola"]
   * ````
   */
  public castArrayByConditionType<TItem>(
    value: TItem | TItem[],
    queryExtractType: TExtValueType,
    defaultValue: TItem[] = [] as any[],
    option?: IValueTypeOption,
  ): TItem[] {
    let r: TItem[];
    if (
      !this.isValueType(queryExtractType, [
        "string",
        // [], //array no se permiten por ahora
        {},
      ])
    )
      throw new Error(`${queryExtractType} is not extract of types valid`);
    //convertir el extracto a tipo sencillo y array
    const fullTypes: TAExtValueType = [queryExtractType, [queryExtractType]];
    if (this.isValueType(value, fullTypes, option)) {
      r = (this.isArray(value) ? value : [value]) as TItem[];
    } else {
      r = defaultValue;
    }
    return r;
  }
  /**
   * Obtiene un elemento de un array utilizando índices negativos o positivos, asegurando compatibilidad con versiones anteriores.
   *
   * @param {TItem[]} arr El array del cual se obtendrá el elemento.
   * @param {number} idx Índice del elemento a obtener. Puede ser negativo para acceder desde el final del array.
   * @returns {TItem | undefined} Retorna el elemento correspondiente si el índice es válido, `undefined` de lo contrario.
   *
   * @example
   * ```typescript
   * let a = [10, 20, 30, 40, 50];
   *
   * // Índices positivos
   * console.log(getItem(a, 2)); // salida `30`
   *
   * // Índices negativos
   * console.log(getItem(a, -1)); // salida `50` (último elemento)
   * console.log(getItem(a, -3)); // salida `30`
   *
   * // Índices fuera de rango
   * console.log(getItem(a, -10)); // salida `undefined` (fuera de rango)
   * console.log(getItem(a, 10));  // salida `undefined` (fuera de rango)
   * ```
   */
  public getArrayItem<TItem>(arr: TItem[], idx: number): TItem | undefined {
    if (!this.isArray(arr, true)) throw new Error(`${arr} is not array valid`); //debe ser un array
    if (!this.isIntegerNumber(idx)) {
      throw new Error(`${idx} is not index valid`); //debe ser un número entero
    }
    const len = arr.length;
    //verificar que idx no este fuera del rango del tamaño del array
    if (idx < -len || idx >= len) return undefined;
    if (idx < 0) idx = len + idx;
    return arr[idx];
  }
  /**
   * permite ordenar un array de booleanos, números, cadenas de texto o objetos, con opciones de direccion, eliminacion de duplicados entre otras
   *
   * **⚠⚠ Importante los pesos de los tipos ⚠⚠**
   *
   * Lista de pesos (de menor a mayor peso):
   *
   * - `undefined`
   * - `null`
   * - `boolean`
   * - `number`
   * - `string-number` cuando esta activada `isCompareStringToNumber`
   * - `string`
   * - `object`
   * - `array`
   * - `function`
   *
   * los pesos son estrictos y tienen en cuenta el tipo. Ejemplo:
   *  - `A` es mas pesado que `a` //cuando es case sensitive
   *  - `0` es mas pesado que `true`.
   *  - `true` es mas pesado que `false`.
   *  - `false` es mas pesado que null
   *  - `null` es mas pesado que `undefined`
   *
   * @param {T} arrayToSort el array a ordenar
   * @param {object} option configuración para el ordenamiento
   * - `direction = "asc"`, direccion de ordenamiento
   * - `isRemoveDuplicate = false`, si se desea eliminar duplicados antes de retornar el array ordenado
   * - `keyOrKeysPath` (solo para elementos de tipo objeto) rutas de claves identificadoras para las propiedades que se usaran como base para la comparación
   * - `isCompareLength = false`, determina si debe comprar tamaños de lso arrays
   * - `isCompareSize = false`, determina si debe comparar cantidad de propiedades de los objetos
   * - `isCompareStringToNumber = false`, determina si debe comparar strings numéricos como números
   * - `isCaseSensitiveForString = false`, determina si la comparación es sensitiva a minusculas y mayusculas (solo string)
   * @returns el array ya ordenado
   *
   * @example
   * ````typescript
   * let aToSort;
   * let r;
   *
   * //array de booleanos
   * aToSort = [false, true, true, false, true];
   * r = sortMixedArray(aToSort, {direction: "asc"})
   * console.log(r); //salida: `[false, false, true, true, true]`
   *
   * //array de números
   * aToSort = [-1,2,1,0,-2];
   * r = sortMixedArray(aToSort, {direction: "asc"})
   * console.log(r); //salida: `[-2,-1,0,1,2]`
   * ````
   *
   * //array de string (direccion "asc" y sensitivo)
   * aToSort = ["A", "B", "a", "b"];
   * r = sortMixedArray(aToSort, {
   *  direction: "asc",
   *  isCaseSensitiveForString: true
   * });
   * console.log(r); //salida: `["a", "A", "b", "B"]`
   *
   * //array de string (direccion "desc" y no sensitivo)
   * aToSort = ["A", "B", "a", "b"];
   * r = sortMixedArray(aToSort, {
   *  direction: "desc",
   *  isCaseSensitiveForString: false
   * });
   * console.log(r); //salida: `["b", "B", "a", "A"]`
   *
   * //array de string (direccion "desc" y sensitivo)
   * aToSort = ["A", "B", "a", "b"];
   * r = sortMixedArray(aToSort, {
   *  direction: "desc",
   *  isCaseSensitiveForString: true
   * });
   * console.log(r); //salida: `["B", "b", "A", "a"]`
   *
   * //array de objetos ()
   * aToSort = [
   *   {code: "C", age:14, name: "juan"},
   *   {code: "C", age:13, name: "ana"},
   *   {code: "a", age:3, name: "pedro"},
   *   {code: "B", age:20, name: "pablo"},
   * ];
   * r = sortMixedArray(aToSort, {
   *  direction: "asc",
   *  isCaseSensitiveForString: false,
   *  keyOrKeysPath: ["code", "age"] //el orden de las keys influye en el orden
   * });
   * console.log(r); //salida:
   * // `[
   * //   {code: "a", age:3, name: "pedro"},
   * //   {code: "B", age:20, name: "pablo"},
   * //   {code: "C", age:13, name: "ana"}, //code "C" es igual, asi que se ordena por age
   * //   {code: "C", age:14, name: "juan"},
   * // ]`
   *
   * ````
   */
  public sortMixedArray<T extends Array<any>>(
    arrayToSort: T,
    option?: Omit<IOptionEqGtLt, "isAllowEquivalent"> & {
      /**direccion de orden
       *
       * - `"asc"` para ascendente
       *
       * - `"desc"` para descendente
       *
       * predefinido en `"asc"`
       */
      direction: "asc" | "desc";
      /**determina si el array ordenado antes
       * de retornarlo se le eliminen los items
       * duplicados.
       *
       * predefinido en `false`
       *
       * ⚠ Aumenta el costo de rendimiento
       */
      isRemoveDuplicate?: boolean;
    },
  ): T {
    if (!this.isArray(arrayToSort, true))
      throw new Error(`${arrayToSort} is not array to sort valid`);
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      //las opciones de comparación se asignan en sus respectivos métodos
      direction:
        op.direction === "asc" || op.direction === "desc"
          ? op.direction
          : "asc",
      isRemoveDuplicate: this.isBoolean(op.isRemoveDuplicate)
        ? op.isRemoveDuplicate
        : false,
    };
    let { direction, isRemoveDuplicate } = op;
    //Iniciar proceso
    const nDirection = direction === "asc" ? 1 : -1;
    //tratamiento de arrays internos
    let arrayToSortClone = [] as any[];
    let aUndefined = [] as any[];
    for (const item of [...arrayToSort]) {
      //clonacion sencilla ya que no se modifican valores internamente
      //caso especial array
      if (this.isArray(item)) {
        arrayToSortClone.push(this.sortMixedArray(item as any[], { ...op }));
      }
      //caso especial undefined
      else if (this.isUndefined(item)) {
        aUndefined.push(item);
      }
      //casos normales
      else {
        arrayToSortClone.push(item);
      }
    }
    //ORGANIZAR
    arrayToSortClone.sort((a, b) => {
      let r = 0;
      //caso especial diferente tamaño de arrays
      if (Array.isArray(a) && Array.isArray(b) && a.length !== b.length) {
        r = a.length - b.length;
      } else {
        //casos normales
        r = this.compareTo([a, b], { ...op });
      }
      return r * nDirection;
    });
    //reacomodar elementos undefined
    arrayToSortClone =
      direction === "asc"
        ? ([...aUndefined, ...arrayToSortClone] as T)
        : ([...arrayToSortClone, ...aUndefined] as T);
    //tratamiento de repetidos
    if (isRemoveDuplicate) {
      arrayToSortClone = this.removeArrayDuplicate(arrayToSortClone, {
        ...op,
        itemConflictMode: "last",
      });
    }
    return arrayToSortClone as T;
  }
  /**
   *
   * Elimina los elementos duplicados de un array.
   *
   * @param {Array} arrayToRemove El array del cual se eliminarán los duplicados.
   * @param {object} option configuración para el método
   * - `itemConflictMode` al encontrar un elemento repetido define el modo de resolver el conflicto de si se queda con el primero o el ultimo de los repetidos
   * - `keyOrKeysPath` (solo para elementos de tipo objeto) rutas de claves identificadoras para las propiedades que se usaran como base para la comparación
   * - `isCompareLength = false`, determina si debe comprar tamaños de lso arrays
   * - `isCompareSize = false`, determina si debe comparar cantidad de propiedades de los objetos
   * - `isCompareStringToNumber = false`, determina si debe comparar strings numéricos como números
   * - `isCaseSensitiveForString = false`, determina si la comparación es sensitiva a minusculas y mayusculas (solo string)
   * - `isStringLocaleMode = false`, determina si la comparación de strings es en modo region del sistema
   * @param {"first" | "last"} [itemConflictMode = "last"] - En caso de encontrar un duplicado, determina con cuál elemento se queda. Por defecto es `"last"`.
   * @returns {Array} - Retorna un nuevo array con los elementos repetidos o duplicados eliminados.
   *
   * @example
   *
   * ````typescript
   * let a;
   * let r;
   *
   * //caso primitivos sencillos (modo "first")
   * a = [
   *   true,
   *   false,
   *   true,
   *   null,
   *   2,
   *   undefined,
   *   2,
   *   undefined,
   *   1,
   *   "Juan",
   *   "juan",
   *   null,
   * ];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "first"
   * });
   * console.log(r) //Salida:
   * //[
   * //  true,
   * //  false,
   * //  null,
   * //  2,
   * //  undefined,
   * //  1,
   * //  "Juan", //son diferentes si es sensitivo
   * //  "juan", //son diferentes si es sensitivo
   * //]
   *
   * //caso primitivos sencillos (modo "last")
   * a = [
   *   true,
   *   false,
   *   true,
   *   null,
   *   2,
   *   undefined,
   *   2,
   *   undefined,
   *   1,
   *   "Juan",
   *   "juan",
   *   null,
   * ];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "last"
   * });
   * console.log(r) //Salida:
   * //[
   * //  false,
   * //  true,
   * //  2,
   * //  undefined,
   * //  1,
   * //  "Juan", //son diferentes si es sensitivo
   * //  "juan", //son diferentes si es sensitivo
   * //  null
   * //]
   *
   * //caso strings (modo "first", no sensitivo)
   * a = ["a","A","B","C","A","B"];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "first"
   * });
   * console.log(r) //Salida: ["a","B","C"]
   *
   * //caso strings (modo "last", no sensitivo)
   * a = ["a","A","B","C","A","B"];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "last"
   * });
   * console.log(r) //Salida: ["C","A","B"]
   *
   * //caso strings (modo "first", sensitivo)
   * a = ["a","A","B","C","A","B"];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "first",
   *   isCaseSensitiveForString
   * });
   * console.log(r) //Salida: ["a","A","B","C"]
   *
   * //caso strings (modo "last", sensitivo)
   * a = ["a","A","B","C","A","B"];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "last"
   * });
   * console.log(r) //Salida: ["a","C","A","B"]
   *
   * //caso object (modo "first", sin keysPath)
   * a = [
   *   {name: "Ana", age:12},
   *   {name: "Juan", age:13},
   *   {name: "Ana", age:13},
   *   {name: "Juan", age:12},
   * ];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "first"
   * });
   * console.log(r) //Salida: (no hay repetidos porque no hubo keysPath)
   * //[
   * //  {name: "Ana", age:12},
   * //  {name: "Juan", age:13},
   * //  {name: "Ana", age:13},
   * //  {name: "Juan", age:12},
   * //]
   *
   * //caso object (modo "first", con keysPath)
   * a = [
   *   {name: "Ana", age:12},
   *   {name: "Juan", age:13},
   *   {name: "Ana", age:13},
   *   {name: "Juan", age:12},
   * ];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "first",
   *   keyOrKeysPath: ["name"]
   * });
   * console.log(r) //Salida:
   * //[
   * //  {name: "Ana", age:12},
   * //  {name: "Juan", age:13},
   * //]
   *
   * //caso object (modo "last", con keysPath)
   * a = [
   *   {name: "Ana", age:12},
   *   {name: "Juan", age:13},
   *   {name: "Ana", age:13},
   *   {name: "Juan", age:12},
   * ];
   * r = removeArrayDuplicate(a, {
   *   itemConflictMode: "last",
   *   keyOrKeysPath: ["name"]
   * });
   * console.log(r) //Salida:
   * //[
   * //  {name: "Ana", age:13},
   * //  {name: "Juan", age:12},
   * //]
   * ````
   *
   */
  public removeArrayDuplicate<T extends Array<any>>(
    arrayToRemove: T,
    option?: Omit<IOptionEqGtLt, "isAllowEquivalent"> & {
      /**Si existe un elemento equivalente
       * a otros determinar si mantiene el
       * primero o el ultimo
       *
       * ⚠ se recomienda que `arrayToRemove`
       * este ordenado antes de eliminar los
       * elementos duplicados
       *
       * - `"first"` mantiene el primer elemento encontrado
       *
       * - `"last"` mantiene el ultimo elemento encontrado
       *
       * predefinido en `"last"`
       */
      itemConflictMode?: "first" | "last";
    },
  ): T {
    if (!this.isArray(arrayToRemove, true))
      throw new Error(
        `${arrayToRemove} is not array to remove duplicates valid`,
      );
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      //las opciones de comparación se asignan en sus respectivos métodos
      itemConflictMode:
        op.itemConflictMode === "first" || op.itemConflictMode === "last"
          ? op.itemConflictMode
          : "last",
    };
    let { itemConflictMode } = op;
    //Iniciar proceso
    let fArray = arrayToRemove.filter((itemBase, idxBase) => {
      let idx: number;
      if (itemConflictMode === "first") {
        //reescritura de las funciones findIndex (por motivos de ES2020)
        const findIndexFn = <T>(
          arr: T[],
          cb: (element: T, index?: number, array?: T[]) => boolean,
        ) => {
          for (let i = 0; i < arr.length; i++) {
            if (cb(arr[i], i, arr)) {
              return i;
            }
          }
          return -1;
        };
        idx = findIndexFn(arrayToRemove, (item) =>
          this.isEquivalentTo([itemBase, item], { ...op }),
        );
      } else if (itemConflictMode === "last") {
        //reescritura de las funciones findLastIndex (por motivos de ES2020)
        const findLastIndexFn = <T>(
          arr: T[],
          cb: (element: T, index?: number, array?: T[]) => boolean,
        ) => {
          let idxLast = -1;
          for (let i = arr.length - 1; i >= 0; i--) {
            if (cb(arr[i], i, arr)) {
              idxLast = i;
              break;
            }
          }
          return idxLast;
        };
        idx = findLastIndexFn(arrayToRemove, (item) => {
          const r = this.isEquivalentTo([itemBase, item], { ...op });
          return r;
        });
      } else {
        throw new Error(
          `${itemConflictMode} is not configuration's item conflict mode to remove duplicate valid`,
        );
      }
      const r = idxBase === idx;
      return r;
    });
    return fArray as T;
  }
  /**
   * Obtiene la unión de dos arrays, eliminando los elementos duplicados.
   *
   * @param {[TArray, TArray]} tArraysToUnion Tupla con los dos arrays a unir, donde:
   * - `tArraysToUnion[0]` es el array "A" a unir.
   * - `tArraysToUnion[1]` es el array "B" a unir.
   * @param {object} option Configuración para el proceso de eliminación de duplicados. Las opciones son las mismas que para el método `arrayRemoveDuplicate`.
   * - `itemConflictMode` al encontrar un elemento repetido define el modo de resolver el conflicto de si se queda con el primero o el ultimo de los repetidos
   * - `keyOrKeysPath` (solo para elementos de tipo objeto) rutas de claves identificadoras para las propiedades que se usaran como base para la comparación
   * - `isCompareLength = false`, determina si debe comprar tamaños de lso arrays
   * - `isCompareSize = false`, determina si debe comparar cantidad de propiedades de los objetos
   * - `isCompareStringToNumber = false`, determina si debe comparar strings numéricos como números
   * - `isCaseSensitiveForString = false`, determina si la comparación es sensitiva a minusculas y mayusculas (solo string)
   * - `isStringLocaleMode = false`, determina si la comparación de strings es en modo region del sistema
   * @returns {TArray} Retorna un nuevo array que es la unión de los dos arrays de entrada, sin duplicados.
   * @throws {Error} Lanza un error si `tArraysToUnion` no es un array de dos elementos.
   *
   * @example
   * ```typescript
   * let arrA;
   * let arrB;
   * let r;
   *
   * //union:
   * arrA = [1, 2, 3];
   * arrB = [3, 4, 5];
   * r = getArrayUnion([arrA, arrB], {});
   * console.log(r); // salida: [1, 2, 3, 4, 5]
   * ```
   *
   */
  public getArrayUnion<TArray extends Array<any>>(
    tArraysToUnion: [TArray, TArray],
    option?: Parameters<typeof this.removeArrayDuplicate>[1],
  ): TArray {
    if (!this.isValueType(tArraysToUnion, [[], []]))
      throw new Error(`${tArraysToUnion} is not tuple to union valid`);
    let [aAU, bAU] = tArraysToUnion;
    let aR = [...aAU, ...bAU] as TArray;
    aR = this.removeArrayDuplicate(aR, option);
    return aR;
  }
  /**
   * Obtiene la intersección de dos arrays, eliminando los elementos duplicados.
   *
   * @param {[TArray, TArray]} tArraysToUnion Tupla con los dos arrays a unir, donde:
   * - `tArraysToUnion[0]` es el array "A" a unir.
   * - `tArraysToUnion[1]` es el array "B" a unir.
   * @param {object} option Configuración para el proceso de eliminación de duplicados. Las opciones son las mismas que para el método `arrayRemoveDuplicate`.
   * - `itemConflictMode` al encontrar un elemento repetido define el modo de resolver el conflicto de si se queda con el primero o el ultimo de los repetidos
   * - `keyOrKeysPath` (solo para elementos de tipo objeto) rutas de claves identificadoras para las propiedades que se usaran como base para la comparación
   * - `isCompareLength = false`, determina si debe comprar tamaños de lso arrays
   * - `isCompareSize = false`, determina si debe comparar cantidad de propiedades de los objetos
   * - `isCompareStringToNumber = false`, determina si debe comparar strings numéricos como números
   * - `isCaseSensitiveForString = false`, determina si la comparación es sensitiva a minusculas y mayusculas (solo string)
   * - `isStringLocaleMode = false`, determina si la comparación de strings es en modo region del sistema
   * @returns {TArray} Retorna un nuevo array que es la unión de los dos arrays de entrada, sin duplicados.
   * @throws {Error} Lanza un error si `tArraysToUnion` no es un array de dos elementos.
   *
   * @example
   * ```typescript
   * let arrA;
   * let arrB;
   * let r;
   *
   * //intersección:
   * arrA = [1, 2, 3, 4, 5];
   * arrB = [3, 4, 5, 6, 7, 8, 9];
   * r = getArrayIntersection([arrA, arrB], {});
   * console.log(r); // salida: [3, 4, 5]
   * ```
   *
   */
  public getArrayIntersection<T extends Array<any>>(
    tArraysToIntersection: [T, T],
    option?: Parameters<typeof this.removeArrayDuplicate>[1],
  ): T {
    if (!this.isValueType(tArraysToIntersection, [[], []]))
      throw new Error(`${tArraysToIntersection} is not tuple to union valid`);
    let [aAI, bAI] = tArraysToIntersection;
    let aR = aAI.filter((a) => {
      const r = bAI.some((b) => this.isEquivalentTo([a, b], option));
      return r;
    }) as T;
    aR = this.removeArrayDuplicate(aR, option);
    return aR;
  }
  /**
   *
   * Obtiene la diferencia de dos arrays, eliminando los elementos duplicados.
   *
   * @param {[TArray, TArray]} tArraysToUnion Tupla con los dos arrays a unir, donde:
   * - `tArraysToUnion[0]` es el array *A* a unir.
   * - `tArraysToUnion[1]` es el array *B* a unir.
   * @param {"difference_A" | "difference_B"} selector seleccion de array al cual se le aplica la diferencia (al array `tArraysToUnion[0]` que representa *A* o al array `tArraysToUnion[1]` que representa *B*).
   * @param {object} option Configuración para el proceso de eliminación de duplicados. Las opciones son las mismas que para el método `arrayRemoveDuplicate`.
   * - `itemConflictMode` al encontrar un elemento repetido define el modo de resolver el conflicto de si se queda con el primero o el ultimo de los repetidos
   * - `keyOrKeysPath` (solo para elementos de tipo objeto) rutas de claves identificadoras para las propiedades que se usaran como base para la comparación
   * - `isCompareLength = false`, determina si debe comprar tamaños de lso arrays
   * - `isCompareSize = false`, determina si debe comparar cantidad de propiedades de los objetos
   * - `isCompareStringToNumber = false`, determina si debe comparar strings numéricos como números
   * - `isCaseSensitiveForString = false`, determina si la comparación es sensitiva a minusculas y mayusculas (solo string)
   * - `isStringLocaleMode = false`, determina si la comparación de strings es en modo region del sistema
   * @returns {TArray} Retorna un nuevo array que es la unión de los dos arrays de entrada, sin duplicados.
   * @throws {Error} Lanza un error si `tArraysToUnion` no es un array de dos elementos.
   *
   * @example
   * ```typescript
   * let arrA;
   * let arrB;
   * let r;
   *
   * //diferencia *A*:
   * arrA = [1, 2, 3];
   * arrB = [3, 4, 5];
   * r = getArrayDifference([arrA, arrB], "difference_A");
   * console.log(r); // salida: [1, 2]
   *
   * //diferencia *B*:
   * arrA = [1, 2, 3];
   * arrB = [3, 4, 5];
   * r = getArrayDifference([arrA, arrB], "difference_B");
   * console.log(r); // salida: [4, 5]
   * ```
   *
   */
  public getArrayDifference<T extends Array<any>>(
    tArraysToDifference: [T, T],
    selector: "difference_A" | "difference_B",
    option?: Parameters<typeof this.removeArrayDuplicate>[1],
  ): T {
    if (!this.isArray(tArraysToDifference) || tArraysToDifference.length > 2)
      throw new Error(`${tArraysToDifference} is not array of set valid`);
    if (!this.isString(selector)) {
      throw new Error(`${selector} is not selector valid`);
    }
    let [aAD, bAD] = tArraysToDifference;
    let aR = [] as any[];
    if (selector === "difference_A") {
      aR = aAD.filter((a) => {
        const r = !bAD.some((b) => this.isEquivalentTo([a, b], option));
        return r;
      }) as T;
    } else if (selector === "difference_B") {
      aR = bAD.filter((b) => {
        const r = !aAD.some((a) => this.isEquivalentTo([a, b], option));
        return r;
      }) as T;
    } else {
      throw new Error(`${selector} is not selector valid`);
    }
    aR = this.removeArrayDuplicate(aR, option);
    return aR as T;
  }
  /**
   * busca elementos de un array
   * dentro de otro
   *
   * ➡Ejemplo de consulta de objetos por un campo:
   * ````
   * const mainArray = [
   *  {id: "1", nombre:"Alan", edad:12},
   *  {id: "2", nombre:"Marta", edad:14},
   *  {id: "3", nombre:"Maria", edad:16},
   *  {id: "4", nombre:"Manuel", edad:16},
   * ];
   * const searchArray = [ //buscar los objetos en mainArray con `id === 1 || id == 4`
   *  {id:1},
   *  {id:4}
   * ];
   *
   * const r = searchItemsInArray(mainArray, searchArray);
   * console.log(r); //-> [{id: "1", nombre:"Alan", edad:12}, {id: "4", nombre:"Manuel", edad:16},]
   * ````
   *
   * ➡Ejemplo búsqueda OR y AND:
   * ````
   * const mainArray = [
   *  {id: "1", nombre:"Alan", edad:12},
   *  {id: "2", nombre:"Marta", edad:14},
   *  {id: "3", nombre:"Maria", edad:16},
   *  {id: "4", nombre:"Manuel", edad:16},
   * ];
   * const searchArray = [ //buscar los objetos en mainArray que: `id===2 || (nombre === "Maria" && edad === 16)`
   *  {nombre: "Maria", edad: 16}, //se busca nombre && edad
   *  {id:2}
   * ];
   *
   * const r = searchItemsInArray(mainArray, searchArray);
   * console.log(r); //-> [{id: "2", nombre:"Marta", edad:14}, {id: "3", nombre:"Maria", edad:16},]
   * ````
   *
   * ➡Ejemplo con propiedades seleccionadas:
   * ````
   * const mainArray = [
   *  {id: "1", nombre:"Alan", edad:12},
   *  {id: "2", nombre:"Marta", edad:14},
   *  {id: "3", nombre:"Maria", edad:16},
   *  {id: "4", nombre:"Manuel", edad:16},
   * ];
   * const searchArray = [ //buscar los objetos en mainArray (se envían los objetos completos)`
   *  {id: "2", nombre:"Marta", edad:14},
   *  {id: "3", nombre:"Maria", edad:16},
   * ];
   * const diccKeyId = ["edad"];  // SOLO buscar por nombre
   * const r = searchItemsInArray(mainArray, searchArray, diccKeyId);
   * console.log(r); //-> [
   *                  //{id: "2", nombre:"Marta", edad:14},
   *                  //{id: "3", nombre:"Maria", edad:16},
   *                  //{id: "4", nombre:"Manuel", edad:16},
   *                  //]
   * ````
   *
   * ____
   * @param aData el array de datos donde se desea buscar
   *
   * @param searchArray el array con elementos a buscar, si
   * son objetos pueden ser extractos de objetos que al menos
   * contengan las propiedades que los identifican
   *
   * ⚠ las propiedades que se envíen aqui
   *
   * @param keysForObj (opcional) array con identificadores
   * de los objetos `searchArray` que serán usados para
   * la comparación, si no se reciben se asume que todos
   * los propiedades de estos objetos serán comparados
   *
   * ____
   * @returns un array con los elementos que se
   * encontraron (que son equivalentes)
   * ____
   */
  public searchItemsInArray<TArray extends Array<any>>(
    aData: TArray,
    searchArray: TArray,
    option: Omit<IOptionEqGtLt, "isAllowEquivalent"> & {},
  ): TArray {
    if (!this.isArray(aData))
      throw new Error(`${aData} is not root array valid`);
    if (!this.isArray(searchArray))
      throw new Error(`${searchArray} is not search array valid`);
    //constructor de opciones
    let op = this.isObject(option, true) ? option : ({} as typeof option); //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      //las opciones de comparación se asignan en sus respectivos métodos
    };
    let {} = op;
    //iniciar proceso
    let findArray = aData.filter((mAi) => {
      const r = searchArray.find((sAi) => {
        let r = this.isEquivalentTo([mAi, sAi], { ...op });
        return r;
      });
      return r;
    });
    return findArray as TArray;
  }
  /**
   * Congela un array para prevenir modificaciones en sus elementos, con opción de niveles profundos si sus elementos son a su vez arrays.
   *
   * @param {TArray} arr - El array que se va a congelar.
   * @param {boolean} isAllowDeepLevel - Determina si se debe congelar el array a nivel profundo. Por defecto es `true`, lo que significa que se congelarán todos los elementos del array que sean, a su vez, arrays.
   * @returns {TArray} - Retorna el array congelado, si no es un array, retorna el valor sin modificaciones.
   *
   * @example
   * ```typescript
   * const arr = ["hola", {b:["1"]}];
   * const frozenArr = freezeArray(arr);
   * //verifica si esta congelado
   * console.log(Object.isFrozen(frozenArr)); // salida: true
   * console.log(Object.isFrozen(frozenArr[1])); // salida: true
   * ```
   */
  public freezeArray<TArray>(arr: TArray, isAllowDeepLevel = true): TArray {
    const isArray = Array.isArray(arr);
    if (!isArray) return arr;
    // Congelar arrays directamente si no se requiere recursividad
    if (isArray && !isAllowDeepLevel) return Object.freeze(arr);
    arr = (arr as any[]).map((item) => {
      return this.freezeObject(item, isAllowDeepLevel);
    }) as TArray;
    arr = Object.freeze(arr);
    return arr;
  }
  //████ tuplas ███████████████████████████████████████████████████████
  /**
   * Determina si un valor es una tupla de un tamaño específico o dentro de un rango de tamaños.
   *
   * @param {any} tuple - El valor que se va a verificar.
   * @param {number | [number, number]} size - El tamaño esperado de la tupla o un rango de tamaños válidos. Si es un número, la tupla debe tener exactamente ese tamaño. Si es una tupla de dos números, el tamaño de la tupla debe estar dentro de ese rango (inclusive).
   * @throws {Error} - Lanza un error si `length` no es un número o una tupla de dos números.
   * @returns {boolean} - Retorna `true` si el valor es una tupla del tamaño especificado o dentro del rango de tamaños, de lo contrario retorna `false`.
   *
   * @example
   * ```typescript
   *
   * let value = [1, 2, 3];
   * let isTuple = isTuple(value, 3);
   *
   * //caso básico
   * value = [1, 2, 3];
   * isTuple = isTuple(value, 3); //tupla con tamaño exacto de 3 elementos
   * console.log(isTuple); // salida: true
   *
   * //caso tupla con tamaño variable
   * isTuple = isTuple(value, [1,2]); //la tupla puede tener entre 1 y 2 elementos
   * console.log(isTuple); // salida: false, porque tiene 3 elementos
   *
   * ```
   */
  public isTuple<TTuple>(
    tuple: TTuple,
    size: number | [number, number],
  ): boolean {
    if (
      (!this.isNumber(size) || this.isNumberSign(size, "-")) &&
      (!this.isValueType(size, [["number"], ["number"]]) || //this.isTuple(size, 2) ||
        (size as number[]).some((s) => this.isNumberSign(s, "-")))
    )
      throw new Error(`${size} is not number or range tuple number valid`);
    if (!this.isArray(tuple, true)) return false;
    const tp = tuple as any[];
    if (!Array.isArray(size)) {
      if (tp.length !== size) return false;
    } else {
      if (!this.isNumberInRange(tp.length, size, true)) return false;
    }
    return true;
  }
  /**
   * Determina si es un array de tuplas
   *
   * @param {Array<TTuple>} aTuple - El array de tuplas que se va a verificar.
   * @param {number | [number, number]} length - El tamaño esperado de las tuplas o un rango de tamaños válidos. Si es un número, todas las tuplas deben tener exactamente ese tamaño. Si es una tupla de dos números, el tamaño de las tuplas debe estar dentro de ese rango (inclusivo).
   * @param {boolean} allowEmpty - Determina si se permite asumir que el array está vacío como válido. Por defecto es `false`, lo que significa que no se permite asumirlo como válido si está vacío.
   * @returns {boolean} - Retorna `true` si todas las tuplas cumplen con las condiciones de tamaño, de lo contrario retorna `false`.
   *
   * @example
   * ```typescript
   * const array = [[1, 2], [3, 4], [5, 6]];
   * const isValid = isArrayTuple(array, 2); //en esta caso, las tuplas deben tener un tamaño exacto de 2 elementos
   * console.log(isValid); // salida: true
   * ```
   */
  public isArrayTuple<TTuple>(
    aTuple: Array<TTuple>,
    length: number | [number, number],
    allowEmpty = false,
  ): boolean {
    if (!this.isArray(aTuple, allowEmpty)) return false;
    const r = aTuple.every((tuple) => this.isTuple(tuple, length));
    return r;
  }
  /**
   * Convierte un objeto literal en un array de tuplas.
   *
   * @param {TObj} obj El objeto literal que se va a convertir.
   * @returns {Array<[keyof TObj, (typeof obj)[keyof TObj]]>} Retorna un array de tuplas. Cada tupla consta de una clave y un valor del objeto de entrada.
   *
   * ⚠ si el parámetro no es de tipo objeto **literal**  se retornará un array vacio, ademas al ser un conversión de objeto a tupla esta siempre será de tipo clave-valor (`[key, value]`)
   *
   * @example
   * ```typescript
   * const obj = { a: 1, b: 2, c: 3 };
   * const array = convertObjectToArrayOfTuples(obj);
   * console.log(array); // salida: [["a", 1], ["b", 2], ["c", 3]]
   * ```
   */
  public convertObjectToArrayOfTuples<TObj>(obj: TObj) {
    if (!this.isLiteralObject(obj)) return [];
    let aT = Object.keys(obj as any).map((k) => {
      const key = k as keyof TObj;
      const r = [key, obj[key]] as [keyof TObj, (typeof obj)[keyof TObj]];
      return r;
    });
    return aT;
  }
  /**
   * Elimina los duplicados de un array de tuplas basándose en la clave de cada tupla.
   *
   * **⚠** la tupla **debe** ser de tipo clave-valor (`[key, value]`) obligatoriamente
   *
   * @param {TATuple} arrayTupleToRemove El array de tuplas que puede contener duplicados.
   * @returns {TATuple} Retorna un nuevo array de tuplas sin duplicados.
   *
   * **⚠** si se encuentran duplicados, seleccionara el último de los elementos duplicados
   *
   * @example
   * ```typescript
   * const array = [["key1", "value1"], ["key2", "value2"], ["key1", "value3"]];
   * const newArray = removeTupleArrayDuplicateByKey(array);
   * console.log(newArray); // salida: [["key1", "value3"], ["key2", "value2"]]
   * ```
   */
  public removeTupleArrayDuplicateByKey<TATuple>(
    arrayTupleToRemove: TATuple,
  ): TATuple {
    if (
      !this.isArray(arrayTupleToRemove) ||
      !(arrayTupleToRemove as any[]).every((t) => this.isTuple(t, 2))
    ) {
      throw new Error(
        `${arrayTupleToRemove} is not array of tuple to remove duplicates valid`,
      );
    }
    const mapBf = new Map(arrayTupleToRemove as Array<[any, any]>);
    let aT = Array.from(mapBf.keys()).map((key) => {
      const r = [key, mapBf.get(key)];
      return r;
    });
    return aT as TATuple;
  }
  //████ Fechas ███████████████████████████████████████████████████████
  /**
   * determina si el numero es un timestamp valido
   * @param {any} timestamp el numero a validar como timestamp, se puede recibir como number o como string-number
   * @returns si es un timestamp valido
   */
  public isTimestamp(timestamp: any): boolean {
    if (!this.isNumber(timestamp)) return false;
    const timestampReduced =
      this.stringToNumber(timestamp, { isDecimalPoint: false }) / 1000; //reducirlo a segundos para evitar problemas de memoria (en año 2038)
    if (this.isNumberSign(timestampReduced, "-", false)) return false; //un timestamp SIEMPRE será positivo
    return true;
  }
  /**
   * convierte de string de fecha a timestamp
   *
   * @param dateString el string de la fecha en formato dd-mm-yyyy
   * ____
   * @returns el timestamp de dicha fecha
   * ____
   */
  public dateToTimestamp(dateString: string): number {
    const dd_mm_yyyy = dateString.split(this.sepDateRegExp);
    const day = parseInt(dd_mm_yyyy[0], 10);
    const month = parseInt(dd_mm_yyyy[1], 10) - 1; //los meses se cuentan de 0 a 11
    const year = parseInt(dd_mm_yyyy[2], 10); //año completo yyyy
    let rDate = new Date(year, month, day);
    return rDate.getTime();
  }
  //████ Funciones ████████████████████████████████████████████████████
  /**
   * Determina si un valor es una función.
   *
   * @param {any} fn - El valor que se va a verificar.
   * @returns {boolean} - Retorna `true` si el valor es una función, de lo contrario retorna `false`.
   *
   * @example
   * ```typescript
   * const result = isFunction(() => {});
   * console.log(result); // salida: true
   *
   * const result2 = isFunction(123);
   * console.log(result2); // salida: false
   * ```
   */
  public isFunction(fn: unknown): fn is Function {
    const r = typeof fn === "function";
    return r;
  }
  /**
   * Construye una función vinculada a un contexto específico.
   *
   * @param {TFn} fn - La función que se va a vincular.
   * @param {object} context - El contexto al cual se va a vincular la función.
   * @returns {TFn} - Retorna la función vinculada.
   * @throws {Error} - Lanza un error si `fn` no es una función válida.
   *
   * @example
   * ```typescript
   * const context = { value: 42 };
   * const fn = function() { return this.value; };
   * const boundFn = buildFn(fn, context);
   * console.log(boundFn()); // salida: 42
   *
   * const invalidFn = 123;
   * try {
   *   const result = buildFn(invalidFn, context);
   * } catch (e) {
   *   console.error(e); // salida: 123 is not function valid
   * }
   * ```
   */
  public buildFn<TFn>(fn: TFn, context: object): TFn {
    if (!this.isFunction(fn)) throw new Error(`${fn} is not function valid`);
    fn = (fn as Function).bind(context);
    return fn;
  }
  /**
   * Obtiene el nombre de una función a partir del índice inverso en el stack de llamadas.
   *
   * 🧪 Experimental, posibles problemas en entornos antiguos 🧪
   *
   * @param {number} idxReverse - Índice inverso en el stack de llamadas. **Debe ser negativo y no igual a `0`.**, ejemplos:
   *    - `idxReverse === -1`, la función que se está usando actualmente.
   *    - `idxReverse === -2`, la función "padre" que llamó o invocó a esta que se está ejecutando.
   *    - `idxReverse === -3`, la función "abuelo" que llamó o invocó a la padre que a su vez llamó o invocó a esta que se está ejecutando.
   * @returns {string | typeof this.dfValue} Retorna el nombre de la función o el valor predeterminado `this.dfValue` si no se encuentra un nombre válido.
   *
   * @throws {Error} "`<valor>` is not idx reverse valid" Si el parámetro `idxReverse` no es un número válido.
   * @throws {Error} "`<valor>` is not negative idx reverse valid" Si el parámetro `idxReverse` no es un número negativo.
   *
   * @example
   * ````typescript
   * const util = UtilNative.getinstance();
   * function hacer_1(){
   *   const fnName = util.getFunctionName(-2); //❗Punto de referencia❗, -2 solicita en nombre de la función "padre" que llamó a esta
   *   console.log(functionName); // Salida: "hacer_2"
   *   return
   * }
   *
   * function hacer_2(){
   *   return hacer_1()
   * }
   *
   * function hacer_3(){
   *   return hacer_2()
   * }
   *
   * hacer_3();
   *
   * ````
   */
  public getFunctionName(idxReverse: number): string | typeof this.dfValue {
    if (!this.isNumber(idxReverse))
      throw new Error(`${idxReverse} is not idx reverse valid`);
    //❗Debe ser negativo y no 0❗
    if (!this.isNumberSign(idxReverse, "-", false))
      throw new Error(`${idxReverse} is not negative idx reverse valid`);
    idxReverse = this.stringToNumber(idxReverse, false); //garantizar numérico
    idxReverse = idxReverse - 1; //modificar el offset para no retornar el nombre de esta misma función
    const idxToInject = this.toggleNumberSign(idxReverse);
    //procesar:
    const error = new Error();
    let stackLine = error.stack?.split("\n")[idxToInject]?.trim() || "";
    // Expresión regular optimizada para todos los casos conocidos
    const regex = /at\s+(?:[\w.]+\.)?([^(\s]+)|\(([^)]+)\)|([^\s]+)/;
    const match = stackLine.match(regex);
    // Extracción del nombre con prioridad
    let functionName = this.dfValue as any as string;
    if (match) {
      functionName =
        match[1] || match[2] || match[3] || (this.dfValue as any as string);
      // Limpieza adicional para casos como "UtilNative.getNameFunction"
      if (functionName.includes(".")) {
        functionName = functionName.split(".").pop()!;
      }
      // Filtrado de casos como "<anonymous>", "eval", "[native code]"
      const invalidNames = ["<anonymous>", "eval", "[native code]"];
      if (invalidNames.includes(functionName)) {
        functionName = this.dfValue as any as string;
      }
      // debe ser un nombre de función de acuerdo al estandar de definición de nombres
      if (!/^[a-zA-Z_$]\w*$/.test(functionName)) {
        functionName = this.dfValue as any as string;
      }
    }
    return functionName;
  }
  //████ Generales ████████████████████████████████████████████████████
  /**
   * Método interno para clonar objetos profundos de forma iterativa (evita Stack Overflow),
   * incluyendo instancias de clase, preservando prototipos (herencia), métodos, símbolos y referencias circulares.
   *
   * @param {T} rootObj El objeto o valor a clonar.
   * @returns {T} El valor clonado.
   */
  protected _deepCloneNative<T>(rootObj: T): T {
    // Si es un valor primitivo o función, se devuelve tal cual (array tratados como objetos)
    if (typeof rootObj !== "object" || this.isNull(rootObj)) {
      return rootObj;
    }
    //Manejo de tipos integrados especiales en la raíz
    if (rootObj instanceof Date) return new Date(rootObj.getTime()) as any;
    if (rootObj instanceof RegExp)
      return new RegExp(rootObj.source, rootObj.flags) as any;
    //Mapa para gestionar referencias circulares y objetos ya clonados
    const clones = new WeakMap<object, object>();
    //Crear el clon de la raíz según su tipo
    const rootClone = Array.isArray(rootObj)
      ? []
      : Object.create(Object.getPrototypeOf(rootObj));
    clones.set(rootObj as object, rootClone);
    // Pila de tareas para la clonación iterativa (Heap en lugar de Call Stack)
    type TCloneTask = {
      source: any;
      target: any;
    };
    const stack: TCloneTask[] = [{ source: rootObj, target: rootClone }];
    while (stack.length > 0) {
      const { source, target } = stack.pop()!;
      // A. Manejo de Map
      if (source instanceof Map) {
        source.forEach((value, key) => {
          let clonedKey = key;
          let clonedValue = value;
          if (typeof key === "object" && !this.isNull(key)) {
            if (!clones.has(key)) {
              const newKeyClone = Array.isArray(key)
                ? []
                : Object.create(Object.getPrototypeOf(key));
              clones.set(key, newKeyClone);
              stack.push({ source: key, target: newKeyClone });
            }
            clonedKey = clones.get(key);
          }
          if (typeof value === "object" && !this.isNull(value)) {
            if (!clones.has(value)) {
              const newValueClone = Array.isArray(value)
                ? []
                : Object.create(Object.getPrototypeOf(value));
              clones.set(value, newValueClone);
              stack.push({ source: value, target: newValueClone });
            }
            clonedValue = clones.get(value);
          }
          target.set(clonedKey, clonedValue);
        });
        continue;
      }
      // B. Manejo de Set
      if (source instanceof Set) {
        source.forEach((value) => {
          let clonedValue = value;
          if (typeof value === "object" && !this.isNull(value)) {
            if (!clones.has(value)) {
              const newValueClone = Array.isArray(value)
                ? []
                : Object.create(Object.getPrototypeOf(value));
              clones.set(value, newValueClone);
              stack.push({ source: value, target: newValueClone });
            }
            clonedValue = clones.get(value);
          }
          target.add(clonedValue);
        });
        continue;
      }
      // C. Copia de propiedades en Objetos/Arrays/Instancias
      const keys = Reflect.ownKeys(source);
      for (const key of keys) {
        const descriptor = Object.getOwnPropertyDescriptor(source, key);
        const value = source[key];
        // Primitivos o Funciones: asignación directa
        if (
          typeof value !== "object" ||
          this.isNull(value) ||
          typeof value === "function"
        ) {
          if (descriptor && (descriptor.get || descriptor.set)) {
            Object.defineProperty(target, key, descriptor);
          } else {
            target[key] = value;
          }
          continue;
        }
        // Manejo de Date y RegExp anidados
        if (value instanceof Date) {
          target[key] = new Date(value.getTime());
          continue;
        }
        if (value instanceof RegExp) {
          target[key] = new RegExp(value.source, value.flags);
          continue;
        }
        // Manejo de objetos/arrays/instancias anidados
        let subClone = clones.get(value);
        if (!subClone) {
          subClone = Array.isArray(value)
            ? []
            : value instanceof Map
              ? new Map()
              : value instanceof Set
                ? new Set()
                : Object.create(Object.getPrototypeOf(value));
          clones.set(value, subClone as any);
          stack.push({ source: value, target: subClone });
        }
        if (descriptor && (descriptor.get || descriptor.set)) {
          Object.defineProperty(target, key, {
            ...descriptor,
            value: subClone,
          });
        } else {
          target[key] = subClone;
        }
      }
    }
    return rootClone as T;
  }
  /**
   * Realiza la clonación de objetos JSON, Arrays o Instancias de Clases a diferentes niveles de profundidad.
   *
   * @description
   * El comportamiento depende del driver seleccionado:
   *
   * - **`"customDeepClone"` (Predefinido)**:
   *   Algoritmo iterativo (*Anti-Stack Overflow*) basado en memoria Heap.
   *   - **Soporte de Clases e Herencia**: Preserva la cadena de prototipos (`Object.getPrototypeOf`),
   *     métodos de clase, getters, setters y propiedades con `Symbol` o no enumerables.
   *   - **Tipos Especiales Soportados**: `Date`, `RegExp`, `Map`, `Set` y referencias circulares.
   *   - **Funciones**: Se asignan por referencia para preservar sus clausuras y contexto de ejecución.
   *
   * - **`"structuredClone"`**:
   *   Utiliza la API nativa de JavaScript. Es ultrarrápida para estructuras de datos planas o complejas,
   *   pero **no soporta funciones** (lanza `DataCloneError`) y **destruye los prototipos de clases personalizadas**
   *   (las convierte en objetos planos `Object`).
   *
   * - **`"stringify"`**:
   *   Clonación básica basada en `JSON.parse(JSON.stringify(obj))`.
   *   Omite funciones, propiedades `undefined`, `Symbol` y destruye métodos y prototipos de clases.
   *
   * ⚠ **Advertencias de Clonación (`customDeepClone`)**:
   * - **Tipos no clonables por diseño**: `WeakMap` y `WeakSet` no son iterables por especificación de ECMAScript,
   *   por lo que se mantendrán por referencia.
   * - **Entornos del Navegador**: Nodos del DOM (`Element`) o flujos de datos (`FormData`, `File`)
   *   tienen mecanismos propios de clonación (`cloneNode`) y no deben clonarse mediante esta utilidad.
   *
   * @template T Tipo del objeto o valor a clonar.
   * @param {T} objOrArray El objeto, array o instancia que se desea clonar.
   * @param {"customDeepClone" | "structuredClone" | "stringify"} [driver="customDeepClone"] Driver a utilizar para la clonación.
   * @returns {T} Retorna una copia profunda del valor proporcionado. Si no es un objeto (o es `null`), se devuelve sin cambios.
   *
   * @example
   * ```typescript
   * // Clonación de objetos planos o arrays
   * const obj = { a: 1, b: { c: 2 } };
   * const clonedObj = util.clone(obj);
   *
   * // Clonación de instancias de clase conservando métodos y prototipo
   * class Person {
   *   constructor(public name: string) {}
   *   greet() { return `Hola, soy ${this.name}`; }
   * }
   * const person = new Person("Alan");
   * const clonedPerson = util.clone(person);
   * console.log(clonedPerson instanceof Person); // true
   * console.log(clonedPerson.greet()); // "Hola, soy Alan"
   * ```
   */
  public clone<T>(
    objOrArray: T,
    driver:
      | "stringify"
      | "structuredClone"
      | "customDeepClone" = "customDeepClone",
  ): T {
    if (
      typeof objOrArray != "object" || //❗solo clona los objetos (incluye array)❗
      this.isNull(objOrArray)
    ) {
      return objOrArray;
    }
    let dataCopia: T;
    if (driver === "stringify") {
      dataCopia = JSON.parse(JSON.stringify(objOrArray)); //método antiguo
    } else if (driver === "structuredClone") {
      dataCopia = structuredClone(objOrArray); //Se implementará en typescript ^4.7.x
    } else if (driver === "customDeepClone") {
      dataCopia = this._deepCloneNative(objOrArray);
    } else {
      throw new Error(`${driver} does not driver valid`);
    }
    return dataCopia;
  }
  /**
   * @facade
   *
   * anida las promesas en forma serial,
   * se ejecuta secuencialmente en el
   * orden del array
   * ____
   * @param fns  array con las funciones a
   * ejecutar y que entregan una promesa
   *
   * @param options (optional) opciones o parámetros para
   * cada función de promesa
   * ____
   * @returns un array con cada resultado de
   * cada promesa
   * ____
   */
  public async runPromisesSequentially(
    fns: ((value: any) => Promise<any>)[],
    options?: any,
  ): Promise<any> {
    if (!Array.isArray(fns)) {
      throw new Error("No Array Promise"); //---falta definir ERROR--
    }
    return await this._runPromisesSequentially(fns, options);
  }
  /**
   * @real
   *
   * anida las promesas en forma serial,
   * se ejecuta secuencialmente en el
   * orden del array
   * ____
   * @param fns  array con las funciones a
   * ejecutar y que entregan una promesa
   *
   * @param options (optional) opciones o parámetros para
   * cada función de promesa
   *
   * @param rValues un array con los resultados
   * de cada Promesa anidada una vez resuelta
   * ____
   * @returns un array con cada resultado de
   * cada promesa
   * ____
   */
  private async _runPromisesSequentially(
    fns: ((value: any) => Promise<any>)[],
    options?: any,
    rValues: any[] = [],
  ): Promise<any> {
    if (fns.length > 0) {
      const currentFn: (param?: any) => Promise<any> = fns[0].bind(this);
      rValues.push(await currentFn(options));
      await this._runPromisesSequentially(fns.slice(1), options, rValues);
    }
    return rValues;
  }
  /**
   * Verifica si un valor (`anyValue`) coincide con al menos uno de los tipos especificados en `types`.
   * Este método es altamente flexible y permite la validación de tipos básicos, objetos, arrays, tuplas y tipos anidados.
   *
   * @param anyValue El valor que se desea validar.
   * @param types Un array de tipos o esquemas de tipos que `anyValue` debe cumplir.
   *              Puede contener tipos básicos como:
   *              `"string"`,
   *              `"number"`,
   *              `"boolean"`,
   *              `"undefined"`,
   *              `"null"`,
   *              `"function"`,
   *              `"object"`,
   *              `"array"`,
   *              `"tuple"`
   *
   *              *Estructuras complejas*
   *              como objetos y arrays anidados que definen esquemas de validación.
   *              - Si `types` es un array vacío (`[]`), se asume que cualquier valor es válido.
   *              - Si `types` en uno o varios de sus items contiene objetos, se valida que `anyValue` sea un objeto y que sus propiedades cumplan con los tipos especificados.
   *                ❕ **Comportamiento implícito:** Si ese item es un objeto vacío `{}` (sin propiedades definidas), actúa como un comodín abierto que acepta **cualquier objeto** (ya sea vacío o con propiedades). Si el objeto en el esquema tiene propiedades (ej. `{ a: "string" }`), el objeto evaluado **no puede estar vacío** y debe cumplir con la estructura.
   *              - Si `types` en uno de sus items contiene un array, se valida que `anyValue` sea un array.
   *                ❕ **Comportamiento implícito:** Si ese item es un array vacío `[]`, actúa como un comodín abierto que acepta **cualquier array** (vacío o con elementos de cualquier tipo). Si el array en el esquema contiene definiciones (ej. `["string"]`), los elementos evaluados deben cumplir estrictamente con dichos tipos.
   *              - Si `types` contiene `"tuple"`, se valida que `anyValue` sea una tupla con el tamaño especificado en `option.tupleSize`.
   *              - Si `types` en varios de sus items contiene arrays, implícitamente asume que validará una tupla. ❕Tiene en cuenta el orden en que estén esos items de tipo array, porque ese será el mismo orden en que verifique la tupla❕
   *
   *              ❗ Ejemplos detallados❗
   *              ````
   *              types = ["null", "string"]; // se consulta si el valor es null o string
   *              types = [["null", "string"]]; // se consulta si el valor es un array de nulls o strings
   *              types = [[]]; // se consulta si el valor es un array de cualquier tipo (vacío o poblado)
   *              types = ["null", {}]; // se consulta si el valor es null o cualquier objeto (vacío o poblado)
   *              types = [{a:["string"]}]; // se consulta si el valor es un objeto con al menos la propiedad "a" que sea de tipo string (el objeto evaluado no puede estar vacío)
   *              types = [{a: [["string"]]}]; // se consulta si el valor es un objeto con al menos la propiedad "a" que sea de tipo array de string
   *              ````
   *
   * @param option - Opciones adicionales para la validación:
   *                 - `allowStringEmpty = false`: Permite que un string vacío ( `""` ) sea considerado válido.
   *                 - `tupleSize = undefined`: Define el tamaño esperado de una tupla. Puede ser un número (tamaño fijo) o un array de dos números `[min, max]` (tamaño variable), ❗este argumento es indispensable en caso que en algún nivel del esquema de `types` se verifique el tipo `"tuple"` (así explícitamente en texto), por el contrario si la verificación de la tupla se hace implícitamente (con varios items array), este argumento es opcional, pero si se asigna tendrá prioridad de verificación❗.
   *
   * @returns {boolean} - `true` si `anyValue` coincide con al menos uno de los tipos especificados en `types`, de lo contrario `false`.
   *
   * @example
   *
   * ````typescript
   * const util = UtilNative.getInstance();
   * let v: any;
   * let r: boolean;
   *
   * // Casos de control:
   *
   * v = null;
   * r = util.isValueType(v, ["undefined"]);
   * console.log(r); // Salida: false, no es undefined
   *
   * v = 2;
   * r = util.isValueType(v, ["null"]);
   * console.log(r); // Salida: false, no es null
   *
   * v = () => console.log("lo que sea");
   * r = util.isValueType(v, ["function"]);
   * console.log(r); // Salida: true
   *
   * // Primitivos básicos
   *
   * v = false;
   * r = util.isValueType(v, ["boolean"]);
   * console.log(r); // Salida: true
   *
   * v = 15;
   * r = util.isValueType(v, ["number"]);
   * console.log(r); // Salida: true
   *
   * v = 10;
   * r = util.isValueType(v, ["boolean", "number"]);
   * console.log(r); // Salida: true, es al menos número
   *
   * v = "10";
   * r = util.isValueType(v, ["number"]);
   * console.log(r); // Salida: false, es un string
   *
   * v = "10";
   * r = util.isValueType(v, ["number", "string"]);
   * console.log(r); // Salida: true, es al menos string
   *
   * v = "lo que sea";
   * r = util.isValueType(v, ["null", "string"]);
   * console.log(r); // Salida: true
   *
   * v = "";
   * r = util.isValueType(v, ["string"]);
   * console.log(r); // Salida: false, no se permiten strings vacíos por defecto ❗Comportamiento predefinido❗
   *
   * v = "";
   * r = util.isValueType(v, ["string"], { allowStringEmpty: true });
   * console.log(r); // Salida: true, se permiten strings vacíos explícitamente
   *
   * v = "";
   * r = util.isValueType(v, ["undefined", "null", "string"]);
   * console.log(r); // Salida: false, No se permiten strings vacíos
   *
   * v = null;
   * r = util.isValueType(v, ["undefined", "null", "string"]);
   * console.log(r); // Salida: true, al menos es nulo
   *
   * // Agrupaciones (Objetos y Arrays)
   *
   * v = {};
   * r = util.isValueType(v, ["undefined", "null", "object"]); //⚠️ Usar mejor `{}` en vez de "object"
   * console.log(r); // Salida: false, el tipo genérico "object" no acepta objetos vacíos
   *
   * v = {a:1};
   * r = util.isValueType(v, ["undefined", "null", "object"]); //⚠️ Usar mejor `{}` en vez de "object"
   * console.log(r); // Salida: true
   *
   * v = {};
   * r = util.isValueType(v, ["undefined", "null", {}]);
   * console.log(r); // Salida: true, ❗un esquema `{}` vacío actúa como comodín implícito y acepta cualquier objeto (vacío o con propiedades)❗
   *
   * v = {};
   * r = util.isValueType(v, ["undefined", "null", { a: ["string", "number"] }]);
   * console.log(r); // Salida: false, el objeto evaluado está vacío pero el esquema exige propiedades
   *
   * v = { a: 1 };
   * r = util.isValueType(v, ["undefined", "null", { a: ["string", "number"] }]);
   * console.log(r); // Salida: true, la propiedad `a` es al menos un número
   *
   * v = { a: { aa: 1 } };
   * r = util.isValueType(v, ["undefined", "null", { a: ["string", {}] }]); //`a` pude ser o string o un objeto
   * console.log(r); // Salida: true, la propiedad `a` es un objeto que cumple con el comodín `{}` interno
   *
   * v = { a: 1, b: "lo que sea" };
   * r = util.isValueType(v, ["undefined", "null", { a: ["string", "number"] }]);
   * console.log(r); // Salida: true, la propiedad `a` cumple y `b` es ignorada en la validación
   *
   * v = "hola";
   * r = util.isValueType(v, ["string", { a: ["boolean", "number"] }]);
   * console.log(r); // Salida: true, es al menos un texto
   *
   * v = { a: { aa: 1, ab: "hola" } };
   * r = util.isValueType(v, ["boolean", { a: [{ aa: ["string", "number"] }, "number"] }]);
   * console.log(r); // Salida: true, la propiedad `aa` cumple con el número y `ab` es ignorada
   *
   * v = [];
   * r = util.isValueType(v, ["undefined", "null", "array"]); //⚠️ Usar mejor `[]` en vez de "array"
   * console.log(r); // Salida: false, el tipo genérico "array" no acepta arrays vacíos
   *
   * v = [1,2,3];
   * r = util.isValueType(v, ["undefined", "null", "array"]); //⚠️ Usar mejor `[]` en vez de "array"
   * console.log(r); // Salida: true
   *
   * v = [];
   * r = util.isValueType(v, ["undefined", "null", []]);
   * console.log(r); // Salida: true, ❗un esquema `[]` vacío actúa como comodín implícito y acepta cualquier array (vacío o poblado)❗
   *
   * v = [1, 2, 3];
   * r = util.isValueType(v, ["undefined", "null", []]);
   * console.log(r); // Salida: true, acepta el array poblado gracias al comodín `[]`
   *
   * v = [1, 2, 3];
   * r = util.isValueType(v, ["null", ["boolean", "string"]]);
   * console.log(r); // Salida: false, los elementos del array son solo números y el esquema exige booleano o string
   *
   * v = [1, "hola", 3];
   * r = util.isValueType(v, ["null", ["boolean", "string"]]);
   * console.log(r); // Salida: false, todos los elementos deben cumplir con los tipos especificados en el array del esquema
   *
   * v = [1, ["a", "b", "c"], { a: "hola" }];
   * r = util.isValueType(v, [["number", ["string"], { a: ["string"] }]]);
   * console.log(r); // Salida: true, cumple con los elementos permitidos en la estructura del array
   *
   * v = ["clave", "valor"]; // Tupla
   * r = util.isValueType(v, ["null", "tuple"], { tupleSize: 2 }); // ❗si se verifica explícitamente "tuple", es obligatorio asignar el tamaño de la tupla❗
   * console.log(r); // Salida: true, al menos es una tupla de 2 elementos
   *
   * v = ["clave", "valor"]; // Tupla
   * r = util.isValueType(v, ["null", ["string", "number"], ["string"]]); // ❗si en el mismo nivel del esquema se detectan 2 o más arrays, se asume validación de tupla implícita❗
   * console.log(r); // Salida: true, es una tupla de 2 elementos válida
   *
   * v = ["clave", "valor"]; // Tupla
   * r = util.isValueType(v, ["null", ["string", "number"], ["string"]], { tupleSize: 3 }); // ❗Prioridad de tamaño❗
   * console.log(r); // Salida: false, la tupla a verificar debe tener 3 elementos según la opción
   * ````
   */
  public isValueType(
    anyValue: any,
    types: TAExtValueType,
    option?: IValueTypeOption,
  ): boolean {
    if (!this.isArray(types, true))
      throw new Error(`${types} is not array types valid`);

    // Constructor de opciones (ya sin las banderas de vacíos)
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >;
    op = {
      ...op,
      allowStringEmpty: this.isBoolean(op.allowStringEmpty)
        ? op.allowStringEmpty
        : false, //NO se permiten string vacíos
      tupleSize:
        this.isNumber(op.tupleSize) || this.isTuple(op.tupleSize, 2)
          ? op.tupleSize
          : (undefined as any),
    };
    const { tupleSize } = op;

    // Si no hay tipos se asume que se permite cualquier valor
    if (types.length === 0) return true;
    let r = false;
    for (const type of types) {
      if (r) break; // Se encontró al menos una validación exitosa

      const isTypeObject = this.isObject(type, true);
      const isTypeArray = this.isArray(type, true);

      if (this.isFunction(type)) {
        //value personalizado con callback
        const result = (type as Function)(anyValue);
        if (!this.isBoolean(result))
          throw new Error(
            `${type} is not custom callback validator valid (must return boolean)`,
          );
        r = result;
      } else if (type === "undefined") {
        r = this.isUndefined(anyValue);
      } else if (type === "null") {
        r = this.isNull(anyValue);
      } else if (type === "function") {
        r = this.isFunction(anyValue);
      } else if (type === "boolean") {
        r = this.isBoolean(anyValue);
      } else if (type === "number") {
        r = this.isNumber(anyValue);
      } else if (type === "bigint") {
        r = this.isBigint(anyValue);
      } else if (type === "string") {
        r = this.isString(anyValue, op.allowStringEmpty);
      } else if (type === "object" || isTypeObject) {
        // Comportamiento implícito: Un objeto '{}' vacío en types permite CUALQUIER objeto (vacío o no).
        // Si tiene propiedades (ej. { id: "number" }), exige que el objeto evaluado no esté vacío.
        const isTypeObjectEmpty =
          isTypeObject && Object.keys(type).length === 0;

        r = this.isObject(anyValue, isTypeObjectEmpty);

        if (r && !isTypeObjectEmpty && isTypeObject) {
          // Casos profundos con esquema estructurado
          const entTypes = Object.entries(type);
          if (entTypes.length > 0) {
            r = entTypes.reduce((accV, currV) => {
              if (accV === false) return false; // Si algún type no se cumplió, corta
              const [key, typesForObjProp] = currV;
              const subAnyValue = anyValue[key];
              const subResult = this.isValueType(
                subAnyValue,
                typesForObjProp as any,
                op,
              );
              return subResult;
            }, true);
          }
        }
      } else if (type === "array" || isTypeArray) {
        // Comportamiento implícito: Un arreglo '[]' vacío en types permite CUALQUIER arreglo (vacío o no).
        const isTypeArrayEmpty =
          isTypeArray && (type as any as any[]).length === 0;

        r = this.isArray(anyValue, isTypeArrayEmpty);

        if (
          r &&
          !isTypeArrayEmpty &&
          isTypeArray &&
          (type as any as any[]).length > 0
        ) {
          if ((anyValue as any[]).length > 0) {
            // Verificar si dentro de type existe más de un elemento array (posible tupla)
            let aIdxSubArrayType: number[] = [];
            for (let idx = 0; idx < (types as any[]).length; idx++) {
              if (this.isArray(types[idx], true)) aIdxSubArrayType.push(idx);
            }
            const maxLimitArray = 1;
            if (aIdxSubArrayType.length <= maxLimitArray && !tupleSize) {
              r = (anyValue as any[]).reduce((accV, currV, idx) => {
                if (accV === false) return accV;
                const subAnyValue = anyValue[idx];
                const subResult = this.isValueType(
                  subAnyValue,
                  type as any as any[],
                  op,
                );
                return subResult;
              }, true);
            } else {
              // Verificador de tupla especial
              const logicTupleSize =
                this.isNumber(op.tupleSize) || this.isTuple(op.tupleSize, 2)
                  ? op.tupleSize
                  : aIdxSubArrayType.length;
              r = this.isTuple(anyValue, logicTupleSize);
              if (r) {
                r = aIdxSubArrayType.reduce((accV, idxSAT, idx) => {
                  if (accV === false) return accV;
                  const subAnyValue = anyValue[idx];
                  const subTType = types[idxSAT] as any[];
                  const subResult = this.isValueType(subAnyValue, subTType, op);
                  return subResult;
                }, r as boolean);
              }
            }
          } else {
            r = false;
          }
        }
      } else if (type === "tuple") {
        if (
          !(
            this.isNumber(tupleSize) ||
            (this.isTuple(tupleSize, 2) &&
              (tupleSize as any[]).every((tValue) => this.isNumber(tValue)))
          )
        )
          throw new Error(`${tupleSize} is not tuple size valid`);
        r = this.isTuple(anyValue, tupleSize);
      } else {
        throw new Error(`${type} is not selector type valid`);
      }
    }
    return r;
  }
  /**
   * Permite comparar dos valores para determinar si son equivalentes.
   *
   * ⚠ funciona en base a equivalencia (no igualdad),
   * porque los objetos no se igualan `{} === {}` ya que eso
   * compara referencia no contenido.
   *
   * **⚠⚠ Importante los pesos de los tipos ⚠⚠**
   *
   * Lista de pesos (de menor a mayor peso):
   *
   * - `undefined`
   * - `null`
   * - `boolean`
   * - `number`
   * - `string-number` cuando esta activada `isCompareStringToNumber`
   * - `bigint`
   * - `string`
   * - `object`
   * - `array`
   * - `function`
   *
   * los pesos son estrictos y tienen en cuenta el tipo. Ejemplo:
   *  - `A` es mas pesado que `a` //cuando es case sensitive
   *  - `0` es mas pesado que `true`.
   *  - `true` es mas pesado que `false`.
   *  - `false` es mas pesado que null
   *  - `null` es mas pesado que `undefined`
   *
   * @param {[any, any]} compareValues Tupla con los valores a comparar.
   * @param {object} option Configuración para realizar la comparación:
   *   - `keyOrKeysPath`: (solo para objetos o array de objetos) claves identificadoras de las propiedades que se usarán para comparar.
   *   - `isCompareLength`: (solo arrays) determina si se compara el tamaño de los arrays.
   *   - `isCompareSize`: (solo para objetos) determina si se comparan la cantidad de objetos.
   *   - `isCompareStringToNumber`: (solo para string posiblemente numérico) determina que en la comparación los string numéricos sean comparados como si fueran números (`2` sería equivalente a `"2"`).
   *   - `isCaseSensitiveForString`: (solo para string) si la comparación es sensitiva a mayúsculas y minúsculas.
   *   - `isStringLocaleMode`: (solo para string) si se usan métodos de comparación asumiendo la configuración regional del sistema.
   * @returns {boolean} Retorna `true` si los valores son equivalentes según los criterios definidos, `false` de lo contrario.
   *
   * @example
   * ````typescript
   * let a;
   * let b;
   * let r;
   *
   * //comparación básica de primitivos (mismo tipo (1))
   * a = 1;
   * b = 1;
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: true
   *
   * //comparación básica de primitivos (mismo tipo (2))
   * a = -1;
   * b = 1;
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false
   *
   * //comparación básica de primitivos (mismo tipo (3))
   * a = ()=>"hola";
   * b = (p)=>p;
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false (son diferentes funciones)
   *
   * //comparación básica de primitivos (diferente tipo (1))
   * a = undefined;
   * b = null;
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false
   *
   * //comparación básica de primitivos (diferente tipo (2))
   * a = "1";
   * b = 1;
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false ("1" es string y es diferente a number)
   *
   * //comparación básica de primitivos
   * //(diferente tipo, con `isCompareStringToNumber` (3))
   * a = "1";
   * b = 1;
   * r = isEquivalentTo([a, b], {
   *   isCompareStringToNumber: true
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de objetos
   * a = {a: "hola", b:31};
   * b = {a: "hola", b:15};
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false (la propiedad `b` es diferente)
   *
   * //comparación básica de objetos (con keysOrKeysPath)
   * a = {a: "hola", b:31};
   * b = {a: "hola", b:15};
   * r = isEquivalentTo([a, b], {
   *   keyOrKeysPath: "a" //comparar por esta propiedad
   * }); //sin configuración
   * console.log(r); // Salida: true (la propiedad `b` es diferente,
   * //pero se esta comparando solo por la propiedad `a`)
   *
   * //comparación de objetos (con keysOrKeysPath y profundidad)
   * a = {a: "hola", b:{c: 31, d: 15}};
   * b = {a: "hola", b:{c: 0, d: 15}};
   * r = isEquivalentTo([a, b], {
   *   keyOrKeysPath: ["a", "b.d"] //comparar por estas propiedades (recordar "b.d" es la ruta a la propiedad profunda)
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, true];
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false (el ultimo elemento es diferente)
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, false];
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: true
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, false, 2];
   * b = ["a", 1, false];
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: true (porque no se esta comprando tamaños y
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde están)
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, 2, false,];
   * b = ["a", 1, false];
   * r = isEquivalentTo([a, b], {}); //sin configuración
   * console.log(r); // Salida: false (porque no se esta comprando tamaños pero
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde están (`2` es diferente a `false`))
   *
   * //comparación básica de arrays (si tamaños)
   * a = ["a", 1, false, 2];
   * b = ["a", 1, false];
   * r = isEquivalentTo([a, b], {
   *   isCompareLength: true
   * }); //sin configuración
   * console.log(r); // Salida: false (los tamaños son diferentes,
   * //las demás comparaciones internas se ignoran)
   *
   * ````
   */
  public isEquivalentTo(
    compareValues: [any, any],
    option?: Omit<IOptionEqGtLt, "isAllowEquivalent" | "isMatrixCompared">,
  ): boolean {
    if (!this.isTuple(compareValues, [0, 2])) {
      //verificar si al menos se intentó un array
      if (this.isArray(compareValues, true)) {
        //si es vacio es como comparar `undefined === undefined`
        if ((compareValues as any[]).length === 0) return true;
        //si solo tiene un elemento es como si comparara a `any === undefined`
        if ((compareValues as any[]).length === 1) return false;
      }
      throw new Error(`${option} is not tuple of compare values valid`);
    }
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      isCompareLength: this.isBoolean(op.isCompareLength)
        ? op.isCompareLength
        : false,
      isStrictArrayOrder: this.isBoolean(op.isStrictArrayOrder)
        ? op.isStrictArrayOrder
        : true,
      isCompareSize: this.isBoolean(op.isCompareSize)
        ? op.isCompareSize
        : false,
      keyOrKeysPath: this.castArrayByConditionType(
        op.keyOrKeysPath,
        "string",
        [],
      ),
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      isCompareStringToNumber: this.isBoolean(op.isCompareStringToNumber)
        ? op.isCompareStringToNumber
        : false,
      isCaseSensitiveForString: this.isBoolean(op.isCaseSensitiveForString)
        ? op.isCaseSensitiveForString
        : true,
    };
    let {
      isCompareLength,
      isStrictArrayOrder,
      isCompareSize,
      keyOrKeysPath,
      charSeparator,
      isCompareStringToNumber,
      isCaseSensitiveForString,
    } = op;
    //Inicio de proceso
    const [valueBase, valueToCompare] = compareValues;
    let isEquivalent = true; //obligatorio iniciar con true
    //eliminar claves identificadoras repetidas
    let keysPath = keyOrKeysPath as string[];
    keysPath = [...new Set(keysPath as string[])];
    //comparar function
    if (this.isFunction(valueBase) && this.isFunction(valueToCompare)) {
      const regExpCompress = /(\r\n|\n|\r| |;)/gm; //quitar caracteres
      const str_fnItemBase = (valueBase as Function)
        .toString()
        .replace(regExpCompress, "");
      const str_fnItem = (valueToCompare as Function)
        .toString()
        .replace(regExpCompress, "");
      isEquivalent = str_fnItemBase === str_fnItem;
    }
    //comparar array
    else if (
      this.isArray(valueBase, true) &&
      this.isArray(valueToCompare, true)
    ) {
      const lenItemBase = (valueBase as any[]).length;
      const lenItemToCompare = (valueToCompare as any[]).length;
      const isEmpty = lenItemBase === 0 && lenItemToCompare === 0;
      //comparar tamaños
      if ((isCompareLength && lenItemBase !== lenItemToCompare) || isEmpty) {
        isEquivalent = isEmpty;
      } else {
        //el len a usar como base de recorrido
        let lenItemRun =
          lenItemBase <= lenItemToCompare ? lenItemBase : lenItemToCompare;
        //comprobar elemento por elemento
        for (let sIdx = 0; sIdx < lenItemRun; sIdx++) {
          if (isStrictArrayOrder) {
            //comprobación ordenada (menos costosa)
            const itemVB = valueBase[sIdx];
            const itemVC = valueToCompare[sIdx];
            isEquivalent = this.isEquivalentTo([itemVB, itemVC], {
              ...op,
              keyOrKeysPath: keysPath,
            });
          } else {
            //comprobación desordenada (muy muy costosa)
            const itemVB = valueBase[sIdx];
            isEquivalent = (valueToCompare as any[]).some((itemVC) => {
              return this.isEquivalentTo([itemVB, itemVC], {
                ...op,
                keyOrKeysPath: keysPath,
              });
            });
          }
          if (isEquivalent === false) break;
        }
      }
    }
    //comparar objeto
    else if (
      this.isObject(valueBase, true) &&
      this.isObject(valueToCompare, true)
    ) {
      let keysVB = Object.keys(valueBase);
      let keysVC = Object.keys(valueToCompare);
      if (keysPath.length > 0) {
        const lenVB = keysVB.length;
        const lenVC = keysVC.length;
        if (lenVB === 0 && lenVC === 0) {
          isEquivalent = true;
        } else {
          for (const itemKeyPath of keysPath) {
            const keysSplitPath = itemKeyPath.split(charSeparator);
            const key = keysSplitPath[0];
            keysSplitPath.shift();
            const subKeyOrKeysPath =
              keysSplitPath.length > 0
                ? [keysSplitPath.join(charSeparator)]
                : [];
            const sValueBase = valueBase[key];
            const sValueToCompare = valueToCompare[key];
            isEquivalent = this.isEquivalentTo([sValueBase, sValueToCompare], {
              ...op,
              keyOrKeysPath: subKeyOrKeysPath,
            });
            if (isEquivalent === false) break;
          }
        }
      } else {
        keysVB = keysVB.sort();
        keysVC = keysVC.sort();
        const lenVB = keysVB.length;
        const lenVC = keysVC.length;
        const isEmpty = lenVB === 0 && lenVC === 0;
        if ((isCompareSize && lenVB != lenVC) || isEmpty) {
          isEquivalent = isEmpty;
        } else {
          //las claves identificadoras a recorrer
          let keysRun = lenVB <= lenVC ? keysVB : keysVC;
          //comprobar subobjeto por subobjeto
          for (const keyR of keysRun) {
            const sValueBase = valueBase[keyR];
            const sValueToCompare = valueToCompare[keyR];
            isEquivalent = this.isEquivalentTo([sValueBase, sValueToCompare], {
              ...op,
            });
            if (isEquivalent === false) break;
          }
        }
      }
    }
    //comparar strings
    else if (this.isString(valueBase) && this.isString(valueToCompare)) {
      let strVB = valueBase;
      let strVC = valueToCompare;
      if (!isCaseSensitiveForString) {
        strVB = (valueBase as string).toLocaleLowerCase();
        strVC = (valueToCompare as string).toLocaleLowerCase();
      }
      isEquivalent = strVB === strVC;
    }
    //comparar isBigint
    else if (this.isBigint(valueBase) && this.isBigint(valueToCompare)) {
      isEquivalent = valueBase === valueToCompare;
    }
    //comparar number
    else if (this.isNumber(valueBase) && this.isNumber(valueToCompare)) {
      isEquivalent = valueBase === valueToCompare;
    }
    //comparar caso especial string a number
    else if (
      isCompareStringToNumber &&
      //cualquiera puede ser numeric string o ambos
      (this.isStringAsNumber(valueBase) || this.isNumber(valueBase)) &&
      (this.isStringAsNumber(valueToCompare) || this.isNumber(valueToCompare))
    ) {
      isEquivalent =
        this.stringToNumber(valueBase) === this.stringToNumber(valueToCompare);
    }
    //comparar primitivos
    else {
      isEquivalent = valueBase === valueToCompare;
    }
    return isEquivalent;
  }
  /**
   * Permite comparar dos valores para determinar si el primero es mayor que el segundo.
   *
   * ⚠ funciona en base a equivalencia (no igualdad),
   * porque los objetos no se comparan como `{} > {}` ya que eso
   * compara que una referencia sea mayor a la otra, mas no su contenido.
   *
   * **⚠⚠ Importante los pesos de los tipos ⚠⚠**
   *
   * Lista de pesos (de menor a mayor peso):
   *
   * - `undefined`
   * - `null`
   * - `boolean`
   * - `number`
   * - `string-number` cuando esta activada `isCompareStringToNumber`
   * - `bigint`
   * - `string`
   * - `object`
   * - `array`
   * - `function`
   *
   * los pesos son estrictos y tienen en cuenta el tipo. Ejemplo:
   *  - `A` es mas pesado que `a` //cuando es case sensitive
   *  - `0` es mas pesado que `true`.
   *  - `true` es mas pesado que `false`.
   *  - `false` es mas pesado que null
   *  - `null` es mas pesado que `undefined`
   *
   * @param {[any, any]} compareValues Tupla con los valores a comparar donde:
   * - `compareValues[0]` el supuesto valor mayor.
   * - `compareValues[1]` el supuesto valor menor.
   * @param {object} option Configuración para realizar la comparación:
   *   - `isAllowEquivalent` (**Obligatorio**) determina si se permite la equivalencia en la comparación
   *   - `keyOrKeysPath`: (solo para objetos o array de objetos) claves identificadoras de las propiedades que se usarán para comparar.
   *   - `isCompareLength`: (solo arrays) determina si se compara el tamaño de los arrays.
   *   - `isCompareSize`: (solo para objetos) determina si se comparan la cantidad de objetos.
   *   - `isCompareStringToNumber`: (solo para string posiblemente numérico) determina que en la comparación los string numéricos sean comparados como si fueran números (`2` sería equivalente a `"2"`).
   *   - `isCaseSensitiveForString`: (solo para string) si la comparación es sensitiva a mayúsculas y minúsculas.
   *   - `isStringLocaleMode`: (solo para string) si se usan métodos de comparación asumiendo la configuración regional del sistema.
   *   - `isMatrixCompared` : (solo arrays) comparación matricial
   * @returns {boolean} Retorna `true` si los valores son equivalentes según los criterios definidos, `false` de lo contrario.
   *
   * @example
   * ````typescript
   * let a;
   * let b;
   * let r;
   *
   * //comparación básica de primitivos (mismo tipo (1))
   * a = 1;
   * b = -1;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de primitivos
   * //(mismo tipo (2), sin permitir equivalencia)
   * a = 1;
   * b = 1;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: false (la equivalencia no esta permitida)
   *
   * //comparación básica de primitivos
   * //(mismo tipo (2), con permitir equivalencia)
   * a = 1;
   * b = 1;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: true
   * });
   * console.log(r); // Salida: true (la equivalencia si esta permitida)
   *
   * //comparación básica de primitivos (mismo tipo (3))
   * a = ()=>"hola";
   * b = (p)=>p;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true (internamente las
   * //funciones se comparan transformándolas en
   * //string y comparando sus tamaños, esta trasformación
   * //elimina caracteres no necesarios para la comparación
   * //(saltos de linea, tabulaciones y demás))
   *
   * //comparación básica de primitivos (mismo tipo (4))
   * a = "Edificio";
   * b = "Casa";
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true (`"E"` de `"Edificio"` pesa mas que `"C"` de casa)
   *
   * //comparación de primitivos (mismo tipo (5))
   * a = "Edificio";
   * b = "Edificacion";
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true
   * // (`"Edifici"` pesa mas que `"Edifica"`)
   *
   * //comparación de primitivos (mismo tipo (6), si sensitivo)
   * a = "juan";
   * b = "Juan";
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   *   isCaseSensitiveForString: true,
   * });
   * console.log(r); // Salida: false (`"j"` pesa menos que `"J"`)
   *
   * //comparación de primitivos (mismo tipo (7),si equivalencia y no sensitivo)
   * a = "juan";
   * b = "Juan";
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: true,
   *   isCaseSensitiveForString: false,
   * });
   * console.log(r); // Salida: true (`"j"` pesa menos que `"J"`
   * //pero al no se sensitivo, se asume que pesan igual)
   *
   * //comparación básica de primitivos (diferente tipo (1))
   * a = undefined;
   * b = null;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: false (por que undefined es menos pesado que null)
   *
   * //comparación básica de primitivos (diferente tipo (2))
   * a = "1";
   * b = 2;
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (`"1"` es string es mas pesado que `2` number)
   *
   * //comparación básica de primitivos
   * //(diferente tipo, con `isCompareStringToNumber` (3))
   * a = "1";
   * b = 2;
   * r = isGreaterTo([a, b], {
   *   isCompareStringToNumber: true
   * });
   * console.log(r); // Salida: false (`"1"` se comparará a`2` como si ambos fueran number)
   *
   * //comparación básica de objetos
   * a = {a: "hola", b:31};
   * b = {a: "hola", b:15};
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (la propiedad `b` es mayor en el primer objeto)
   *
   * //comparación básica de objetos (con keysOrKeysPath)
   * a = {a: "hola", b:31};
   * b = {a: "hola", b:15};
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   *   keyOrKeysPath: "a" //comparar por esta propiedad
   * });
   * console.log(r); // Salida: false (la propiedad `b` es mayor
   * //pero se esta comparando solo por la propiedad `a`)
   *
   * //comparación básica de objetos (con keysOrKeysPath y equivalencia permitida)
   * a = {a: "hola", b:15, c:1};
   * b = {a: "hola", b:15, c:6};
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: true,
   *   keyOrKeysPath: ["a", "b"] //comparar por estas propiedades
   * });
   * console.log(r); // Salida: true (las propiedades `a` y `b` que
   * //se están comparando son equivalentes)
   *
   * //comparación básica de objetos (con keysOrKeysPath y equivalencia permitida)
   * a = {a: "adios", b:15000, c: 1000};
   * b = {a: "hola", b:15, c: 6};
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: true,
   *   keyOrKeysPath: ["a", "b"] //comparar por estas propiedades ❗El orden es IMPORTANTE❗
   * });
   * console.log(r); // Salida: false (si bien la propiedad `b` es mayor en el primer objeto
   * //la primera comparación se hace en la propiedad `a` y la letra `"a"` es pesa menos que la letra `"h"`)
   *
   * //comparación de objetos (con keysOrKeysPath y profundidad)
   * a = {a: "Que Mas", b:{c: 31, d: 15}};
   * b = {a: "hola", b:{c: 0, d: 15}};
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   *   keyOrKeysPath: ["a", "b.d"] //comparar por estas propiedades (recordar "b.d" es la ruta a la propiedad profunda)
   *                               //❗el orden es IMPORTANTE❗
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, true];
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (el ultimo elemento `false`
   * //del primer array pesa menos que el ultimo elemento `true`
   * //del segundo array)
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, false];
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (no se permite la equivalencia)
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, true];
   * b = ["a", 1, false, 2];
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (porque no se esta comparando tamaños y
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde se encuentran)
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, null, false];
   * b = ["a", 1, false];
   * r = isGreaterTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (porque no se esta comprando tamaños pero
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde se encuentran (`null` pesa menos que `false`))
   *
   * //comparación básica de arrays (si tamaños)
   * a = ["a", 1, false, 2];
   * b = ["a", 1, false];
   * r = isGreaterTo([a, b], {,
   *   isAllowEquivalent: false,
   *   isCompareLength: true
   * }); //sin configuración
   * console.log(r); // Salida: true (el primer array es mas grande que el segundo,
   * //las demás comparaciones internas se ignoran)
   *
   * ````
   */
  public isGreaterTo(
    compareValues: [any, any],
    option?: IOptionEqGtLt,
  ): boolean {
    if (!this.isTuple(compareValues, [0, 2]))
      throw new Error(`${option} is not tuple of compare values valid`);
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      isAllowEquivalent: this.isBoolean(op.isAllowEquivalent)
        ? op.isAllowEquivalent
        : false,
      isCompareLength: this.isBoolean(op.isCompareLength)
        ? op.isCompareLength
        : false,
      isStrictArrayOrder: op.isStrictArrayOrder, //isEquivaletnTo se encarga de asignarla
      isMatrixCompared: this.isBoolean(op.isMatrixCompared)
        ? op.isMatrixCompared
        : false,
      isCompareSize: this.isBoolean(op.isCompareSize)
        ? op.isCompareSize
        : false,
      keyOrKeysPath: this.castArrayByConditionType(
        op.keyOrKeysPath,
        "string",
        [],
      ),
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      isCompareStringToNumber: this.isBoolean(op.isCompareStringToNumber)
        ? op.isCompareStringToNumber
        : false,
      isCaseSensitiveForString: this.isBoolean(op.isCaseSensitiveForString)
        ? op.isCaseSensitiveForString
        : true,
    };
    let {
      isAllowEquivalent,
      isCompareLength,
      isMatrixCompared,
      isCompareSize,
      keyOrKeysPath,
      charSeparator,
      isCompareStringToNumber,
      isCaseSensitiveForString,
    } = op;
    // casos especiales (evitan comprobaciones innecesarias)
    //si es vacio es como comparar `undefined > undefined` (no es mayor a si mismo, puede ser equivalente)
    if ((compareValues as any[]).length === 0) return isAllowEquivalent;
    //si solo tiene un elemento es como si comparara a `any > undefined` (si es mayor)
    if ((compareValues as any[]).length === 1)
      return (
        !this.isUndefined(compareValues[0]) || //solo si no es `undefined`
        (this.isUndefined(compareValues[0]) && isAllowEquivalent)
      );
    //Inicio de proceso
    const [valueBase, valueToCompare] = compareValues;
    let isGreater = true; //obligatorio iniciar con true
    //eliminar claves identificadoras repetidas
    let keysPath = keyOrKeysPath as string[];
    keysPath = [...new Set(keysPath as string[])];
    //comparar funciones
    if (this.isFunction(valueBase) && this.isFunction(valueToCompare)) {
      const regExpCompress = /(\r\n|\n|\r| |;)/gm; //quitar caracteres
      const str_fnItemBase = (valueBase as Function)
        .toString()
        .replace(regExpCompress, "");
      const str_fnItem = (valueToCompare as Function)
        .toString()
        .replace(regExpCompress, "");
      const modulus = str_fnItemBase.length - str_fnItem.length;
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar arrays
    else if (
      this.isArray(valueBase, true) &&
      this.isArray(valueToCompare, true)
    ) {
      const lenItemBase = (valueBase as any[]).length;
      const lenItemToCompare = (valueToCompare as any[]).length;
      //comparar tamaños
      if (
        (isCompareLength && lenItemBase <= lenItemToCompare) ||
        (lenItemBase === 0 && lenItemToCompare === 0)
      ) {
        isGreater = lenItemBase < lenItemToCompare ? false : isAllowEquivalent;
      } else {
        let lenItemRun =
          lenItemBase <= lenItemToCompare
            ? //se selecciona el len mas pequeño para recorrer
              lenItemBase
            : lenItemToCompare;
        let matrixResult = 0;
        //comparar todos los elementos
        for (let idx = 0; idx < lenItemRun; idx++) {
          if (!isMatrixCompared) {
            //comparación ordenada (menos costosa)
            const itemVB = valueBase[idx];
            const itemVC = valueToCompare[idx];
            const isEquivalent = this.isEquivalentTo([itemVB, itemVC], {
              ...op,
            });
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenItemRun - 1) continue; //solo continuará si equivalente y no el último
              isGreater = isAllowEquivalent;
              break;
            }
            isGreater = this.isGreaterTo([itemVB, itemVC], {
              ...op,
            });
            break;
          } else {
            //comparación matricial (muy muy costosa)
            const itemVB = valueBase[idx];
            matrixResult = (valueToCompare as any[]).reduce((accMR, itemVC) => {
              const isEq = this.isEquivalentTo([itemVB, itemVC], { ...op });
              const isGr = this.isGreaterTo([itemVB, itemVC], { ...op });
              const result = isEq ? 0 : isGr ? 1 : -1;
              accMR = accMR + result;
              return accMR;
            }, matrixResult);
            if (idx < lenItemRun - 1) continue;
            isGreater =
              matrixResult === 0
                ? isAllowEquivalent
                : matrixResult > 0
                  ? true
                  : false;
            break;
          }
        }
      }
    }
    //comparar objetos
    else if (
      this.isObject(valueBase, true) &&
      this.isObject(valueToCompare, true)
    ) {
      let keysVB = Object.keys(valueBase);
      let keysVC = Object.keys(valueToCompare);
      if (keysPath.length > 0) {
        const lenKP = keysPath.length;
        const lenVB = keysVB.length; //no necesitan ordenarse
        const lenVC = keysVC.length; //no necesitan ordenarse
        if (lenVB === 0 && lenVC === 0) {
          isGreater = isAllowEquivalent;
        } else {
          for (let idx = 0; idx < lenKP; idx++) {
            const itemKeyPath = keysPath[idx];
            const keysSplitPath = itemKeyPath.split(charSeparator);
            const key = keysSplitPath[0];
            keysSplitPath.shift();
            const subKeysPathToCompare =
              keysSplitPath.length > 0
                ? [keysSplitPath.join(charSeparator)]
                : [];
            const sValueBase = valueBase[key];
            const sValueToCompare = valueToCompare[key];
            //obligatoria para seguir al otro objeto (si son equivalentes)
            const isEquivalent = this.isEquivalentTo(
              [sValueBase, sValueToCompare],
              {
                ...op,
                keyOrKeysPath: subKeysPathToCompare,
              },
            );
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenKP - 1) continue; //solo continuará si equivalente y no el último
              isGreater = isAllowEquivalent;
              break;
            }
            //compare mayor
            isGreater = this.isGreaterTo([sValueBase, sValueToCompare], {
              ...op,
              keyOrKeysPath: subKeysPathToCompare,
            });
            break;
          }
        }
      } else {
        keysVB = keysVB.sort();
        keysVC = keysVC.sort();
        const lenVB = keysVB.length;
        const lenVC = keysVC.length;
        if ((isCompareSize && lenVB <= lenVC) || (lenVB === 0 && lenVC === 0)) {
          isGreater = keysVB.length < keysVC.length ? false : isAllowEquivalent;
        } else {
          //las claves identificadoras a recorrer
          let keysRun = lenVB <= lenVC ? keysVB : keysVC;
          const lenKR = keysRun.length;
          //comprobar subobjeto por subobjeto
          for (let idx = 0; idx < lenKR; idx++) {
            const keyR = keysRun[idx];
            const sValueBase = valueBase[keyR];
            const sValueToCompare = valueToCompare[keyR];
            //obligatoria para seguir al otro objeto (si son equivalentes)
            const isEquivalent = this.isEquivalentTo(
              [sValueBase, sValueToCompare],
              {
                ...op,
              },
            );
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenKR - 1) continue;
              isGreater = isAllowEquivalent;
              break;
            }
            isGreater = this.isGreaterTo([sValueBase, sValueToCompare], {
              ...op,
            });
            break;
          }
        }
      }
    }
    //comparar strings
    else if (this.isString(valueBase) && this.isString(valueToCompare)) {
      let strVB = valueBase;
      let strVC = valueToCompare;
      if (!isCaseSensitiveForString) {
        strVB = (valueBase as string).toLocaleLowerCase();
        strVC = (valueToCompare as string).toLocaleLowerCase();
      }
      const modulus = (strVB as string).localeCompare(strVC, undefined, {
        caseFirst: "lower",
      });
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar isBigint
    else if (this.isBigint(valueBase) && this.isBigint(valueToCompare)) {
      const modulus = (valueBase as bigint) - (valueToCompare as bigint);
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0n;
    }
    //comparar number
    else if (this.isNumber(valueBase) && this.isNumber(valueToCompare)) {
      const modulus = (valueBase as number) - (valueToCompare as number);
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial string a number
    else if (
      isCompareStringToNumber &&
      //cualquiera puede ser numeric string o ambos
      (this.isStringAsNumber(valueBase) || this.isNumber(valueBase)) &&
      (this.isStringAsNumber(valueToCompare) || this.isNumber(valueToCompare))
    ) {
      const modulus =
        this.stringToNumber(valueBase) - this.stringToNumber(valueToCompare);
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial boolean (true pesa mas que false)
    else if (this.isBoolean(valueBase) && this.isBoolean(valueToCompare)) {
      const modulus =
        (valueBase as any as number) - (valueToCompare as any as number); //que locura javascript 🤯
      isGreater = modulus > 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial null
    else if (this.isNull(valueBase) && this.isNull(valueToCompare)) {
      isGreater = isAllowEquivalent;
    }
    //comparar caso especial undefined
    else if (this.isUndefined(valueBase) && this.isUndefined(valueToCompare)) {
      isGreater = isAllowEquivalent;
    }
    //comparar primitivos
    else {
      if (this.isUndefined(valueBase)) {
        isGreater = false;
      } else if (this.isNull(valueBase)) {
        isGreater = this.isUndefined(valueToCompare);
      } else if (this.isBoolean(valueBase)) {
        isGreater =
          this.isUndefined(valueToCompare) || this.isNull(valueToCompare);
      } else if (this.isNumber(valueBase)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare);
      } else if (this.isBigint(valueBase)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare) ||
          this.isNumber(valueToCompare);
      } else if (this.isString(valueBase, true)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare) ||
          this.isNumber(valueToCompare) ||
          this.isBigint(valueToCompare);
      } else if (this.isObject(valueBase, true)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare) ||
          this.isNumber(valueToCompare) ||
          this.isBigint(valueToCompare) ||
          this.isString(valueToCompare, true);
      } else if (this.isArray(valueBase, true)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare) ||
          this.isNumber(valueToCompare) ||
          this.isBigint(valueToCompare) ||
          this.isString(valueToCompare, true) ||
          this.isObject(valueToCompare, true);
      } else if (this.isFunction(valueBase)) {
        isGreater =
          this.isUndefined(valueToCompare) ||
          this.isNull(valueToCompare) ||
          this.isBoolean(valueToCompare) ||
          this.isNumber(valueToCompare) ||
          this.isBigint(valueToCompare) ||
          this.isString(valueToCompare, true) ||
          this.isObject(valueToCompare, true) ||
          this.isArray(valueToCompare, true);
      } else {
        isGreater = true;
      }
    }
    return isGreater;
  }
  /**
   * Permite comparar dos valores para determinar si el primero es menor que el segundo.
   *
   * ⚠ funciona en base a equivalencia (no igualdad),
   * porque los objetos no se comparan como `{} < {}` ya que eso
   * compara que una referencia sea menor a la otra, mas no su contenido.
   *
   * **⚠⚠ Importante los pesos de los tipos ⚠⚠**
   *
   * Lista de pesos (de menor a mayor peso):
   *
   * - `undefined`
   * - `null`
   * - `boolean`
   * - `number`
   * - `string-number` cuando esta activada `isCompareStringToNumber`
   * - `string`
   * - `object`
   * - `array`
   * - `function`
   *
   * los pesos son estrictos y tienen en cuenta el tipo. Ejemplo:
   *  - `A` es mas pesado que `a` //cuando es case sensitive
   *  - `0` es mas pesado que `true`.
   *  - `true` es mas pesado que `false`.
   *  - `false` es mas pesado que null
   *  - `null` es mas pesado que `undefined`
   *
   * @param {[any, any]} compareValues Tupla con los valores a comparar donde:
   * - `compareValues[0]` el supuesto valor menor.
   * - `compareValues[1]` el supuesto valor mayor.
   * @param {object} option Configuración para realizar la comparación:
   *   - `isAllowEquivalent` (**Obligatorio**) determina si se permite la equivalencia en la comparación
   *   - `keyOrKeysPath`: (solo para objetos o array de objetos) claves identificadoras de las propiedades que se usarán para comparar.
   *   - `isCompareLength`: (solo arrays) determina si se compara el tamaño de los arrays.
   *   - `isCompareSize`: (solo para objetos) determina si se comparan la cantidad de objetos.
   *   - `isCompareStringToNumber`: (solo para string posiblemente numérico) determina que en la comparación los string numéricos sean comparados como si fueran números (`2` sería equivalente a `"2"`).
   *   - `isCaseSensitiveForString`: (solo para string) si la comparación es sensitiva a mayúsculas y minúsculas.
   *   - `isStringLocaleMode`: (solo para string) si se usan métodos de comparación asumiendo la configuración regional del sistema.
   *   - `isMatrixCompared` : (solo arrays) comparación matricial
   * @returns {boolean} Retorna `true` si los valores son equivalentes según los criterios definidos, `false` de lo contrario.
   *
   * @example
   * ````typescript
   * let a;
   * let b;
   * let r;
   *
   * //comparación básica de primitivos (mismo tipo (1))
   * a = -1;
   * b = 1;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de primitivos
   * //(mismo tipo (2), sin permitir equivalencia)
   * a = 1;
   * b = 1;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: false (la equivalencia no esta permitida)
   *
   * //comparación básica de primitivos
   * //(mismo tipo (2), con permitir equivalencia)
   * a = 1;
   * b = 1;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: true
   * });
   * console.log(r); // Salida: true (la equivalencia si esta permitida)
   *
   * //comparación básica de primitivos (mismo tipo (3))
   * a = ()=>"hola";
   * b = (p)=>p;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: false (internamente las
   * //funciones se comparan transformándolas en
   * //string y comparando sus tamaños, esta trasformación
   * //elimina caracteres no necesarios para la comparación
   * //(saltos de linea, tabulaciones y demás))
   *
   * //comparación básica de primitivos (mismo tipo (4))
   * a = "Casa";
   * b = "Edificio";
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true (`"C"` de casa` pesa menos que "E"` de `"Edificio"`)
   *
   * //comparación de primitivos (mismo tipo (5))
   * a = "Edificio";
   * b = "Edificacion";
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: false
   * // (`"Edifici"` pesa mas que `"Edifica"`)
   *
   * //comparación de primitivos (mismo tipo (6), si sensitivo)
   * a = "Juan";
   * b = "juan";
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   *   isCaseSensitiveForString: true,
   * });
   * console.log(r); // Salida: false (`"J"` pesa mas que `"j"`)
   *
   * //comparación de primitivos (mismo tipo (7),si equivalencia y no sensitivo)
   * a = "Juan";
   * b = "juan";
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: true,
   *   isCaseSensitiveForString: false,
   * });
   * console.log(r); // Salida: true (`"J"` pesa mas que `"j"`
   * //pero al no se sensitivo, se asume que pesan igual)
   *
   * //comparación básica de primitivos (diferente tipo (1))
   * a = undefined;
   * b = null;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false
   * });
   * console.log(r); // Salida: true (por que `undefined` es pesa menos que `null`)
   *
   * //comparación básica de primitivos (diferente tipo (2))
   * a = "1";
   * b = 2;
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (`"1"` es string es mas pesado que `2` number)
   *
   * //comparación básica de primitivos
   * //(diferente tipo, con `isCompareStringToNumber` (3))
   * a = "1";
   * b = 2;
   * r = isLesserTo([a, b], {
   *   isCompareStringToNumber: true
   * });
   * console.log(r); // Salida: true (`"1"` se comparará a`2` como si ambos fueran number)
   *
   * //comparación básica de objetos
   * a = {a: "hola", b:31};
   * b = {a: "hola", b:15};
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (la propiedad `b` es mayor en el primer objeto)
   *
   * //comparación básica de objetos (con keysOrKeysPath)
   * a = {a: "hola", b:15};
   * b = {a: "hola", b:31};
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   *   keyOrKeysPath: "a" //comparar por esta propiedad
   * });
   * console.log(r); // Salida: false (la propiedad `b` es menor
   * //pero se esta comparando solo por la propiedad `a`)
   *
   * //comparación básica de objetos (con keysOrKeysPath y equivalencia permitida)
   * a = {a: "hola", b:15, c:1};
   * b = {a: "hola", b:15, c:6};
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: true,
   *   keyOrKeysPath: ["a", "b"] //comparar por estas propiedades
   * });
   * console.log(r); // Salida: true (las propiedades `a` y `b` que
   * //se están comparando son equivalentes)
   *
   * //comparación básica de objetos (con keysOrKeysPath y equivalencia permitida)
   * a = {a: "adios", b:15000, c: 1000};
   * b = {a: "hola", b:15, c: 6};
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: true,
   *   keyOrKeysPath: ["a", "b"] //comparar por estas propiedades ❗El orden es IMPORTANTE❗
   * });
   * console.log(r); // Salida: true (si bien la propiedad `b` es mayor en el primer objeto
   * //la primera comparación se hace en la propiedad `a` y la letra `"a"` es pesa menos que la letra `"h"`)
   *
   * //comparación de objetos (con keysOrKeysPath y profundidad)
   * a = {a: "hola", b:{c: 31, d: 15}};
   * b = {a: "que Mas", b:{c: 0, d: 15}};
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   *   keyOrKeysPath: ["a", "b.d"] //comparar por estas propiedades (recordar "b.d" es la ruta a la propiedad profunda)
   *                               //❗el orden es IMPORTANTE❗
   * });
   * console.log(r); // Salida: true
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, true];
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (el ultimo elemento `false`
   * //del primer array pesa menos que el ultimo elemento `true`
   * //del segundo array)
   *
   * //comparación básica de arrays
   * a = ["a", 1, false];
   * b = ["a", 1, false];
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: false (no se permite la equivalencia)
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, true];
   * b = ["a", 1, false, 2];
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (porque no se esta comparando tamaños y
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde se encuentran)
   *
   * //comparación básica de arrays (no tamaños)
   * a = ["a", 1, null, false];
   * b = ["a", 1, false];
   * r = isLesserTo([a, b], {
   *   isAllowEquivalent: false,
   * });
   * console.log(r); // Salida: true (porque no se esta comprando tamaños pero
   * //se compararán los elementos del array mas pequeño con el mas grande
   * //en la misma posición donde se encuentran (`null` pesa menos que `false`))
   *
   * //comparación básica de arrays (si tamaños)
   * a = ["a", 1, false, 2];
   * b = ["a", 1, false];
   * r = isLesserTo([a, b], {,
   *   isAllowEquivalent: false,
   *   isCompareLength: true
   * }); //sin configuración
   * console.log(r); // Salida: false (el primer array es mas grande que el segundo,
   * //las demás comparaciones internas se ignoran)
   *
   * ````
   */
  public isLesserTo(
    compareValues: [any, any],
    option?: IOptionEqGtLt,
  ): boolean {
    if (!this.isTuple(compareValues, [0, 2]))
      throw new Error(`${option} is not tuple of compare values valid`);
    //constructor de opciones
    let op = (this.isObject(option, true) ? option : {}) as Required<
      NonNullable<typeof option>
    >; //default vacio
    op = {
      ...op, //opciones adicionales no documentadas (si las hay)
      isAllowEquivalent: this.isBoolean(op.isAllowEquivalent)
        ? op.isAllowEquivalent
        : false,
      isCompareLength: this.isBoolean(op.isCompareLength)
        ? op.isCompareLength
        : false,
      isStrictArrayOrder: op.isStrictArrayOrder, //isEquivaletnTo se encarga de asignarla
      isMatrixCompared: this.isBoolean(op.isMatrixCompared)
        ? op.isMatrixCompared
        : false,
      isCompareSize: this.isBoolean(op.isCompareSize)
        ? op.isCompareSize
        : false,
      keyOrKeysPath: this.castArrayByConditionType(
        op.keyOrKeysPath,
        "string",
        [],
      ),
      charSeparator: this.isString(op.charSeparator)
        ? op.charSeparator
        : this.charSeparatorLogicPath,
      isCompareStringToNumber: this.isBoolean(op.isCompareStringToNumber)
        ? op.isCompareStringToNumber
        : false,
      isCaseSensitiveForString: this.isBoolean(op.isCaseSensitiveForString)
        ? op.isCaseSensitiveForString
        : true,
    };
    let {
      isAllowEquivalent,
      isCompareLength,
      isMatrixCompared,
      isCompareSize,
      keyOrKeysPath,
      charSeparator,
      isCompareStringToNumber,
      isCaseSensitiveForString,
    } = op;
    // casos especiales (evitan comprobaciones innecesarias)
    //si es vacio es como comparar `undefined < undefined` (no es menor a si mismo, puede ser equivalente)
    if ((compareValues as any[]).length === 0) return op.isAllowEquivalent;
    //si solo tiene un elemento es como si comparara a `any < undefined`
    if ((compareValues as any[]).length === 1)
      return this.isUndefined(compareValues[0]) && op.isAllowEquivalent;
    //Inicio de proceso
    const [valueBase, valueToCompare] = compareValues;
    let isLesser = true; //obligatorio iniciar con true
    //eliminar claves identificadoras repetidas
    let keysPath = keyOrKeysPath as string[];
    keysPath = [...new Set(keysPath as string[])];
    //comparar funciones
    if (this.isFunction(valueBase) && this.isFunction(valueToCompare)) {
      const regExpCompress = /(\r\n|\n|\r| |;)/gm; //quitar caracteres
      const str_fnItemBase = (valueBase as Function)
        .toString()
        .replace(regExpCompress, "");
      const str_fnItem = (valueToCompare as Function)
        .toString()
        .replace(regExpCompress, "");
      const modulus = str_fnItemBase.length - str_fnItem.length;
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar arrays
    else if (
      this.isArray(valueBase, true) &&
      this.isArray(valueToCompare, true)
    ) {
      const lenItemBase = (valueBase as any[]).length;
      const lenItemToCompare = (valueToCompare as any[]).length;
      //comparar tamaños
      if (
        (isCompareLength && lenItemBase >= lenItemToCompare) ||
        (lenItemBase === 0 && lenItemToCompare === 0)
      ) {
        isLesser = lenItemBase > lenItemToCompare ? false : isAllowEquivalent;
      } else {
        let lenItemRun =
          lenItemBase <= lenItemToCompare
            ? //se selecciona el len mas pequeño para recorrer
              lenItemBase
            : lenItemToCompare;
        let matrixResult = 0;
        //comparar todos loes elementos
        for (let idx = 0; idx < lenItemRun; idx++) {
          if (!isMatrixCompared) {
            const itemVB = valueBase[idx];
            const itemVC = valueToCompare[idx];
            const isEquivalent = this.isEquivalentTo([itemVB, itemVC], {
              isCaseSensitiveForString,
              isCompareLength,
              isCompareSize,
              isCompareStringToNumber,
              keyOrKeysPath: keysPath,
            });
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenItemRun - 1) continue; //solo continuará si equivalente y no el ultimo
              isLesser = isAllowEquivalent;
              break;
            }
            isLesser = this.isLesserTo([itemVB, itemVC], {
              ...op,
            });
            break;
          } else {
            //comparación matricial (muy muy costosa)
            const itemVB = valueBase[idx];
            matrixResult = (valueToCompare as any[]).reduce((accMR, itemVC) => {
              const isEq = this.isEquivalentTo([itemVB, itemVC], { ...op });
              const isLe = this.isLesserTo([itemVB, itemVC], { ...op });
              const result = isEq ? 0 : isLe ? -1 : 1;
              accMR = accMR + result;
              return accMR;
            }, matrixResult);
            if (idx < lenItemRun - 1) continue;
            isLesser =
              matrixResult === 0
                ? isAllowEquivalent
                : matrixResult < 0
                  ? true
                  : false;
            break;
          }
        }
      }
    }
    //comparar objetos
    else if (
      this.isObject(valueBase, true) &&
      this.isObject(valueToCompare, true)
    ) {
      let keysVB = Object.keys(valueBase);
      let keysVC = Object.keys(valueToCompare);
      if (keysPath.length > 0) {
        const lenKP = keysPath.length;
        const lenVB = keysVB.length; //no necesitan ordenarse
        const lenVC = keysVC.length; //no necesitan ordenarse
        if (lenVB === 0 && lenVC === 0) {
          isLesser = isAllowEquivalent;
        } else {
          for (let idx = 0; idx < lenKP; idx++) {
            const itemKeyPath = keysPath[idx];
            const keysSplitPath = itemKeyPath.split(charSeparator);
            const key = keysSplitPath[0];
            keysSplitPath.shift();
            const subKeysPathToCompare =
              keysSplitPath.length > 0
                ? [keysSplitPath.join(charSeparator)]
                : [];
            const sValueBase = valueBase[key];
            const sValueToCompare = valueToCompare[key];
            //obligatoria para seguir al otro objeto (si son equivalentes)
            const isEquivalent = this.isEquivalentTo(
              [sValueBase, sValueToCompare],
              {
                isCaseSensitiveForString,
                isCompareLength,
                isCompareSize,
                isCompareStringToNumber,
                keyOrKeysPath: subKeysPathToCompare,
              },
            );
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenKP - 1) continue; //solo continuará si equivalente y no el ultimo
              isLesser = isAllowEquivalent;
              break;
            }
            //compare mayor
            isLesser = this.isLesserTo([sValueBase, sValueToCompare], {
              isAllowEquivalent,
              keyOrKeysPath: subKeysPathToCompare,
              isCompareLength,
              isCompareSize,
              isCompareStringToNumber,
              isCaseSensitiveForString,
            });
            break;
          }
        }
      } else {
        keysVB = keysVB.sort();
        keysVC = keysVC.sort();
        const lenVB = keysVB.length;
        const lenVC = keysVC.length;
        if ((isCompareSize && lenVB >= lenVC) || (lenVC === 0 && lenVC === 0)) {
          isLesser = keysVB.length > keysVC.length ? false : isAllowEquivalent;
        } else {
          //las claves identificadoras a recorrer
          let keysRun = lenVB <= lenVC ? keysVB : keysVC;
          const lenKR = keysRun.length;
          //comprobar subobjeto por subobjeto
          for (let idx = 0; idx < lenKR; idx++) {
            const keyR = keysRun[idx];
            const sValueBase = valueBase[keyR];
            const sValueToCompare = valueToCompare[keyR];
            //obligatoria para seguir al otro objeto (si son equivalentes)
            const isEquivalent = this.isEquivalentTo(
              [sValueBase, sValueToCompare],
              {
                isCaseSensitiveForString,
                isCompareLength,
                isCompareSize,
                isCompareStringToNumber,
                keyOrKeysPath,
              },
            );
            //tratamiento de equivalencias (para seguir al siguiente objeto)
            if (isEquivalent) {
              if (idx < lenKR - 1) continue;
              isLesser = isAllowEquivalent;
              break;
            }
            isLesser = this.isLesserTo([sValueBase, sValueToCompare], {
              isAllowEquivalent,
              keyOrKeysPath: undefined,
              isCompareLength,
              isCompareSize,
              isCaseSensitiveForString,
              isCompareStringToNumber,
            });
            break;
          }
        }
      }
    }
    //comparar strings
    else if (this.isString(valueBase) && this.isString(valueToCompare)) {
      let strVB = valueBase;
      let strVC = valueToCompare;
      if (!isCaseSensitiveForString) {
        strVB = (valueBase as string).toLocaleLowerCase();
        strVC = (valueToCompare as string).toLocaleLowerCase();
      }
      const modulus = (strVB as string).localeCompare(strVC, undefined, {
        caseFirst: "lower",
      });
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar isBigint
    else if (this.isBigint(valueBase) && this.isBigint(valueToCompare)) {
      const modulus = (valueBase as bigint) - (valueToCompare as bigint);
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0n;
    }
    //comparar number
    else if (this.isNumber(valueBase) && this.isNumber(valueToCompare)) {
      const modulus = (valueBase as number) - (valueToCompare as number);
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial string a number
    else if (
      isCompareStringToNumber &&
      //cualquiera puede ser numeric string o ambos
      (this.isStringAsNumber(valueBase) || this.isNumber(valueBase)) &&
      (this.isStringAsNumber(valueToCompare) || this.isNumber(valueToCompare))
    ) {
      const modulus =
        this.stringToNumber(valueBase) - this.stringToNumber(valueToCompare);
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial boolean (true pesa mas que false)
    else if (this.isBoolean(valueBase) && this.isBoolean(valueToCompare)) {
      const modulus =
        (valueBase as any as number) - (valueToCompare as any as number);
      isLesser = modulus < 0 ? true : isAllowEquivalent && modulus === 0;
    }
    //comparar caso especial null
    else if (this.isNull(valueBase) && this.isNull(valueToCompare)) {
      isLesser = isAllowEquivalent;
    }
    //comparar caso especial undefined
    else if (this.isUndefined(valueBase) && this.isUndefined(valueToCompare)) {
      isLesser = isAllowEquivalent;
    }
    //comparar primitivos
    else {
      if (this.isUndefined(valueBase)) {
        isLesser = true;
      } else if (this.isNull(valueBase)) {
        isLesser = !this.isUndefined(valueToCompare);
      } else if (this.isBoolean(valueBase)) {
        isLesser =
          !this.isUndefined(valueToCompare) && !this.isNull(valueToCompare);
      } else if (this.isNumber(valueBase)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare);
      } else if (this.isBigint(valueBase)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare) &&
          !this.isNumber(valueToCompare);
      } else if (this.isString(valueBase, true)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare) &&
          !this.isNumber(valueToCompare) &&
          !this.isBigint(valueToCompare);
      } else if (this.isObject(valueBase, true)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare) &&
          !this.isNumber(valueToCompare) &&
          !this.isBigint(valueToCompare) &&
          !this.isString(valueToCompare, true);
      } else if (this.isArray(valueBase, true)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare) &&
          !this.isNumber(valueToCompare) &&
          !this.isBigint(valueToCompare) &&
          !this.isString(valueToCompare, true) &&
          !this.isObject(valueToCompare, true);
      } else if (this.isFunction(valueBase)) {
        isLesser =
          !this.isUndefined(valueToCompare) &&
          !this.isNull(valueToCompare) &&
          !this.isBoolean(valueToCompare) &&
          !this.isNumber(valueToCompare) &&
          !this.isBigint(valueToCompare) &&
          !this.isString(valueToCompare, true) &&
          !this.isObject(valueToCompare, true) &&
          !this.isArray(valueToCompare, true);
      } else {
        isLesser = false;
      }
    }
    return isLesser;
  }
  /**
   * Permite comparar dos valores y determinar la relación entre ellos, devolviendo un número que indica si el primer valor es menor, igual o mayor que el segundo.
   *
   * Este método es una combinación de `isEquivalentTo`, `isGreaterTo` y `isLesserTo`, y devuelve un valor numérico que representa la relación entre los dos valores:
   * - `-1` si el primer valor es menor que el segundo.
   * - `0` si los valores son equivalentes.
   * - `1` si el primer valor es mayor que el segundo.
   *
   * ⚠ Funciona en base a equivalencia (no igualdad), porque los objetos no se comparan directamente (`{} === {}` compara referencias, no contenido).
   *
   * **⚠⚠ Importante los pesos de los tipos ⚠⚠**
   *
   * Lista de pesos (de menor a mayor peso):
   *
   * - `undefined`
   * - `null`
   * - `boolean`
   * - `number`
   * - `string-number` cuando está activada `isCompareStringToNumber`
   * - `bigint`
   * - `string`
   * - `object`
   * - `array`
   * - `function`
   *
   * Los pesos son estrictos y tienen en cuenta el tipo. Ejemplo:
   *  - `A` es más pesado que `a` (cuando es case sensitive).
   *  - `0` es más pesado que `true`.
   *  - `true` es más pesado que `false`.
   *  - `false` es más pesado que `null`.
   *  - `null` es más pesado que `undefined`.
   *
   * @param {[any, any]} compareValues Tupla con los valores a comparar donde:
   * - `compareValues[0]` es el primer valor a comparar.
   * - `compareValues[1]` es el segundo valor a comparar.
   * @param {object} option Configuración para realizar la comparación:
   *   - `keyOrKeysPath`: (solo para objetos o array de objetos) claves identificadoras de las propiedades que se usarán para comparar.
   *   - `isCompareLength`: (solo arrays) determina si se compara el tamaño de los arrays.
   *   - `isCompareSize`: (solo para objetos) determina si se comparan la cantidad de objetos.
   *   - `isCompareStringToNumber`: (solo para string posiblemente numérico) determina que en la comparación los string numéricos sean comparados como si fueran números (`2` sería equivalente a `"2"`).
   *   - `isCaseSensitiveForString`: (solo para string) si la comparación es sensitiva a mayúsculas y minúsculas.
   *   - `isStringLocaleMode`: (solo para string) si se usan métodos de comparación asumiendo la configuración regional del sistema.
   * @returns {number} Retorna:
   * - `-1` si el primer valor es menor que el segundo.
   * - `0` si los valores son equivalentes.
   * - `1` si el primer valor es mayor que el segundo.
   *
   * @example
   * ```typescript
   * let a;
   * let b;
   * let r;
   *
   * // Comparación básica de primitivos (mismo tipo)
   * a = 1;
   * b = 2;
   * r = anyCompareTo([a, b], {}); // Sin configuración
   * console.log(r); // Salida: -1 (1 es menor que 2)
   *
   * // Comparación básica de primitivos (mismo tipo, equivalentes)
   * a = 1;
   * b = 1;
   * r = anyCompareTo([a, b], {});
   * console.log(r); // Salida: 0 (1 es equivalente a 1)
   *
   * // Comparación básica de primitivos (diferente tipo)
   * a = "1";
   * b = 1;
   * r = anyCompareTo([a, b], { isCompareStringToNumber: true });
   * console.log(r); // Salida: 0 ("1" es equivalente a 1 cuando se compara como número)
   *
   * // Comparación de objetos (con keysOrKeysPath)
   * a = {a: "hola", b: 31};
   * b = {a: "hola", b: 15};
   * r = anyCompareTo([a, b], { keyOrKeysPath: "b" });
   * console.log(r); // Salida: 1 (31 es mayor que 15)
   *
   * // Comparación de arrays (con isCompareLength)
   * a = [1, 2, 3];
   * b = [1, 2];
   * r = anyCompareTo([a, b], { isCompareLength: true });
   * console.log(r); // Salida: 1 (el primer array es más largo que el segundo)
   * ```
   */
  public compareTo(
    compareValues: [any, any],
    option?: Omit<IOptionEqGtLt, "isAllowEquivalent">,
  ): number {
    option = this.isObject(option) ? option : {};
    const isEquivalent = this.isEquivalentTo(compareValues, { ...option });
    if (isEquivalent) return 0;
    const isGreater = this.isGreaterTo(compareValues, {
      ...(option as IOptionEqGtLt),
    });
    if (isGreater) return 1;
    const isLesser = this.isLesserTo(compareValues, {
      ...(option as IOptionEqGtLt),
    });
    if (isLesser) return -1;
    throw new Error(`Internal Error in anyCompareTo() method`);
  }
}
