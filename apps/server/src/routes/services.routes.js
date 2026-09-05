import { Router } from "express";
import { ServicesController } from "../controllers/services.controller.js";

const router = Router();

router.get("/overview", ServicesController.getOverview);
router.get("/campuses", ServicesController.getCampusPresets);

export default router;
