import express from "express";
import router from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./config/config.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

//configuarcion de dotenv
dotenv.config();

//db conection
dbConnection();

//CORS
app.use(cors());

//Directorio publico
app.use(express.static("src/public"));

// parseo JSON
app.use(express.json());

//routes
app.use("/api/auth", router);

// manejar todas las posibles rutas
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`servidor corriendo puerto ${port} `);
});
