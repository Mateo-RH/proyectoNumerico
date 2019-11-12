const algebra = require("algebra.js");

const correccionSignos = ecuacion => {
  ecuacion = ecuacion.split(" ").join("");
  ecuacion = ecuacion.split("++").join("+");
  ecuacion = ecuacion.split("+-").join("-");
  ecuacion = ecuacion.split("-+").join("-");
  ecuacion = ecuacion.split("--").join("+");
  return ecuacion;
};

const simplificaExpr = expr => {
  if (expr[0] == "+") expr = expr.substring(1);
  expr = algebra.parse(expr);
  let constante = expr.constants[0].numer / expr.constants[0].denom;
  let numTemp = "";

  expr.terms.forEach(termino => {
    var coeficiente =
      termino.coefficients[0].numer / termino.coefficients[0].denom;
    var variable = `+ ${coeficiente}${termino.variables[0].variable}^${termino.variables[0].degree}`;
    numTemp += variable;
  });

  numTemp += `+${constante}`;

  return correccionSignos(numTemp);
};

const crearPuntos = puntos => {
  let points = puntos.map(item => {
    return { x: item[0], y: item[1] };
  });
  return points;
};

const crearEcuacion = puntos => {
  let ecuacion = "";
  puntos.forEach((item, idx) => {
    if (idx == 0) ecuacion += item;
    else ecuacion += `+${item}`;
  });
  ecuacion = correccionSignos(ecuacion);
  return ecuacion;
};

module.exports = {
  correccionSignos,
  simplificaExpr,
  crearPuntos,
  crearEcuacion
};
