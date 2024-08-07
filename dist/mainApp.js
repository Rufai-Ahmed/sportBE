"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const productRouter_1 = __importDefault(require("./routers/productRouter"));
const mainApp = (app) => {
    try {
        app.use("/api/v1/", productRouter_1.default);
        app.use("/api/v1/", userRouter_1.default);
        app.set("view engine", "ejs");
        app.get("/view-html", (req, res) => {
            return res.render("index", {
                firstName: "j",
                lastName: "w",
                verifyCode: "3383",
            });
        });
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({
                    message: "Welcome to Trundra API",
                });
            }
            catch (error) {
                return res.status(error === null || error === void 0 ? void 0 : error.status).json({
                    status: error === null || error === void 0 ? void 0 : error.status,
                    message: error === null || error === void 0 ? void 0 : error.message,
                });
            }
        });
    }
    catch (error) {
        throw error;
    }
};
exports.mainApp = mainApp;
