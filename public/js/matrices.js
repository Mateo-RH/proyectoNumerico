// create needed constants
const mheader = document.querySelector('#m-header');
const mbody = document.querySelector('#m-body');
var elementosId = [];

$(document).ready(function() {
  crearTabla();
});

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
      filasB += `<td><input type="number" class="form-control" id="elemento${i}-${j}" value="${columna}"></td>\n`;
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
