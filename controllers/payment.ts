import { Request, Response } from "express";
import Payment from "../models/payment";
import Player from "../models/player";

export const createPayment = async (req: Request, res: Response) => {
  try {
    const { playerId, session, amount } = req.body;
    const player = await Player.findById(playerId);
    if (!player) return res.status(404).json({ message: "Player not found" });

    const payment = new Payment({
      player: playerId,
      session,
      amount,
    });

    await payment.save();
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.find().populate("player");
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findById(req.params.id).populate("player");
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.status(200).json({ message: "Payment deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
