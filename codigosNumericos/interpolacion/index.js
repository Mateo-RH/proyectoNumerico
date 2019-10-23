const { vandermonde } = require('./vandermonde');
const { newton } = require('./newton');
const { lagrange } = require('./lagrange');

const funcion = '3x^2 - 5';
const puntosX = [-1, 0, 1, 2];
const punto = 1;

// console.log('VANDERMONDE');
// vandermonde(funcion, puntosX, punto);
// console.log('NEWTON');
// newton(funcion, puntosX, punto);
console.log('LAGRANGE');
lagrange(funcion, puntosX, punto);

module.exports = { vandermonde, newton, lagrange };
