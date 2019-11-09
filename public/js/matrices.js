// matrix
const mheader = document.querySelector('#m-header');
const mbody = document.querySelector('#m-body');
var elementosId = [];
// vector
const vbody = document.querySelector('#v-body');
// Iterativos
const i_tolerance = document.querySelector('#inputTolerance');
const i_niter = document.querySelector('#niter');
const i_norma = document.querySelector('#norma');
const i_initialVector = document.querySelector('#inputInitialVector');
var velementosId = [];

$(document).ready(function() {
  crearTabla();
  crearVector();
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

  var filasH = '<th scope="col">#</th>';
  var filasB = '';
  elementosId = [];
  matriz.forEach((fila, i) => {
    var filasId = [];
    filasH += `<th scope="col">${i}</th>`;
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

// LocalStorage logic matrix
function aumentarMatriz() {
  guardarMatriz();
  var matriz = obtenerMatriz().map(fila => {
    fila.push('1');
    return fila;
  });
  matriz.push(new Array(matriz.length + 1).fill('1'));
  localStorage.setItem('matriz', JSON.stringify(matriz));
  crearTabla();
}

function reducirMatriz() {
  guardarMatriz();
  var matriz = obtenerMatriz().map(fila => {
    fila.pop();
    return fila;
  });
  matriz.pop();
  localStorage.setItem('matriz', JSON.stringify(matriz));
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
  localStorage.setItem('matriz', JSON.stringify(matriz));
}

function obtenerMatriz() {
  var matriz = !!localStorage.getItem('matriz')
    ? JSON.parse(localStorage.getItem('matriz'))
    : [[1, 1], [1, 1]];
  return matriz;
}

// HTML vector

function crearVector() {
  var vector = obtenerVector();
  vbody.innerHTML = '';

  var filasB = '';
  velementosId = [];

  vector.forEach((fila, i) => {
    filasB += `<td><input type="number" class="form-control" id="elemento${i}" value="${fila}"></td>\n`;
    velementosId.push(`elemento${i}`);
    filasB += `</tr>`;
  });
  vbody.innerHTML = filasB;
}

// LocalStorage logic vector
function aumentarVector() {
  guardarVector();
  var vector = obtenerVector();
  vector.push('1');
  localStorage.setItem('vector', JSON.stringify(vector));
  crearVector();
}

function reducirVector() {
  guardarVector();
  var vector = obtenerVector();
  vector.pop();
  localStorage.setItem('vector', JSON.stringify(vector));
  crearVector();
}

function guardarVector() {
  var vector = velementosId.map(elemento => {
    var val = document.querySelector(`#${elemento}`).value;
    return val;
  });
  localStorage.setItem('vector', JSON.stringify(vector));
}

function obtenerVector() {
  var vector = !!localStorage.getItem('vector')
    ? JSON.parse(localStorage.getItem('vector'))
    : [1, 1];
  return vector;
}

// LLAMADO A METODOS
const gaussSimpleStages = document.querySelector('#gaussSimple-stages');
const gaussSimpleStolution = document.querySelector('#gaussSimple-solution');
const gaussParcialStages = document.querySelector('#gaussParcial-stages');
const gaussParcialStolution = document.querySelector('#gaussParcial-solution');
const gaussTotalStages = document.querySelector('#gaussTotal-stages');
const gaussTotalStolution = document.querySelector('#gaussTotal-solution');
const luSimpleStages = document.querySelector('#luSimple-stages');
const luSimpleStolution = document.querySelector('#luSimple-solution');
const luPivoteoStages = document.querySelector('#luPivoteo-stages');
const luPivoteoStolution = document.querySelector('#luPivoteo-solution');
const croutStages = document.querySelector('#crout-stages');
const croutStolution = document.querySelector('#crout-solution');
const doolittleStages = document.querySelector('#doolittle-stages');
const doolittleStolution = document.querySelector('#doolittle-solution');
const choleskyStages = document.querySelector('#cholesky-stages');
const choleskyStolution = document.querySelector('#cholesky-solution');

function gaussSimpleReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/gaussSimple',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5>${crearMatrizHtml(stage)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    gaussSimpleStages.innerHTML = stageHtml;
    gaussSimpleStolution.innerHTML = solutionHtml;
  });
}

function gaussParcialReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/gaussPivoteoParcial',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5>${crearMatrizHtml(stage)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    gaussParcialStages.innerHTML = stageHtml;
    gaussParcialStolution.innerHTML = solutionHtml;
  });
}

function gaussTotalReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/gaussPivoteoTotal',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5>${crearMatrizHtml(stage)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    gaussTotalStages.innerHTML = stageHtml;
    gaussTotalStolution.innerHTML = solutionHtml;
  });
}

function luSimpleReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/factorizacionMatrices',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5><h5>Matrix U</h5>${crearMatrizHtml(
        stage.U
      )}<h5>Matrix L</h5>${crearMatrizHtml(stage.L)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    luSimpleStages.innerHTML = stageHtml;
    luSimpleStolution.innerHTML = solutionHtml;
  });
}

function luPivoteoReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url:
      'http://localhost:3000/sistemasDeEcuaciones/factorizacionMatricesPivoteo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5><h5>Matrix U</h5>${crearMatrizHtml(
        stage.U
      )}<h5>Matrix L</h5>${crearMatrizHtml(stage.L)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    luPivoteoStages.innerHTML = stageHtml;
    luPivoteoStolution.innerHTML = solutionHtml;
  });
}

function croutReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/factorizacionCrout',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;
    console.log(response);

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5><h5>Matrix U</h5>${crearMatrizHtml(
        stage.U
      )}<h5>Matrix L</h5>${crearMatrizHtml(stage.L)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    croutStages.innerHTML = stageHtml;
    croutStolution.innerHTML = solutionHtml;
  });
}

function doolittleReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/factorizacionDoolittle',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5><h5>Matrix U</h5>${crearMatrizHtml(
        stage.U
      )}<h5>Matrix L</h5>${crearMatrizHtml(stage.L)}<hr />`;
    });
    solution.forEach((element, idx) => {
      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    doolittleStages.innerHTML = stageHtml;
    doolittleStolution.innerHTML = solutionHtml;
  });
}

function choleskyReq() {
  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/factorizacionCholesky',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      matrix: matrix,
      vector: vector
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var stages = response.metodo.stages;
    var solution = response.metodo.solution;

    var stageHtml = '';
    var solutionHtml =
      '<h5 class="text-primary">Solution</h5><ul class="list-group">';

    stages.forEach((stage, idx) => {
      stageHtml += `<h5 class="text-primary">Stage ${idx +
        1}</h5><h5>Matrix U</h5>${crearMatrizHtmlCholesky(
        stage.U
      )}<h5>Matrix L</h5>${crearMatrizHtmlCholesky(stage.L)}<hr />`;
    });
    solution.forEach((element, idx) => {
      element = !!element.mathjs
        ? `${element.re.toFixed(2)} + (${element.im.toFixed(2)})i`
        : element.toFixed(4);

      solutionHtml += `<li class="list-group-item">X${idx +
        1} = ${element}</li>`;
    });
    solutionHtml += '</ul>';

    choleskyStages.innerHTML = stageHtml;
    choleskyStolution.innerHTML = solutionHtml;
  });
}

function jacobiReq() {
  // TODO: Interar sistema de manejo de errores para todos
  if (validarIterativos()) $('#jacobiModal').modal();
  else return;

  guardarVector();
  guardarMatriz();
  var vector = obtenerVector().join(',');
  var matrix = obtenerMatriz().map(filas => filas.join(','));
  var tolerance = i_tolerance.value;
  var niter = i_niter.value;
  var initialVector = obtenerVectorInicial().join(',');

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/sistemasDeEcuaciones/jacobi',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      tolerance,
      vector0: initialVector,
      niter: niter.value,
      matrix: matrix,
      vectorB: vector,
      norma: norma.value
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
  });
}

function crearMatrizHtml(matrizAumentada) {
  var thead = '<th scope="col">#</th><th scope="col">1</th>';
  var tbody = '';
  matrizAumentada.forEach((fila, i) => {
    thead += `<th scope="col">${i}</th>`;
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      tbody += `<td>${columna.toFixed(4)}</td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function crearMatrizHtmlCholesky(matrizAumentada) {
  var thead = '<th scope="col">#</th><th scope="col">1</th>';
  var tbody = '';
  matrizAumentada.forEach((fila, i) => {
    thead += `<th scope="col">${i}</th>`;
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      columna = !!columna.mathjs
        ? `${columna.re.toFixed(2)} + (${columna.im.toFixed(2)})i`
        : columna.toFixed(4);
      tbody += `<td>${columna}</td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function obtenerVectorInicial() {
  var initialVector = i_initialVector.value.split(',').filter(function(item) {
    return item != '';
  });
  return initialVector;
}

function validarIterativos() {
  var tolerance = i_tolerance.value;
  var niter = i_niter.value;
  var initialVector = obtenerVectorInicial();
  var vectorLenght = obtenerVector().length;

  if (!tolerance || !niter) {
    alert('Please complete all the fields!');
    return false;
  }
  if (initialVector.length != vectorLenght) {
    alert('Initial vector length must be the same as b');
    return false;
  }
  if (initialVector.some(isNaN)) {
    alert('Only numerical values on initial vector');
    return false;
  }

  return true;
}
