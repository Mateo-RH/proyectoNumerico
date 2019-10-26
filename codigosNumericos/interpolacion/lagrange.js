const math = require('mathjs');
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
    num = `${num}(${puntosY[i]})`;
    ecuacion += `+((${num})/${den.toFixed(5)})(${puntosY[i].toFixed(5)})`;
    num = simplificaExprLagrange(num, den, n);
    if (!num) return false;
    matrix.push(num);
  }

  console.log('Polynomial');
  console.log(ecuacion);
  // console.log('Matrix Coeficientes simplificados');
  // console.table(matrix);
  return matrix;
};

const simplificaExprLagrange = (expr, den, cantidadPuntos) => {
  if (expr[0] == '+') expr = expr.substring(1);
  expr = algebra.parse(expr);
  let maximoExponente = cantidadPuntos - 1;
  let constante = !!expr.constants[0]
    ? expr.constants[0].numer / (expr.constants[0].denom * den)
    : 0;
  let variables = new Array(maximoExponente).fill(0);
  expr.terms.forEach(termino => {
    var indice = maximoExponente - termino.variables[0].degree;
    variables[indice] =
      termino.coefficients[0].numer / (termino.coefficients[0].denom * den);
  });
  // iterates over each element from 0 to the length of the array (unlike map, which only iterates over properties that are actually on the array)
  if (variables.includes(Infinity)) return false;
  variables.push(constante);
  return variables;
};

const ecuacionLagrange = matrix => {
  let ecuacion = '';
  let n = matrix.length;
  for (let i = 0; i < n; i++) {
    var componente = 0;
    for (let j = 0; j < n; j++) {
      componente += matrix[j][i];
    }
    ecuacion += `+${componente}x^${n - 1 - i} `;
  }
  ecuacion = correccionSignos(ecuacion);
  console.log('Simplified polynomial');
  console.log(ecuacion);
  return ecuacion;
};

const lagrange = (funcion, puntosX, punto) => {
  // let puntos = crearPuntos(funcion, puntosX);
  let puntos = [
    { x: -1, y: 15.5 },
    { x: 0, y: 3 },
    { x: 3, y: 8 },
    { x: 4, y: 1 }
  ];
  console.log('Points');
  console.table(puntos);
  let matrix = matrizLagrange(puntos);
  if (!matrix) console.log('GG, infinito');
  let ecuacion = ecuacionLagrange(matrix);
  let px = math.parse(ecuacion).compile();
  let scope = { x: punto };
  let solucion = px.evaluate(scope);

  // console.log('Solucion');
  // console.log(solucion);
};

module.exports = { lagrange };
