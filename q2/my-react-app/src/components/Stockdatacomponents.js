import React, { useState } from "react";
import axios from "axios";
import "./Stockdatacomponents.css";

const StockData = () => {
  const [ticker, setTicker] = useState("");
  const [minutes, setMinutes] = useState(5);
  const [aggregation, setAggregation] = useState("average");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");

  const fetchStockData = async () => {
    try {
      setError("");
      const response = await axios.get(`http://localhost:8000/stocks/${ticker}`, {
        params: {
          minutes: minutes,
          aggregation: aggregation,
        },
      });
      setStockData(response.data);
    } catch (err) {
      setError("Failed to fetch stock data.");
      console.error(err);
    }
  };

  return (
    <div className="stock-container">
      <h2 className="heading">📊 Stock Data Lookup</h2>

      <div className="input-group">
        <label>
          Ticker:
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="e.g., AAPL"
          />
        </label>
      </div>

      <div className="input-group">
        <label>
          Minutes:
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            min="1"
          />
        </label>
      </div>

      <div className="input-group">
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

      <button className="fetch-button" onClick={fetchStockData}>
        Get Stock Data
      </button>

      {error && <p className="error">{error}</p>}

      {stockData && (
        <div className="result">
          <h3>📈 Results for: {ticker.toUpperCase()}</h3>
          {aggregation === "average" && stockData.averageStockPrice && (
            <p>
              <strong>Average Price:</strong> ${stockData.averageStockPrice}
            </p>
          )}

          {stockData.priceHistory && stockData.priceHistory.length > 0 && (
            <div>
              <h4>Price History</h4>
              <ul>
                {stockData.priceHistory.map((price, index) => (
                  <li key={index}>
                    💲 <strong>{price.price}</strong> — 🕒{" "}
                    {new Date(price.lastUpdatedAt).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockData;
