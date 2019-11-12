const niterIncremental = document.querySelector('#niterIncremental');
const x0Incremental = document.querySelector('#x0Incremental');
const deltaIncremental = document.querySelector('#deltaIncremental');
const functionFincremental = document.querySelector('#functionFincremental');

const niterFixedPoint = document.querySelector('#niterFixedPoint');
const x0FixedPoint = document.querySelector('#x0FixedPoint');
const errorFixedPoint = document.querySelector('#errorFixedPoint');
const functionFFixedPoint = document.querySelector('#functionFFixedPoint');
const toleranceFixedPoint = document.querySelector('#toleranceFixedPoint');
const functionGFixedPoint = document.querySelector('#functionGFixedPoint');

const niterNewton = document.querySelector('#niterNewton');
const x0Newton = document.querySelector('#x0Newton');
const errorNewton = document.querySelector('#errorNewton');
const functionFNewton = document.querySelector('#functionFNewton');
const toleranceNewton = document.querySelector('#toleranceNewton');
const functionDNewton = document.querySelector('#functionDNewton');

const niterSecant = document.querySelector('#niterSecant');
const x0Secant = document.querySelector('#x0Secant');
const errorSecant = document.querySelector('#errorSecant');
const functionFSecant = document.querySelector('#functionFSecant');
const toleranceSecant = document.querySelector('#toleranceSecant');
const x1Secant = document.querySelector('#x1Secant');

const niterBisection = document.querySelector('#niterBisection');
const xInfBisection = document.querySelector('#xInfBisection');
const xSupBisection = document.querySelector('#xSupBisection');
const toleranceBisection = document.querySelector('#toleranceBisection');
const functionFBisection = document.querySelector('#functionFBisection');

const niterFakeRule = document.querySelector('#niterFakeRule');
const xInfFakeRule = document.querySelector('#xInfFakeRule');
const xSupFakeRule = document.querySelector('#xSupFakeRule');
const toleranceFakeRule = document.querySelector('#toleranceFakeRule');
const functionFFakeRule = document.querySelector('#functionFFakeRule');

const incrementalSearchStages = document.querySelector(
  '#incrementalSearch-stages'
);
const FixedPointStages = document.querySelector('#FixedPoint-stages');
const FixedPointSolution = document.querySelector('#FixedPoint-solution');
const NewtonStages = document.querySelector('#Newton-stages');
const NewtonSolution = document.querySelector('#Newton-solution');
const SecantStages = document.querySelector('#Secant-stages');
const SecantSolution = document.querySelector('#Secant-solution');
const MultipleRootsStages = document.querySelector('#MultipleRoots-stages');
const MultipleRootsSolution = document.querySelector('#MultipleRoots-solution');
const BisectionStages = document.querySelector('#Bisection-stages');
const BisectionSolution = document.querySelector('#Bisection-solution');
const FakeRuleStages = document.querySelector('#FakeRule-stages');
const FakeRuleSolution = document.querySelector('#FakeRule-solution');

var f1 = '';
var f2 = '';
var f3 = '';

function crearTablaHtml(cabecera, matrizAumentada) {
  var thead = '<th scope="col">Iteration</th>';
  var tbody = '';
  cabecera.forEach(f => {
    thead += `<th scope="col">${f}</th>`;
  });
  matrizAumentada.forEach((fila, i) => {
    tbody += `<tr>\n
        <th scope="row">${i}</th>\n`;
    fila.forEach(columna => {
      tbody += `<td>${columna.toExponential(2)}</td>\n`;
    });
    tbody += `</tr>`;
  });
  var table = `<h5 class="text-primary">Iterations</h5>
  <table class="table table-bordered table-responsive-md table-striped text-center ">
  <thead>${thead}</thead>
  <tbody>${tbody}</tbody>
</table>`;
  return table;
}

function incrementalReq() {
  var verificar = BusquedasVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#incrementalModal').modal();
    var { funcion, xInicial, xDelta, iterations } = verificar;
    limpiarFunciones();
    f1 = funcion;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/busquedaIncremental',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcion,
      xInicial,
      xDelta,
      iterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;
      var iteraciones = response.metodo.intervalos;
      var iterHtml =
        iteraciones.length == 0
          ? `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`
          : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
    }
    incrementalSearchStages.innerHTML = iterHtml;
  });
}

function FixedPointReq() {
  var verificar = FixedPointVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#FixedPointModal').modal();
    var { funcionF, funcionG, tolerance, Xa, niter, tipoError } = verificar;
    limpiarFunciones();
    f1 = funcionF;
    f2 = funcionG;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/puntoFijo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcionF,
      funcionG,
      tolerance,
      Xa,
      niter,
      tipoError
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;

      var iteraciones = response.metodo.iterations;
      var aproximation = response.metodo.aproximation;
      var iterHtml = '';
      var aproxHtml = response.metodo.error
        ? `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">Fails on ${niter} iterations!</li></ul>`
        : `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
      iterHtml = arrayNull(iteraciones)
        ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
        : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
      var aproxHtml = '';
    }
    FixedPointStages.innerHTML = iterHtml;
    FixedPointSolution.innerHTML = aproxHtml;
  });
}

function NewtonReq() {
  var verificar = NewtonVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#NewtonModal').modal();
    var { funcionF, funciondF, tolerance, Xo, niter, tipoError } = verificar;
    limpiarFunciones();
    f1 = funcionF;
    f2 = funciondF;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/newton',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcionF,
      funciondF,
      tolerance,
      Xo,
      niter,
      tipoError
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;
      var iteraciones = response.metodo.iterations;
      var aproximation = response.metodo.aproximation;
      var iterHtml = '';
      var aproxHtml = response.metodo.error
        ? `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">Fails on ${niter} iterations!</li></ul>`
        : `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
      iterHtml = arrayNull(iteraciones)
        ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
        : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
      var aproxHtml = '';
    }
    NewtonStages.innerHTML = iterHtml;
    NewtonSolution.innerHTML = aproxHtml;
  });
}

function SecantReq() {
  var verificar = SecantVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#SecantModal').modal();
    var { funcionF, tolerance, Xo, x1, niter, tipoError } = verificar;
    limpiarFunciones();
    f1 = funcionF;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/secante',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcionF,
      tolerance,
      Xo,
      x1,
      niter,
      tipoError
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;
      var iteraciones = response.metodo.iterations;
      var aproximation = response.metodo.aproximation;
      var iterHtml = '';
      var aproxHtml = response.metodo.error
        ? `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">Fails on ${niter} iterations!</li></ul>`
        : `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
      iterHtml = arrayNull(iteraciones)
        ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
        : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
      var aproxHtml = '';
    }
    SecantStages.innerHTML = iterHtml;
    SecantSolution.innerHTML = aproxHtml;
  });
}

function MultipleRootsReq() {
  var verificar = FixedPointVerificacion();
  if (!verificar) {
    alert('Please check all the fields!');
    return;
  } else {
    $('#FixedPointModal').modal();
    var { funcionF, funcionG, tolerance, Xa, niter, tipoError } = verificar;
  }
  $('#MultipleRootsModal').modal();
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/raicesMultiples',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcionF: functionFFixedPoint.value,
      funcionG: functionGFixedPoint.value,
      tolerance: toleranceFixedPoint.value,
      Xa: x0FixedPoint.value,
      niter: niterFixedPoint.value,
      tipoError: errorFixedPoint.value
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    var cabecera = response.metodo.cabecera;
    var iteraciones = response.metodo.iterations;
    var aproximation = response.metodo.aproximation;
    var iterHtml = '';
    var aproxHtml = `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
    iterHtml = arrayNull(iteraciones)
      ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
      : crearTablaHtml(cabecera, iteraciones);
    MultipleRootsStages.innerHTML = iterHtml;
    MultipleRootsSolution.innerHTML = aproxHtml;
  });
}

function BisectionReq() {
  var verificar = BisectionVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#BisectionModal').modal();
    var { funcion, xInferior, xSuperior, tolerance, iterations } = verificar;
    limpiarFunciones();
    f1 = funcion;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/biseccion',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcion,
      xInferior,
      xSuperior,
      tolerance,
      iterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;
      var iteraciones = response.metodo.iterations;
      var aproximation = response.metodo.aproximation;
      var iterHtml = '';
      var aproxHtml = response.metodo.error
        ? `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">Fails on ${niter} iterations!</li></ul>`
        : `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
      iterHtml = arrayNull(iteraciones)
        ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
        : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
      var aproxHtml = '';
    }
    BisectionStages.innerHTML = iterHtml;
    BisectionSolution.innerHTML = aproxHtml;
  });
}

function FakeRuleReq() {
  var verificar = FakeRuleVerificacion();
  if (!verificar) {
    return;
  } else {
    $('#FakeRuleModal').modal();
    var { funcion, xInferior, xSuperior, tolerance, iterations } = verificar;
    limpiarFunciones();
    f1 = funcion;
  }
  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/reglaFalsa',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      funcion,
      xInferior,
      xSuperior,
      tolerance,
      iterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.metodo) {
      var cabecera = response.metodo.cabecera;
      var iteraciones = response.metodo.iterations;
      var aproximation = response.metodo.aproximation;
      var iterHtml = '';
      var aproxHtml = response.metodo.error
        ? `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">Fails on ${niter} iterations!</li></ul>`
        : `<h5 class="text-primary">Aproximation</h5><ul class="list-group"> <li class="list-group-item">${aproximation}</li></ul>`;
      iterHtml = arrayNull(iteraciones)
        ? `<div class="alert alert-warning" role="alert">
      <h4 class="alert-heading">Oops!</h4>
      <p>Try to graph your function or click on "More" to get more information!</p>
    </div>`
        : crearTablaHtml(cabecera, iteraciones);
    } else {
      var iterHtml = `<div class="alert alert-warning" role="alert">
        <h4 class="alert-heading">Oops!</h4>
        <p>Try to graph your function or click on "More" to get more information!</p>
      </div>`;
      var aproxHtml = '';
    }
    FakeRuleStages.innerHTML = iterHtml;
    FakeRuleSolution.innerHTML = aproxHtml;
  });
}

function showBusquedas() {
  hideAll();
  $('#incrementalSearchForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showFixedPoint() {
  hideAll();
  $('#FixedPointForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showNewton() {
  hideAll();
  $('#NewtonForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showSecant() {
  hideAll();
  $('#SecantForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showMultipleRoots() {
  hideAll();
  $('#MultipleRootsForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showBisection() {
  hideAll();
  $('#BisectionForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function showFakeRule() {
  hideAll();
  $('#FakeRuleForm')
    .removeClass('d-none')
    .addClass('d-block');
}

function BusquedasVerificacion() {
  if (
    !niterIncremental.value ||
    !x0Incremental.value ||
    !deltaIncremental.value ||
    !functionFincremental.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterIncremental.value) == NaN ||
    parseInt(x0Incremental.value) == NaN ||
    parseInt(deltaIncremental.value) == NaN
  ) {
    alert('Iterations, X0 and Delta should be numbers!');
    return false;
  } else if (
    parseInt(deltaIncremental.value) < 0 ||
    parseInt(niterIncremental.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  }

  return {
    funcion: functionFincremental.value,
    xInicial: x0Incremental.value,
    xDelta: deltaIncremental.value,
    iterations: niterIncremental.value
  };
}

function FixedPointVerificacion() {
  if (
    !niterFixedPoint.value ||
    !x0FixedPoint.value ||
    !functionFFixedPoint.value ||
    !toleranceFixedPoint.value ||
    !functionGFixedPoint.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterFixedPoint.value) == NaN ||
    parseInt(x0FixedPoint.value) == NaN ||
    parseInt(toleranceFixedPoint.value) == NaN
  ) {
    alert('Iterations, X0 and Tolerance should be numbers!');
    return false;
  } else if (
    parseFloat(toleranceFixedPoint.value) < 0 ||
    parseInt(niterFixedPoint.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  }

  return {
    funcionF: functionFFixedPoint.value,
    funcionG: functionGFixedPoint.value,
    tolerance: toleranceFixedPoint.value,
    Xa: x0FixedPoint.value,
    niter: niterFixedPoint.value,
    tipoError: errorFixedPoint.value
  };
}

function NewtonVerificacion() {
  if (
    !niterNewton.value ||
    !x0Newton.value ||
    !functionFNewton.value ||
    !toleranceNewton.value ||
    !functionDNewton.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterNewton.value) == NaN ||
    parseInt(x0Newton.value) == NaN ||
    parseInt(toleranceNewton.value) == NaN
  ) {
    alert('Iterations, X0 and Tolerance should be numbers!');
    return false;
  } else if (
    parseInt(niterNewton.value) < 0 ||
    parseFloat(toleranceNewton.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  }
  return {
    funcionF: functionFNewton.value,
    funciondF: functionDNewton.value,
    tolerance: toleranceNewton.value,
    Xo: x0Newton.value,
    niter: niterNewton.value,
    tipoError: errorNewton.value
  };
}

function SecantVerificacion() {
  if (
    !niterSecant.value ||
    !x0Secant.value ||
    !functionFSecant.value ||
    !toleranceSecant.value ||
    !x1Secant.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterSecant.value) == NaN ||
    parseInt(x0Secant.value) == NaN ||
    parseInt(toleranceSecant.value) == NaN ||
    parseInt(x1Secant.value) == NaN
  ) {
    alert('Iterations, X0, X1 and Tolerance should be numbers!');
    return false;
  } else if (
    parseInt(niterSecant.value) < 0 ||
    parseFloat(toleranceSecant.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  }
  return {
    funcionF: functionFSecant.value,
    tolerance: toleranceSecant.value,
    Xo: x0Secant.value,
    x1: x1Secant.value,
    niter: niterSecant.value,
    tipoError: errorSecant.value
  };
}

function MultipleRootsVerificacion() {}

function BisectionVerificacion() {
  if (
    !niterBisection.value ||
    !xInfBisection.value ||
    !xSupBisection.value ||
    !toleranceBisection.value ||
    !functionFBisection.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterBisection.value) == NaN ||
    parseInt(xInfBisection.value) == NaN ||
    parseInt(xSupBisection.value) == NaN ||
    parseInt(toleranceBisection.value) == NaN
  ) {
    alert('Iterations, Xinf, Xsup and Tolerance should be numbers!');
    return false;
  } else if (
    parseInt(niterBisection.value) < 0 ||
    parseFloat(toleranceBisection.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  } else if (parseInt(xInfBisection.value) >= parseInt(xSupBisection.value)) {
    alert('Xinf should be lower than Xsup!');
    return false;
  }
  return {
    funcion: functionFBisection.value,
    xInferior: xInfBisection.value,
    xSuperior: xSupBisection.value,
    tolerance: toleranceBisection.value,
    iterations: niterBisection.value
  };
}

function FakeRuleVerificacion() {
  if (
    !niterFakeRule.value ||
    !xInfFakeRule.value ||
    !xSupFakeRule.value ||
    !toleranceFakeRule.value ||
    !functionFFakeRule.value
  ) {
    alert('Please complete all the fields!');
    return false;
  } else if (
    parseInt(niterFakeRule.value) == NaN ||
    parseInt(xInfFakeRule.value) == NaN ||
    parseInt(xSupFakeRule.value) == NaN ||
    parseInt(toleranceFakeRule.value) == NaN
  ) {
    alert('Iterations, Xinf, Xsup and Tolerance should be numbers!');
    return false;
  } else if (
    parseInt(niterFakeRule.value) < 0 ||
    parseFloat(toleranceFakeRule.value) < 0
  ) {
    alert('Delta and iterations should be greater than cero!');
    return false;
  } else if (parseInt(xInfFakeRule.value) >= parseInt(xSupFakeRule.value)) {
    alert('Xinf should be lower than Xsup!');
    return false;
  }
  return {
    funcion: functionFFakeRule.value,
    xInferior: xInfFakeRule.value,
    xSuperior: xSupFakeRule.value,
    tolerance: toleranceFakeRule.value,
    iterations: niterFakeRule.value
  };
}

function hideAll() {
  $('#incrementalSearchForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#FixedPointForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#NewtonForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#SecantForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#MultipleRootsForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#BisectionForm')
    .removeClass('d-block')
    .addClass('d-none');
  $('#FakeRuleForm')
    .removeClass('d-block')
    .addClass('d-none');
}

function limpiarFunciones() {
  f1 = '';
  f2 = '';
}

function obtenerFunciones() {
  var funciones = !localStorage.getItem('funciones')
    ? []
    : JSON.parse(localStorage.getItem('funciones'));
  return funciones;
}

function arrayNull(array) {
  var nulo = false;
  array.forEach(fila => {
    if (fila.includes(null)) nulo = true;
  });
  return nulo;
}

function guardarFuncion() {
  var funcion = obtenerFunciones();
  if (!!f1) {
    f1 = f1.replace('e^', 'exp');
    f1 = f1.replace(' e ', 'exp(x)');
    f1 = f1.replace('e ', 'exp(x)');
    f1 = f1.replace(' e', 'exp(x)');
    funcion.push(f1);
  }
  if (!!f2) {
    f2 = f2.replace('e^', 'exp');
    f2 = f2.replace(' e ', 'exp(x)');
    f2 = f2.replace('e ', 'exp(x)');
    f2 = f2.replace(' e', 'exp(x)');
    funcion.push(f2);
  }
  localStorage.setItem('funciones', JSON.stringify(funcion));
  window.location.assign('http://localhost:3000/graficador.html');
}
