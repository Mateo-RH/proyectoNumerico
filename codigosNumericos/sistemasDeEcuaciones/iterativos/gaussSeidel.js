const math = require('mathjs');

// TODO: SOLUCION POR ECUACION, CORREGIR (NO TOCAR EN EL QUIZ)
// ====================INICIO==================================
let gaussSeidel = (tolerancia, vector0, niter, matrix, b) => {
  var dispercion = tolerancia + 1;
  var counter = 1;
  while (dispercion > tolerancia && counter <= niter) {
    var x1 = calcularNuevogaussSeidel(vector0, matrix, b);
    dispercion = math.max(math.abs(math.subtract(x1, vector0)));
    vector0 = x1;
    counter++;
  }
  console.log(x1);
  if (dispercion < tolerancia) {
    console.log(`${x1} es aproximacion con una tolerancia = ${tolerancia}`);
  } else {
    console.log(`fracaso en ${niter} iteraciones`);
  }
};

let calcularNuevogaussSeidel = (vector0, matrix, b) => {
  let n = vector0.length;
  let vector1 = vector0;
  for (let i = 0; i < n; i++) {
    var suma = 0;
    for (let j = 0; j < n; j++) {
      if (j != i) suma += matrix[i][j] * vector1[j];
    }
    vector1[i] = (b[i] - suma) / matrix[i][i];
  }
  return vector1;
};

// ===================FIN====================================

let getLDU = matrix => {
  let L = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx < filIdx ? -columna : 0;
    })
  );
  let D = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx == filIdx ? columna : 0;
    })
  );
  let U = matrix.map((fila, filIdx) =>
    fila.map((columna, colIdx) => {
      return colIdx > filIdx ? -columna : 0;
    })
  );
  return { L, D, U };
};

// w = 1, gauss seidel
// 0<w<1, subrelajacion (para converger subsistemas que no convergen por gauss seidel)
// 1<w<2, sobre-relajacion(aceleran convergencia en gauss seidel convergente lento)
let matrixSeidel = (tolerancia, x0, niter, matrix, b, w = 1) => {
  let { L, D, U } = getLDU(matrix);

  let temp = math.subtract(D, math.multiply(L, w));
  let temp2 = math.add(math.multiply(1 - w, D), math.multiply(w, U));
  let T = math.multiply(math.inv(temp), temp2);
  let C = math.multiply(w, math.multiply(math.inv(temp), b));

  var err = tolerancia + 1;
  var counter = 0;
  var tabla = [];

  while (err > tolerancia && counter < niter) {
    var x1 = math.add(math.multiply(T, x0), C);
    err = norma(x1, x0);
    x0 = x1;
    counter++;
    tabla.push({ xn: x1, err });
  }

  console.table(tabla, ['xn', 'err']);
  if (err < tolerancia) {
    console.log(`${x1} es aproximacion con una tolerancia = ${tolerancia}`);
  } else {
    console.log(`fracaso en ${niter} iteraciones`);
  }
};

let norma = (x1, x0) => {
  return math.max(math.abs(math.subtract(x1, x0)));
};

let m = [[5, 3, 1], [3, 4, -1], [1, -1, 4]];

let b = [24, 30, -24];

matrixSeidel(0.00000001, [0, 0, 0], 30, m, b);
