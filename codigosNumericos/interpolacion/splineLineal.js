const algebra = require('algebra.js');
const { correccionSignos } = require('./auxiliares');

const splineLineal = puntos => {
  let polinomios = puntos.map((punto, idx) => {
    if (idx < puntos.length - 1) {
      var x = puntos[idx + 1].x;
      var y = puntos[idx + 1].y;
      var m = (y - punto.y) / (x - punto.x);
      var ecuacion = correccionSignos(`${y}+(${m.toFixed(7)}*(x - ${x}))`);
      return { Px: idx, Polynomial: ecuacion };
    }
  });
  polinomios.pop();
  console.log('Polynomials');
  console.table(polinomios);
  return polinomios;
};

// const simplificarPolinomios = polinomios => {
//   polinomios = polinomios.map(pol => {
//     pol = algebra.parse(pol);
//     var div =
//       pol.terms[0].coefficients[0].numer / pol.terms[0].coefficients[0].denom;
//     var div2 = pol.constants[0].numer / pol.constants[0].denom;
//     pol = `${div}x + ${div2}`;
//     return correccionSignos(pol);
//   });
//   console.log('Polinomios');
//   return polinomios;
// };

module.exports = { splineLineal };
