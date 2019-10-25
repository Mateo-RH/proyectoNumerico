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
    var fx1;
    let counter = 0;
    var tabla = [];
    while (counter < iterations_n && fx0 != 0 && fx1 != 0) {
      scope.x += delta_x;
      fx1 = code2.evaluate(scope);
      if (fx0 * fx1 < 0) tabla.push({ a: scope.x - delta_x, b: scope.x });
      fx0 = fx1;
      counter++;
    }
    console.table(tabla);
    if (fx0 === 0) {
      console.log(`Root: ${scope.x - delta_x}`);
      return scope.x - delta_x;
    } else if (fx1 === 0) {
      console.log(`Root: ${scope.x}`);
      return scope.x;
    }
    return tabla;
  }
};

module.exports = busquedasIncrementales;
