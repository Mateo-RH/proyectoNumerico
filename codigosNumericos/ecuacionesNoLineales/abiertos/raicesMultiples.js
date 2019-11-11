const math = require('mathjs');

let raicesMultiples = (
  funcionF,
  funciondF,
  funcionddF,
  tolerance,
  Xo,
  niter,
  tipoError
) => {
  const ff = math.parse(funcionF).compile();
  const df = math.parse(funciondF).compile();
  const ddf = math.parse(funcionddF).compile();
  let scope = {
    x: Xo
  };
  let fx = ff.evaluate(scope);
  let dfx = df.evaluate(scope);
  let ddfx = ddf.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  let x1;
  while (fx != 0 && error > tolerance && counter <= niter) {
    console.log(counter, Xo, fx, error);
    var numerador = fx * dfx;
    var denominador = fx * ddfx;
    var ecuacion = numerador / ((dfx ^ 2) - denominador);
    x1 = Xo - ecuacion;
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    ddfx = ddf.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    counter += 1;
  }
  if (fx === 0) {
    console.log(`Root: ${Xo}`);
    return Xo;
  } else if (error < tolerance) {
    console.log(`${x1} is an aproximation with tolerance = ${tolerance}`);
    return x1;
  } else {
    console.log('Fail in', niter, 'iterations');
    return false;
  }
};

module.exports = raicesMultiples;
