const axios = require("axios");
require("dotenv").config();

let cachedToken = null;
let tokenExpirationTime = 0; 

async function getAccessToken() {
  const currentTime = Date.now() / 1000; 
  
  if (cachedToken && tokenExpirationTime > currentTime) {
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
  tokenExpirationTime = currentTime + response.data.expires_in;

  return cachedToken;
}

module.exports = { getAccessToken };
