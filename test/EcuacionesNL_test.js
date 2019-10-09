const assert = require('assert');
const {
  biseccion,
  reglaFalsa
} = require('../codigosNumericos/ecuacionesNoLineales/index');

// before each en cerrados, busqueda incremental
// TODO: posiblemente correr todos los metodos aca y solo verificar que no estallen...

describe('Cerrados', () => {
  it('Biseccion', () => {
    funcion = 'log(sin(x)^2 + 1) - 1/2';
    resultado = biseccion(funcion, 0, 1, 0.0000001, 100);
    assert.equal(resultado, 0.9364045262336731);
  });

  it('Regla Falsa', () => {
    funcion = 'log(sin(x)^2 + 1) - 1/2';
    resultado = reglaFalsa(funcion, 2, 3, 0.0005, 11);
    assert.equal(resultado, 2.2051851255924912);
  });
});
