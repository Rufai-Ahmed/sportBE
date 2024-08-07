import mongoose, { Document, Schema } from "mongoose";

interface IGame extends Document {
  teams: mongoose.Schema.Types.ObjectId[];
  scores: number[];
  status: "Pending" | "Ongoing" | "Completed";
  startTime?: Date;
  endTime?: Date;
}

const gameSchema: Schema = new Schema({
  teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  scores: [{ type: Number }],
  status: {
    type: String,
    enum: ["Pending", "Ongoing", "Completed"],
    default: "Pending",
  },
  startTime: { type: Date },
  endTime: { type: Date },
});

export default mongoose.model<IGame>("Game", gameSchema);
