const math = require('mathjs');
const { gaussPivotevoTotal } = require('../sistemasDeEcuaciones/index');
const {
  crearPuntos,
  correccionSignos,
  simplificaExpr
} = require('./auxiliares');

const matrizVandermonde = puntos => {
  let matrix = puntos.map((punto, index) => {
    let fila = [];
    for (let i = 0; i < puntos.length; i++) fila.unshift(punto.x ** i);
    fila.push(punto.y);
    return fila;
  });
  console.log('matrix');
  console.table(matrix);
  return matrix;
};

const ecuacionVandermonde = matrix => {
  let componentes = gaussPivotevoTotal(matrix);
  if (componentes.includes(NaN)) return false;
  let ecuacion = '';
  console.log('Components', componentes);
  let n = componentes.length - 1;
  for (let i = 0; i <= n; i++) {
    ecuacion +=
      componentes[i] != 0
        ? correccionSignos(`+${componentes[i]}x^${n - i}`)
        : '';
  }
  console.log('Polynomial');
  console.log(ecuacion);
  return ecuacion;
};

const vandermonde = (funcion, puntosX, punto) => {
  // let puntos = crearPuntos(funcion, puntosX);
  let puntos = [
    { x: -1, y: 15.5 },
    { x: 0, y: 3 },
    { x: 3, y: 8 },
    { x: 4, y: 1 }
  ];
  console.log('Points');
  console.table(puntos);
  let matrix = matrizVandermonde(puntos);
  let ecuacion = ecuacionVandermonde(matrix);
  let px = math.parse(ecuacion).compile();
  let scope = { x: punto };
  let solucion = px.evaluate(scope);

  // console.log(solucion);
};

module.exports = { vandermonde };
