const math = require('mathjs');
const {
  sustitucionProgresivaComplex,
  sustitucionRegresivaComplex
} = require('./auxiliares');

let factorizacionDirectaCholesky = matrix => {
  let n = matrix.length;
  var U = matrix.map((element, i) => matrix[i].map(e => 0));
  var L = matrix.map((element, i) => matrix[i].map(e => 0));

  for (let k = 0; k < n; k++) {
    var suma1 = 0;

    for (let p = 0; p < k; p++) {
      suma1 = math.add(suma1, math.multiply(L[k][p], U[p][k]));
    }
    L[k][k] = math.sqrt(matrix[k][k] - suma1);
    U[k][k] = L[k][k];

    for (let i = k + 1; i < n; i++) {
      var suma2 = 0;
      for (let p = 0; p < k; p++) {
        suma2 = math.add(suma2, math.multiply(L[i][p], U[p][k]));
      }
      L[i][k] = math.divide(matrix[i][k] - suma2, U[k][k]);
    }

    for (let j = k + 1; j < n; j++) {
      var suma3 = 0;
      for (let p = 0; p < k; p++) {
        suma3 = math.add(suma3, math.multiply(L[k][p], U[p][j]));
      }
      U[k][j] = math.divide(matrix[k][j] - suma3, L[k][k]);
    }
    console.log('Etapa', k + 1);
    console.log('L');
    console.table(L);
    console.log('U');
    console.table(U);
  }

  console.log('L');
  console.table(L);
  console.log('U');
  console.table(U);

  return { L, U };
};

let factorizacionCholesky = (matrix, b) => {
  let { L, U } = factorizacionDirectaCholesky(matrix);
  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresivaComplex(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresivaComplex(U);
  console.log(x);
};

module.exports = factorizacionCholesky;
