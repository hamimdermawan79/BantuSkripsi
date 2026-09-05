import { OrderService } from "../services/order.service.js";

export class OrdersController {
  static createConsultation(req, res) {
    try {
      const {
        studentName,
        campusName,
        facultyMajor,
        packageId,
        pageCount,
        urgency,
        selectedAddons,
        notes
      } = req.body;

      if (!studentName || studentName.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Nama lengkap wajib diisi untuk registrasi konsultasi."
        });
      }

      const order = OrderService.createConsultation({
        studentName,
        campusName,
        facultyMajor,
        packageId,
        pageCount,
        urgency,
        selectedAddons,
        notes
      });

      res.status(201).json({
        success: true,
        message: "Konsultasi berhasil dibuat. Silakan lanjutkan pengiriman file ke WhatsApp.",
        data: order
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static getOrderByReference(req, res) {
    try {
      const { refCode } = req.params;
      const order = OrderService.getOrderByReference(refCode);

      if (!order) {
        return res.status(404).json({
          success: false,
          message: `Nomor referensi '${refCode}' tidak ditemukan dalam sistem. Pastikan format penulisan benar (Contoh: REF-SKR-2026-9012).`
        });
      }

      res.json({
        success: true,
        data: order
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  static listRecent(req, res) {
    try {
      const orders = OrderService.listRecentOrders();
      res.json({
        success: true,
        data: orders
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
