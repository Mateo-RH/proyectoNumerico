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

  if (fx0 === 0) console.log(`Raiz en ${scope.x}`);
  else {
    let intervals = [];
    let interval;
    let fx1;
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

let bisection = (funcion, xInferior, xSuperior, tolerance, iterations_n) => {
  const functionF = math.parse(funcion);
  const code2 = functionF.compile();
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
    let fxm;
    let counter = 1;
    let error = tolerance + 1;
    while (error > tolerance && counter <= iterations_n) {
      xMiddle = (xSuperior + xInferior) / 2;
      error = math.abs(xMiddle - xMiddleAux);
      xMiddleAux = xMiddleAux;
      scope.x = xMiddle;
      fxm = code2.evaluate(scope);
      console.log(counter, xInferior, xSuperior, xMiddle, fxm, error);
      if (fxm === 0) console.log(`Raiz en ${xMiddle}`);
      else if (fxi * fxm < 0) {
        xSuperior = xMiddle;
        fxs = fxm;
      } else if (fxm * fxs < 0) {
        xInferior = xMiddle;
        fxi = fxm;
      }
      counter += 1;
    }
    return fxm;
  }
};

const funcion = 'e^(3x - 12) + x*cos(3x) - x^2 + 4';
// incrementalSearch(funcion, -10, 1, 20);
bisection(funcion, 2, 3, -1, 11);
