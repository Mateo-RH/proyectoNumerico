const { vandermonde } = require('./vandermonde');
const { newton } = require('./newton');
const { lagrange } = require('./lagrange');

const funcion = '-9 + 11.1x - 15.67x^2 + 9.71x^3 + 2.33x^4 + 0.19x^5';
const puntosX = [-9, -6, -3, 3, 5, 9];
const punto = 1;

console.log('VANDERMONDE');
vandermonde(funcion, puntosX, punto);
console.log('NEWTON');
newton(funcion, puntosX, punto);
// console.log('LAGRANGE');
// lagrange(funcion, puntosX, punto);

module.exports = { vandermonde, newton, lagrange };
