import Chart from 'chart.js/auto';

let charts = {};

export function createPerformanceChart(ctx, data = []) {
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{ label: 'Desempenho', data }]
    }
  });
  charts[ctx.id || Date.now()] = chart;
  return chart;
}

export function updateChart(chart, data) {
  chart.data.labels = data.map((_, i) => i + 1);
  chart.data.datasets[0].data = data;
  chart.update();
}

export { charts };
