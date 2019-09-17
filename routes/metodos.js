const express = require('express');
const metodos = require('../metodos/metodosNumericos');
const app = express();

// app.get('/biseccion', (req, res) => {
//   let funcion = req.query.funcion;
//   let xInferior = Number(req.query.xInferior);
//   let xSuperior = Number(req.query.xSuperior);
//   let tolerance = Number(req.query.tolerance);
//   let iterations = Number(req.query.iterations);
//   let tipoError = req.query.tipoError;

//   // let raiz = metodos.bisection(
//   //   funcion,
//   //   xInferior,
//   //   xSuperior,
//   //   tolerance,
//   //   iterations,
//   //   tipoError
//   // );

//   res.json({
//     error: false,
//     funcion,
//     xInferior,
//     xSuperior,
//     tolerance,
//     iterations,
//     tipoError,
//     raiz: 'xz'
//   });
// });

app.post('/biseccion', function(req, res) {
  let body = req.body;

  let funcion = body.funcion;
  let xInferior = Number(body.xInferior);
  let xSuperior = Number(body.xSuperior);
  let tolerance = Number(body.tolerance);
  let iterations = Number(body.iterations);
  let tipoError = body.tipoError;

  let raiz = metodos.bisection(
    funcion,
    xInferior,
    xSuperior,
    tolerance,
    iterations,
    tipoError
  );

  res.json({
    error: false,
    funcion,
    xInferior,
    xSuperior,
    tolerance,
    iterations,
    tipoError,
    raiz
  });
});
module.exports = app;
