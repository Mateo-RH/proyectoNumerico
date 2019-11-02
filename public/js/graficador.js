window.d3 = d3;

const root = document.querySelector('#root');
const funcion = document.querySelector('#funcion');

var options = {
  target: root,
  grid: true,
  data: [
    {
      fn: 'x'
    }
  ]
};

$('#update').click(function() {
  if (!options.title && funcion.value != '') {
    funcion.value = funcion.value.replace('e', Math.exp(1));
    // add a title, a tip and change the function to y = x * x
    options.title = 'hello world';
    options.grid = true;
    options.tip = {
      xLine: true,
      yLine: true
    };
    options.data[0] = {
      fn: funcion.value,
      derivative: {
        fn: '2 * x',
        updateOnMouseMove: true
      }
    };
  } else {
    // remove the title and the tip
    // update the function to be y = x
    delete options.title;
    delete options.tip;
    delete options.grid;
    options.data[0] = {
      fn: 'x'
    };
  }
  functionPlot(options);
});
// initial plot
functionPlot(options);
