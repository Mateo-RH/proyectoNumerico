const gaussSimple = require('./directos/gaussSimple');
const gaussPivotevoParcial = require('./directos/gaussPivotevoParcial');
const gaussPivotevoTotal = require('./directos/gaussPivotevoTotal');
const factorizacionMatrices = require('./directos/factorizacionMatrices');
const factorizacionMatricesPivoteo = require('./directos/factorizacionMatricesPivoteo');
const factorizacionCrout = require('./directos/factorizacionCrout');
const factorizacionDoolittle = require('./directos/factorizacionDoolittle');
const factorizacionCholesky = require('./directos/factorizacionCholesky');
const jacobi = require('./iterativos/jacobi');
const gaussSeidel = require('./iterativos/gaussSeidel');

let m = [[4, -1, 0, 3], [1, 15.5, 3, 8], [0, -1.3, -4, 1.1], [14, 5, -2, 30]];
let m1 = [[4, -1, 0], [1, 15.5, 3], [0, -1.3, -4]];
let m2 = [[4, -1, 0], [1, 15.5, 3], [0, -1.3, -4]];
let b = [1, 1, 1, 1];
let b1 = [1, 1, 1];
let b2 = [1, 1, 1];
let x0 = [0, 0, 0, 0];
let tol = 0.0000001;
let nMax = 100;
let tabla = [
  { x: -1, y: 15.5 },
  { x: 0, y: 3 },
  { x: 3, y: 8 },
  { x: 4, y: 1 }
];

// TODO: GAUSSTOTAL ESTA DANDO LIDIA SOLO EN EL FRONT IMPRIME EN DESORDEN
// let resp = gaussSimple(m, b);
let resp1 = gaussPivotevoParcial(m1, b1);
let resp2 = gaussPivotevoTotal(m2, b2);
// let resp = factorizacionMatrices(m, b);
// let resp = factorizacionMatricesPivoteo(m, b);
// let resp = factorizacionCrout(m, b);
// let resp = factorizacionDoolittle(m, b);
// let resp = factorizacionCholesky(m, b);
// let resp = jacobi(tol, x0, nMax, m, b, 2);
console.log(resp1);
console.log(resp2);
// console.log('GAUSS-SEIDEL');
// gaussSeidel(tol, x0, nMax, m, b, 2);
// console.log('SOR');
// gaussSeidel(tol, x0, nMax, m, b, 2, 1.5);

module.exports = {
  gaussSimple,
  gaussPivotevoParcial,
  gaussPivotevoTotal,
  factorizacionMatrices,
  factorizacionMatricesPivoteo,
  factorizacionCrout,
  factorizacionDoolittle,
  factorizacionCholesky,
  jacobi,
  gaussSeidel
};
