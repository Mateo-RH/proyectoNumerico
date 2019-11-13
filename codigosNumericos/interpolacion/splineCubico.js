const { gaussSimple } = require('../sistemasDeEcuaciones/index');
const {
  correccionSignos,
  crearPuntos,
  crearEcuacion
} = require('./auxiliares');
const math = require('mathjs');

const splineCubicoMatrix = puntos => {
  const numeroPolinomios = puntos.length - 1;
  let matrix = [];
  let posicion = 0;
  let fila;

  // PX
  puntos.forEach((punto, i) => {
    fila = polinomioPx(numeroPolinomios, posicion, punto);
    matrix.push(fila);

    if (matrix.length % 2 == 0) posicion += 4;
    if (i > 0 && i < numeroPolinomios) {
      fila = polinomioPx(numeroPolinomios, posicion, punto);
      matrix.push(fila);
    }
  });

  // DPX / DDPX
  let matrixD = [];
  let matrixDD = [];
  posicion = 0;
  puntos.forEach((punto, i) => {
    if (i > 0 && i < numeroPolinomios) {
      fila = polinomioDPx(numeroPolinomios, posicion, punto);
      matrixD.push(fila);

      fila = polinomioDDPx(numeroPolinomios, posicion, punto);
      matrixDD.push(fila);
      posicion += 4;
    }
  });

  // MERGE
  matrixD.forEach(F => matrix.push(F));
  matrixDD.forEach(F => matrix.push(F));

  // Frontera
  frontera(numeroPolinomios, matrix);
  return matrix;
};

const splineCubicoPolinomios = componentes => {
  let polinomios = [];
  for (let i = 0; i < componentes.length; i += 4) {
    var polinomio = `${parseFloat(componentes[i]).toFixed(4)}x^3 +${parseFloat(
      componentes[i + 1]
    ).toFixed(4)}x^2 +${parseFloat(componentes[i + 2]).toFixed(
      4
    )}x +${parseFloat(componentes[i + 3]).toFixed(4)}`;
    polinomio = correccionSignos(polinomio);
    polinomios.push(polinomio);
  }
  return polinomios;
};

const polinomioPx = (numeroPolinomios, posicion, punto) => {
  let fila = new Array(4 * numeroPolinomios).fill(0);
  fila[posicion] = punto.x ** 3;
  fila[posicion + 1] = punto.x ** 2;
  fila[posicion + 2] = punto.x;
  fila[posicion + 3] = 1;
  fila.push(punto.y);
  return fila;
};

const polinomioDPx = (numeroPolinomios, posicion, punto) => {
  let fila = new Array(4 * numeroPolinomios).fill(0);
  fila[posicion] = math.multiply(3, punto.x ** 2);
  fila[posicion + 1] = 2 * punto.x;
  fila[posicion + 2] = 1;
  fila[posicion + 4] = -math.multiply(3, punto.x ** 2);
  fila[posicion + 5] = -2 * punto.x;
  fila[posicion + 6] = -1;
  fila.push(0);
  return fila;
};

const polinomioDDPx = (numeroPolinomios, posicion, punto) => {
  let fila = new Array(4 * numeroPolinomios).fill(0);
  fila[posicion] = 6 * punto.x;
  fila[posicion + 1] = 2;
  fila[posicion + 4] = -6 * punto.x;
  fila[posicion + 5] = -2;
  fila.push(0);
  return fila;
};

const frontera = (numeroPolinomios, matrix) => {
  // Arreglos se pasan por referencia
  let frontera = new Array(4 * numeroPolinomios).fill(0);
  frontera[0] = 6;
  frontera[1] = 2;
  frontera.push(0);
  matrix.push(frontera);

  frontera = new Array(4 * numeroPolinomios).fill(0);
  frontera[matrix[0].length - numeroPolinomios - 1] = 6;
  frontera[matrix[0].length - numeroPolinomios] = 2;
  frontera.push(0);
  matrix.push(frontera);
};

const splineCubico = points => {
  let puntos = crearPuntos(points);
  let matrix = splineCubicoMatrix(puntos);
  let componentes = gaussSimple(matrix).solution;
  let polinomios = splineCubicoPolinomios(componentes);
  let ecuacion = crearEcuacion(polinomios);

  return { error: false, polinomios, ecuacion };
};

module.exports = { splineCubico };
