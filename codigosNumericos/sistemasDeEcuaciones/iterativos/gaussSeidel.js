const math = require('mathjs');

let gaussSeidel = (tolerancia, vector0, niter, matrix, b) => {
  var dispercion = tolerancia + 1;
  var counter = 1;
  while (dispercion > tolerancia && counter <= niter) {
    var x1 = calcularNuevogaussSeidel(vector0, matrix, b);
    // FIXME: Dispercion de mier
    dispercion = math.max(x1.map((item, index) => item - vector0[index]));
    vector0 = x1;
    counter++;
  }
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

let m = [[8, 3, 5], [-2, 7, 3], [4, -5, 18]];

let b = [21, 7, 42];

calcularNuevogaussSeidel(0.0000001, [0, 0, 0], 5, m, b);
