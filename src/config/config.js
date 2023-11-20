import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);

    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error(" Erro al inicializar la base de datos");
  }
};
