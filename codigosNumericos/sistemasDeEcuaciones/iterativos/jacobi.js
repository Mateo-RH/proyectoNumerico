const math = require('mathjs');
const { norma1, norma2, normaUniforme } = require('./normas');

let jacobi = (tolerancia, vector0, niter, matrix, b, norma) => {
  var dispercion = tolerancia + 1;
  var counter = 0;
  var tabla = [];
  while (dispercion > tolerancia && counter < niter) {
    var x1 = calcularNuevoJacobi(vector0, matrix, b);
    if (norma == 1) dispercion = norma1(math.subtract(x1, vector0));
    else if (norma == 2) dispercion = norma2(math.subtract(x1, vector0));
    else dispercion = normaUniforme(math.subtract(x1, vector0));

    vector0 = x1;
    counter++;
    var temp = vector0.map(item => item);
    temp.push({ err: dispercion });
    tabla.push(temp);
  }
  // x1 es aproximacion con tolerancia o fracaso en niter
  let error = dispercion < tolerancia ? false : true;
  return { error, aproximacion: x1, iteraciones: tabla, niter };
};

let calcularNuevoJacobi = (vector0, matrix, b) => {
  let n = vector0.length;
  let vector1 = [];
  for (let i = 0; i < n; i++) {
    var suma = 0;
    for (let j = 0; j < n; j++) {
      if (j != i) suma += matrix[i][j] * vector0[j];
    }
    vector1[i] = (b[i] - suma) / matrix[i][i];
  }
  return vector1;
};

module.exports = jacobi;
