const math = require('mathjs');
const algebra = require('algebra.js');

// Metodo para crear una matriz inicial a partir de un vector de puntos x
const crearPuntos = (funcion, puntosX) => {
  const fx = math.parse(funcion).compile();
  let puntos = [];
  for (let i = 0; i < puntosX.length; i++) {
    var scope = { x: puntosX[i] };
    var punto = { x: scope.x, y: fx.evaluate(scope) };
    puntos.push(punto);
  }
  console.log('puntos');
  console.table(puntos);
  return puntos;
};

const correccionSignos = ecuacion => {
  ecuacion = ecuacion.split(' ').join('');
  ecuacion = ecuacion.split('++').join('+');
  ecuacion = ecuacion.split('+-').join('-');
  ecuacion = ecuacion.split('-+').join('-');
  ecuacion = ecuacion.split('--').join('+');
  return ecuacion;
};

const simplificaExpr = expr => {
  expr = algebra.parse(expr);
  let constante = expr.constants[0].numer / expr.constants[0].denom;
  let numTemp = '';

  expr.terms.forEach(termino => {
    var coeficiente =
      termino.coefficients[0].numer / termino.coefficients[0].denom;
    var variable = `+ ${coeficiente}${termino.variables[0].variable}^${termino.variables[0].degree}`;
    numTemp += variable;
  });

  numTemp += `+${constante}`;

  return correccionSignos(numTemp);
};

module.exports = { correccionSignos, simplificaExpr, crearPuntos };
