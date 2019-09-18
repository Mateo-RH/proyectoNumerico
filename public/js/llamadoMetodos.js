function biseccionLlamado() {
  var funcionBiseccion = document.getElementById('biseccionFunction').value;
  var biseccionInferiorX = document.getElementById('biseccionInferiorX').value;
  var biseccionSuperiorX = document.getElementById('biseccionSuperiorX').value;
  var biseccionTolerance = document.getElementById('biseccionTolerance').value;
  var biseccionIterations = document.getElementById('biseccionIterations')
    .value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/biseccion',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'PostmanRuntime/7.16.3',
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      'Postman-Token':
        '397cc813-bac9-438e-8d5d-2774aabb249a,9d44a703-040d-4a37-a9d5-34688f7371cc',
      Host: 'localhost:3000',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Length': '138',
      Connection: 'keep-alive',
      'cache-control': 'no-cache'
    },
    data: {
      funcion: funcionBiseccion,
      xInferior: biseccionInferiorX,
      xSuperior: biseccionSuperiorX,
      tolerance: biseccionTolerance,
      iterations: biseccionIterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz en ${response.raiz}`);
    }
  });
}

function incrementalLlamado() {
  var funcionIncremental = document.getElementById('incrementalFunction').value;
  var incrementalXi = document.getElementById('incrementalXi').value;
  var incrementalDelta = document.getElementById('incrementalDelta').value;
  var incrementalIterations = document.getElementById('incrementalIterations')
    .value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/busquedaIncremental',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': 'df29e950-926e-4a37-8f0d-f78128bee3c3'
    },
    data: {
      funcion: funcionIncremental,
      xInicial: incrementalXi,
      xDelta: incrementalDelta,
      iterations: incrementalIterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Intervals: ${response.intervalos}`);
    }
  });
}

function ruleLlamado() {
  var funcionRule = document.getElementById('ruleFunction').value;
  var ruleInferiorX = document.getElementById('ruleInferiorX').value;
  var ruleSuperiorX = document.getElementById('ruleSuperiorX').value;
  var ruleTolerance = document.getElementById('ruleTolerance').value;
  var ruleIterations = document.getElementById('ruleIterations').value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/reglaFalsa',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': '268efbfd-664c-49ef-a9c1-0131320affcf'
    },
    data: {
      funcion: funcionRule,
      xInferior: ruleInferiorX,
      xSuperior: ruleSuperiorX,
      tolerance: ruleTolerance,
      iterations: ruleIterations
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz: ${response.raiz}`);
    }
  });
}

function fixedLlamado() {
  var funcionFixed = document.getElementById('fixedFunction').value;
  var funcionG = document.getElementById('fixedFunctionG').value;
  var fixedTolerance = document.getElementById('fixedTolerance').value;
  var fixedErrorType = document.getElementById('fixedErrorType').value;
  var fixedIterations = document.getElementById('fixedIterations').value;
  var fixedXa = document.getElementById('fixedXa').value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/puntoFijo',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': '6160ffaf-b8c6-4212-9c53-1535f2e74fe2'
    },
    data: {
      funcionF: funcionFixed,
      funcionG: funcionG,
      tolerance: fixedTolerance,
      Xa: fixedXa,
      niter: fixedIterations,
      tipoError: fixedErrorType
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz: ${response.raiz}`);
    }
  });
}

function newtonLlamado() {
  var funcionNewton = document.getElementById('newtonFunction').value;
  var funcionG = document.getElementById('newtonFunctionG').value;
  var newtonTolerance = document.getElementById('newtonTolerance').value;
  var newtonXo = document.getElementById('newtonXo').value;
  var newtonIterations = document.getElementById('newtonIterations').value;
  var newtonErrorType = document.getElementById('newtonErrorType').value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/newton',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': '1269b5d2-90d8-4e36-a81a-5823168065f8'
    },
    data: {
      funcionF: funcionNewton,
      funciondF: funcionG,
      tolerance: newtonTolerance,
      Xo: newtonXo,
      niter: newtonIterations,
      tipoError: newtonErrorType
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz: ${response.raiz}`);
    }
  });
}

function secantLlamado() {
  var funcionSecant = document.getElementById('secantFunction').value;
  var secantTolerance = document.getElementById('secantTolerance').value;
  var secantXo = document.getElementById('secantXo').value;
  var secantX1 = document.getElementById('secantX1').value;
  var secantIterations = document.getElementById('secantIterations').value;
  var secantErrorType = document.getElementById('secantErrorType').value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/secante',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': '74a40222-973a-423b-b51b-6ef8189fd17a'
    },
    data: {
      funcionF: funcionSecant,
      tolerance: secantTolerance,
      Xo: secantXo,
      x1: secantX1,
      niter: secantIterations,
      tipoError: secantErrorType
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz: ${response.raiz}`);
    }
  });
}

function rootLlamado() {
  var funcionRoot = document.getElementById('rootFunction').value;
  var funcionD = document.getElementById('rootFunctionD').value;
  var funcionDD = document.getElementById('rootFunctionD').value;
  var rootTolerance = document.getElementById('rootTolerance').value;
  var rootXo = document.getElementById('rootXo').value;
  var rootIterations = document.getElementById('rootIterations').value;
  var rootErrorType = document.getElementById('rootErrorType').value;

  var settings = {
    async: true,
    crossDomain: true,
    url: 'http://localhost:3000/raicesMultiples',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'cache-control': 'no-cache',
      'Postman-Token': '3f98c195-bf2a-4650-9d44-158c862071e5'
    },
    data: {
      funcionF: funcionRoot,
      funciondF: funcionD,
      funcionddF: funcionDD,
      tolerance: rootTolerance,
      Xo: rootXo,
      niter: rootIterations,
      tipoError: rootErrorType
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.error) {
      alert('Alguno de los campos esta incorrecto');
    } else {
      alert(`Raiz: ${response.raiz}`);
    }
  });
}
