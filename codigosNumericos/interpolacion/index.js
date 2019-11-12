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
// let resp = vandermonde(puntos);
// let resp = newton(puntos);
// let resp = lagrange(points);
// let resp = splineLineal(points);
// let resp = splineCuadratico(points);
// let resp = splineCubico(points);
// console.log(resp);

module.exports = {
  vandermonde,
  newton,
  lagrange,
  splineLineal,
  splineCuadratico,
  splineCubico
};
