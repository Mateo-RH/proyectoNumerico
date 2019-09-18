const math = require('mathjs');

// TODO: Crear algoritmo para pasar ecuacion a matrix

let m = [
  [14, 6, -2, 3, 12],
  [3, 15, 2, -5, 32],
  [-7, 4, -23, 2, -24],
  [1, -3, -2, 16, 14]
];

let m2 = [
  [-7, 3, -3, 4, -12],
  [5, -1, 14, -1, 13],
  [1, 9, -7, 5, 31],
  [-12, 13, -8, -4, -32]
];

let m3 = [
  [-7, 2, -3, 4, -12],
  [5, -1, 14, -1, 13],
  [1, 9, -7, 13, 31],
  [-12, 13, -8, -4, -32]
];

let gauss = matrix => {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < i; j++) {
      let multiplicador = matrix[i][j];
      for (let h = 0; h < matrix[i].length; h++) {
        matrix[i][h] = matrix[i][h] - multiplicador * matrix[j][h];
        // matrix[i][h] = parseFloat(matrix[i][h].toFixed(2));
      }
    }

    let divisor = matrix[i][i];
    for (let k = 0; k < matrix[i].length; k++) {
      matrix[i][k] = matrix[i][k] / divisor;
      // matrix[i][k] = parseFloat(matrix[i][k].toFixed(2));
    }
  }
  console.log(matrix);
};

let gaussSimple = matrix => {
  let n = matrix.length;
  console.log('Augmented matrix');
  console.log(matrix);
  for (let k = 0; k < n - 1; k++) {
    console.log('Stage', k + 1);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
        // matrix[i][j] = parseFloat(matrix[i][j].toFixed(2));
      }
    }
    console.log(matrix);
  }
  console.log('Solution');
  let solution = sustitucionRegresiva(matrix);
  console.log(solution);
  return solution;
};

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
        // matrix[i][j] = parseFloat(matrix[i][j].toFixed(2));
      }
    }
    console.log(matrix);
  }
  console.log('Solution');
  let solution = sustitucionRegresiva(matrix);
  console.log(solution);
  return solution;
};

let gaussPivotevoTotal = matrix => {
  let n = matrix.length;
  console.log('Augmented matrix');
  console.log(matrix);

  for (let k = 0; k < n - 1; k++) {
    console.log('Stage', k + 1);

    matrix = pivoteoTotal(matrix, k);
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      for (let j = k; j < n + 1; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
        // matrix[i][j] = parseFloat(matrix[i][j].toFixed(2));
      }
    }
    console.log(matrix);
  }
  console.log('Solution');
  let solution = sustitucionRegresiva(matrix);
  console.log(solution);
  return solution;
};

let pivoteoParcial = (matrix, k) => {
  let n = matrix.length;
  let mayor = math.abs(matrix[k][k]);
  let filaMayor = k;
  for (let s = k + 1; s < n; s++) {
    if (math.abs(matrix[s][k]) > mayor) {
      mayor = math.abs(matrix[s][k]);
      filaMayor = s;
    }
  }
  if (mayor == 0) {
    console.log('The system doesnt have an unique solution');
    return false;
  } else {
    if (filaMayor != k) {
      matrix = intercambioFilas(matrix, filaMayor, k);
    }
    return matrix;
  }
};

let pivoteoTotal = (matrix, k) => {
  let mayor = 0;
  let n = matrix.length;
  let filaMayor = k;
  let columnaMayor = k;
  for (let r = k; r < n; r++) {
    for (let s = k; s < n; s++) {
      if (math.abs(matrix[r][s]) > mayor) {
        mayor = math.abs(matrix[r][s]);
        filaMayor = r;
        columnaMayor = s;
      }
    }
  }
  if ((mayor = 0)) {
    console.log('The system doesnt have an unique solution');
    return false;
  } else {
    if (filaMayor != k) {
      matrix = intercambioFilas(matrix, filaMayor, k);
    }
    if (columnaMayor != k) {
      matrix = intercambioColumnas(matrix, columnaMayor, k);
      // marcas = intercambioMarcas(marcas, columnaMayor, k);
    }
    return matrix;
  }
};

let intercambioFilas = (matrix, filaNueva, filaVieja) => {
  let temp = matrix[filaVieja];
  matrix[filaVieja] = matrix[filaNueva];
  matrix[filaNueva] = temp;
  return matrix;
};

let intercambioColumnas = (matrix, columnaNueva, columnaVieja) => {
  for (let i = 0; i < matrix.length; i++) {
    let temp = matrix[i][columnaVieja];
    matrix[i][columnaVieja] = matrix[i][columnaNueva];
    matrix[i][columnaNueva] = temp;
  }
  return matrix;
};

let sustitucionRegresiva = matrix => {
  let n = matrix.length - 1;
  var x = [];
  x[n] = matrix[n][n + 1] / matrix[n][n];
  for (let i = n - 1; i >= 0; i--) {
    let sumatoria = 0;
    for (let p = i + 1; p < n + 1; p++) {
      sumatoria = sumatoria + matrix[i][p] * x[p];
    }
    x[i] = (matrix[i][n + 1] - sumatoria) / matrix[i][i];
  }
  return x;
};

// gaussSimple(m);
// gaussPivotevoParcial(m2);
// gaussPivotevoTotal(m3);
