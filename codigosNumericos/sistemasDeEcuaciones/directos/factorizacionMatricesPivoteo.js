const {
  factorizacionLUPivoteo,
  sustitucionRegresiva,
  sustitucionProgresiva
} = require('./auxiliares');

let factorizacionMatricesPivoteo = (matrix, b) => {
  let { L, U, P } = factorizacionLUPivoteo(matrix);
  let Pb = P.map((element, item) => b[P[item]]);
  L.map((item, index) => item.push(Pb[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
};

module.exports = factorizacionMatricesPivoteo;
