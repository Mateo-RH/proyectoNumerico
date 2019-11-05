const {
  pivoteoSimple,
  sustitucionRegresiva,
  ampliarMatriz
} = require('./auxiliares');

let gaussSimple = (matrix, vector) => {
  matrix = ampliarMatriz(matrix, vector);
  let augmentedMatrix = matrix.map(item => item.slice());
  let stages = [];
  let n = matrix.length;
  let error = false;

  for (let k = 0; k < n - 1; k++) {
    for (let i = k + 1; i < n; i++) {
      if (matrix[k][k] == 0) pivoteoSimple(matrix, k);
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    // crea copia de la matrix para que no pase la referencia
    var stageMatrix = matrix.map(item => item.slice());
    stages.push(stageMatrix);
  }
  let solution = sustitucionRegresiva(matrix);
  if (solution.includes(null)) error = true;

  return { error, augmentedMatrix, stages, solution };
};

module.exports = gaussSimple;
