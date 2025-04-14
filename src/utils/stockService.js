// Stock data service configuration
const ALPHA_VANTAGE_API_KEY = 'YOUR_API_KEY'; // Replace with your Alpha Vantage API key
const BASE_URL = 'https://www.alphavantage.co/query';

// Helper for API calls
const callStockApi = async (params) => {
  const queryParams = new URLSearchParams({
    ...params,
    apikey: ALPHA_VANTAGE_API_KEY,
  });

  const response = await fetch(`${BASE_URL}?${queryParams}`);
  if (!response.ok) {
    throw new Error('Failed to fetch stock data');
  }

  const data = await response.json();
  if (data['Error Message']) {
    throw new Error(data['Error Message']);
  }

  return data;
};

// Get daily stock data
export const getDailyStockData = async (symbol) => {
  try {
    const data = await callStockApi({
      function: 'TIME_SERIES_DAILY',
      symbol,
      outputsize: 'full',
    });

    const timeSeriesData = data['Time Series (Daily)'];
    if (!timeSeriesData) {
      throw new Error(`No data found for ${symbol}`);
    }

    const processedData = Object.entries(timeSeriesData)
      .map(([date, values]) => ({
        date,
        price: parseFloat(values['4. close']),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    return processedData;
  } catch (error) {
    throw new Error(`Failed to fetch stock data: ${error.message}`);
  }
};

// Get stock forecast
export const getStockForecast = async (symbol, years) => {
  try {
    const historicalData = await getDailyStockData(symbol);
    
    // Calculate SMAs
    const sma20 = calculateSMA(historicalData, 20);
    const sma50 = calculateSMA(historicalData, 50);

    // Add SMA values to historical data
    const enrichedHistoricalData = historicalData.map(data => {
      const sma20Value = sma20.find(s => s.date === data.date)?.value || null;
      const sma50Value = sma50.find(s => s.date === data.date)?.value || null;
      return {
        ...data,
        sma20: sma20Value,
        sma50: sma50Value,
      };
    });

    // Calculate forecast
    const forecast = calculateForecast(historicalData, years);

    return {
      historicalData: enrichedHistoricalData,
      forecast,
    };
  } catch (error) {
    throw new Error(`Failed to generate forecast: ${error.message}`);
  }
};

// Helper function to calculate Simple Moving Average
const calculateSMA = (data, period) => {
  const sma = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, curr) => acc + curr.price, 0);
    sma.push({
      date: data[i].date,
      value: sum / period,
    });
  }
  return sma;
};

// Helper function to calculate forecast using linear regression
const calculateForecast = (historicalData, years) => {
  const daysToForecast = years * 365;
  const prices = historicalData.map(d => d.price);
  const dates = historicalData.map(d => d.date);

  // Simple linear regression
  const n = prices.length;
  const xMean = (n - 1) / 2;
  const yMean = prices.reduce((a, b) => a + b, 0) / n;

  let numerator = 0;
  let denominator = 0;
  for (let i = 0; i < n; i++) {
    numerator += (i - xMean) * (prices[i] - yMean);
    denominator += Math.pow(i - xMean, 2);
  }

  const slope = numerator / denominator;
  const intercept = yMean - slope * xMean;

  // Generate forecast
  const forecast = [];
  const lastDate = new Date(dates[dates.length - 1]);
  
  for (let i = 1; i <= daysToForecast; i++) {
    const forecastDate = new Date(lastDate);
    forecastDate.setDate(lastDate.getDate() + i);
    
    const forecastPrice = slope * (n + i - 1) + intercept;
    forecast.push({
      date: forecastDate.toISOString().split('T')[0],
      price: forecastPrice,
    });
  }

  return forecast;
}; 