const splinerCuadratico = puntos => {
  let matrix = puntos.map(punto => {
    [punto.x ** 2, punto.x, 1, punto.y];
  });
  console.log(matrix);
};

const puntos = [{ x: 3, y: 10 }, { x: 2, y: 3 }, { x: -1, y: 6 }];

splinerCuadratico(puntos);
