const { vandermonde } = require("./vandermonde");
const { newton } = require("./newton");
const { lagrange } = require("./lagrange");
const { splineLineal } = require("./splineLineal");
const { splineCuadratico } = require("./splineCuadratico");
const { splineCubico } = require("./splineCubico");

let points = [
  [-1, 15.5],
  [0, 3],
  [3, 8],
  [4, 1]
];

let p2 = [
  [1, 4.31],
  [3, 1.5],
  [4, 3.2],
  [5, 2.6],
  [7, 1.8]
];
// let resp = vandermonde(points);
let resp = newton(p2);
// let resp = lagrange(points);
// let resp = splineLineal(points);
// let resp = splineCuadratico(points);
// let resp = splineCubico(points);
console.table(resp.matrix);

module.exports = {
  vandermonde,
  newton,
  lagrange,
  splineLineal,
  splineCuadratico,
  splineCubico
};
