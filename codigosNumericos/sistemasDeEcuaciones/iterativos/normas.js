const math = require('mathjs');

const normaUniforme = vector => {
  let x = math.max(math.abs(vector));
  return x;
};

const norma1 = vector => {
  let x = 0;
  vector.forEach(componente => (x = math.add(x, math.abs(componente))));
  return x;
};

const norma2 = vector => {
  let x = 0;
  vector.forEach(componente => (x = math.add(x, math.square(componente))));
  x = math.sqrt(x);
  return x;
};

module.exports = { normaUniforme, norma1, norma2 };
