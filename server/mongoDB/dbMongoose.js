import mongoose from "mongoose";
import Product from "../models/productsSchema.js";
import "dotenv/config"
import User from "../models/userSchema.js";

const MONGO_URI = process.env.MONGO_URI;

export const connectdb = async () => {
  mongoose
    .connect(MONGO_URI)
    .then(async (db) => {
      await poblarDB()
      console.log("Data base is connected")})
    .catch((error) => console.log("Error to connect DB:",error.message));
};


const poblarDB = async () => {
  const usersCount = await User.countDocuments()
  const productsCount = await Product.countDocuments();
  const bodegaUserCount = await Product.countDocuments();
  const bodegaPruebaid = ''

  if (usersCount === 0){
    const newUser = new User({
      username: "admin",
      email: "email@email.com",
      rol: "administrador",
      password: await User.encryptPassword("admin1234"),
    });
    const savedUser = await newUser.save();
    console.log(savedUser)
    const newBodegaUser = new User({
      username: "bodega",
      email: "bodega@gmail.com",
      rol: "bodega",
      password: await User.encryptPassword("bodega1234"),
    });
    const savedBodegaUser = await newBodegaUser.save();
    console.log(savedBodegaUser)
    bodegaPruebaid == savedBodegaUser._id
    const newClienteUser = new User({
      username: "cliente",
      email: "cliente@gmail.com",
      rol: "cliente",
      password: await User.encryptPassword("cliente1234"),
      name: "nombreCliente",
      subname: "apellidoCliente"
    });
    const savedClienteUser = await newClienteUser.save();
    console.log(savedClienteUser)
  }else{
    console.log("Users already exist");
  }
  if (productsCount === 0) {
    const bodegaPruebaid = await User.findOne({username:"bodega"})
    const defaultProducts = [
      {
        name: "prueba1",
        description: "descripcion de un primer producto",
        points_required: 1500,
        stock: 100,
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
        bodega_id: bodegaPruebaid._id,
        available: true,
        approved: true
      },
      {
        name: "prueba2",
        description: "descripcion de un segundo producto",
        points_required: 5400,
        stock: 100,
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
        bodega_id: bodegaPruebaid._id,
        available: true,
        approved: true
      },
      {
        name: "prueba3",
        description: "descripcion de un tercer producto",
        points_required: 500,
        stock: 100,
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
        bodega_id: bodegaPruebaid._id,
        available: true,
        approved: true
      },
    ];

    await Product.insertMany(defaultProducts);
    console.log("Default products inserted");
  } else {
    console.log("Products already exist");
  }
};