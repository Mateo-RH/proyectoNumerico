window.d3 = d3;

const root = document.querySelector('#root');
const funcion = document.querySelector('#funcion');
const funcionesList = document.querySelector('#funcionesList');

$(document).ready(function() {
  graficar();
  crearListaHtml();
});

function graficar() {
  var funciones = obtenerFunciones();
  var funcionesObj = funciones.map(item => {
    return {
      fn: item
    };
  });
  functionPlot({
    target: '#root',
    grid: true,
    width: 680,
    height: 500,
    xAxis: {
      label: 'x - axis'
    },
    yAxis: {
      label: 'y - axis'
    },
    data: funcionesObj
  });
}

function crearListaHtml() {
  var funciones = obtenerFunciones();
  var lista = '<h5 class="text-primary">Functions</h5><ul class="list-group">';
  funciones.forEach((element, idx) => {
    lista += `<li class="list-group-item">F${idx +
      1}:   ${element} <button class="btn btn-danger float-right" onclick="remove(${idx})" >Delete</button></li>`;
  });
  lista += '</ul>';
  funcionesList.innerHTML = lista;
}

function remove(idx) {
  var funciones = obtenerFunciones();
  funciones.splice(idx, 1);
  localStorage.setItem('funciones', JSON.stringify(funciones));
  graficar();
  crearListaHtml();
  window.location.assign(
    'https://numerical-methods-rh.herokuapp.com/graficador.html'
  );
}

function add() {
  var funcionF = funcion.value;
  if (!funcionF) {
    alert('Please enter a function');
    return;
  }

  guardarFuncion(funcionF);
  graficar();
  crearListaHtml();
}

function obtenerFunciones() {
  var funciones = !localStorage.getItem('funciones')
    ? []
    : JSON.parse(localStorage.getItem('funciones'));
  return funciones;
}

function guardarFuncion(funcionF) {
  var funcion = obtenerFunciones();
  funcion.push(funcionF);
  localStorage.setItem('funciones', JSON.stringify(funcion));
}
