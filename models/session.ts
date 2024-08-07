import mongoose, { Schema, Document } from "mongoose";

interface Session extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
}

const sessionSchema: Schema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: false },
});

export default mongoose.model<Session>("Session", sessionSchema);
