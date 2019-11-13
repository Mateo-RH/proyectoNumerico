const mheader = document.querySelector('#m-header');
const mbody = document.querySelector('#m-body');
var elementosId = [];
var funcionG = '';

const vandermondeStages = document.querySelector('#vandermonde-stages');
const vandermondeSolution = document.querySelector('#vandermonde-solution');
const dividedDifferencesStages = document.querySelector(
  '#dividedDifferences-stages'
);
const dividedDifferencesSolution = document.querySelector(
  '#dividedDifferences-solution'
);
const lagrangeSolution = document.querySelector('#lagrange-solution');
const linealSolution = document.querySelector('#lineal-solution');
const quadraticSolution = document.querySelector('#quadratic-solution');
const cubicSolution = document.querySelector('#cubic-solution');

$(document).ready(function() {
  crearTabla();
});

function aumentar() {
  aumentarMatriz();
  aumentarVector();
}

function reducir() {
  reducirMatriz();
  reducirVector();
}

// HTML matrix
function crearTabla() {
  var matriz = obtenerMatriz();
  limpiarTabla();

  var filasH =
    '<th scope="col">Points</th><th scope="col">X</th><th scope="col">Y</th>';
  var filasB = '';
  elementosId = [];
  matriz.forEach((fila, i) => {
    var filasId = [];
    filasB += `<tr>\n
      <th scope="row">${i}</th>\n`;
    fila.forEach((columna, j) => {
      filasB += `<td><input type="number" class="form-control w-100" id="elemento${i}-${j}" value="${columna}"></td>\n`;
      filasId.push(`elemento${i}-${j}`);
    });
    elementosId.push(filasId);
    filasB += `</tr>`;
  });
  mheader.innerHTML = filasH;
  mbody.innerHTML = filasB;
}

function limpiarTabla() {
  mheader.innerHTML = '';
  mbody.innerHTML = '';
}

// LocalStorage logic matrixInter
function aumentarMatriz() {
  guardarMatriz();
  var matriz = obtenerMatriz();
  matriz.push(new Array(2).fill('1'));
  localStorage.setItem('matrizInter', JSON.stringify(matriz));
  crearTabla();
}

function reducirMatriz() {
  guardarMatriz();
  var matriz = obtenerMatriz();
  if (matriz.length == 1) return;
  matriz.pop();
  localStorage.setItem('matrizInter', JSON.stringify(matriz));
  crearTabla();
}

function guardarMatriz() {
  var matriz = elementosId.map(fila => {
    var temp = fila.map(elemento => {
      var val = document.querySelector(`#${elemento}`).value;
      return val;
    });
    return temp;
  });
  localStorage.setItem('matrizInter', JSON.stringify(matriz));
}

function obtenerMatriz() {
  var matriz = !!localStorage.getItem('matrizInter')
    ? JSON.parse(localStorage.getItem('matrizInter'))
    : [
        [1, 1],
        [1, 1]
      ];
  return matriz;
}

// Requests
function vandermondeReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#vandermondeModal').modal();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/vandermonde',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var matrix = response.metodo.matrix;
    var ecuacion = response.metodo.ecuacion;

    var stageHtml = `<h5 class="text-primary">Matrix</h5>${crearMatrizHtml(
      matrix
    )}<hr />`;
    var solutionHtml = `<h5 class="text-primary">Polynomial</h5><ul class="list-group"><li class="list-group-item">${ecuacion}</li></ul>`;

    funcionG = ecuacion;

    vandermondeStages.innerHTML = stageHtml;
    vandermondeSolution.innerHTML = solutionHtml;
  });
}

function dividedDifferencesReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#dividedDifferencesModal').modal();
  console.log(matrix);

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/newton',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var matrix = response.metodo.matrix;
    var ecuacion = response.metodo.ecuacion;

    var stageHtml = `<h5 class="text-primary">Matrix</h5>${crearMatrizHtmlNewton(
      matrix
    )}<hr />`;
    var solutionHtml = `<h5 class="text-primary">Polynomial</h5><ul class="list-group"><li class="list-group-item">${ecuacion}</li></ul>`;

    funcionG = ecuacion;

    dividedDifferencesStages.innerHTML = stageHtml;
    dividedDifferencesSolution.innerHTML = solutionHtml;
  });
}

function lagrangeReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#lagrangeModal').modal();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/lagrange',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var ecuacion = response.metodo.ecuacion;

    var solutionHtml = `<h5 class="text-primary">Polynomial</h5><ul class="list-group"><li class="list-group-item">${ecuacion}</li></ul>`;

    funcionG = ecuacion;

    lagrangeSolution.innerHTML = solutionHtml;
  });
}

function linealReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#linealModal').modal();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/splineLineal',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var polinomios = response.metodo.polinomios;
    var ecuacion = response.metodo.ecuacion;

    var solutionHtml =
      '<h5 class="text-primary">Polynomials</h5><ul class="list-group">';
    polinomios.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">P${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    funcionG = ecuacion;

    linealSolution.innerHTML = solutionHtml;
  });
}

function quadraticReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#quadraticModal').modal();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/splineCuadratico',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var polinomios = response.metodo.polinomios;
    var ecuacion = response.metodo.ecuacion;

    var solutionHtml =
      '<h5 class="text-primary">Polynomials</h5><ul class="list-group">';
    polinomios.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">P${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    funcionG = ecuacion;

    quadraticSolution.innerHTML = solutionHtml;
  });
}

function cubicReq() {
  guardarMatriz();
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var err = verificaMatriz(matrix);
  if (err == 'duplicate') {
    alert('Points matrix does not allow duplicated x!');
    return;
  } else if (err == 'mayor') {
    alert('Points matrix should be sorted from lower to higher x values!');
    return;
  }
  $('#cubicModal').modal();

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/interpolacion/splineCubico',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      'points[]': matrix
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var polinomios = response.metodo.polinomios;
    var ecuacion = response.metodo.ecuacion;

    var solutionHtml =
      '<h5 class="text-primary">Polynomials</h5><ul class="list-group">';
    polinomios.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">P${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    funcionG = ecuacion;

    cubicSolution.innerHTML = solutionHtml;
  });
}

function crearMatrizHtml(matrizAumentada) {
  var thead = '<th scope="col">#</th>';
  var tbody = '';
  matrizAumentada.forEach((fila, i) => {
    thead += `<th scope="col">${i}</th>`;
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      tbody += `<td>${parseFloat(columna).toFixed(4)}</td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function crearMatrizHtmlNewton(matrizAumentada) {
  var thead = '<th scope="col">#</th><th scope="col">0</th>';
  var tbody = '';
  matrizAumentada.forEach((fila, i) => {
    thead += `<th scope="col">${i + 1}</th>`;
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      tbody += `<td>${parseFloat(columna).toFixed(4)}</td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function obtenerFunciones() {
  var funciones = !localStorage.getItem('funciones')
    ? []
    : JSON.parse(localStorage.getItem('funciones'));
  return funciones;
}

function guardarFuncion() {
  var funcion = obtenerFunciones();
  if (!!funcionG) {
    funcionG = funcionG.replace('e^', 'exp');
    funcionG = funcionG.replace(' e ', 'exp(x)');
    funcionG = funcionG.replace('e ', 'exp(x)');
    funcionG = funcionG.replace(' e', 'exp(x)');
    funcion.push(funcionG);
  }
  localStorage.setItem('funciones', JSON.stringify(funcion));
  window.location.assign('http://localhost:3000/graficador.html');
}

function verificaMatriz(matriz) {
  var x = matriz.map(fila => fila[0]);
  if (hasMayor(x)) return 'mayor';
  if (hasDuplicates(x)) return 'duplicate';
  return '';
}

function hasDuplicates(array) {
  return new Set(array).size !== array.length;
}

function hasMayor(array) {
  let mayor = false;
  array.forEach((item, idx) => {
    if (idx < array.length - 1 && item >= array[idx + 1]) {
      mayor = true;
    }
  });
  return mayor;
}
