import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface Player extends Document {
  username: string;
  password: string;
  phoneNumber: string;
  photo: string;
  comparePassword(password: string): Promise<boolean>;
}

const playerSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  photo: { type: String },
});

// Hash password before saving
playerSchema.pre<Player>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
playerSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<Player>("Player", playerSchema);
