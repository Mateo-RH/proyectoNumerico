let jacobi = (tolerancia, vector, niter) => {
  var dispercion = tolerancia + 1;
  var counter = 1;
  while (dispercion < tolerancia && counter <= niter) {}
};

let calcularNuevoJacobi = vector => {
  for (let i = 1; i <= n; i++) {
    var suma = 0;
    for (let j = 1; j <= n; j++) {
      if (j != i) suma += matrix[i][j] * x[j];
    }
  }
};
