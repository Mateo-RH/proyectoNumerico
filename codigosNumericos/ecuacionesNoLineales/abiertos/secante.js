const math = require('mathjs');

let secante = (funcionF, tolerance, Xo, x1, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  let scope = {
    x: Xo
  };
  let fx0 = ff.evaluate(scope);
  let raiz = false;
  let errorR = false;
  let raizM = false;
  if (fx0 === 0) raiz = Xo;
  else {
    scope.x = x1;
    let fx1 = ff.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    let den = fx1 - fx0;
    var x2;
    var table = [[Xo, fx0, 0]];
    table.push([x1, fx1, 0]);
    while (fx1 != 0 && error > tolerance && counter <= niter && den != 0) {
      x2 = x1 - (fx1 * (x1 - Xo)) / den;
      tipoError == 'e'
        ? (error = math.abs((x2 - x1) / x2))
        : (error = math.abs(x2 - x1));
      Xo = x1;
      fx0 = fx1;
      x1 = x2;
      scope.x = x1;
      fx1 = ff.evaluate(scope);
      den = fx1 - fx0;
      table.push([Xo, fx1, error]);
      counter += 1;
    }
    if (fx1 == 0) {
      raiz = x1;
    } else if (den == 0) {
      raizM = true;
    } else if (error >= tolerance) {
      errorR = true;
    }
    return {
      error: errorR,
      cabecera: ['X', 'f(x)', 'error'],
      raiz,
      raizM,
      niter,
      aproximation: x1,
      tolerance,
      iterations: table
    };
  }
};

module.exports = secante;
