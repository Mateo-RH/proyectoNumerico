const math = require('mathjs');

let biseccion = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
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
    let xMiddle = (xSuperior + xInferior) / 2;
    scope.x = xMiddle;
    let fxm = code2.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    var tabla = [
      {
        n: 1,
        xInf: xInferior,
        xSup: xSuperior,
        xMid: xMiddle,
        'f(xMid)': fxm,
        error: 0
      }
    ];
    while (error > tolerance && counter <= iterations_n && fxm != 0) {
      if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else {
        xInferior = xMiddle;
        fxi = fxm;
      }
      var Xaux = xMiddle;
      xMiddle = (xSuperior + xInferior) / 2;
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      error = math.abs(xMiddle - Xaux);
      counter += 1;
      tabla.push({
        n: counter,
        xInf: xInferior,
        xSup: xSuperior,
        xMid: xMiddle,
        'f(xMid)': fxm,
        error
      });
    }
    console.table(tabla);
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

module.exports = biseccion;
