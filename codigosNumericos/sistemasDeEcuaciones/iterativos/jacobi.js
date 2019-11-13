const math = require('mathjs');
const { norma1, norma2, normaUniforme } = require('./normas');
const {
  spectral_radius,
  verificated_matrix
} = require('../directos/auxiliares');

let getLDU = matrix => {
  let L = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx < filIdx ? -columna : 0;
    })
  );
  let D = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx == filIdx ? columna : 0;
    })
  );
  let U = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx > filIdx ? -columna : 0;
    })
  );
  return { L, D, U };
};

let jacobi = (tolerancia, x0, niter, matrix, b, norma) => {
  let warning = false;
  let msg = [];
  let msgTemp = verificated_matrix(matrix);
  if (msgTemp) {
    warning = true;
    msg.push(msgTemp);
  }

  let { L, D, U } = getLDU(matrix);
  let T = math.multiply(math.inv(D), math.add(L, U));

  msgTemp = spectral_radius(T);
  if (msgTemp) {
    warning = true;
    msg.push(msgTemp);
  }

  let C = math.multiply(math.inv(D), b);
  var err = tolerancia + 1;
  var counter = 1;
  var tabla = [];

  while (err > tolerancia && counter <= niter) {
    var x1 = math.add(math.multiply(T, x0), C);
    if (norma == 1) err = norma1(math.subtract(x1, x0));
    else if (norma == 2) err = norma2(math.subtract(x1, x0));
    else err = normaUniforme(math.subtract(x1, x0));
    err = math.max(math.abs(math.subtract(x1, x0)));
    x0 = x1;
    counter++;
    var t2 = x0.map(item => item);
    t2.push({ err });
    tabla.push(t2);
  }

  let error = err < tolerancia ? false : true;
  return { error, warning, msg, aproximacion: x1, iteraciones: tabla, niter };
};

module.exports = jacobi;
