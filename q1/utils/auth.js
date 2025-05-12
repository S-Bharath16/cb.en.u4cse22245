const axios = require("axios");
require("dotenv").config();

let cachedToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);

  if (cachedToken && tokenExpiry && now < tokenExpiry - 60) {
    return cachedToken;
  }

  const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
    email: process.env.EMAIL,
    name: process.env.NAME,
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });

  cachedToken = response.data.access_token;
  tokenExpiry = response.data.expires_in;

  return cachedToken;
}

module.exports = { getAccessToken };
