import mongoose, { Schema, Document, ObjectId, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface iPlayer extends Document {
  username: string;
  // password: string;
  phoneNumber: string;
  photo: string;
  club: ObjectId;
  // comparePassword(password: string): Promise<boolean>;
}

const playerSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photo: { type: String },
  club: { type: Types.ObjectId, ref: "Team" },
});

// Hash password before saving
// playerSchema.pre<iPlayer>("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// Method to compare password
// playerSchema.methods.comparePassword = function (password: string) {
//   return bcrypt.compare(password, this.password);
// };

export default mongoose.model<iPlayer>("Player", playerSchema);
