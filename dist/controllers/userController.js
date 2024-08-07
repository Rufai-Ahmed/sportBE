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
exports.signInUser = exports.verifyUser = exports.updateUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_1 = require("../utils/email");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enums_1 = require("../utils/enums");
const constant_1 = require("../utils/constant");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, number, DOB, gender, password, role } = req.body;
        const verifyCode = crypto_1.default.randomBytes(3).toString("hex");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            email,
            firstName,
            lastName,
            number,
            gender,
            DOB,
            password: hashed,
            role: role ? role : enums_1.roles.BUYER,
            verifyCode,
        });
        (0, email_1.sendVerifyCode)(user);
        return res.status(res.statusCode).json({
            message: "User created successfully",
            data: user,
            status: res.statusCode,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: error === null || error === void 0 ? void 0 : error.status,
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, number, address, password, role } = req.body;
        const verifyCode = crypto_1.default.randomBytes(3).toString("hex");
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.findOneAndUpdate({ email }, {
            firstName,
            lastName,
            number,
            address,
            role: role ? role : enums_1.roles.BUYER,
            verifyCode,
            password: hashed,
        }, { new: true });
        return res.status(res.statusCode).json({
            message: "User updated successfully",
            data: user,
            status: res.statusCode,
        });
    }
    catch (error) {
        return res.status(error === null || error === void 0 ? void 0 : error.status).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: error === null || error === void 0 ? void 0 : error.status,
        });
    }
});
exports.updateUser = updateUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { verifyCode } = req.query;
        let user = yield userModel_1.default.findById(userID);
        if (user && user.verifyCode === verifyCode) {
            user = yield userModel_1.default.findByIdAndUpdate(userID, {
                verify: true,
                verifyCode: "",
            }, { new: true });
            return res.status(res.statusCode).json({
                message: "User verified successfully",
                data: user,
                status: res.statusCode,
            });
        }
        else {
            return res.status(404).json({
                message: "User verification error",
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
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        let user = yield userModel_1.default.findOne({ email });
        if (user) {
            const check = yield bcrypt_1.default.compare(password, user.password);
            if (check) {
                if (user.verify && user.verifyCode === "") {
                    const id = jsonwebtoken_1.default.sign({ id: user._id }, constant_1.SECRET, { expiresIn: "2d" });
                    return res.status(200).json({
                        message: "User logged in successfully",
                        token: id,
                        status: 200,
                    });
                }
                else {
                    return res.status(res === null || res === void 0 ? void 0 : res.statusCode).json({
                        message: "User not verified",
                        status: 404,
                    });
                }
            }
            else {
                return res.status(res === null || res === void 0 ? void 0 : res.statusCode).json({
                    message: "Incorrect password",
                    status: 404,
                });
            }
        }
        else {
            return res.status(res === null || res === void 0 ? void 0 : res.statusCode).json({
                message: "User does not exist",
                status: 404,
            });
        }
    }
    catch (error) {
        return res.status(res === null || res === void 0 ? void 0 : res.statusCode).json({
            message: error === null || error === void 0 ? void 0 : error.message,
            status: 404,
        });
    }
});
exports.signInUser = signInUser;
