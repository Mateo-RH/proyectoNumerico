const express = require('express');
const metodos = require('../metodos/metodosNumericos');
const app = express();

app.post('/busquedaIncremental', function(req, res) {
  let body = req.body;

  let funcion = body.funcion;
  let xInicial = Number(body.xInicial);
  let xDelta = Number(body.xDelta);
  let iterations = Number(body.iterations);

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

app.post('/reglaFalsa', function(req, res) {
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

app.post('/puntoFijo', function(req, res) {
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

app.post('/newton', function(req, res) {
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

app.post('/secante', function(req, res) {
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

app.post('/raicesMultiples', function(req, res) {
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
