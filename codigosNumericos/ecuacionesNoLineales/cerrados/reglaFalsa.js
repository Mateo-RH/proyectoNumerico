const math = require('mathjs');

let reglaFalsa = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
  const code2 = math.parse(funcion).compile();
  let scope = {
    x: xInferior
  };
  let fxi = code2.evaluate(scope);
  scope.x = xSuperior;
  let fxs = code2.evaluate(scope);
  if (fxi === 0) {
    console.log(`Root: ${xInferior}`);
    return xInferior;
  } else if (fxs === 0) {
    console.log(`Root: ${xSuperior}`);
    return xSuperior;
  } else if (fxs * fxi < 0) {
    let xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
    scope.x = xMiddle;
    let fxm = code2.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    console.log(1, xInferior, xSuperior, xMiddle, fxm, 0);
    while (error > tolerance && counter <= iterations_n && fxm != 0) {
      if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else {
        xInferior = xMiddle;
        fxi = fxm;
      }
      let Xaux = xMiddle;
      xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      error = math.abs(xMiddle - Xaux);
      counter += 1;
      console.log(counter, xInferior, xSuperior, xMiddle, fxm, error);
    }

    if (fxm == 0) {
      console.log('Root:', xMiddle);
      return xMiddle;
    } else if (error < tolerance) {
      console.log(
        `${xMiddle} is an aproximation with tolerance = ${tolerance}`
      );
      return xMiddle;
    } else {
      console.log('Fail in', iterations_n, 'iterations');
      return false;
    }
  }
};

module.exports = reglaFalsa;
