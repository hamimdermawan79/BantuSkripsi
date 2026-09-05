import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller.js";

const router = Router();

router.post("/consult", OrdersController.createConsultation);
router.get("/track/:refCode", OrdersController.getOrderByReference);
router.get("/recent", OrdersController.listRecent);

export default router;
