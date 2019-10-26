const math = require('mathjs');
const { norma1, norma2, normaUniforme } = require('./normas');

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

// w = 1, gauss seidel
// 0<w<1, subrelajacion (para converger subsistemas que no convergen por gauss seidel)
// 1<w<2, sobre-relajacion(aceleran convergencia en gauss seidel convergente lento)
let gaussSeidel = (tolerancia, x0, niter, matrix, b, norma, w = 1) => {
  let { L, D, U } = getLDU(matrix);

  let temp = math.subtract(D, math.multiply(L, w));
  let temp2 = math.add(math.multiply(1 - w, D), math.multiply(w, U));
  let T = math.multiply(math.inv(temp), temp2);
  let C = math.multiply(w, math.multiply(math.inv(temp), b));

  var err = tolerancia + 1;
  var counter = 0;
  var tabla = [];

  while (err > tolerancia && counter < niter) {
    var x1 = math.add(math.multiply(T, x0), C);
    if (norma == 1) err = norma1(math.subtract(x1, x0));
    else if (norma == 2) err = norma2(math.subtract(x1, x0));
    else err = normaUniforme(math.subtract(x1, x0));
    x0 = x1;
    counter++;
    var t2 = x0.map(item => item);
    t2.push({ err });
    tabla.push(t2);
  }
  console.table(tabla);

  if (err < tolerancia) {
    console.log(`${x1} Its an aproximation with tolerance = ${tolerancia}`);
  } else {
    console.log(`fails in ${niter} iterations`);
  }
};

module.exports = gaussSeidel;
