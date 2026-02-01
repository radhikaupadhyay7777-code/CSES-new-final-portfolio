const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const helpRoutes = require("./routes/helpRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/help", helpRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
