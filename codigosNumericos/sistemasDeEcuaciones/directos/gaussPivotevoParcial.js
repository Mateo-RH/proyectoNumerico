const { pivoteoParcial, sustitucionRegresiva } = require('./auxiliares');

// Matriz aumentada
let gaussPivotevoParcial = matrix => {
  let n = matrix.length;
  console.log('Augmented matrix');
  console.log(matrix);

  for (let k = 0; k < n - 1; k++) {
    console.log('Stage', k + 1);
    matrix = pivoteoParcial(matrix, k);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    console.log(matrix);
  }
  console.log('Solution');
  let solution = sustitucionRegresiva(matrix);
  console.log(solution);
  return solution;
};

module.exports = gaussPivotevoParcial;
