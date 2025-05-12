import React, { useState } from "react";
import axios from "axios";
import "./Stockdatacomponents.css";

const StockData = () => {
  const [ticker, setTicker] = useState(""); // For user input
  const [minutes, setMinutes] = useState(5); // Default minutes
  const [aggregation, setAggregation] = useState("average"); // Default aggregation
  const [stockData, setStockData] = useState(null); // To store the fetched stock data
  const [error, setError] = useState(""); // To store any error messages

  const fetchStockData = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.get(`http://localhost:8000/stocks/${ticker}`, {
        params: {
          minutes: minutes,
          aggregation: aggregation,
        },
      });
      setStockData(response.data); // Store the data in the state
    } catch (err) {
      setError("Failed to fetch stock data.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Stock Data</h2>
      <div>
        <label>
          Ticker:
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Aggregation:
          <select
            value={aggregation}
            onChange={(e) => setAggregation(e.target.value)}
          >
            <option value="average">Average</option>
            <option value="none">None</option>
          </select>
        </label>
      </div>
      <button onClick={fetchStockData}>Get Stock Data</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {stockData && (
        <div>
          <h3>Stock Data for {ticker}</h3>
          <div>
            {aggregation === "average" && stockData.averageStockPrice && (
              <p>Average Stock Price: {stockData.averageStockPrice}</p>
            )}
            {stockData.priceHistory && stockData.priceHistory.length > 0 && (
              <div>
                <h4>Price History</h4>
                <ul>
                  {stockData.priceHistory.map((price, index) => (
                    <li key={index}>
                      Price: {price.price}, Last Updated: {price.lastUpdatedAt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StockData;
