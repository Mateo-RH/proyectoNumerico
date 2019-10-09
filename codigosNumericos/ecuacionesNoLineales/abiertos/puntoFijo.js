const math = require('mathjs');

let puntoFijo = (funcionF, funcionG, tolerance, Xa, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  const fg = math.parse(funcionG).compile();
  let scope = {
    x: Xa
  };
  let fx = ff.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  var Xn;
  while (fx != 0 && error > tolerance && counter <= niter) {
    scope.x = Xa;
    Xn = fg.evaluate(scope);
    console.log(counter - 1, Xa, Xn, fx, error);
    scope.x = Xn;
    fx = ff.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((Xn - Xa) / Xn))
      : (error = math.abs(Xn - Xa));
    Xa = Xn;
    counter += 1;
  }
  console.log(counter - 1, Xa, Xn, fx, error);
  if (fx == 0) {
    console.log(`Root: ${Xa}`);
    return Xa;
  } else if (error < tolerance) {
    console.log(`${Xa} is an aproximation with tolerance = ${tolerance}`);
    return Xa;
  } else {
    console.log('Fail in', niter, 'iterations');
    return false;
  }
};

module.exports = puntoFijo;