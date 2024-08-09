import mongoose, { Schema, Document } from "mongoose";

interface Session extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  type: "morning" | "afternoon" | "evening";
  teams: mongoose.Schema.Types.ObjectId[]; // Array of team IDs
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
  teams: {
    type: [{ type: Schema.Types.ObjectId, ref: "Team" }],
    validate: [arrayLimit, "{PATH} exceeds the limit of 2"],
  },
});

function arrayLimit(val: any) {
  return val.length <= 2;
}

export default mongoose.model<Session>("Session", sessionSchema);
