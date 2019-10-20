const math = require('mathjs');
const { gaussSimple } = require('../sistemasDeEcuaciones/index');
const { crearPuntos, correccionSignos } = require('./auxiliares');

// Metodo para crear matriz vandermonde
const vandermonde = puntos => {
  let matrix = puntos.map((punto, index) => {
    let fila = [];
    for (let i = 0; i < puntos.length; i++) fila.unshift(punto.x ** i);
    fila.push(punto.y);
    return fila;
  });
  console.log('matrix');
  console.table(matrix);
  return matrix;
};

// Metodo resuelve matrix por gauss(el de tu preferencia) y nos devuelve la ecuacion vandermonde(?)
const ecuacionVandermonde = matrix => {
  let componentes = gaussSimple(matrix);
  let ecuacion = '';
  let n = componentes.length - 1;
  for (let i = 0; i <= n; i++) {
    ecuacion += correccionSignos(`+${componentes[i]}x^${n - i}`);
  }
  console.log('ecuacion', ecuacion);
  return ecuacion;
};

const funcion = '(e^x)-6x';
const puntosX = [-2, -1, 2, 3];

let puntos = crearPuntos(funcion, puntosX);
let matrix = vandermonde(puntos);
let ecuacion = ecuacionVandermonde(matrix);
let px = math.parse(ecuacion).compile();
let scope = { x: 1 };
let solucion = px.evaluate(scope);

console.log(ecuacion);
console.log(solucion);
