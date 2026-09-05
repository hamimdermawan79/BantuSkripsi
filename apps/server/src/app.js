import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.routes.js";

const app = express();

// Security & utility middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Mount API routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    name: "Bantu Skripsimu Backend API",
    status: "online",
    endpoints: {
      health: "/api/health",
      overview: "/api/services/overview",
      campuses: "/api/services/campuses",
      pricingOptions: "/api/pricing/options",
      estimatePrice: "POST /api/pricing/estimate",
      createConsultation: "POST /api/orders/consult",
      trackOrder: "GET /api/orders/track/:refCode"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' tidak ditemukan pada server API.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal pada server.",
    error: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export default app;
