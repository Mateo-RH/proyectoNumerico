const express = require('express');
const app = express();
const {
  gaussSimple,
  gaussPivotevoParcial,
  gaussPivotevoTotal,
  factorizacionMatrices,
  factorizacionMatricesPivoteo,
  factorizacionCrout,
  factorizacionDoolittle,
  factorizacionCholesky,
  jacobi,
  gaussSeidel
} = require('../codigosNumericos/sistemasDeEcuaciones/index');

app.post('/sistemasDeEcuaciones/gaussSimple', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = gaussSimple(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/gaussPivoteoParcial', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = gaussPivotevoParcial(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/gaussPivoteoTotal', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = gaussPivotevoTotal(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/factorizacionMatrices', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = factorizacionMatrices(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/factorizacionMatricesPivoteo', function(
  req,
  res
) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = factorizacionMatricesPivoteo(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/factorizacionCrout', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = factorizacionCrout(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/factorizacionDoolittle', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = factorizacionDoolittle(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

app.post('/sistemasDeEcuaciones/factorizacionCholesky', function(req, res) {
  let body = req.body;
  let vector = body.vector.split(',').map(item => parseInt(item));
  let matrix = body['matrix[]'].map(fila => {
    let filaMatrix = fila.split(',').map(item => parseInt(item));
    return filaMatrix;
  });
  let metodo = factorizacionCholesky(matrix, vector);

  if (metodo.error) {
    res.json({
      metodo
    });
  } else {
    res.json({
      metodo
    });
  }
});

module.exports = app;
