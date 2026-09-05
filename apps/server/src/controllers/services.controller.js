import {
  APP_CONFIG,
  SERVICES,
  PACKAGES,
  ADVANTAGES,
  BONUS_ITEM,
  WORKFLOW,
  CAMPUS_PRESETS
} from "../config/constants.js";

export class ServicesController {
  static getOverview(req, res) {
    try {
      res.json({
        success: true,
        data: {
          app: APP_CONFIG,
          services: SERVICES,
          packages: PACKAGES,
          advantages: ADVANTAGES,
          bonus: BONUS_ITEM,
          workflow: WORKFLOW,
          campusPresets: CAMPUS_PRESETS
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getCampusPresets(req, res) {
    try {
      res.json({
        success: true,
        data: CAMPUS_PRESETS
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
