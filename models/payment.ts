import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
  player: mongoose.Schema.Types.ObjectId;
  session: string;
  date: Date;
  amount: number;
}

const paymentSchema: Schema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  session: { type: String, required: true },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
});

export default mongoose.model<IPayment>("Payment", paymentSchema);
