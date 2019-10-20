const { gaussSimple } = require('../sistemasDeEcuaciones/index');

const splinerCuadratico = puntos => {
  let matrix = puntos.map(punto => [punto.x ** 2, punto.x, 1, punto.y]);
  let matrix2 = puntos.map(punto => [2 * punto.x, 1]);

  console.log(matrix);
  console.log(matrix2);
};

const puntos = [
  { x: 1, y: 4.31 },
  { x: 3, y: 1.5 },
  { x: 4, y: 3.2 },
  { x: 5, y: 2.6 },
  { x: 7, y: 1.8 }
];

splinerCuadratico(puntos);
