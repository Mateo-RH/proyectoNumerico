const {
  factorizacionLUPivoteo,
  sustitucionRegresiva,
  sustitucionProgresiva
} = require('./auxiliares');

let factorizacionMatricesPivoteo = (matrix, b) => {
  let error = false;
  let { L, U, P, stages } = factorizacionLUPivoteo(matrix);
  console.log(L);
  if (!L) return { error: true, L, U: 0, stages: 0, solution: 0 };
  let Pb = P.map((element, item) => b[P[item]]);
  L.map((item, index) => item.push(Pb[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  return { error, L, U, stages, solution: x };
};

module.exports = factorizacionMatricesPivoteo;
