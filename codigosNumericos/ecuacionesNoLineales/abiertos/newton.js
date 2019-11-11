const math = require('mathjs');

let newton = (funcionF, funciondF, tolerance, Xo, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  const df = math.parse(funciondF).compile();
  let scope = {
    x: Xo
  };
  let fx = ff.evaluate(scope);
  let dfx = df.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  var tabla = [];
  let errorR = false;
  let raiz = false;
  let raizM = false;
  tabla.push([Xo, fx, 0]);
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    var x1 = Xo - fx / dfx;
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    counter += 1;
    tabla.push([Xo, fx, error]);
  }

  if (fx == 0) {
    raiz = Xo;
  } else if (dfx === 0) {
    raizM = x1;
  } else if (error >= tolerance) {
    errorR = true;
  }
  return {
    error: errorR,
    cabecera: ['Xo', 'f(x)', 'error'],
    raiz,
    raizM,
    niter,
    aproximation: x1,
    tolerance,
    iterations: tabla
  };
};

module.exports = newton;
