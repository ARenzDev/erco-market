import { Schema, model } from "mongoose";

const txSchema = new Schema({
  offer: { type: Schema.Types.ObjectId, ref: "Offer", required: true },
  buyer: { type: Schema.Types.ObjectId, ref: "User", required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model("Transaction", txSchema);
