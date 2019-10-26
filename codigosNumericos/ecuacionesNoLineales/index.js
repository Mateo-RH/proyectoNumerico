const busquedasIncrementales = require('./cerrados/busquedasIncrementales');
const biseccion = require('./cerrados/biseccion');
const reglaFalsa = require('./cerrados/reglaFalsa');
const newton = require('./abiertos/newton');
const puntoFijo = require('./abiertos/puntoFijo');
const raicesMultiples = require('./abiertos/raicesMultiples');
const secante = require('./abiertos/secante');

// Cerrados
const funcion = 'log(sin(x)^2 + 1) - 1/2';
// busquedasIncrementales(funcion, -3, 0.5, 100);
// biseccion(funcion, 0, 1, 0.0000001, 100);
// reglaFalsa(funcion, 2, 3, 0.0005, 11);

// Abiertos
// const funcionD = '2*(sin(x)^2 + 1)^-1 * sin(x) * cos(x)';
// const funcionf = 'log(sin(x)^2 + 1) - 1/2 - x';
// const funciong = 'log(sin(x)^2 + 1) - 1/2';
// const funciondf = 'x*e^x';
// const funcionddf = 'x*e^x + e^x';
// const h = '(e^x) - x - 1';
// const hd = '(e^x) - 1';
// const hdd = 'e^x';
// puntoFijo(funcionf, funciong, 0.0000001, -0.5, 100, 'E');
// newton(funcion, funcionD, 0.0000001, 0.5, 100, 'E');
// secante(funcion, 0.0000001, 0.5, 1, 100, 'E');
// multipleRoots(h, hd, hdd, 0.0000001, 1, 100, 'E');
// multipleRoots2(h, hd, hdd, 0.0000001, 1, 100, 'E');

module.exports = {
  busquedasIncrementales,
  biseccion,
  reglaFalsa,
  newton,
  puntoFijo,
  raicesMultiples,
  secante
};
