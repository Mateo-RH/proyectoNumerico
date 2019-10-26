const { vandermonde } = require('./vandermonde');
const { newton } = require('./newton');
const { lagrange } = require('./lagrange');
const { splineLineal } = require('./splineLineal');

const funcion = '3x^2 - 5';
const puntosX = [-1, 0, 1, 2];
const punto = 1;

// console.log('VANDERMONDE');
// vandermonde(funcion, puntosX, punto);
// console.log('NEWTON');
// newton(funcion, puntosX, punto);
// console.log('LAGRANGE');
// lagrange(funcion, puntosX, punto);

let puntos = [
  { x: -1, y: 15.5 },
  { x: 0, y: 3 },
  { x: 3, y: 8 },
  { x: 4, y: 1 }
];
console.log('Lineal Spline');
console.log('Points');
console.table(puntos);
splineLineal(puntos);

module.exports = { vandermonde, newton, lagrange };
