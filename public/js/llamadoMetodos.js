function biseccionLlamado() {
  var funcionBiseccion = document.getElementById('biseccionFunction').value;
  var biseccionInferiorX = document.getElementById('biseccionInferiorX').value;
  var biseccionSuperiorX = document.getElementById('biseccionSuperiorX').value;
  var biseccionTolerance = document.getElementById('biseccionTolerance').value;
  var biseccionErrorType = document.getElementById('biseccionErrorType').value;
  var biseccionIterations = document.getElementById('biseccionIterations')
    .value;

  //  NO SE PREOCUPE POR ESTA PARTE, ESTO ES PARA CONSUMIR EL METODO COMO TAL
  // PERO NO SE SI YA TERMINE LOS ENDPOINT PARA CADA METODO ADEMAS DE QUE TENGO
  // QUE CORREGIR MUCHOS BUGS QUE TIENEN. SOLO IMPRIMA LOS VALORES QUE RECOGIO DEL FORMULARIO
  // PD: TE HABLO DESDE EL PASADO, BESITOS Y BUENA SUERTE CON ESO :P
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
      iterations: biseccionIterations,
      tipoError: biseccionErrorType
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    if (response.raiz) {
      alert(`Raiz en ${response.raiz}`);
    } else {
      alert('Alguno de los campos esta incorrecto');
    }
  });

  //   console.log(
  //     bisection(
  //       funcionBiseccion,
  //       biseccionInferiorX,
  //       biseccionSuperiorX,
  //       biseccionTolerance,
  //       biseccionIterations,
  //       biseccionErrorType
  //     )
  //   );
}
