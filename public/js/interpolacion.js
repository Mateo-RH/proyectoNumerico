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
const i_w = document.querySelector('#w');
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
    : [[1, 1], [1, 1]];
  return matriz;
}
