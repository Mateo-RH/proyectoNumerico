const math = require('mathjs');

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

const newton = puntos => {
  let matrix = puntos.map((punto, index) => {
    let fila = new Array(puntos.length).fill(0);
    fila[0] = punto.x;
    fila[1] = punto.y;
    return fila;
  });

  for (let i = 1; i < matrix.length; i++) {
    for (let j = i; j < matrix.length; j++) {
      matrix[j][i + 1] =
        (matrix[j][i] - matrix[j - 1][i]) / (matrix[j][0] - matrix[j - i][0]);
    }
  }

  console.table(matrix);
  return matrix;
};

const ecuacionNewton = matrix => {
  let componentes = matrix.map((fila, idxF) => fila[idxF + 1]);
  let ecuacion = '';
  let n = componentes.length - 1;
  for (let i = 0; i <= n; i++) {
    var producto = '';
    for (let j = 0; j < i; j++) {
      var signo = matrix[j][0] < 0 ? '+' : '-';
      producto += `(x${signo}${matrix[j][0]})`;
    }
    ecuacion += `+(${componentes[i]}${producto})`;
  }
  console.log('ecuacion', ecuacion);
  return ecuacion;
};

const funcion = '(e^x)-6x';
const puntosX = [2, 2.2, 2.4, 2.6, 2.8, 3];

let puntos = crearPuntos(funcion, puntosX);
let matrix = newton(puntos);
let ecuacion = ecuacionNewton(matrix);
let px = math.parse(ecuacion).compile();
let scope = { x: 2.5 };
let solucion = px.evaluate(scope);

console.log(ecuacion);
console.log(solucion);
