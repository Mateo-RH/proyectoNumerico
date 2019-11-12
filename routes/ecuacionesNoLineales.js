const express = require("express");
const app = express();
const {
  busquedasIncrementales,
  biseccion,
  reglaFalsa,
  newton,
  puntoFijo,
  raicesMultiples,
  secante
} = require("../codigosNumericos/ecuacionesNoLineales/index");

app.post("/busquedaIncremental", function(req, res) {
  let body = req.body;

  let funcion = body.funcion || "";
  let xInicial = Number(body.xInicial) || 0;
  let xDelta = Number(body.xDelta) || 0;
  let iterations = Number(body.iterations) || 0;

  let metodo = busquedasIncrementales(funcion, xInicial, xDelta, iterations);

  res.json({
    metodo
  });
});

app.post("/biseccion", function(req, res) {
  let body = req.body;

  let funcion = body.funcion || "";
  let xInferior = Number(body.xInferior) || 0;
  let xSuperior = Number(body.xSuperior) || 0;
  let tolerance = Number(body.tolerance) || 0;
  let iterations = Number(body.iterations) || 0;

  let metodo = biseccion(funcion, xInferior, xSuperior, tolerance, iterations);

  res.json({
    metodo
  });
});

app.post("/reglaFalsa", function(req, res) {
  let body = req.body;

  let funcion = body.funcion || "";
  let xInferior = Number(body.xInferior) || 0;
  let xSuperior = Number(body.xSuperior) || 0;
  let tolerance = Number(body.tolerance) || 0;
  let iterations = Number(body.iterations) || "";

  let metodo = reglaFalsa(funcion, xInferior, xSuperior, tolerance, iterations);

  res.json({
    metodo
  });
});

app.post("/puntoFijo", function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || "";
  let funcionG = body.funcionG || "";
  let tolerance = Number(body.tolerance) || 0;
  let Xa = Number(body.Xa) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || "";

  let metodo = puntoFijo(funcionF, funcionG, tolerance, Xa, niter, tipoError);

  res.json({
    metodo
  });
});

app.post("/newton", function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || "";
  let funciondF = body.funciondF || "";
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || "";

  let metodo = newton(funcionF, funciondF, tolerance, Xo, niter, tipoError);

  res.json({
    metodo
  });
});

app.post("/secante", function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || "";
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let x1 = Number(body.x1) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || "";

  let metodo = secante(funcionF, tolerance, Xo, x1, niter, tipoError);

  res.json({
    metodo
  });
});

app.post("/raicesMultiples", function(req, res) {
  let body = req.body;

  let funcionF = body.funcionF || "";
  let funciondF = body.funciondF || "";
  let funcionddF = body.funcionddF || "";
  let tolerance = Number(body.tolerance) || 0;
  let Xo = Number(body.Xo) || 0;
  let niter = Number(body.niter) || 0;
  let tipoError = body.tipoError || "";

  let metodo = raicesMultiples(
    funcionF,
    funciondF,
    funcionddF,
    tolerance,
    Xo,
    niter,
    tipoError
  );

  res.json({
    metodo
  });
});

module.exports = app;
