const {
  pivoteoTotal,
  sustitucionRegresiva,
  ampliarMatriz
} = require('./auxiliares');

// Matriz aumentada
// TODO: splines no funcionan con esto
let gaussPivotevoTotal = (matrix, vector) => {
  matrix = ampliarMatriz(matrix, vector);
  let augmentedMatrix = matrix.map(item => item.slice());
  let stages = [];
  let n = matrix.length;
  let marcas = matrix.map((element, index) => index + 1);
  let error = false;

  for (let k = 0; k < n - 1; k++) {
    matrix = pivoteoTotal(matrix, k, marcas);
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
    (elemento, idx) => solution[marcas[idx] - 1]
  );
  if (solucionDistribuida.includes(null)) error = true;
  return { error, augmentedMatrix, stages, solution: solucionDistribuida };
};

module.exports = gaussPivotevoTotal;
