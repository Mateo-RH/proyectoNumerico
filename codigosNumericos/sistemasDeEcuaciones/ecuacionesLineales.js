const math = require('mathjs');

let m = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m2 = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m3 = [
  [2, -1, 0, 3, 1],
  [1, 0.5, 3, 8, 1],
  [0, 13, -2, 11, 1],
  [14, 5, -2, 3, 1]
];

let m4 = [
  [4, 0, 0, 0, 12],
  [3, 12, 0, 0, 23],
  [-7, -3, -4, 0, -5],
  [1, -2, -5, 6, 8]
];

let m5 = [[4, 3, -2, -7], [3, 12, 8, -3], [2, 3, -9, 2], [1, -2, -5, 6]];
let b = [20, 18, 31, 12];

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

let gaussPivotevoTotal = matrix => {
  let n = matrix.length;
  let marcas = crearMarcas(matrix);
  console.log('Augmented matrix');
  console.log(matrix);

  for (let k = 0; k < n - 1; k++) {
    console.log('Stage', k + 1);
    matrix = pivoteoTotal(matrix, k, marcas);
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
  console.log(marcas);
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

let pivoteoTotal = (matrix, k, marcas) => {
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
      marcas = intercambioMarcas(marcas, columnaMayor, k);
    }
    return matrix;
  }
};

let pivoteoSimple = (matrix, k) => {
  for (let i = k; i < matrix.length; i++) {
    console.log('PIVOTEO SIMPLE: ', matrix[i][k]);
    if (matrix[i][k] != 0) {
      let temp = matrix[k];
      matrix[k] = matrix[i];
      matrix[i] = temp;
    }
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

let crearMarcas = matrix => {
  let m = [];
  for (let i = 0; i < matrix.length; i++) {
    m[i] = i + 1;
  }
  return m;
};

let intercambioMarcas = (marcas, columnaMayor, k) => {
  let temp = marcas[columnaMayor];
  marcas[columnaMayor] = marcas[k];
  marcas[k] = temp;
  return marcas;
};

let sustitucionRegresiva = matrix => {
  let n = matrix.length - 1;
  let x = [];
  x[n] = matrix[n][n + 1] / matrix[n][n];
  for (let i = n - 1; i >= 0; i--) {
    var sumatoria = 0;
    for (let p = i + 1; p < n + 1; p++) {
      sumatoria = sumatoria + matrix[i][p] * x[p];
    }
    x[i] = (matrix[i][n + 1] - sumatoria) / matrix[i][i];
  }
  return x;
};

let sustitucionProgresiva = matrix => {
  let n = matrix.length;
  let x = [];
  x[0] = matrix[0][n] / matrix[0][0];
  for (let i = 1; i < n; i++) {
    var sumatoria = 0;
    for (let p = 0; p < n + 1; p++) {
      if (!isNaN(matrix[i][p] * x[p]))
        sumatoria = sumatoria + matrix[i][p] * x[p];
    }
    x[i] = (matrix[i][n] - sumatoria) / matrix[i][i];
  }
  return x;
};

let factorizacionLU = matrix => {
  let n = matrix.length;
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return (index === idx) ? 1 : math.abs(ele * 0);
    })
  );
  for (let k = 0; k < n - 1; k++) {
    for (let i = k + 1; i < n; i++) {
      let multiplicador = matrix[i][k] / matrix[k][k];
      L[i][k] = multiplicador;
      for (let j = k; j < n; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
  }
  return {
    L,
    U: matrix
  };
};

let factorizacionMatrices = (matrix, b) => {
  let { L, U } = factorizacionLU(matrix);
  L.map((item, index) => item.push(b[index]));
  let z = sustitucionProgresiva(L);
  U.map((item, index) => item.push(z[index]));
  let x = sustitucionRegresiva(U);
  console.log(x);
};

factorizacionMatrices(m5, b);
// console.log('SIMPLE');
// gaussSimple(m);
// console.log('PARCIAL');
// gaussPivotevoParcial(m2);
// console.log('TOTAL');
// gaussPivotevoTotal(m3);
