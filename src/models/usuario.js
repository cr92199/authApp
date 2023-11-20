import { Schema, model } from "mongoose";

const usuarioSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// Crea el modelo 'Usuario' utilizando el esquema definido
const Usuario = model("Usuario", usuarioSchema);

// Exporta el modelo para que pueda ser utilizado en otros archivos
export default Usuario;
