const math = require("mathjs");

let puntoFijo = (funcionF, funcionG, tolerance, Xa, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  const fg = math.parse(funcionG).compile();
  let errorR = false;
  let raiz = false;
  let scope = {
    x: Xa
  };
  var fx;
  var test;
  try {
    fx = ff.evaluate(scope);
    test = fg.evaluate(scope);
  } catch (err) {
    fx = false;
    test = false;
  }
  if (!fx || !test) return false;
  let counter = 1;
  let error = tolerance + 1;
  var Xn;
  var table = [];
  while (fx != 0 && error > tolerance && counter <= niter) {
    scope.x = Xa;
    Xn = fg.evaluate(scope);
    table.push([Xa, Xn, fx, error]);
    scope.x = Xn;
    fx = ff.evaluate(scope);
    tipoError == "e"
      ? (error = math.abs((Xn - Xa) / Xn))
      : (error = math.abs(Xn - Xa));
    Xa = Xn;
    counter += 1;
  }
  table.push([Xa, Xn, fx, error]);
  if (fx == 0) {
    raiz = Xa;
  } else if (error >= tolerance) {
    errorR = true;
  }
  return {
    error: errorR,
    cabecera: ["Xo", "Xn", "f(x)", "error"],
    raiz,
    niter,
    aproximation: Xa,
    tolerance,
    iterations: table
  };
};

module.exports = puntoFijo;
