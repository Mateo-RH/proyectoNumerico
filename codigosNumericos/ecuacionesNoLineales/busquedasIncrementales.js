const math = require('mathjs');

// TODO: MANEJO ERROR DE FUNCION INCORRECTA

let busquedasIncrementales = (funcion, initial_x, delta_x, iterations_n) => {
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

module.exports = busquedasIncrementales;
