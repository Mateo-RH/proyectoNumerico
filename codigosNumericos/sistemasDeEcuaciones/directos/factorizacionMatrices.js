const {
  factorizacionLU,
  sustitucionRegresiva,
  sustitucionProgresiva,
  ampliarMatriz
} = require('./auxiliares');

let factorizacionMatrices = (matrix, b) => {
  let error = false;
  let { L, U, stages } = factorizacionLU(matrix);
  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionMatrices;
