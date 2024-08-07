import { Router } from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  deletePayment,
} from "../controllers/payment";

const router = Router();

router.post("/", createPayment);
router.get("/", getPayments);
router.get("/:id", getPaymentById);
router.delete("/:id", deletePayment);

export default router;
