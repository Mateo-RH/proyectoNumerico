const math = require('mathjs');

let secante = (funcionF, tolerance, Xo, x1, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  let scope = {
    x: Xo
  };
  let fx0 = ff.evaluate(scope);
  if (fx0 === 0) console.log(`Root: ${Xo}`);
  else {
    scope.x = x1;
    let fx1 = ff.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    let den = fx1 - fx0;
    var x2;
    console.log(0, Xo, fx0, 0);
    console.log(1, x1, fx1, 0);
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
      console.log(counter + 1, Xo, fx1, error);
      counter += 1;
    }

    if (fx1 === 0) {
      console.log(`Root: ${x1}`);
      return x1;
    } else if (error < tolerance) {
      console.log(`${x1} is an aproximation with tolerance = ${tolerance}`);
      return x1;
    } else if (den === 0) {
      console.log(`Possible multiple root`);
      return false;
    } else {
      console.log('Fail in', niter, 'iterations');
      return false;
    }
  }
};

module.exports = secante;
