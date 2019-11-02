var ctx = document.getElementById('myChart');

let chart = new Chart(ctx, {
  type: 'line',
  data: {
    datasets: [
      {
        label: 'First dataset',
        data: [0, 20, 40, 50]
      }
    ],
    labels: ['January', 'February', 'March', 'April']
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 50,
            suggestedMax: 100
          }
        }
      ]
    }
  }
});
