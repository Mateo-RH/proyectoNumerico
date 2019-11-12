const { correccionSignos, crearPuntos } = require('./auxiliares');

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
    if (i == 0) ecuacion += `${componentes[i]}${producto}`;
    else ecuacion += `+${componentes[i]}${producto}`;
  }
  ecuacion = correccionSignos(ecuacion);
  return ecuacion;
};

const newton = points => {
  let puntos = crearPuntos(points);
  let matrix = matrizNewton(puntos);
  let ecuacion = ecuacionNewton(matrix);
  return { error: false, matrix, ecuacion };
};

module.exports = { newton };
