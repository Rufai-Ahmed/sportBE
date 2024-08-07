import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface Admin extends Document {
  username: string;
  password: string;
  role: string; // This can be expanded if needed for more roles
  comparePassword(password: string): Promise<boolean>;
}

const adminSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }, // Default role for all admins
});

adminSchema.pre<Admin>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

adminSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<Admin>("Admin", adminSchema);
