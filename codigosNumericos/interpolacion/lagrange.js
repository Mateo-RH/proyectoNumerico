const math = require('mathjs');
const { correccionSignos, crearPuntos } = require('./auxiliares');
const algebra = require('algebra.js');

const matrizLagrange = puntos => {
  let puntosY = [];
  let puntosX = puntos.map(punto => {
    puntosY.push(punto.y);
    return punto.x;
  });

  let matrix = [];
  let ecuacion = '';
  for (let i = 0; i < puntosX.length; i++) {
    var num = '';
    var den = 1;
    for (let j = 0; j < puntosX.length; j++) {
      if (j != i) {
        num += correccionSignos(`(x - ${puntosX[j]})`);
        den *= puntosX[i] - puntosX[j];
      }
    }
    num = `${num}(${puntosY[i]})`;
    ecuacion += `+((${num})/${den.toFixed(5)})(${puntosY[i].toFixed(5)})`;
    num = simplificaExprLagrange(num, den);
    matrix.push(num);
  }

  console.log('Ecuacion');
  console.log(ecuacion);
  console.log('Matrix Coeficientes simplificados');
  console.table(matrix);
  return matrix;
};

const simplificaExprLagrange = (expr, den) => {
  expr = algebra.parse(expr);
  let constante = expr.constants[0].numer / (expr.constants[0].denom * den);
  let variables = expr.terms.map(
    termino =>
      termino.coefficients[0].numer / (termino.coefficients[0].denom * den)
  );
  variables.push(constante);
  return variables;
};

const ecuacionLagrange = matrix => {
  let ecuacion = '';
  let n = matrix.length;
  for (let i = 0; i < n; i++) {
    var componente = 0;
    for (let j = 0; j < n; j++) componente += matrix[j][i];
    ecuacion += `+${componente}x^${n - 1 - i} `;
  }
  ecuacion = correccionSignos(ecuacion);
  console.log('Ecuacion Simplificada');
  console.log(ecuacion);
  return ecuacion;
};

const lagrange = (funcion, puntosX, punto) => {
  let puntos = crearPuntos(funcion, puntosX);
  let matrix = matrizLagrange(puntos);
  let ecuacion = ecuacionLagrange(matrix);
  let px = math.parse(ecuacion).compile();
  let scope = { x: punto };
  let solucion = px.evaluate(scope);

  console.log('Solucion');
  console.log(solucion);
};

module.exports = { lagrange };
