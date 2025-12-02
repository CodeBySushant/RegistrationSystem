const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("REQ:", req.method, req.originalUrl);
  next();
});

// Routes
const genericFormRoutes = require("./routes/genericFormRoutes");
app.use("/api/forms", genericFormRoutes);

const reports = require("./routes/reports");
app.use("/api/reports", reports);

const certificates = require("./routes/certificates");
app.use("/api/certificates", certificates);

// Generic 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
});
