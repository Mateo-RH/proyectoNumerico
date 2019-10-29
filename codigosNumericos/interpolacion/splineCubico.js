const { gaussSimple } = require('../sistemasDeEcuaciones/index');
const { correccionSignos } = require('./auxiliares');
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
  console.log('Matrix');
  console.table(matrix);
  return matrix;
};

const splineCubicoPolinomios = componentes => {
  let polinomios = [];
  for (let i = 0; i < componentes.length; i += 4) {
    var polinomio = `${componentes[i]}x^3 +${componentes[i + 1]}x^2 +${
      componentes[i + 2]
    }x +${componentes[i + 3]}`;
    polinomio = correccionSignos(polinomio);
    polinomios.push(polinomio);
  }
  console.log('Polynomials');
  console.table(polinomios);
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

const splineCubico = puntos => {
  console.log('Points');
  console.table(puntos);
  let matrix = splineCubicoMatrix(puntos);
  let componentes = gaussSimple(matrix);
  let polinomios = splineCubicoPolinomios(componentes);
};

const puntos = [
  { x: -1, y: 15.5 },
  { x: 0, y: 3 },
  { x: 3, y: 8 },
  { x: 4, y: 1 }
];

splineCubico(puntos);
