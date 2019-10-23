const { vandermonde } = require('./vandermonde');
const { newton } = require('./newton');
const { lagrange } = require('./lagrange');

<<<<<<< HEAD
const funcion = '-9 + 11.1x - 15.67x^2 + 9.71x^3 + 2.33x^4 + 0.19x^5';
const puntosX = [-9, -6, -3, 3, 5, 9];
const punto = 1;

console.log('VANDERMONDE');
vandermonde(funcion, puntosX, punto);
console.log('NEWTON');
newton(funcion, puntosX, punto);
// console.log('LAGRANGE');
// lagrange(funcion, puntosX, punto);
=======
const funcion = '3x^2 - 5';
const puntosX = [-1, 0, 1, 2];
const punto = 1;

// console.log('VANDERMONDE');
// vandermonde(funcion, puntosX, punto);
// console.log('NEWTON');
// newton(funcion, puntosX, punto);
console.log('LAGRANGE');
lagrange(funcion, puntosX, punto);
>>>>>>> refs/remotes/origin/master

module.exports = { vandermonde, newton, lagrange };
