const express = require("express");
const app = express();
const stockRoutes = require("./routes/stocks"); // Import the router

// Middleware
app.use(express.json());

// Register routes
app.use("/", stockRoutes); // Mount the router

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
