const math = require('mathjs');
// FIXME: corregir decimales
// TODO: HACER QUE RETORNEN ALGUNA MIERDA!!!!
// ============================================== METODOS CERRADOS ==============================================//

let incrementalSearch = (funcion, initial_x, delta_x, iterations_n) => {
  // Construct the function, Compile it and set de variables
  const functionF = math.parse(funcion);
  const code2 = functionF.compile();
  let scope = {
    x: initial_x
  };
  let fx0 = code2.evaluate(scope);

  if (fx0 === 0) console.log(`Raiz en ${scope.x}`);
  else {
    let intervals = [];
    var interval;
    var fx1;
    let counter = 0;
    while (counter < iterations_n) {
      scope.x += delta_x;
      fx1 = code2.evaluate(scope);
      if (fx0 * fx1 < 0) {
        console.log(`Raiz entre ${scope.x - delta_x} y ${scope.x}`);
        interval = {
          a: [scope.x - delta_x, fx0],
          b: [scope.x, fx1]
        };
        intervals.push(interval);
      } else if (fx0 === 0) console.log(`Raiz en ${scope.x - delta_x}`);
      else if (fx1 === 0) console.log(`Raiz en ${scope.x}`);
      fx0 = fx1;
      counter++;
    }
    return intervals;
  }
};

let bisection = (
  funcion,
  xInferior,
  xSuperior,
  tolerance,
  iterations_n,
  tipoError
) => {
  const code2 = math.parse(funcion).compile();
  let scope = {
    x: xInferior
  };
  let fxi = code2.evaluate(scope);
  scope.x = xSuperior;
  let fxs = code2.evaluate(scope);
  if (fxi === 0) console.log(`Raiz en ${xInferior}`);
  else if (fxs === 0) console.log(`Raiz en ${xSuperior}`);
  else if (fxs * fxi < 0) {
    let xMiddle = (xSuperior + xInferior) / 2;
    let xMiddleAux = xMiddle;
    var fxm;
    let counter = 1;
    let error = tolerance + 1;
    while (error > tolerance && counter <= iterations_n) {
      xMiddle = (xSuperior + xInferior) / 2;
      tipoError == 'e'
        ? (error = math.abs((xMiddle - xMiddleAux) / xMiddle))
        : (error = math.abs(xMiddle - xMiddleAux));
      xMiddleAux = xMiddleAux;
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      console.log(counter, xInferior, xSuperior, xMiddle, fxm, error);
      if (fxm === 0) console.log(`Raiz en ${xMiddle}`);
      else if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else {
        xInferior = xMiddle;
        fxi = fxm;
      }
      counter += 1;
    }
    return xMiddle;
  }
};

let fakeRule = (
  funcion,
  xInferior,
  xSuperior,
  tolerance,
  iterations_n,
  tipoError
) => {
  const code2 = math.parse(funcion).compile();
  let scope = {
    x: xInferior
  };
  let fxi = code2.evaluate(scope);
  scope.x = xSuperior;
  let fxs = code2.evaluate(scope);
  if (fxi === 0) console.log(`Raiz en ${xInferior}`);
  else if (fxs === 0) console.log(`Raiz en ${xSuperior}`);
  else if (fxs * fxi < 0) {
    let xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
    let xMiddleAux = xMiddle;
    var fxm;
    let counter = 1;
    let error = tolerance + 1;
    while (error > tolerance && counter <= iterations_n) {
      xMiddle = xInferior - (fxi * (xSuperior - xInferior)) / (fxs - fxi);
      tipoError == 'e'
        ? (error = math.abs((xMiddle - xMiddleAux) / xMiddle))
        : (error = math.abs(xMiddle - xMiddleAux));
      xMiddleAux = xMiddleAux;
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      console.log(counter, xInferior, xSuperior, xMiddle, fxm, error);
      if (fxm === 0) console.log(`Raiz en ${xMiddle}`);
      else if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else {
        xInferior = xMiddle;
        fxi = fxm;
      }
      counter += 1;
    }
    return xMiddle;
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
  if (fx == 0) console.log(`Raiz en ${Xa}`);
  else if (error < tolerance)
    console.log(`${Xa} es aproximacion con tolerancia = ${tolerance}`);
  else console.log(`El metodo fracaso en ${niter} iteraciones`);
  return Xa;
};

// TODO: imprimir tabla newton
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
  // console.log(0, Xa, fx, 0);
  while (fx != 0 && error > tolerance && counter <= niter && dfx != 0) {
    x1 = Xo - fx / dfx;
    scope.x = x1;
    fx = ff.evaluate(scope);
    dfx = df.evaluate(scope);
    tipoError == 'e'
      ? (error = math.abs((x1 - Xo) / x1))
      : (error = math.abs(x1 - Xo));
    Xo = x1;
    // console.log(counter, Xn, fx, error);
    counter += 1;
  }
  if (fx === 0) console.log(`Raiz en ${Xo}`);
  else if (error < tolerance)
    console.log(`${x1} es aproximacion con tolerancia = ${tolerance}`);
  else if (dfx === 0) console.log(`${x1} es una posible raiz multiple`);
  else console.log(`El metodo fracaso en ${niter} iteraciones`);
  // return x1;
};

// TODO: imprimir tabla secante
let secante = (funcionF, tolerance, Xo, x1, niter, tipoError) => {
  const ff = math.parse(funcionF).compile();
  let scope = {
    x: Xo
  };
  let fx0 = ff.evaluate(scope);
  if (fx0 === 0) console.log(`Raiz en ${Xo}`);
  else {
    scope.x = x1;
    let fx1 = ff.evaluate(scope);
    let counter = 1;
    let error = tolerance + 1;
    let den = fx1 - fx0;
    var x2;
    // console.log(0, Xo, fx0, 0);
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
      // console.log(counter, x1, fx1, error);
      counter += 1;
    }
    if (fx1 === 0) console.log(`Raiz en ${x1}`);
    else if (error < tolerance)
      console.log(`${x1} es aproximacion con tolerancia = ${tolerance}`);
    else if (den === 0) console.log(`Hay una posible raiz multiple`);
    else console.log(`El metodo fracaso en ${niter} iteraciones`);
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
  if (fx === 0) console.log(`Raiz en ${Xo}`);
  else if (error < tolerance)
    console.log(`${x1} es aproximacion con tolerancia = ${tolerance}`);
  else if (dfx === 0) console.log(`${x1} es una posible raiz multiple`);
  else console.log(`El metodo fracaso en ${niter} iteraciones`);
  // return x1;
};

// Cerrados
// const funcion = 'e^(3x - 12) + x*cos(3x) - x^2 + 4';
// incrementalSearch(funcion, -10, 1, 20);
// bisection(funcion, 2, 3, -1, 11, 'e');
// fakeRule(funcion, 2, 3, -1, 11, 'e');

// Abiertos
// const funcionf = 'x*e^x - x^2 - 5x - 3';
// const funciong = '(x*e^x - x^2 - 3)/5';
// const funciondf = '-2x + e^x * (x + 1) - 5';
// const funcionddf = '-2 + e^x (2 + x)';
// const tolerance = math
//   .parse('5*10^-5')
//   .compile()
//   .evaluate();
// fixedPoint(funcionf, funciong, tolerance, -0.5, 10, 'e');
// newton(funcionf, funciondf, tolerance, -0.5, 10, 'e');
// secante(funcionf, tolerance, -0.5, 1, 10, 'e');
// multipleRoots(funcionf, funciondf, funcionddf, tolerance, -0.5, 10, 'e');

module.exports = {
  incrementalSearch,
  bisection,
  fakeRule,
  fixedPoint,
  newton,
  secante,
  multipleRoots
};
