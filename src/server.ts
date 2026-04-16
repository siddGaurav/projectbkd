import http from "http";
import app from "./app";
import os from "os";
import cluster from "cluster";
import "./db/db";
import "dotenv/config";

const isProd = process.env.NODE_ENV === "production";

const PORT = process.env.PORT || 8080;

if (isProd && cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    // ❌ optional: restart hata do ya limit karo
  });

} else {
  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}