import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
<h1>Utilidades MAG ejecutando...</h1>
`;

//ejecutar aplicacion:

//ARBOL BINARIO EJEMPLO

// class ArbolBinario {
//   raiz: {
//     valor: any;
//     izquierda?: ArbolBinario["raiz"] | null;
//     derecha?: ArbolBinario["raiz"] | null;
//   } | null;

//   constructor() {
//     this.raiz = null;
//   }

//   insertar(valor: number) {
//     if (this.raiz === null) {
//       this.raiz = {
//         valor,
//         derecha: null,
//         izquierda: null,
//       } as ArbolBinario["raiz"];
//     } else {
//       this._insertar(valor, this.raiz);
//     }
//   }

//   _insertar(valor: number, nodo: ArbolBinario["raiz"]) {
//     if (valor < nodo.valor) {
//       if (nodo.izquierda === null) {
//         nodo.izquierda = {
//           valor,
//           derecha: null,
//           izquierda: null,
//         } as ArbolBinario["raiz"];
//       } else {
//         this._insertar(valor, nodo.izquierda);
//       }
//     } else if (valor > nodo.valor) {
//       if (nodo.derecha === null) {
//         nodo.derecha = {
//           valor,
//           derecha: null,
//           izquierda: null,
//         } as ArbolBinario["raiz"];
//       } else {
//         this._insertar(valor, nodo.derecha);
//       }
//     } else {
//       console.log("El valor ya está en el árbol");
//     }
//   }

//   imprimir() {
//     if (this.raiz !== null) {
//       this._imprimir(this.raiz);
//     }
//   }

//   _imprimir(nodo: ArbolBinario["raiz"] | null) {
//     if (nodo !== null) {
//       this._imprimir(nodo.izquierda);
//       console.log(nodo.valor);
//       this._imprimir(nodo.derecha);
//     }
//   }
// }

// // Uso del árbol binario
// let arbol = new ArbolBinario();
// arbol.insertar(3);
// arbol.insertar(4);
// arbol.insertar(0);
// arbol.insertar(8);
// arbol.insertar(2);
// arbol.imprimir();
