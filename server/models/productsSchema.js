import { Schema, model } from "mongoose";

const productsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      unique: true,
    },
    points_required: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    stock: {
      type: Number,
      required: true,
    },
    bodega_id: { // Relaciona con la bodega
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    }, 
    available: {
      type: Boolean,
      default: false,
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Products", productsSchema);
