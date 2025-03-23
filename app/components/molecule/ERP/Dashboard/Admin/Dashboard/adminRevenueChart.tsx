import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RevenueChart = () => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const generateMockData = () => {
    const fees = months.map(() => Math.floor(Math.random() * 50000) + 30000);
    const salaries = months.map(() => Math.floor(Math.random() * 30000) + 20000);
    return { fees, salaries };
  };

  useEffect(() => {
    const { fees, salaries } = generateMockData();
    
    const data = {
      labels: months,
      datasets: [
        {
          label: "Student Fees",
          data: fees,
          borderColor: "#6366f1",
          backgroundColor: "transparent",
          borderWidth: 3,
          pointBackgroundColor: "#6366f1",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          yAxisID: "y"
        },
        {
          label: "Teacher Salaries",
          data: salaries,
          borderColor: "#f43f5e",
          backgroundColor: "transparent",
          borderWidth: 3,
          pointBackgroundColor: "#f43f5e",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.4,
          yAxisID: "y1"
        }
      ]
    };

    setChartData(data);
    setIsLoading(false);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart respects the container height
    interaction: {
      mode: "index",
      intersect: false
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          },
          color: "#64748b"
        }
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          },
          color: "#64748b"
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "Inter, sans-serif",
            size: 12
          },
          color: "#64748b"
        }
      }
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            family: "Inter, sans-serif",
            size: 13,
            weight: 500
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#0f172a",
        bodyColor: "#64748b",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        bodyFont: {
          family: "Inter, sans-serif",
          size: 12
        },
        titleFont: {
          family: "Inter, sans-serif",
          size: 13,
          weight: 600
        },
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    animation: {
      duration: 1500,
      easing: "easeInOutQuart"
    }
  };

  const calculateNetRevenue = () => {
    if (!chartData) return 0;
    const totalFees = chartData.datasets[0].data.reduce((a, b) => a + b, 0);
    const totalSalaries = chartData.datasets[1].data.reduce((a, b) => a + b, 0);
    return totalFees - totalSalaries;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const netRevenue = calculateNetRevenue();
  const isPositiveRevenue = netRevenue > 0;

  return (
    <div className="mx-5 p-8 bg-gradient-to-t from-gray-200 to-gray-50 border rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="">
        <div className="flex items-center space-x-4 animate-fade-in">
          <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg">
            <span className="text-slate-600 font-bold">Net Revenue:</span>
            <span className={`font-semibold ${calculateNetRevenue() > 0 ? "text-indigo-500" : "text-rose-500"}`}>
              ${calculateNetRevenue().toLocaleString()}
            </span>
            {calculateNetRevenue() > 0 ? (
              <FiTrendingUp className="text-indigo-500" />
            ) : (
              <FiTrendingDown className="text-rose-500" />
            )}
          </div>
        </div>
      </div>

      <div className="relative h-[calc(30rem-5rem)] w-[65rem] transition-transform duration-300 hover:scale-[1.01]">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse text-slate-400">Loading data...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;