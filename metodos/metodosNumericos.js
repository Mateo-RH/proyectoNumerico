const math = require('mathjs');
// ============================================== METODOS CERRADOS ==============================================//

let incrementalSearch = (funcion, initial_x, delta_x, iterations_n) => {
  // Construct the function, Compile it and set de variables
  const functionF = math.parse(funcion);
  const code2 = functionF.compile();
  let scope = {
    x: initial_x
  };
  let fx0 = code2.evaluate(scope);

  if (fx0 === 0) console.log(`Root: ${scope.x}`);
  else {
    let intervals = [];
    var interval;
    var fx1;
    let counter = 0;
    while (counter < iterations_n) {
      scope.x += delta_x;
      fx1 = code2.evaluate(scope);
      if (fx0 * fx1 < 0) {
        console.log(`Interval: [${scope.x - delta_x}, ${scope.x}]`);
        interval = {
          a: [scope.x - delta_x, fx0],
          b: [scope.x, fx1]
        };
        intervals.push(interval);
      } else if (fx0 === 0) {
        console.log(`Root: ${scope.x - delta_x}`);
        return scope.x - delta_x;
      } else if (fx1 === 0) {
        console.log(`Root: ${scope.x}`);
        return scope.x;
      }
      fx0 = fx1;
      counter++;
    }
    return intervals;
  }
};

let bisection = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
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
      xMiddle = (xSuperior + xInferior) / 2;
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

let fakeRule = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
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

// ============================================== METODOS ABIERTOS ==============================================//

let fixedPoint = (funcionF, funcionG, tolerance, Xa, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  const fg = math.parse(funcionG).compile();
  let scope = {
    x: Xa
  };
  let fx = ff.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  var Xn;
  console.log(0, Xa, fx, 0);
  while (fx != 0 && error > tolerance && counter <= niter) {
    scope.x = Xa;
    Xn = fg.evaluate(scope);
    scope.x = Xn;
    fx = ff.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((Xn - Xa) / Xn))
      : (error = math.abs(Xn - Xa));
    Xa = Xn;
    console.log(counter, Xn, fx, error);
    counter += 1;
  }
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
  console.log(0, Xo, fx, 0);
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    x1 = Xo - fx / dfx;
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    console.log(counter, Xo, fx, error);
    counter += 1;
  }
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
      console.log(counter, Xo, fx0, error);
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

// TODO: idk if this mondeu works and the pseudocode its like a piece of sh*t
let multipleRoots = (
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
  let ddfx = df.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  var x1;
  // console.log(0, Xa, fx, 0);
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    x1 = Xo - (fx * dfx) / (dfx ^ (2 - fx * ddfx));
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    ddfx = df.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    // console.log(counter, Xn, fx, error);
    counter += 1;
  }
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

// Cerrados
// const funcion = 'e^(3x - 12) + x*cos(3x) - x^2 + 4';
// incrementalSearch(funcion, -10, 1, 20);
// bisection(funcion, 2, 3, 0.0005, 11);
// fakeRule(funcion, 2, 3, 0.0005, 11);

// Abiertos
// const funcionf = 'x*e^x - x^2 - 5x - 3';
// const funciong = '(x*e^x - x^2 - 3)/5';
// const funciondf = '-2x + e^x * (x + 1) - 5';
// const funcionddf = '-2 + e^x (2 + x)';
// fixedPoint(funcionf, funciong, 0.00005, -0.5, 10, 'e');
// newton(funcionf, funciondf, 0.00005, -0.5, 10, 'e');
// secante(funcionf, 0.00005, -0.5, 1, 10, 'e');
// multipleRoots(funcionf, funciondf, funcionddf, 0.00005, -0.5, 10, 'e');

module.exports = {
  incrementalSearch,
  bisection,
  fakeRule,
  fixedPoint,
  newton,
  secante,
  multipleRoots
};
