const busquedasIncrementales = require('./busquedasIncrementales');
const biseccion = require('./cerrados/biseccion');
const reglaFalsa = require('./cerrados/reglaFalsa');
const newton = require('./abiertos/newton');
const puntoFijo = require('./abiertos/puntoFijo');
const raicesMultiples = require('./abiertos/raicesMultiples');
const secante = require('./abiertos/secante');

module.exports = {
  busquedasIncrementales,
  biseccion,
  reglaFalsa,
  newton,
  puntoFijo,
  raicesMultiples,
  secante
};
