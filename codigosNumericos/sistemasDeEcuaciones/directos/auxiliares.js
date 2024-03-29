const math = require('mathjs');
const matrixEig = require('matrix-eig');

let ampliarMatriz = (matrix, vector) => {
  matrix.forEach((fila, idx) => fila.push(vector[idx]));
  return matrix;
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

function verificated_matrix(A, type = undefined, L = undefined, U = undefined) {
  if (math.det(A) == 0) {
    return 'The determinant equals zero therefore has infinite solutions or no solution';
  }
  if (type == 'LU') {
    let count = 0;
    const diagonal = math.diag(A);
    for (let i = 0; i < diagonal.length; i++) {
      if (diagonal[i] == 0) {
        count = count + 1;
      }
    }

    if (count == diagonal.length) {
      return 'Diagonal is zero';
    }
  }
  if ((type = 'Direct factorization')) {
    if (math.det(L) * math.det(U) == 0) {
      return 'The determinant equals zero therefore has infinite solutions or no solution';
    }
  }
  return false;
}

function spectral_radius(T) {
  var result = matrixEig.eig(T);
  var radius = math.max(math.abs(Array.from(result.eigenvalues.real)));
  if (radius >= 1) {
    return 'The method may not converge the spectral radius is greater than 1';
  }
  return false;
}

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
  x[n] = math.divide(matrix[n][n + 1], matrix[n][n]);
  for (let i = n - 1; i >= 0; i--) {
    var sumatoria = 0;
    for (let p = i + 1; p < n + 1; p++) {
      sumatoria = math.add(sumatoria, math.multiply(matrix[i][p], x[p]));
    }
    x[i] = math.divide(
      math.subtract(matrix[i][n + 1], sumatoria),
      matrix[i][i]
    );
  }
  return x;
};

let sustitucionProgresiva = matrix => {
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
  let stages = [];
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return index === idx ? 1 : math.abs(ele * 0);
    })
  );
  for (let k = 0; k < n - 1; k++) {
    for (let i = k + 1; i < n; i++) {
      if (matrix[k][k] === 0) return { L: false }; // TEOREMA
      var multiplicador = matrix[i][k] / matrix[k][k];
      L[i][k] = multiplicador;
      for (let j = k; j < n; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    stages.push({ U: matrix, L });
  }
  return {
    L,
    U: matrix,
    stages
  };
};

let factorizacionLUPivoteo = matrix => {
  let marcas = matrix.map((item, index) => index);
  let n = matrix.length;
  let stages = [];
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => (index === idx ? 1 : math.abs(ele * 0)))
  );
  for (let k = 0; k < n - 1; k++) {
    marcas = pivoteoParcialLU(marcas, matrix, k, L);
    for (let i = k + 1; i < n; i++) {
      if (matrix[k][k] === 0) return { L: false };
      var multiplicador = matrix[i][k] / matrix[k][k];
      L[i][k] = multiplicador;
      for (let j = k; j < n; j++) {
        matrix[i][j] = matrix[i][j] - multiplicador * matrix[k][j];
      }
    }
    stages.push({ U: matrix, L });
  }
  return {
    L,
    U: matrix,
    P: marcas,
    stages
  };
};

module.exports = {
  ampliarMatriz,
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
  verificated_matrix,
  spectral_radius
};
