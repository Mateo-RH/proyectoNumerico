const express = require('express');
const app = express();

app.use(require('./metodos'));
app.use(require('./sistemasDeEcuaciones'));

module.exports = app;
