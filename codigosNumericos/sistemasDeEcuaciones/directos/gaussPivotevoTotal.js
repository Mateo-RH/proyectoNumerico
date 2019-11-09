const {
  pivoteoTotal,
  sustitucionRegresiva,
  ampliarMatriz
} = require('./auxiliares');

// Matriz aumentada
// TODO: las marcas estan fallando
let gaussPivotevoTotal = (matrix, vector) => {
  matrix = ampliarMatriz(matrix, vector);
  let augmentedMatrix = matrix.map(item => item.slice());
  let stages = [];
  let n = matrix.length;
  let marcas = matrix.map((element, index) => index);
  let error = false;

  for (let k = 0; k < n - 1; k++) {
    console.log('Antes');
    console.table(matrix);
    console.log(marcas);
    matrix = pivoteoTotal(matrix, k, marcas);
    console.log('Despues');
    console.table(matrix);
    console.log(marcas);
    for (let i = k + 1; i < n; i++) {
      if (matrix[i][k] == 0 && matrix[k][k] == 0) error = true;
      var multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    var stageMatrix = matrix.map(item => item.slice());
    stages.push(stageMatrix);
  }
  let solution = sustitucionRegresiva(matrix);
  let solucionDistribuida = solution.map(
    (elemento, idx) => solution[marcas[idx]]
  );
  if (solution.includes(NaN)) error = true;
  return { error, augmentedMatrix, stages, solution: solucionDistribuida };
};

module.exports = gaussPivotevoTotal;
