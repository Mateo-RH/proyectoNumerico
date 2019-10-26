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
  console.table(tabla);
  if (dispercion < tolerancia) {
    console.log(`${x1} its a aproximation with tolerance = ${tolerancia}`);
    return x1;
  } else {
    console.log(`fracaso en ${niter} iteraciones`);
    return false;
  }
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
