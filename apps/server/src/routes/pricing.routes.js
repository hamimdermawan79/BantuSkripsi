import { Router } from "express";
import { PricingController } from "../controllers/pricing.controller.js";

const router = Router();

router.get("/options", PricingController.getOptions);
router.post("/estimate", PricingController.calculateEstimate);

export default router;
