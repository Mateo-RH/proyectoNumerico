const math = require('mathjs');
const { gaussPivotevoTotal } = require('../sistemasDeEcuaciones/index');
const {
  crearPuntos,
  correccionSignos,
  simplificaExpr
} = require('./auxiliares');

// Metodo para crear matriz vandermonde
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

// Metodo resuelve matrix por gauss(el de tu preferencia) y nos devuelve la ecuacion vandermonde(?)
const ecuacionVandermonde = matrix => {
  let componentes = gaussPivotevoTotal(matrix);
  if (componentes.includes(NaN)) return false;
  let ecuacion = '';
  console.log('componentes', componentes);
  let n = componentes.length - 1;
  for (let i = 0; i <= n; i++) {
    ecuacion +=
      componentes[i] != 0
        ? correccionSignos(`+${componentes[i]}x^${n - i}`)
        : '';
    // ecuacion += correccionSignos(`+${componentes[i]}x^${n - i}`);
  }
  console.log('Ecuacion');
  console.log(ecuacion);
  return ecuacion;
};

// TODO: SIMPLIFICA VANDERMONDE Y EL PUTO LAGRANGE
const vandermonde = (funcion, puntosX, punto) => {
  let puntos = crearPuntos(funcion, puntosX);
  let matrix = matrizVandermonde(puntos);
  let ecuacion = ecuacionVandermonde(matrix);
  let px = math.parse(ecuacion).compile();
  let scope = { x: punto };
  let solucion = px.evaluate(scope);

  console.log(solucion);
};

module.exports = { vandermonde };