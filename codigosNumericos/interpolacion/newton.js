const math = require('mathjs');
const {
  simplificaExpr,
  correccionSignos,
  crearPuntos
} = require('./auxiliares');

const matrizNewton = puntos => {
  let matrix = puntos.map((punto, index) => {
    let fila = new Array(puntos.length).fill(0);
    fila[0] = punto.x;
    fila[1] = punto.y;
    return fila;
  });

  for (let i = 1; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      matrix[j][i + 1] =
        (matrix[j][i] - matrix[j - 1][i]) / (matrix[j][0] - matrix[j - i][0]);
    }
  }

  console.table(matrix);
  return matrix;
};

const ecuacionNewton = matrix => {
  let componentes = matrix.map((fila, idxF) => fila[idxF + 1]);
  let ecuacion = '';
  let n = componentes.length - 1;
  for (let i = 0; i <= n; i++) {
    var producto = '';
    for (let j = 0; j < i; j++) {
      producto += `(x-${matrix[j][0]})`;
    }
    ecuacion += correccionSignos(`+${componentes[i]}${producto}`);
  }
  console.log('Ecuacion');
  console.log(ecuacion);
  return ecuacion;
};

const newton = (funcion, puntosX, punto) => {
  let puntos = crearPuntos(funcion, puntosX);
  let matrix = matrizNewton(puntos);
  let ecuacion = ecuacionNewton(matrix);
  ecuacion = simplificaExpr(ecuacion);
  console.log('Ecuacion simplificada');
  console.log(ecuacion);

  let px = math.parse(ecuacion).compile();
  let scope = { x: punto };
  let solucion = px.evaluate(scope);

  console.log('Solucion');
  console.log(solucion);
};

module.exports = { newton };
