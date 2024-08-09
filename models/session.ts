import mongoose, { Schema, Document } from "mongoose";

interface Session extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  type: "morning" | "afternoon" | "evening";
  teams: mongoose.Schema.Types.ObjectId[]; // Added field
}

const sessionSchema: Schema = new Schema({
  name: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isActive: { type: Boolean, default: false },
  type: {
    type: String,
    enum: ["morning", "afternoon", "evening"],
    required: true,
  },
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
});

export default mongoose.model<Session>("Session", sessionSchema);
