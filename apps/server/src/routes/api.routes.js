import { Router } from "express";
import servicesRoutes from "./services.routes.js";
import pricingRoutes from "./pricing.routes.js";
import ordersRoutes from "./orders.routes.js";

const apiRouter = Router();

apiRouter.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: "Bantu Skripsimu API"
  });
});

apiRouter.use("/services", servicesRoutes);
apiRouter.use("/pricing", pricingRoutes);
apiRouter.use("/orders", ordersRoutes);

export default apiRouter;
