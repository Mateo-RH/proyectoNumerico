const express = require('express');
const app = express();

app.use(require('./ecuacionesNoLineales'));
app.use(require('./sistemasDeEcuaciones'));
app.use(require('./interpolacion'));
// TODO: LAGRANGE Y RAICES MULTIPLES
module.exports = app;
