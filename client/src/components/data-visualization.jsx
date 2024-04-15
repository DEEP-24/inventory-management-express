import axios from "axios";
import * as React from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

export default function DataVisualization() {
  const [chartData, setChartData] = React.useState({});

  const loadData = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily";

    try {
      const response = await axios.get(url);
      const prices = response.data.prices;
      if (!prices) {
        console.error("No price data available");
        return;
      }

      const formattedData = prices.map(([timestamp, value]) => ({
        x: new Date(timestamp).toISOString().slice(0, 10),
        y: parseFloat(value.toFixed(2)),
      }));

      setChartData({
        labels: formattedData.map((data) => data.x),
        datasets: [
          {
            label: "Bitcoin Price (USD)",
            data: formattedData.map((data) => data.y),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching cryptocurrency data:", error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-screen w-screen mt-5 p-10">
      <h1 className="flex items-center justify-center text-5xl text-black/80">
        Bitcoin Price Chart (Last 30 Days)
      </h1>
      {chartData && chartData.datasets && chartData.datasets.length > 0 ? (
        <Line
          className="p-5 mt-2"
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                },
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                beginAtZero: false,
                title: {
                  display: true,
                  text: "Price (USD)",
                },
              },
            },
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Bitcoin Price Over Time",
              },
            },
          }}
        />
      ) : (
        <p>Loading or no data available...</p>
      )}
    </div>
  );
}
