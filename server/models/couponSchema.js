import { Schema, model } from "mongoose";

const couponSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    points_required: {
      type: Number,
      required: true,
    },
    expiration_date: {
      type: Date,
      required: true,
    },
    bodega_id: {  // Relaciona con usuario bodega
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

export default model("Coupons", couponSchema);