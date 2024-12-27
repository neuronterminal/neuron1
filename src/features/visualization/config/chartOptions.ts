import { ChartOptions } from 'chart.js';

export const defaultChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 750,
    easing: 'easeInOutQuart'
  },
  interaction: {
    intersect: false,
    mode: 'index'
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 255, 65, 0.1)'
      },
      ticks: {
        color: '#00ff41'
      }
    },
    x: {
      grid: {
        color: 'rgba(0, 255, 65, 0.1)'
      },
      ticks: {
        color: '#00ff41',
        maxRotation: 0
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#00ff41',
        font: {
          family: "'Courier New', monospace"
        }
      }
    }
  }
};
