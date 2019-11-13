const math = require('mathjs');
const {
  sustitucionProgresiva,
  sustitucionRegresiva,
  verificated_matrix
} = require('./auxiliares');

let factorizacionDirectaCrout = matrix => {
  let n = matrix.length;
  let stages = [];
  var L = matrix.map((e, i) => matrix[i].map(e => 0));
  var U = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return index === idx ? 1 : math.abs(ele * 0);
    })
  );

  for (let k = 0; k < n; k++) {
    var suma1 = 0;
    for (let p = 0; p < k; p++) {
      suma1 += L[k][p] * U[p][k];
    }
    L[k][k] = matrix[k][k] - suma1;

    for (let i = k + 1; i < n; i++) {
      var suma2 = 0;
      for (let p = 0; p < k; p++) {
        suma2 += L[i][p] * U[p][k];
      }
      L[i][k] = matrix[i][k] - suma2;
    }

    for (let j = k + 1; j < n; j++) {
      var suma3 = 0;
      for (let p = 0; p < k; p++) {
        suma3 += L[k][p] * U[p][j];
      }
      U[k][j] = (matrix[k][j] - suma3) / L[k][k];
    }
    stages.push({ U, L });
  }

  return { L, U, stages };
};

let factorizacionCrout = (matrix, b) => {
  let msg = verificated_matrix(matrix, 'LU');
  if (msg) return { error: true, msg };

  let error = false;
  let { L, U, stages } = factorizacionDirectaCrout(matrix);

  msg = verificated_matrix(matrix, 'Direct factorization', L, U);
  if (msg) return { error: true, msg };

  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  if (x.includes(NaN)) error = true;
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionCrout;
