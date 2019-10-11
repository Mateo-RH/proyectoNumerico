const { pivoteoSimple, sustitucionRegresiva } = require('./auxiliares');

// Recibe matriz ampliada
let gaussSimple = matrix => {
  let n = matrix.length;
  console.log('Augmented matrix');
  console.log(matrix);
  for (let k = 0; k < n - 1; k++) {
    // 0,1,2 < 3 -> k diagonal
    console.log('Stage', k + 1);
    for (let i = k + 1; i < n; i++) {
      // 1,2,3 < 4 -> i filas
      if (matrix[k][k] == 0) pivoteoSimple(matrix, k);
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        // 0,1,2,3,4 < 5 -> j columnas
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

module.exports = gaussSimple;
