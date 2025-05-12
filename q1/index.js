const express = require("express");
const app = express();
const stockRoutes = require("./routes/stocks"); 


app.use(express.json());

const cors = require("cors");
app.use(cors());


app.use("/", stockRoutes); 


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
