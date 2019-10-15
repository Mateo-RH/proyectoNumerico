const gaussSimple = require('./directos/gaussSimple');
const gaussPivotevoParcial = require('./directos/gaussPivotevoParcial');
const gaussPivotevoTotal = require('./directos/gaussPivotevoTotal');
const factorizacionMatrices = require('./directos/factorizacionMatrices');
const factorizacionMatricesPivoteo = require('./directos/factorizacionMatricesPivoteo');
const factorizacionCrout = require('./directos/factorizacionCrout');
const factorizacionDoolittle = require('./directos/factorizacionDoolittle');
const factorizacionCholesky = require('./directos/factorizacionCholesky');

// Testeando un roce
let m = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m2 = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m3 = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m4 = [
  [4, 0, 0, 0, 12],
  [3, 12, 0, 0, 23],
  [-7, -3, -4, 0, -5],
  [1, -2, -5, 6, 8]
];

let m5 = [[4, 3, -2, -7], [3, 12, 8, -3], [2, 3, -9, 2], [1, -2, -5, 6]];
let b = [20, 18, 31, 12];

let m6 = [[-7, 2, -3, 4], [5, -1, 14, -1], [1, 9, -7, 5], [-12, 13, -8, -4]];
let b2 = [-12, 13, 31, -32];

let m7 = [[36, 3, -4, 5], [5, -45, 10, -2], [6, 8, 57, 5], [2, 3, -8, -42]];

// console.log('SIMPLE');
// gaussSimple(m);
// console.log('PARCIAL');
// gaussPivotevoParcial(m2);
// console.log('TOTAL');
// gaussPivotevoTotal(m3);
// console.log('LU-SIMPLE');
// factorizacionMatrices(m5, b);
// console.log('LU-PIVOTEO');
// factorizacionMatricesPivoteo(m6, b2);
// console.log('CROUT');
// factorizacionCrout(m5, b);
// console.log('DOOLITTLE');
// factorizacionDoolittle(m5, b);
// console.log('CHOLESKY');
// factorizacionCholesky(m5, b);


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
