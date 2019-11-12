const math = require('mathjs');
const {
  gaussPivotevoTotal,
  gaussPivotevoParcial
} = require('../sistemasDeEcuaciones/index');
const { correccionSignos, crearPuntos } = require('./auxiliares');

const matrizVandermonde = puntos => {
  let matrix = puntos.map((punto, index) => {
    let fila = [];
    for (let i = 0; i < puntos.length; i++) fila.unshift(punto.x ** i);
    fila.push(punto.y);
    return fila;
  });
  return matrix;
};

const ecuacionVandermonde = matrix => {
  let componentes = gaussPivotevoParcial(matrix).solution;
  if (componentes.includes(NaN)) return false;

  let ecuacion = '';
  let componentesObj = componentes.map((item, idx) => {
    var x =
      componentes.length - 1 - idx != 0
        ? `x^${componentes.length - 1 - idx}`
        : '';
    ecuacion += '+' + item + x;
    return { number: item, variable: x };
  });
  ecuacion = correccionSignos(ecuacion);
  return { ecuacion, componentes: componentesObj };
};

const vandermonde = points => {
  let puntos = crearPuntos(points);
  let matrix = matrizVandermonde(puntos);
  let { ecuacion, componentes } = ecuacionVandermonde(matrix);
  let error = !ecuacion && !componentes ? true : false;
  return { error, matrix, ecuacion, componentes };
};

module.exports = { vandermonde };
