"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const player_1 = __importDefault(require("../models/player"));
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = player_1.default.create({ username, password: hashedPassword, email });
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });
//     // const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });
//     const token = jwt.sign({ id: user._id }, config.jwtSecret, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (error: any) {
//     res.status(400).json({ message: error.message });
//   }
// };
