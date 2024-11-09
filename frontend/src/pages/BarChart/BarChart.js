import React from 'react';
import { Bar } from 'react-chartjs-2';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ products }) => {
  let productNames = [];
  let stockLevels = [];

  products.forEach(product => {
    productNames.push(product.name);
    stockLevels.push(product.stockQuantity);
  });

  const chartData = {
    labels: productNames,

    datasets: [
      {
        label: 'Stock Levels',
        data: stockLevels,
        backgroundColor: "#f4f4f4",
        borderColor: "#f4f4f4",
        borderWidth: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks:{
          color: "#f4f4f4",
        },
        beginAtZero: true,
      },
      x: {
        ticks: {
          color: "#f4f4f4",
        }
      }
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;