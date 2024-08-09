import mongoose, { Schema, Document } from "mongoose";

interface Session extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  type: "morning" | "afternoon" | "evening";
}

const sessionSchema: Schema = new Schema({
  name: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
});

export default mongoose.model<Session>("Session", sessionSchema);
