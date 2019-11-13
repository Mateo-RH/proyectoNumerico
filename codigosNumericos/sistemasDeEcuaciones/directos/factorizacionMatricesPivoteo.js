const {
  factorizacionLUPivoteo,
  sustitucionRegresiva,
  sustitucionProgresiva,
  verificated_matrix
} = require('./auxiliares');

let factorizacionMatricesPivoteo = (matrix, b) => {
  let msg = verificated_matrix(matrix, 'LU');
  if (msg) return { error: true, msg };

  let error = false;
  let { L, U, P, stages } = factorizacionLUPivoteo(matrix);

  if (!L || !U || !stages) return { error: true };
  msg = verificated_matrix(matrix, 'Direct factorization', L, U);
  if (msg) return { error: true, msg };

  let Pb = P.map((element, item) => b[P[item]]);
  L.map((item, index) => item.push(Pb[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  if (x.includes(NaN)) error = true;
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionMatricesPivoteo;
