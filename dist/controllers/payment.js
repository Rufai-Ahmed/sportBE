"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.getPaymentById = exports.getPayments = exports.createPayment = void 0;
const payment_1 = __importDefault(require("../models/payment"));
const player_1 = __importDefault(require("../models/player"));
const createPayment = async (req, res) => {
    try {
        const { playerId, session, amount } = req.body;
        const player = await player_1.default.findById(playerId);
        if (!player)
            return res.status(404).json({ message: "Player not found" });
        const payment = new payment_1.default({
            player: playerId,
            session,
            amount,
        });
        await payment.save();
        res.status(201).json(payment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createPayment = createPayment;
const getPayments = async (req, res) => {
    try {
        const payments = await payment_1.default.find().populate("player");
        res.status(200).json(payments);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getPayments = getPayments;
const getPaymentById = async (req, res) => {
    try {
        const payment = await payment_1.default.findById(req.params.id).populate("player");
        if (!payment)
            return res.status(404).json({ message: "Payment not found" });
        res.status(200).json(payment);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getPaymentById = getPaymentById;
const deletePayment = async (req, res) => {
    try {
        const payment = await payment_1.default.findByIdAndDelete(req.params.id);
        if (!payment)
            return res.status(404).json({ message: "Payment not found" });
        res.status(200).json({ message: "Payment deleted" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deletePayment = deletePayment;
