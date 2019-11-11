const math = require('mathjs');

let busquedasIncrementales = (funcion, initial_x, delta_x, iterations_n) => {
  const functionF = math.parse(funcion);
  const code2 = functionF.compile();
  let raiz = false;
  let errorR = false;
  let scope = {
    x: initial_x
  };
  let fx0 = code2.evaluate(scope);

  if (fx0 === 0) raiz = scope.x;
  else {
    var fx1;
    let counter = 0;
    var tabla = [];
    while (counter < iterations_n && fx0 != 0 && fx1 != 0) {
      scope.x += delta_x;
      fx1 = code2.evaluate(scope);
      if (fx0 * fx1 < 0) tabla.push([scope.x - delta_x, scope.x]);
      fx0 = fx1;
      counter++;
    }
    if (fx0 === 0) {
      raiz = scope.x - delta_x;
    } else if (fx1 === 0) {
      raiz = scope.x;
    }
    return {
      error: errorR,
      cabecera: ['a', 'b'],
      raiz,
      intervalos: tabla
    };
  }
};

module.exports = busquedasIncrementales;
