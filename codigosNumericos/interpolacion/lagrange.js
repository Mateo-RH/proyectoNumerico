const math = require('mathjs');
const algebra = require('algebra.js');

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
        num += `(x - ${puntosX[j]})`;
        den *= puntosX[i] - puntosX[j];
      }
    }
    num = simplificarLagrange(num);
    ecuacion += `+((${num})/${den})(${puntosY[i]})`;
  }

  console.log('Ecuacion', ecuacion);
  return ecuacion;
};

const simplificarLagrange = num => {
  num = algebra.parse(num).toString();
  num = math.simplify(num, {}, { exactFractions: false }).toString();
  num = num.split(' ').join('');
  num = num.split('++').join('+');
  num = num.split('+-').join('-');
  num = num.split('-+').join('-');
  num = num.split('--').join('+');
  num = num.split('+').join(' + ');
  num = num.split('-').join(' - ');
  return num;
};

const funcion = '(e^x)-6x';
const puntosX = [2, 2.2, 2.4, 2.6, 2.8];

let puntos = crearPuntos(funcion, puntosX);
let ecuacion = ecuacionLagrange(puntos);
let px = math.parse(ecuacion).compile();
let scope = { x: 2.5 };
let solucion = px.evaluate(scope);

console.log(solucion);
