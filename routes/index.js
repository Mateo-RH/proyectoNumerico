const express = require('express');
const app = express();

app.use(require('./ecuacionesNoLineales'));
app.use(require('./sistemasDeEcuaciones'));

module.exports = app;
