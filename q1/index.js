const express = require("express");
const app = express();
const stockRoutes = require("./routes/stocks");

app.use(express.json());

app.use("/", stockRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
