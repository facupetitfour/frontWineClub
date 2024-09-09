const recordSchema = new Schema({
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  type: {
    type: String,
    enum: ["coupon", "product"],
    required: true,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    required: true,
  }, // Puede ser ID de Cupon o Producto
  points_used: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Record = mongoose.model("Record", recordSchema);
