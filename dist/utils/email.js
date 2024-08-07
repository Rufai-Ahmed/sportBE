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
exports.sendVerifyCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const constant_1 = require("./constant");
const oAuth = new googleapis_1.google.auth.OAuth2({
    clientId: constant_1.googleID,
    clientSecret: constant_1.googleSecret,
    redirectUri: constant_1.googleRedirect,
});
oAuth.setCredentials({ refresh_token: constant_1.googleToken });
const sendVerifyCode = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = (_a = (yield oAuth.getAccessToken())) === null || _a === void 0 ? void 0 : _a.token;
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                clientId: constant_1.googleID,
                clientSecret: constant_1.googleSecret,
                accessToken: accessToken,
                type: "OAuth2",
                user: "abbeyrufai234@gmail.com",
                refreshToken: constant_1.googleToken,
            },
        });
        const htmlPath = path_1.default.join(__dirname, "../views/index.ejs");
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            verifyCode: user.verifyCode,
            email: user.email,
            ID: user._id,
            url: "",
        };
        const html = yield ejs_1.default.renderFile(htmlPath, data);
        const options = {
            from: "Tundra 👕⚡",
            subject: "Verification Code - Tundra👕⚡",
            to: user === null || user === void 0 ? void 0 : user.email,
            html,
        };
        return yield transporter.sendMail(options);
    }
    catch (error) {
        throw error;
    }
});
exports.sendVerifyCode = sendVerifyCode;
