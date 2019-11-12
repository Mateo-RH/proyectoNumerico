const express = require('express');
const app = express();
const {
  vandermonde,
  newton,
  lagrange,
  splineLineal,
  splineCuadratico,
  splineCubico
} = require('../codigosNumericos/interpolacion/index');

app.post('/interpolacion/vandermonde', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = vandermonde(points);
  res.json({
    metodo
  });
});

app.post('/interpolacion/newton', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = newton(points);
  res.json({
    metodo
  });
});

app.post('/interpolacion/lagrange', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = lagrange(points);
  res.json({
    metodo
  });
});

app.post('/interpolacion/splineLineal', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = splineLineal(points);
  res.json({
    metodo
  });
});

app.post('/interpolacion/splineCuadratico', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = splineCuadratico(points);
  res.json({
    metodo
  });
});

app.post('/interpolacion/splineCubico', function(req, res) {
  let body = req.body;
  let points = body['points[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = splineCubico(points);
  res.json({
    metodo
  });
});

module.exports = app;
