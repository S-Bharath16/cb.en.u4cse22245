// fetch.js
const axios = require("axios");
const { getAccessToken } = require("./auth");

async function fetchPriceHistory(ticker, minutes) {
  const token = await getAccessToken();

  const response = await axios.get(
    `http://20.244.56.144/evaluation-service/stocks/${ticker}?minutes=${minutes}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  console.log("API Response:", response.data); // Debug print
  return response.data;
}

module.exports = { fetchPriceHistory };
