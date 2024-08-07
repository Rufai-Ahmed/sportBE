import mongoose, { Document, Schema } from "mongoose";

interface ITeam extends Document {
  name: string;
  logo?: string;
  players: mongoose.Schema.Types.ObjectId[];
}

const teamSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, default: "" },
  players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
});

export default mongoose.model<ITeam>("Team", teamSchema);
