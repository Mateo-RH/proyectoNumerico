const algebra = require('algebra.js');
const { correccionSignos } = require('./auxiliares');

const splinerLineal = puntos => {
  let polinomios = puntos.map((punto, idx) => {
    if (idx < puntos.length - 1) {
      var x = puntos[idx + 1].x;
      var y = puntos[idx + 1].y;
      var m = (y - punto.y) / (x - punto.x);
      var ecuacion = correccionSignos(`${y}+(${m.toFixed(7)}*(x - ${x}))`);
      return ecuacion;
    }
  });
  polinomios.pop();
  console.log('Polinomios');
  console.log(polinomios);
  return polinomios;
};

const simplificarPolinomios = polinomios => {
  polinomios = polinomios.map(pol => {
    pol = algebra.parse(pol);
    var div =
      pol.terms[0].coefficients[0].numer / pol.terms[0].coefficients[0].denom;
    var div2 = pol.constants[0].numer / pol.constants[0].denom;
    pol = `${div}x + ${div2}`;
    return correccionSignos(pol);
  });
  console.log('Polinomios');
  return polinomios;
};

const puntos = [
  { x: 1, y: 4.31 },
  { x: 3, y: 1.5 },
  { x: 4, y: 3.2 },
  { x: 5, y: 2.6 },
  { x: 7, y: 1.8 }
];

let polinomios = splinerLineal(puntos);
// ALTO RIESGO DE USO
polinomios = simplificarPolinomios(polinomios);
///
console.log(polinomios);
