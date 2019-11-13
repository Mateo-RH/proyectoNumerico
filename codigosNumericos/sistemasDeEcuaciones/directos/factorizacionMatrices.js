const {
  factorizacionLU,
  sustitucionRegresiva,
  sustitucionProgresiva,
  verificated_matrix
} = require('./auxiliares');

let factorizacionMatrices = (matrix, b) => {
  let msg = verificated_matrix(matrix, 'LU');
  if (msg) return { error: true, msg };

  let error = false;
  let { L, U, stages } = factorizacionLU(matrix);

  if (!L || !U || !stages) return { error: true };
  msg = verificated_matrix(matrix, 'Direct factorization', L, U);
  if (msg) return { error: true, msg };

  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  if (x.includes(NaN)) error = true;
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionMatrices;
