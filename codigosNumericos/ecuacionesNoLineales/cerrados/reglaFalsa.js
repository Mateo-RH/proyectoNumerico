const math = require('mathjs');

let reglaFalsa = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
  const code2 = math.parse(funcion).compile();
  let scope = {
    x: xInferior
  };
  var fxi;
  try {
    fxi = code2.evaluate(scope);
  } catch (err) {
    fxi = false;
  }
  if (!fxi) return false;
  scope.x = xSuperior;
  let fxs = code2.evaluate(scope);
  let errorR = false;
  let raiz = false;

  if (fxi === 0) {
    raiz = xInferior;
  } else if (fxs === 0) {
    raiz = xSuperior;
  } else if (fxs * fxi < 0) {
    let xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
    scope.x = xMiddle;
    let fxm = code2.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    var tabla = [[xInferior, xSuperior, xMiddle, fxm, 0]];

    while (error > tolerance && counter <= iterations_n && fxm != 0) {
      if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else {
        xInferior = xMiddle;
        fxi = fxm;
      }

      var Xaux = xMiddle;
      xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      error = math.abs(xMiddle - Xaux);
      counter += 1;

      tabla.push([xInferior, xSuperior, xMiddle, fxm, error]);
    }

    if (fxm == 0) {
      raiz = xMiddle;
    } else if (error >= tolerance) {
      errorR = true;
    }
    return {
      error: errorR,
      cabecera: ['xInf', 'xSup', 'xMid', 'f(xMid)', 'error'],
      raiz,
      niter: iterations_n,
      aproximation: xMiddle,
      tolerance,
      iterations: tabla
    };
  }
};

// tabla.push({
//   n: counter,
//   xInf: xInferior,
//   xSup: xSuperior,
//   xMid: xMiddle,
//   'f(xMid)': fxm,
//   error: error
// });

module.exports = reglaFalsa;
