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
  var x1;
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    console.log(counter - 1, Xo, fx, error);
    x1 = Xo - fx / dfx;
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    counter += 1;
  }
  console.log(counter - 1, Xo, fx, error);
  if (fx === 0) {
    console.log(`Root: ${Xo}`);
    return Xo;
  } else if (error < tolerance) {
    console.log(`${x1} is an aproximation with tolerance = ${tolerance}`);
    return x1;
  } else if (dfx === 0) {
    console.log(`${x1} its a possible multiple root`);
    return x1;
  } else {
    console.log('Fail in', niter, 'iterations');
    return false;
  }
};

module.exports = newton;
