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
  if (usersCount === 0){
    const newUser = new User({
      username: "admin",
      email: "email@email.com",
      rol: "administrador",
      password: await User.encryptPassword("admin1234"),
    });
    const savedUser = await newUser.save();
    console.log(savedUser)
  }else{
    console.log("Users already exist");
  }
  if (productsCount === 0) {
    const defaultProducts = [
      {
        name: "prueba1",
        description: "descripcion de un primer producto",
        price: "100",
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
      },
      {
        name: "prueba2",
        description: "descripcion de un segundo producto",
        price: "300",
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
      },
      {
        name: "prueba3",
        description: "descripcion de un tercer producto",
        price: "600",
        img: "https://rockcontent.com/es/wp-content/uploads/sites/3/2019/02/o-que-e-produto-no-mix-de-marketing-1024x538.png.webp",
      },
    ];

    await Product.insertMany(defaultProducts);
    console.log("Default products inserted");
  } else {
    console.log("Products already exist");
  }
};