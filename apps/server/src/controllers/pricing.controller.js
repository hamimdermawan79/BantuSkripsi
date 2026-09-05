import { PricingService } from "../services/pricing.service.js";

export class PricingController {
  static getOptions(req, res) {
    try {
      const options = PricingService.getAvailableOptions();
      res.json({
        success: true,
        data: options
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static calculateEstimate(req, res) {
    try {
      const { packageId, pageCount, urgency, selectedAddons } = req.body;
      const estimate = PricingService.calculateEstimate({
        packageId,
        pageCount,
        urgency,
        selectedAddons
      });
      res.json({
        success: true,
        data: estimate
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
