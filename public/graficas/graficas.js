window.d3 = d3;

const root = document.querySelector('#root');
const funcion = document.querySelector('#funcion');

function graficar() {
  var funciones = obtenerFunciones();
  var funcionesObj = funciones.map(item => {
    return {
      fn: item
    };
  });
  functionPlot({
    target: '#root',
    data: funcionesObj
  });
}

function add() {
  var funcionF = funcion.value;
  guardarFuncion(funcionF);
  graficar();
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
