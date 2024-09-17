import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: { 
      type: String, 
      enum: ['cliente', 'bodega', 'administrador'], 
      default: "cliente",
      required: true 
    },
    name: { // Solo para clientes
      type: String,
      required: false,
    },
    subname:{ // Solo para clientes
      type: String,
      required: false,
    },
    points: {  // Solo para clientes
      type: Number, 
      default: 0 
    },
    emailVerify:{ // clientes y bodegas
      type: Boolean,
      required: true,
      default: false
    },
    codeVerify:{
      type: Number,
    },
    lastSesion:{
      type: Date,
      required: false,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Se encripta contraseña
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// Se comprueba contraseña
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model("User", userSchema);
