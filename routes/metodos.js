const express = require('express');
const app = express();
const {
  busquedasIncrementales,
  biseccion,
  reglaFalsa,
  newton,
  puntoFijo,
  raicesMultiples,
  secante
} = require('../codigosNumericos/ecuacionesNoLineales/index');

app.post('/busquedaIncremental', function(req, res) {
  let body = req.body;

  let funcion = body.funcion || '';
  let xInicial = Number(body.xInicial) || 0;
  let xDelta = Number(body.xDelta) || 0;
  let iterations = Number(body.iterations) || 0;

  let intervalos = busquedasIncrementales(
    funcion,
    xInicial,
    xDelta,
    iterations
  );

  if (!intervalos) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcion,
      xInicial,
      xDelta,
      iterations,
      intervalos
    });
  }
});

app.post('/biseccion', function(req, res) {
  let body = req.body;

  let funcion = body.funcion || '';
  let xInferior = Number(body.xInferior) || 0;
  let xSuperior = Number(body.xSuperior) || 0;
  let tolerance = Number(body.tolerance) || 0;
  let iterations = Number(body.iterations) || 0;

  let raiz = biseccion(funcion, xInferior, xSuperior, tolerance, iterations);

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcion,
      xInferior,
      xSuperior,
      tolerance,
      iterations,
      raiz
    });
  }
});

app.post('/reglaFalsa', function(req, res) {
  let body = req.body;

  let funcion = body.funcion || '';
  let xInferior = Number(body.xInferior) || 0;
  let xSuperior = Number(body.xSuperior) || 0;
  let tolerance = Number(body.tolerance) || 0;
  let iterations = Number(body.iterations) || '';

  let raiz = reglaFalsa(funcion, xInferior, xSuperior, tolerance, iterations);

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcion,
      xInferior,
      xSuperior,
      tolerance,
      raiz
    });
  }
});

app.post('/puntoFijo', function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || '';
  let funcionG = body.funcionG || '';
  let tolerance = Number(body.tolerance) || 0;
  let Xa = Number(body.Xa) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || '';

  let raiz = puntoFijo(funcionF, funcionG, tolerance, Xa, niter, tipoError);

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcionF,
      funcionG,
      tolerance,
      Xa,
      niter,
      tipoError,
      raiz
    });
  }
});

app.post('/newton', function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || '';
  let funciondF = body.funciondF || '';
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || '';

  let raiz = newton(funcionF, funciondF, tolerance, Xo, niter, tipoError);

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcionF,
      funciondF,
      tolerance,
      Xo,
      niter,
      tipoError,
      raiz
    });
  }
});

app.post('/secante', function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || '';
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let x1 = Number(body.x1) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || '';

  let raiz = secante(funcionF, tolerance, Xo, x1, niter, tipoError);

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcionF,
      tolerance,
      Xo,
      x1,
      niter,
      tipoError,
      raiz
    });
  }
});

app.post('/raicesMultiples', function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || '';
  let funciondF = body.funciondF || '';
  let funcionddF = body.funcionddF || '';
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || '';

  let raiz = raicesMultiples(
    funcionF,
    funciondF,
    funcionddF,
    tolerance,
    Xo,
    niter,
    tipoError
  );

  if (!raiz) {
    res.json({
      error: true,
      msg: 'El metodo fallo'
    });
  } else {
    res.json({
      error: false,
      funcionF,
      funciondF,
      funcionddF,
      tolerance,
      Xo,
      niter,
      tipoError,
      raiz
    });
  }
});

module.exports = app;
