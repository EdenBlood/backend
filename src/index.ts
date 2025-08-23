import { connectDB } from "./config/db";
import server from "./server";

const PORT = process.env.PORT ?? 3000;

async function main() {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
  });
}

main();
