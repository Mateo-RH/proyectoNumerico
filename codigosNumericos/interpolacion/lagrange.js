const { correccionSignos, crearPuntos } = require('./auxiliares');
const algebra = require('algebra.js');

const matrizLagrange = puntos => {
  let puntosY = [];
  let puntosX = puntos.map(punto => {
    puntosY.push(punto.y);
    return punto.x;
  });
  let n = puntosX.length;

  let matrix = [];
  let ecuacion = '';
  for (let i = 0; i < n; i++) {
    var num = '';
    var den = 1;
    for (let j = 0; j < n; j++) {
      if (j != i) {
        num += correccionSignos(`(x - ${puntosX[j]})`);
        den *= puntosX[i] - puntosX[j];
      }
    }
    if (i == 0) {
      console.log(puntosY);
      ecuacion += `((${num})/${parseFloat(den).toFixed(5)})(${parseFloat(
        puntosY[i]
      ).toFixed(5)})`;
    } else
      ecuacion += `+((${num})/${parseFloat(den).toFixed(5)})(${parseFloat(
        puntosY[i]
      ).toFixed(5)})`;
    num = simplificaExprLagrange(num, den, n);
    if (!num) return false;
    matrix.push(num);
  }
  return { matrix, ecuacion };
};

const simplificaExprLagrange = (expr, den, cantidadPuntos) => {
  if (expr[0] == '+') expr = expr.substring(1);
  expr = algebra.parse(expr);
  let maximoExponente = cantidadPuntos - 1;
  let variables = new Array(maximoExponente).fill(0);
  expr.terms.forEach(termino => {
    var indice = maximoExponente - termino.variables[0].degree;
    variables[indice] =
      termino.coefficients[0].numer / (termino.coefficients[0].denom * den);
  });
  if (variables.includes(Infinity)) return false;
  return variables;
};

const lagrange = points => {
  let puntos = crearPuntos(points);
  let { matrix, ecuacion } = matrizLagrange(puntos);
  let error = !matrix ? true : false;
  return { error, ecuacion };
};

// lagrange(1, 1, 1);

module.exports = { lagrange };
