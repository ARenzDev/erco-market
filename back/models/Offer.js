import { Schema, model } from "mongoose";

const offerSchema = new Schema({
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantityKwh: { type: Number, required: true },
  pricePerKwh: { type: Number, required: true },
  windowStart: { type: Date, required: true },
  windowEnd: { type: Date, required: true },
  status: {
    type: String,
    enum: ["active", "sold", "expired"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
  buyer : { type: Schema.Types.ObjectId, ref: "User" },
});


export default model("Offer", offerSchema);
