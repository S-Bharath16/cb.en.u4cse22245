const express = require("express");
const { fetchPriceHistory } = require("../utils/fetch");

const router = express.Router();

router.get("/:ticker", async (req, res) => {
  const { minutes, aggregation } = req.query;
  const { ticker } = req.params;

  if (aggregation !== "average") {
    return res.status(400).json({ error: "Only 'average' aggregation is supported." });
  }

  try {
    const prices = await fetchPriceHistory(ticker, minutes);
    const average = prices.reduce((acc, p) => acc + p.price, 0) / prices.length;

    return res.json({
      averageStockPrice: average,
      priceHistory: prices
    });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong", details: err.message });
  }
});

module.exports = router;
