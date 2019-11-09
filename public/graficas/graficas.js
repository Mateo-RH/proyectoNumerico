window.d3 = d3;

const root = document.querySelector('#root');

functionPlot({
  target: root,
  yAxis: { domain: [-1, 9] },
  tip: {
    renderer: function() {}
  },
  grid: true,
  data: [
    {
      fn: 'x^2',
      derivative: {
        fn: '2 * x',
        updateOnMouseMove: true
      }
    }
  ]
});

function test() {
  console.log('Test');
}
