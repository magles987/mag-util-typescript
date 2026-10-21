/**
 * @author MAG
 */

import {
  UtilNative,
  TUtilBaseConfig as TSuperUtilBaseConfig,
} from "./native-util";
import { TStrCase } from "./shared-types";
//████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████
/**esquema opcional para la configuración de la utilidad */
export type TExtensionBaseConfig = TSuperUtilBaseConfig;
/** @info <hr>
 *
 * *Singleton*
 * utilidades comunes para la lógica de aplicación
 * ____
 */
export class UtilExtension extends UtilNative {
  /**
   * Almacena la instancia única de esta clase
   * ____
   */
  private static UtilExtension_instance: UtilExtension;
  /**
   * @param baseConfig configuraciones personalizadas para la utilidad
   */
  protected constructor(baseConfig?: TExtensionBaseConfig) {
    super(baseConfig);
    if (this.isObject(baseConfig)) {
      //...aqui propiedades de configuración
    }
  }
  /**
   * devuelve la instancia única de esta clase
   * ya sea que la crea o la que ya a sido creada
   * @param dfValue es el valor que se va a asumir como valor
   * predefinido cuando haya ausencia de valor
   */
  public static getInstance(baseConfig?: TExtensionBaseConfig): UtilExtension {
    UtilExtension.UtilExtension_instance =
      UtilExtension.UtilExtension_instance === undefined ||
      UtilExtension.UtilExtension_instance === null
        ? new UtilExtension(baseConfig)
        : UtilExtension.UtilExtension_instance;
    return UtilExtension.UtilExtension_instance;
  }
  //████Booleanos████████████████████████████████████████████████████
  //...aqui personalización
  //████Numeros██████████████████████████████████████████████████████
  //...aqui personalización
  //████Textos█████████████████████████████████████████████████████
  //...personalización
  //████Objetos██████████████████████████████████████████████████████
  //...personalización
  //█████Arrays██████████████████████████████████████████████████████
  //...personalización
  //████Fechas███████████████████████████████████████████████████████
  //...personalización
  //████Genericos████████████████████████████████████████████████████
}
