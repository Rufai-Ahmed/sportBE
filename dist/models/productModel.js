"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productModel = new mongoose_1.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    rate: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("products", productModel);
