const { gaussPivotevoTotal } = require('../sistemasDeEcuaciones/index');

const splineCuadratico = puntos => {
  let matrix = [];
  let numeroPolinomios = puntos.length - 1;
  let posicion = 0;

  // PX
  puntos.forEach((punto, i) => {
    var fila = new Array(3 * numeroPolinomios).fill(0);
    fila = polinomioPx(fila, posicion, punto);
    matrix.push(fila);

    if (matrix.length % 2 == 0) posicion += 3;
    if (i > 0 && i < numeroPolinomios) {
      fila = new Array(3 * numeroPolinomios).fill(0);
      fila = polinomioPx(fila, posicion, punto);
      matrix.push(fila);
    }
  });

  // DPX
  let matrix2 = [];
  posicion = 0;
  puntos.forEach((punto, i) => {
    if (i > 0 && i < numeroPolinomios) {
      fila = new Array(3 * numeroPolinomios).fill(0);
      fila = polinomioPxD(fila, posicion, punto);
      matrix2.push(fila);
      posicion += 2;
    }
  });

  // MERGE
  matrix2.forEach(fila => matrix.push(fila));

  // TEMPORA
  var machete = new Array(3 * numeroPolinomios).fill(0);
  machete[0] = 1;
  machete.push(0);
  matrix.push(machete);

  console.table(matrix);
  let resp = gaussPivotevoTotal(matrix);
  console.table(resp);
};

const polinomioPx = (fila, posicion, punto) => {
  fila[posicion] = punto.x ** 2;
  fila[posicion + 1] = punto.x;
  fila[posicion + 2] = 1;
  fila.push(punto.y);
  return fila;
};

const polinomioPxD = (fila, posicion, punto) => {
  fila[posicion] = punto.x * 2;
  fila[posicion + 1] = punto.x;
  fila[posicion + 2] = -punto.x * 2;
  fila[posicion + 3] = -punto.x;
  fila.push(0);
  return fila;
};

const puntos = [
  { x: -1, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: 7 }
];

splineCuadratico(puntos);
