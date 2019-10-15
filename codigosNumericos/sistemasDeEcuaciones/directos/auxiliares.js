const math = require('mathjs');

// TODO: sustituciones normales y complex pueden ser solo complex

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

let intercambioMarcas = (marcas, columnaMayor, k) => {
  let temp = marcas[columnaMayor];
  marcas[columnaMayor] = marcas[k];
  marcas[k] = temp;
  return marcas;
};

let reorganizarL = (matrix, filaMayor, filaMenor) => {
  let columna = filaMenor - 1;
  let temp = matrix[filaMenor][columna];
  matrix[filaMenor][columna] = matrix[filaMayor][columna];
  matrix[filaMayor][columna] = temp;
  return matrix;
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

let pivoteoParcialLU = (marcas, matrix, k, L) => {
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
      marcas = intercambioMarcas(marcas, filaMayor, k);
      if (k > 0) L = reorganizarL(L, filaMayor, k);
    }
    return marcas;
  }
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

let sustitucionRegresivaComplex = matrix => {
  let n = matrix.length - 1;
  let x = [];
  x[n] = math.divide(matrix[n][n + 1], matrix[n][n]);
  for (let i = n - 1; i >= 0; i--) {
    var sumatoria = 0;
    for (let p = i + 1; p < n + 1; p++) {
      sumatoria = math.add(sumatoria, math.multiply(matrix[i][p], x[p]));
    }
    x[i] = math.divide(math.subtract(matrix[i][n + 1], sumatoria), matrix[i][i]);
  }
  return x;
};

let sustitucionProgresivaComplex = matrix => {
  let n = matrix.length;
  let x = [];
  x[0] = math.divide(matrix[0][n], matrix[0][0]);
  for (let i = 1; i < n; i++) {
    var sumatoria = 0;
    for (let p = 0; p < n + 1; p++) {
      if (!isNaN(matrix[i][p] * x[p]))
        sumatoria = math.add(sumatoria, math.multiply(matrix[i][p], x[p]));
    }
    x[i] = math.divide(math.subtract(matrix[i][n], sumatoria), matrix[i][i]);
  }
  return x;
};

let factorizacionLU = matrix => {
  let n = matrix.length;
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return index === idx ? 1 : math.abs(ele * 0);
    })
  );
  for (let k = 0; k < n - 1; k++) {
    for (let i = k + 1; i < n; i++) {
      if (matrix[k][k] === 0) return false; // TEOREMA
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

let factorizacionLUPivoteo = matrix => {
  let marcas = matrix.map((item, index) => index);
  let n = matrix.length;
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => (index === idx ? 1 : math.abs(ele * 0)))
  );
  for (let k = 0; k < n - 1; k++) {
    marcas = pivoteoParcialLU(marcas, matrix, k, L);
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
    U: matrix,
    P: marcas
  };
};

module.exports = {
  intercambioFilas,
  intercambioColumnas,
  intercambioMarcas,
  reorganizarL,
  pivoteoSimple,
  pivoteoParcial,
  pivoteoTotal,
  pivoteoParcialLU,
  sustitucionRegresiva,
  sustitucionProgresiva,
  factorizacionLU,
  factorizacionLUPivoteo,
  sustitucionProgresivaComplex,
  sustitucionRegresivaComplex
};
