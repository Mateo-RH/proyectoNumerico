const {
  factorizacionLUPivoteo,
  sustitucionRegresiva,
  sustitucionProgresiva,
  ampliarMatriz
} = require('./auxiliares');

let factorizacionMatricesPivoteo = (matrix, b) => {
  let error = false;
  let { L, U, P, stages } = factorizacionLUPivoteo(matrix);
  let Pb = P.map((element, item) => b[P[item]]);
  L.map((item, index) => item.push(Pb[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionMatricesPivoteo;
