# @magles/mag-util

🚀 Una potente recopilación de utilidades para TypeScript, diseñada para evitar dependencias externas innecesarias y proporcionar herramientas nativas robustas.

## 📦 Instalación

```bash
npm install @magles/mag-util
```

## 🛠️ Uso Principal

La librería está organizada en dos clases principales bajo el patrón **Singleton**.

### 1. UtilNative
Contiene utilidades puras que no dependen de librerías externas.

```typescript
import { UtilNative } from '@magles/mag-util';

const util = UtilNative.getInstance();

// --- Ejemplos de Validación de Números ---
util.isNumber(42);               // true
util.isNumber("42", true);       // true (permite strings numéricos)
util.isNumber(9007199254740991n, false, true); // true (permite BigInt)

// --- Ejemplos de Conversión ---
const obj = { a: undefined, b: { c: undefined } };
const result = util.undefinedToNull(obj, true); 
// Resultado: { a: null, b: { c: null } }
```

### 2. UtilExtension
Extiende a `UtilNative` e incluye utilidades adicionales. Usa `lodash` internamente de forma transparente.

```typescript
import { UtilExtension } from '@magles/mag-util';

const util = UtilExtension.getInstance();

// Acceso directo a utilidades de terceros curadas
console.log(util.lodash.chunk(['a', 'b', 'c', 'd'], 2));
```

## 📚 Organización de la Documentación

A medida que la librería crezca:
*   **README.md**: Mantendremos aquí la guía rápida y ejemplos esenciales.
*   **CHANGELOG.md**: (Próximamente) Para registrar cada cambio por versión.
*   **Wiki/Docs**: Si el proyecto crece mucho, la documentación detallada de cada uno de los +500 métodos se moverá a una carpeta `/docs` o a la Wiki de GitHub para no saturar este archivo.

## 🧠 ¿Cómo funcionan las dependencias?

Tu paquete incluye `lodash` como una **dependencia directa** (`dependency`). 
*   **¿Se incluye el código?**: No está "pegado" dentro de tu código, sino que npm lo marca como requisito.
*   **Instalación automática**: Cuando un usuario instala `@magles/mag-util`, npm detecta que necesitas `lodash` y lo descarga automáticamente en su carpeta `node_modules`.
*   **Transparencia**: El usuario no tiene que instalar `lodash` por su cuenta, tu librería ya se encarga de que esté ahí.

## ✨ Características

- **Singleton Enforcement**: Constructores protegidos para evitar instanciación manual.
- **TypeScript Nativo**: Tipado fuerte y autocompletado inteligente (JSDoc incluido).
- **Ligera**: Solo ~87kB comprimida (sin contar dependencias externas).

## 📄 Licencia

Este proyecto está bajo la licencia [ISC](https://opensource.org/licenses/ISC).

---
Desarrollado con ❤️ por **MAGLES**.
