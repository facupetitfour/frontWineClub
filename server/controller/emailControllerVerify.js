import "dotenv/config";

import { createTransport } from "nodemailer";
import crypto from "crypto";
import User from "../models/userSchema.js";

// Función para generar un código aleatorio
const generateVerificationCode = () => {
  return crypto.randomBytes(3).toString("hex"); // Código de 6 caracteres en formato hexadecimal
};

// Configurar el transporte de correo
const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Función para enviar el correo con el código

export const sendVerificationEmail = async (idUser,email) => {
  
  const userExist = await User.findById(idUser);
  const codeVerify = generateVerificationCode();

  if (userExist) {
    userExist.codeVerify = codeVerify;
    await userExist.save();

    console.log("CODIGO VERIFICACION", codeVerify)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verificación de correo",
      ext: `Tu código de verificación es: ${codeVerify}`,
    };
  
    console.log("FLAG MAIL OPTIONS",mailOptions);
  }


  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error("Error al enviar el correo:", error);
  //   } else {
  //     console.log("Correo enviado: " + info.response);
  //   }
  // });
};

