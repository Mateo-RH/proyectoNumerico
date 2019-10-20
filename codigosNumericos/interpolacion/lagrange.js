const math = require('mathjs');
const {
  simplificaExpr,
  correccionSignos,
  crearPuntos
} = require('./auxiliares');

const ecuacionLagrange = puntos => {
  let puntosY = [];
  let puntosX = puntos.map(punto => {
    puntosY.push(punto.y);
    return punto.x;
  });

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
    num = simplificaExpr(num);
    ecuacion += `+((${num})/${den.toFixed(5)})(${puntosY[i].toFixed(5)})`;
  }

  console.log('Ecuacion');
  console.log(ecuacion);
  return ecuacion;
};

const funcion = '(e^x)-6x';
const puntosX = [2, -2.2, 2.4, 2.6, 2.8];

let puntos = crearPuntos(funcion, puntosX);
let ecuacion = ecuacionLagrange(puntos);
let px = math.parse(ecuacion).compile();
let scope = { x: 2.5 };
let solucion = px.evaluate(scope);

console.log('Solucion');
console.log(solucion);
