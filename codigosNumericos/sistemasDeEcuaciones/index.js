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
let b = [1, 1, 1, 1];
let x0 = [0, 0, 0, 0];
let tol = 0.0000001;
let nMax = 100;
let tabla = [
  { x: -1, y: 15.5 },
  { x: 0, y: 3 },
  { x: 3, y: 8 },
  { x: 4, y: 1 }
];

// console.log('SIMPLE');
// gaussSimple(m);
// console.log('PARCIAL');
// gaussPivotevoParcial(m2);
// console.log('TOTAL');
// gaussPivotevoTotal(m3);
// console.log('LU-SIMPLE');
// factorizacionMatrices(m, b);
// console.log('LU-PIVOTEO');
// factorizacionMatricesPivoteo(m, b);
// console.log('CROUT');
// factorizacionCrout(m, b);
// console.log('DOOLITTLE');
// factorizacionDoolittle(m, b);
// console.log('CHOLESKY');
// factorizacionCholesky(m, b);
// console.log('JACOBI');
// jacobi(tol, x0, nMax, m, b, 2);
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
  factorizacionCholesky
};
