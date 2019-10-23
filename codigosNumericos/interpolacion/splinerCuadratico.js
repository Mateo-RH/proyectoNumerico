const { gaussPivotevoTotal } = require('../sistemasDeEcuaciones/index');

const splinerCuadratico = puntos => {
  let matrix = [];
  let numeroPolinomios = puntos.length - 1;
  let posicion = 0;
  let contador = 0;

  puntos.forEach((punto, i) => {
    var fila = new Array(3 * numeroPolinomios).fill(0);
    fila[posicion] = punto.x ** 2;
    fila[posicion + 1] = punto.x;
    fila[posicion + 2] = 1;
    fila.push(punto.y);
    matrix.push(fila);
    contador++;

    if (contador % 2 == 0) posicion += 3;
    if (i != 0 && i != numeroPolinomios) {
      var fila = new Array(3 * numeroPolinomios).fill(0);
      fila[posicion] = punto.x ** 2;
      fila[posicion + 1] = punto.x;
      fila[posicion + 2] = 1;
      fila.push(punto.y);
      matrix.push(fila);
      contador++;
    }
  });
  let matrix2 = puntos.map(punto => [2 * punto.x, 1]);
  let extra = matrix[0].length - matrix.length - 1;
  for (let i = 0; i < extra; i++) {
    matrix.push(new Array(3 * numeroPolinomios + 1).fill(0));
  }

  console.table(matrix);
  // console.log(matrix2);
};

const puntos = [
  { x: -1, y: 0 },
  { x: 1, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: 7 }
];

splinerCuadratico(puntos);
