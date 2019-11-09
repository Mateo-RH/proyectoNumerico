// matrix
const mheader = document.querySelector('#m-header');
const mbody = document.querySelector('#m-body');
var elementosId = [];
// vector
const vbody = document.querySelector('#v-body');
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

const gaussParcialModal = document.querySelector('#gaussParcialModal-m');
const gaussTotalModal = document.querySelector('#gaussTotalModal-m');
const luSimpleModal = document.querySelector('#luSimpleModal-m');
const luPivoteoModal = document.querySelector('#luPivoteoModal-m');
const croutModal = document.querySelector('#croutModal-m');
const doolittleModal = document.querySelector('#doolittleModal-m');
const choleskyModal = document.querySelector('#choleskyModal-m');

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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
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
    // var matrizAumentada = response.metodo.augmentedMatrix;
    // crearRespGauss(matrizAumentada, gaussSimpleModal);
    console.log(response.metodo);
  });
}

// TODO: Generar matriz html
function crearMatrizHtml(matrizAumentada) {
  var thead = '<th scope="col">#</th><th scope="col">1</th>';
  var tbody = '';
  matrizAumentada.forEach((fila, i) => {
    thead += `<th scope="col">${i}</th>`;
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      tbody += `<td><input type="number" class="form-control w-100" value="${columna}"></td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function crearRespGauss(matrizAumentada, htmlTag) {
  var { filasH, filasB } = crearMatrizHtml(matrizAumentada);
  htmlTag.innerHTML = `<h5>Augmented matrix</h5>
     <table class="table table-bordered">
      <thead>
        <tr>
          ${filasH}
        </tr>
      </thead>
      <tbody>
        ${filasB}
      </tbody>
    </table>
    <hr />
    <h5>Stages</h5>`;
}
