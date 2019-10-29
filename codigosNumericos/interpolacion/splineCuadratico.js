const { gaussSimple } = require('../sistemasDeEcuaciones/index');
const { correccionSignos } = require('./auxiliares');

const splineCuadraticoMatrix = puntos => {
  let matrix = [];
  let numeroPolinomios = puntos.length - 1;
  let posicion = 0;

  // PX
  puntos.forEach((punto, i) => {
    var fila = new Array(3 * numeroPolinomios).fill(0);
    fila = polinomioPx(fila, posicion, punto);
    matrix.push(fila);

    if (matrix.length % 2 == 0) posicion += 3;
    if (i > 0 && i < numeroPolinomios) {
      fila = new Array(3 * numeroPolinomios).fill(0);
      fila = polinomioPx(fila, posicion, punto);
      matrix.push(fila);
    }
  });

  // DPX
  let matrixD = [];
  posicion = 0;
  puntos.forEach((punto, i) => {
    if (i > 0 && i < numeroPolinomios) {
      fila = new Array(3 * numeroPolinomios).fill(0);
      fila = polinomioPxD(fila, posicion, punto);
      matrixD.push(fila);
      posicion += 3;
    }
  });
  matrixD.forEach(fila => matrix.push(fila));

  frontera(matrix, numeroPolinomios);

  console.log('Matrix');
  console.table(matrix);
  return matrix;
};

const splineCuadraticoPolinomios = componentes => {
  let polinomios = [];
  for (let i = 0; i < componentes.length; i += 3) {
    var polinomio = `${componentes[i]}x^2 +${componentes[i + 1]}x +${
      componentes[i + 2]
    }`;
    polinomio = correccionSignos(polinomio);
    polinomios.push(polinomio);
  }
  console.log('Polynomials');
  console.table(polinomios);
  return polinomios;
};

const polinomioPx = (fila, posicion, punto) => {
  fila[posicion] = punto.x ** 2;
  fila[posicion + 1] = punto.x;
  fila[posicion + 2] = 1;
  fila.push(punto.y);
  return fila;
};

const polinomioPxD = (fila, posicion, punto) => {
  fila[posicion] = punto.x * 2;
  fila[posicion + 1] = 1;
  fila[posicion + 3] = -punto.x * 2;
  fila[posicion + 4] = -1;
  fila.push(0);
  return fila;
};

const frontera = (matrix, numeroPolinomios) => {
  let frontera = new Array(3 * numeroPolinomios).fill(0);
  frontera[0] = 2;
  frontera.push(0);
  matrix.push(frontera);
};

const splineCuadratico = puntos => {
  console.log('Points');
  console.table(puntos);
  let matrix = splineCuadraticoMatrix(puntos);
  let componentes = gaussSimple(matrix);
  let polinomios = splineCuadraticoPolinomios(componentes);
};

const puntos = [
  { x: -1, y: 15.5 },
  { x: 0, y: 3 },
  { x: 3, y: 8 },
  { x: 4, y: 1 }
];

splineCuadratico(puntos);
