import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import { getStockForecast } from '../utils/stockService';
import '../Styles/StockForecast.css';

// Register ChartJS components
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

const StockForecast = () => {
  const [stockSymbol, setStockSymbol] = useState('AAPL');
  const [predictionYears, setPredictionYears] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stockData, setStockData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setStockData(null);

    try {
      const data = await getStockForecast(stockSymbol, predictionYears);
      setStockData(data);
    } catch (err) {
      setError(err.message || 'Unable to load stock data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!stockData) return null;

    const { historicalData, forecast } = stockData;
    const labels = [...historicalData.map(d => d.date), ...forecast.map(f => f.date)];
    
    return {
      labels,
      datasets: [
        {
          label: 'Historical Price',
          data: [...historicalData.map(d => d.price), ...Array(forecast.length).fill(null)],
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          fill: false,
        },
        {
          label: 'SMA 20',
          data: [...historicalData.map(d => d.sma20), ...Array(forecast.length).fill(null)],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'SMA 50',
          data: [...historicalData.map(d => d.sma50), ...Array(forecast.length).fill(null)],
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          fill: false,
          borderDash: [5, 5],
        },
        {
          label: 'Forecast',
          data: [...Array(historicalData.length).fill(null), ...forecast.map(f => f.price)],
          borderColor: 'rgb(153, 102, 255)',
          backgroundColor: 'rgba(153, 102, 255, 0.5)',
          fill: false,
          borderDash: [2, 2],
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${stockSymbol} Stock Price Forecast`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="stock-forecast">
      <form onSubmit={handleSubmit} className="stock-form">
        <div className="form-group">
          <label htmlFor="stockSymbol">Stock Symbol</label>
          <input
            type="text"
            id="stockSymbol"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., AAPL)"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="predictionYears">Prediction Years</label>
          <input
            type="number"
            id="predictionYears"
            value={predictionYears}
            onChange={(e) => setPredictionYears(Math.max(1, Math.min(5, parseInt(e.target.value) || 1)))}
            min="1"
            max="5"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Forecast'}
        </button>
      </form>

      {loading && <div className="loading">Loading stock data...</div>}
      {error && <div className="error">{error}</div>}
      
      {stockData && (
        <div className="chart-container" style={{ height: '400px' }}>
          <Line data={prepareChartData()} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default StockForecast; 