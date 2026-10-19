# @magles/mag-util

🚀 Una potente recopilación de utilidades para TypeScript, modular, robusta y fuertemente tipada, diseñada para evitar dependencias innecesarias y proporcionar herramientas nativas de alto rendimiento.

## 📦 Instalación

```bash
npm install @magles/mag-util
```

## 🛠️ Arquitectura y Uso Principal

La librería está organizada en dos clases principales bajo el patrón **Singleton**:

1. **`UtilNative`**: Utilidades puras en TypeScript/JavaScript nativo sin dependencias externas.
2. **`UtilExtension`**: Hereda de `UtilNative` y añade integración con `lodash` (para clonaciones profundas de instancias de clases y transformaciones avanzadas).

---

### 1. UtilNative

Contiene utilidades para números, cadenas, objetos, arrays, tuplas, fechas y validación de tipos nulos.

```typescript
import { UtilNative } from '@magles/mag-util';

const util = UtilNative.getInstance();
```

#### 🔢 Métodos de Números (Actualizados)

Los métodos de validación y manipulación numérica cuentan con responsabilidades especializadas:

##### Validación Numérica Estricta
```typescript
// Validación de números finitos (no acepta strings ni BigInt)
util.isNumber(42);               // true
util.isNumber(3.1416);           // true
util.isNumber("42");             // false (usar isStringAsNumber)
util.isNumber(NaN);              // false
util.isNumber(Infinity);         // false

// Validación de BigInt
util.isBigint(9007199254740991n); // true
util.isBigint(42);                // false

// Enteros y decimales
util.isIntegerNumber(10);        // true
util.isIntegerNumber(10.5);      // false
util.isFloatNumber(10.5);        // true
util.isFloatNumber(10);          // false
```

##### Signos y Paridad
```typescript
// Comprobación de signo ("+" o "-")
util.isNumberSign(15, "+");              // true
util.isNumberSign(-8, "-");              // true
util.isNumberSign(0, "+");               // false (el 0 no tiene polaridad)
util.isNumberSign(0, "+", true);         // true (permite incluir el 0)

// Inversión de signo
util.toggleNumberSign(5);                // -5
util.toggleNumberSign(-10);              // 10

// Pares e impares (admite redondeo para decimales)
util.isEvenNumber(4);                    // true
util.isOddNumber(7);                     // true
util.isOddNumber(4.8);                   // false (un decimal no es par ni impar)
util.isOddNumber(4.8, "round");          // true (redondeado a 5)
```

##### Rangos y Límites
```typescript
// Comprobar si está en un rango [mínimo, máximo]
util.isNumberInRange(5, [1, 10], true);  // true (inclusivo)
util.isNumberInRange(1, [1, 5], false);  // false (exclusivo)

// Ajustar o acoplar un número a un rango
util.adaptNumberToRange(15, [0, 10]);    // 10 (acoplado al máximo)
util.adaptNumberToRange(-3, [0, 10]);    // 0  (acoplado al mínimo)
util.adaptNumberToRange(7, [0, 10]);     // 7  (dentro del rango)
```

##### Redondeo Exponencial Avanzado
```typescript
// Redondeo estándar, hacia arriba ("ceil") o hacia abajo ("floor") en cualquier posición
util.roundNumber("round", 10.555, 0);    // 11 (al entero más cercano)
util.roundNumber("round", 10.163, -2);   // 10.16 (a centésimas)
util.roundNumber("round", 1611, 3);      // 2000 (a miles)
util.roundNumber("floor", 1.66, -1);     // 1.6 (décimas hacia abajo)
util.roundNumber("ceil", 1.62, -1);      // 1.7 (décimas hacia arriba)
```

##### Conversión entre Tipos Numéricos
```typescript
// Number <-> BigInt
util.numberToBigint(7.9);                // 7n (trunca parte decimal)
util.bigintToNumber(123n);               // 123
```

---

#### 🔤 Strings Numéricos

Para validar o transformar cadenas de texto que representan números:

```typescript
// Validación de strings con formato numérico
util.isStringAsNumber("123");            // true
util.isStringAsNumber(" 1'000,500.25 "); // true (limpieza y normalización automática)
util.isStringAsNumber("12abc");          // false

// Conversión a number o bigint
const num = util.stringToNumber(" 1,500.50 "); // 1500.5
const big = util.stringToBigint("9007199254740991"); // 9007199254740991n
```

---

#### 🧩 Conversión y Manejo de Nulos / Undefined

```typescript
const obj = { a: undefined, b: { c: undefined, d: "hola" } };

// Conversión profunda de undefined a null
const result = util.undefinedToNull(obj, true);
// { a: null, b: { c: null, d: "hola" } }

// Valor por defecto en ausencia de valor
util.dfValueIfUndefinedOrNull(undefined, "valor por defecto"); // "valor por defecto"
```

---

### 2. UtilExtension

Extiende a `UtilNative` e integra `lodash` para utilidades complementarias:

```typescript
import { UtilExtension } from '@magles/mag-util';

const util = UtilExtension.getInstance();

// 1. Acceso directo a toda la suite de lodash
console.log(util.lodash.chunk(['a', 'b', 'c', 'd'], 2)); // [['a', 'b'], ['c', 'd']]

// 2. Clonación profunda con soporte para instancias de clases
class Persona {
  constructor(public nombre: string) {}
}
const p1 = new Persona("MAG");
const p2 = util.clone(p1, "lodash"); // Clona manteniendo la instancia

// 3. Conversión de casos de texto
util.convertStringToCase("hola mundo", "Snake"); // "hola_mundo"
util.convertStringToCase("hola mundo", "Kebab"); // "hola-mundo"
util.convertStringToCase("hola mundo", "Camel"); // "holaMundo"
util.convertStringToCase("hola mundo", "Pascal"); // "HolaMundo"
```

---

## ✨ Características

- 🔒 **Singleton Enforcement**: Constructores protegidos para garantizar una única instancia configurada.
- 📘 **TypeScript Nativo**: 100% tipado estricto, type guards (`isNumber(x): x is number`), autocompletado y documentación JSDoc en español con ejemplos.
- ⚡ **Ligera y Modular**: Solo ~37 kB empaquetada.
- 🧪 **Alta Cobertura**: +600 pruebas unitarias automatizadas con Vitest.

## 📄 Licencia

Este proyecto está bajo la licencia [ISC](https://opensource.org/licenses/ISC).

---
Desarrollado con ❤️ por **MAGLES**.
