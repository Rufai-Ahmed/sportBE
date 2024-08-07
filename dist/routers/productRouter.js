"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const router = (0, express_1.Router)();
router
    .route("/product/:userID")
    .post(productController_1.createProduct)
    .get(productController_1.getProducts)
    .delete(productController_1.deleteProduct)
    .patch(productController_1.updateProduct);
exports.default = router;
