const { vandermonde } = require('./vandermonde');
const { newton } = require('./newton');
const { lagrange } = require('./lagrange');

// const funcion = '(e^x)-6x';
const funcion = '-9 + 21.09x - 35.16x^2 + 21.95x^3 + 5.333x^4 + 0.44x^5';
const puntosX = [-9, -6, -3, 3, 5, 9];
const punto = 1;

// const funcion2 = '4x + 1';
// const puntosX2 = [5, 9];

console.log('VANDERMONDE');
vandermonde(funcion, puntosX, punto);
console.log('NEWTON');
newton(funcion, puntosX, punto);
console.log('LAGRANGE');
lagrange(funcion, puntosX, punto);

module.exports = { vandermonde, newton, lagrange };
