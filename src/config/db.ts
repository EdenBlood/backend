import mongoose from "mongoose";

export async function connectDB() {
  //* Manejamos si la variable de entorno no existe
  if (!process.env.DB_URI) {
    console.error("Falta DB_URI en variables de entorno");
    process.exit(1);
  }

  //* Intentamos conectar a la DB
  try {
    console.log("Conectando a la Base de datos...");
    await mongoose.connect(process.env.DB_URI);
    console.log("Conexión a la Base de datos Exitosa!");
  } catch (error) {
    console.log("Error al conectar a la Base de Datos: ", error);
    process.exit(1);
  }
}
