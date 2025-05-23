require("../config/module-alias")();

const express = require("express"),
  http = require("http"),
  dotenv = require("dotenv").config(),
  authRoutes = require("@route/auth.route"),
  { connectDB } = require("@lib/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

async function startServer() {
  await connectDB();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log("------------------------");
    console.log(`Server running on port ${PORT}`);
    console.log("------------------------");
  });
}

startServer();
