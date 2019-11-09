const {
  pivoteoParcial,
  sustitucionRegresiva,
  ampliarMatriz
} = require('./auxiliares');

// Matriz aumentada
let gaussPivotevoParcial = (matrix, vector) => {
  matrix = ampliarMatriz(matrix, vector);
  let augmentedMatrix = matrix.map(item => item.slice());
  let stages = [];
  let n = matrix.length;
  let error = false;

  for (let k = 0; k < n - 1; k++) {
    matrix = pivoteoParcial(matrix, k);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    var stageMatrix = matrix.map(item => item.slice());
    stages.push(stageMatrix);
  }
  let solution = sustitucionRegresiva(matrix);
  if (solution.includes(NaN)) error = true;
  return { error, augmentedMatrix, stages, solution };
};

module.exports = gaussPivotevoParcial;
