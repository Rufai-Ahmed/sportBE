"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const enums_1 = require("../utils/enums");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const { name, price, quantity, category, image, imageID } = req.body;
        const user = yield userModel_1.default.findById(userID);
        if (user && user.role === enums_1.roles.MERCHANT) {
            const product = yield productModel_1.default.create({
                name,
                price,
                quantity,
                category,
                image,
                imageID,
            });
            (_a = user === null || user === void 0 ? void 0 : user.products) === null || _a === void 0 ? void 0 : _a.push(product === null || product === void 0 ? void 0 : product._id);
            user.save();
            return res.status(res.statusCode).json({
                message: "Product created successfully",
                data: product,
                status: res.statusCode,
            });
        }
        else {
            return res.status(404).json({
                message: "User not a merchant",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(error === null || error === void 0 ? void 0 : error.status).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: error === null || error === void 0 ? void 0 : error.status,
        });
    }
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = (yield userModel_1.default.findById(userID)) || null;
        if (user && user.role === enums_1.roles.MERCHANT) {
            const products = yield userModel_1.default
                .findById(userID)
                .populate({ path: "products" });
            return res.status(res.statusCode).json({
                message: "Successfully gotten all products",
                data: products === null || products === void 0 ? void 0 : products.products,
                status: res.statusCode,
            });
        }
        else {
            return res.status(404).json({
                message: "User not a merchant",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(error === null || error === void 0 ? void 0 : error.status).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: error === null || error === void 0 ? void 0 : error.status,
        });
    }
});
exports.getProducts = getProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userID } = req.params;
        const { productID } = req.query;
        const user = (yield userModel_1.default.findById(userID)) || null;
        if (user && user.role === enums_1.roles.MERCHANT) {
            const products = yield productModel_1.default.findByIdAndDelete(productID);
            (_b = user.products) === null || _b === void 0 ? void 0 : _b.pull(products === null || products === void 0 ? void 0 : products._id);
            user.save();
            return res.status(res.statusCode).json({
                message: "Product deleted successfully",
                data: products,
                status: res.statusCode,
            });
        }
        else {
            return res.status(404).json({
                message: "User not a merchant",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(error === null || error === void 0 ? void 0 : error.status).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: error === null || error === void 0 ? void 0 : error.status,
        });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { productID } = req.query;
        const user = (yield userModel_1.default.findById(userID)) || null;
        if (user && user.role === enums_1.roles.MERCHANT) {
            const products = yield productModel_1.default.findByIdAndUpdate(productID, Object.assign({}, req.body), { new: true });
            return res.status(res.statusCode).json({
                message: "Product updated successfully",
                data: products,
                status: res.statusCode,
            });
        }
        else {
            return res.status(404).json({
                message: "User not a merchant",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: 404,
        });
    }
});
exports.updateProduct = updateProduct;
