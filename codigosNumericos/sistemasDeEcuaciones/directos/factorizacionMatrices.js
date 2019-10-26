const {
  factorizacionLU,
  sustitucionRegresiva,
  sustitucionProgresiva
} = require('./auxiliares');

let factorizacionMatrices = (matrix, b) => {
  let { L, U } = factorizacionLU(matrix);
  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
};

module.exports = factorizacionMatrices;
