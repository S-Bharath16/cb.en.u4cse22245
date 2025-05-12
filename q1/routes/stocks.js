const express = require("express");
const router = express.Router();
const { fetchPriceHistory } = require("../utils/fetch");

function calculateAverage(prices) {
  if (prices.length === 0) return null;
  const total = prices.reduce((sum, p) => sum + p.price, 0);
  return total / prices.length;
}

router.get("/stocks/:ticker", async (req, res) => {
  try {
    const ticker = req.params.ticker;
    const minutes = req.query.minutes || 5;
    const aggregation = req.query.aggregation || "average";

    const prices = await fetchPriceHistory(ticker, minutes);

    if (!prices || prices.length === 0) {
      return res.json({
        averageStockPrice: null,
        priceHistory: []
      });
    }

    let result;
    if (aggregation === "average") {
      const averagePrice = calculateAverage(prices);
      result = {
        averageStockPrice: averagePrice,
        priceHistory: prices
      };
    } else {
      result = { priceHistory: prices };
    }

    res.json(result);
  } catch (err) {
    console.error("Error in /stocks/:ticker route:", err.message);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

module.exports = router;
