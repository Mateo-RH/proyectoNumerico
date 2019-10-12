const math = require('mathjs');

let m7 = [[3, -2, -2, -1], [-2, 8, -2, -2], [-2, -2, 4, 2], [-1, -2, 2, 3]];
let m8 = [[36, 3, -4, 5], [5, -45, 10, -2], [6, 8, 57, 5], [2, 3, -8, -42]];

let factorizacionDirectaCrout = matrix => {
  let n = matrix.length;
  var L = matrix.map((element, i) => matrix[i].map(e => 0));
  var U = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return index === idx ? 1 : math.abs(ele * 0);
    })
  );

  for (let k = 0; k < n; k++) {
    var suma1 = 0;
    for (let p = 0; p < k; p++) {
      suma1 += L[k][p] * U[p][k];
    }
    L[k][k] = matrix[k][k] - suma1;

    for (let i = k + 1; i < n; i++) {
      var suma2 = 0;
      for (let p = 0; p < k; p++) {
        suma2 += L[i][p] * U[p][k];
      }
      L[i][k] = (matrix[i][k] - suma2) / U[k][k];
    }

    for (let j = k + 1; j < n; j++) {
      var suma3 = 0;
      for (let p = 0; p < k; p++) {
        suma3 += L[k][p] * U[p][j];
      }
      U[k][j] = (matrix[k][j] - suma3) / L[k][k];
    }
  }

  console.log('L');
  console.table(L);
  console.log('U');
  console.table(U);
};

let factorizacionDirectaDoolittle = matrix => {
  let n = matrix.length;
  var U = matrix.map((element, i) => matrix[i].map(e => 0));
  var L = matrix.map((element, index) =>
    element.map((ele, idx) => {
      return index === idx ? 1 : math.abs(ele * 0);
    })
  );

  for (let k = 0; k < n; k++) {
    var suma1 = 0;

    for (let p = 0; p < k; p++) suma1 += L[k][p] * U[p][k];
    U[k][k] = matrix[k][k] - suma1;

    for (let i = k + 1; i < n; i++) {
      var suma2 = 0;
      for (let p = 0; p < k; p++) suma2 += L[i][p] * U[p][k];
      U[k][i] = (matrix[k][i] - suma2) / L[k][k];
    }

    for (let j = k + 1; j < n; j++) {
      var suma3 = 0;
      for (let p = 0; p < k; p++) suma3 += L[k][p] * U[p][j];
      L[j][k] = (matrix[j][k] - suma3) / U[k][k];
    }
  }

  console.log('L');
  console.table(L);
  console.log('U');
  console.table(U);
};

console.log('CROUT');
factorizacionDirectaCrout(m7);
console.log('DOOLITTLE');
factorizacionDirectaDoolittle(m8);
