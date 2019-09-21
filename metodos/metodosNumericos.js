const math = require('mathjs');
// ============================================== METODOS CERRADOS ==============================================//
// TODO: MANEJO ERROR DE FUNCION INCORRECTA
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
  let ddfx = ddf.evaluate(scope);
  let counter = 1;
  let error = tolerance + 1;
  var x1;
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    console.log(counter, Xo, fx, error);
    let numerador = fx * dfx;
    let denominador = fx * dfx;
    let ecuacion = numerador / ((dfx ^ 2) - denominador);
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
  } else if (dfx === 0) {
    console.log(`${x1} its a possible multiple root`);
    return x1;
  } else {
    console.log('Fail in', niter, 'iterations');
    return false;
  }
};

// Cerrados
const funcion = 'log(sin(x)^2 + 1) - 1/2';
const funcionD = '2*(sin(x)^2 + 1)^-1 * sin(x) * cos(x)';
// incrementalSearch(funcion, -3, 0.5, 100);
// bisection(funcion, 0, 1, 0.0000001, 100);
// fakeRule(funcion, 2, 3, 0.0005, 11);

// Abiertos
const funcionf = 'log(sin(x)^2 + 1) - 1/2 - x';
const funciong = 'log(sin(x)^2 + 1) - 1/2';
const funciondf = 'x*e^x';
const funcionddf = 'x*e^x + e^x';
const h = '(e^x) - x - 1';
const hd = '(e^x) - 1';
const hdd = 'e^x';
// fixedPoint(funcionf, funciong, 0.0000001, -0.5, 100, 'E');
// newton(funcion, funcionD, 0.0000001, 0.5, 100, 'E');
// secante(funcion, 0.0000001, 0.5, 1, 100, 'E');
multipleRoots(h, hd, hdd, 0.0000001, 1, 5, 'E');

module.exports = {
  incrementalSearch,
  bisection,
  fakeRule,
  fixedPoint,
  newton,
  secante,
  multipleRoots
};
