const { pivoteoTotal, sustitucionRegresiva } = require('./auxiliares');

// Matriz aumentada
let gaussPivotevoTotal = matrix => {
  let n = matrix.length;
  let marcas = matrix.map((element, index) => index + 1);

  for (let k = 0; k < n - 1; k++) {
    matrix = pivoteoTotal(matrix, k, marcas);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
  }
  let solution = sustitucionRegresiva(matrix);
  let solucionDistribuida = solution.map((elemento, idx) => {
    return solution[marcas[idx] - 1];
  });
  return solucionDistribuida;
};

module.exports = gaussPivotevoTotal;
