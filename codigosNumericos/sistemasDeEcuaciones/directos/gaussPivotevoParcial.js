const { pivoteoParcial, sustitucionRegresiva } = require('./auxiliares');

// Matriz aumentada
let gaussPivotevoParcial = matrix => {
  let n = matrix.length;

  for (let k = 0; k < n - 1; k++) {
    matrix = pivoteoParcial(matrix, k);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
  }
  let solution = sustitucionRegresiva(matrix);
  return solution;
};

module.exports = gaussPivotevoParcial;
