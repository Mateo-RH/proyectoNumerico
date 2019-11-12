const {
  correccionSignos,
  crearPuntos,
  crearEcuacion
} = require("./auxiliares");

const splineLineal = points => {
  let puntos = crearPuntos(points);
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
  let ecuacion = crearEcuacion(polinomios);
  return { error: false, polinomios, ecuacion };
};

module.exports = { splineLineal };
