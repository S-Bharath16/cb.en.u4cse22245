const express = require("express");
const stockRoutes = require("./routes/stocks");

const app = express();
app.use(express.json());

// Route for Q1 API
app.use("/stocks", stockRoutes);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
