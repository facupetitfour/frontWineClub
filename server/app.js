import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import authenticateRouter from "./routes/login.js";
import { connectdb } from "./mongoDB/dbMongoose.js";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
dotenv.config();

const app = express();

// Middleware de registro de solicitudes
app.use(
  cors({
    origin: "http://localhost:5173", // La URL del frontend
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.static("public"));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// Configurar para analizar solicitudes JSON
app.use(express.json());
// Configurar para analizar datos de formularios codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/authenticate", authenticateRouter);
app.use("/products", productsRouter);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ msg: "Sorry, page not found!" }); //se debe crear una vista de errores
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
// dbInitialize();
app.listen(PORT, () => {
  // Colores en la consola utilizando secuencias de escape ANSI
  const resetColor = "\x1b[0m"; // Restablecer el color a su valor predeterminado
  const purpleColor = "\x1b[35m"; // Color rojo
  const greenColor = "\x1b[32m"; // Color verde
  const yellowColor = "\x1b[33m"; // Color amarillo

  console.log(purpleColor + "------------------------------------------------");
  console.info(
    yellowColor + `Server listening on port ${PORT} || http://localhost:3000/`
  );
  console.log(
    purpleColor +
      "------------------------------------------------" +
      resetColor
  );
});
connectdb();
