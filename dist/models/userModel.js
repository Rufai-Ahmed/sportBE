"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../utils/enums");
const userModel = new mongoose_1.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        default: enums_1.roles.BUYER,
    },
    password: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyCode: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    DOB: {
        type: String,
    },
    number: {
        type: String,
    },
    products: [
        {
            type: mongoose_2.Types.ObjectId,
            ref: "products",
        },
    ],
    cart: [
        {
            type: mongoose_2.Types.ObjectId,
            ref: "products",
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userModel);
