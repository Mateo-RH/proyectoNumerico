var m1 = [[1, -1], [2, 4]];
var m2 = [[1, 2, -3], [2, 1, -2], [-1, 3, 1]];
// var m2 = [[1, 2, -3, 5], [2, 1, -2, 5], [-1, 3, 1, 5], [-1, 3, 1, 5]];
let determinante2 = matrix => {
  return matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
};

let determinante3 = matrix => {
  let n = matrix.length;
  let signo = -1;
  var suma = 0;
  for (let i = 0; i < n; i++) {
    let temp = matrix.map(val => val.slice(1, n));
    temp.splice(i, 1);
    signo *= -1;
    suma += signo * matrix[i][0] * determinante2(temp);
  }
  return suma;
};

let determinanteRecursivo = (elemento, matrix) => {
  let n = matrix.length;
  if (n === 2) {
    return elemento * determinante2(matrix);
  } else {
    let signo = -1;
    var suma = 0;
    for (let i = 0; i < n; i++) {
      let temp = matrix.map(val => val.slice(1, n));
      temp.splice(i, 1);
      signo *= -1;
      suma += signo * determinanteRecursivo(matrix[i][0], temp);
    }
    return suma;
  }
};

// let determinanteRecursivo = (elemento, matrix) => {
//   let n = matrix.length;
//   if (n === 2) {
//     return elemento * determinante2(matrix);
//   } else {
//     let signo = -1;
//     var suma = 0;
//     for (let i = 0; i < n; i++) {
//       let temp = matrix.map(val => val.slice(1, n));
//       temp.splice(i, 1);
//       signo *= -1;
//       suma += signo * determinanteRecursivo(matrix[i][0], temp);
//     }
//     return suma;
//   }
// };

console.log(determinanteRecursivo(1, m2));
