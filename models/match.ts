import mongoose, { Schema, Document } from "mongoose";

interface Match extends Document {
  teamA: string;
  teamB: string;
  status: string;
  goals: { [key: string]: number }; // Example: { teamA: 2, teamB: 1 }
  yellowCards: { [key: string]: number }; // Example: { teamA: 1, teamB: 0 }
  redCards: { [key: string]: number }; // Example: { teamA: 0, teamB: 1 }
  ownGoals: { [key: string]: number }; // Example: { teamA: 1, teamB: 0 }
}

const matchSchema: Schema = new Schema({
  teamA: { type: String, required: true },
  teamB: { type: String, required: true },
  status: { type: String, required: true },
  goals: { type: Map, of: Number },
  yellowCards: { type: Map, of: Number },
  redCards: { type: Map, of: Number },
  ownGoals: { type: Map, of: Number },
});

export default mongoose.model<Match>("Match", matchSchema);
