const math = require('mathjs');

//Crear algoritmo para pasar ecuacion a matrix

let ecuacion1 = {
  parteIzq: '14x1 + 6x2 - 2x3 + 3x4',
  parteDer: '12'
};
const functionF = math.parse(ecuacion1.parteIzq);
const code2 = functionF.compile();
let scope = {
  x1: 1,
  x2: 1,
  x3: 2,
  x4: 3
};

fx1 = code2.evaluate(scope);
// console.log(functionF.toString());

let m = [
  [14, 6, -2, 3, 12], //14
  [3, 15, 2, -5, 32], //15
  [-7, 4, -23, 2, -24], //-23
  [1, -3, -2, 16, 14] // 16
];

// let m = [[1, 2, 3], [4, 1, 6], [7, 8, 1]];

let gauss = matrix => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      let multiplicador = matrix[i][j];
      for (let h = 0; h < matrix[i].length; h++) {
        matrix[i][h] = matrix[i][h] - multiplicador * matrix[j][h];
        matrix[i][h] = parseFloat(matrix[i][h].toFixed(2));
      }
    }

    let divisor = matrix[i][i];
    for (let k = 0; k < matrix[i].length; k++) {
      matrix[i][k] = matrix[i][k] / divisor;
      matrix[i][k] = parseFloat(matrix[i][k].toFixed(2));
    }
  }
  console.log(matrix);
};

gauss(m);
