const math = require('mathjs');

let jacobi = (tolerancia, vector0, niter, matrix, b) => {
  var dispercion = tolerancia + 1;
  var counter = 0;
  var tabla = [];
  while (dispercion > tolerancia && counter < niter) {
    var x1 = calcularNuevoJacobi(vector0, matrix, b);
    dispercion = math.max(math.abs(math.subtract(x1, vector0)));
    vector0 = x1;
    counter++;
    tabla.push({ xn: x1, err: dispercion });
  }
  console.table(tabla, ['xn', 'err']);
  if (dispercion < tolerancia) {
    console.log(`${x1} es aproximacion con una tolerancia = ${tolerancia}`);
  } else {
    console.log(`fracaso en ${niter} iteraciones`);
  }
};

let calcularNuevoJacobi = (vector0, matrix, b) => {
  let n = vector0.length;
  let vector1 = [];
  for (let i = 0; i < n; i++) {
    var suma = 0;
    for (let j = 0; j < n; j++) {
      if (j != i) suma += matrix[i][j] * vector0[j];
    }
    vector1[i] = (b[i] - suma) / matrix[i][i];
  }
  return vector1;
};

// TODO: SOLUCION POR MATRIX, CORREGIR (NO TOCAR EN EL QUIZ)
// ====================INICIO==================================
let getLDU = matrix => {
  let L = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx < filIdx ? columna : 0;
    })
  );
  let D = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx == filIdx ? columna : 0;
    })
  );
  let U = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx > filIdx ? columna : 0;
    })
  );
  return { L, D, U };
};

let matrixJacobi = (tolerancia, x0, niter, matrix, b) => {
  let { L, D, U } = getLDU(matrix);
  console.table(L);
  console.table(D);
  console.table(U);
  let T = math.multiply(math.inv(D), math.add(L, U));
  let C = math.multiply(math.inv(D), b);
  console.table(T);
  console.table(C);
  var err = tolerancia + 1;
  var counter = 1;

  while (err > tolerancia && counter <= niter) {
    var x1 = math.add(math.multiply(T, x0), C);
    err = math.max(math.abs(math.subtract(x1, x0)));
    x0 = x1;
    counter++;
  }

  console.log(x1);
  if (err < tolerancia) {
    console.log(`${x1} es aproximacion con una tolerancia = ${tolerancia}`);
  } else {
    console.log(`fracaso en ${niter} iteraciones`);
  }
};
// ===================FIN====================================

let m = [[8, 3, 5], [-2, 7, 3], [4, -5, 18]];
let b = [21, 7, 42];

jacobi(0.0000001, [0, 0, 0], 5, m, b);
// matrixJacobi(0.0000001, [0, 0, 0], 5, m, b);
