"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
require("./db/db");
require("dotenv/config");
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 8080;
if (isProd && cluster_1.default.isPrimary) {
    const numCPUs = os_1.default.cpus().length;
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        // ❌ optional: restart hata do ya limit karo
    });
}
else {
    const server = http_1.default.createServer(app_1.default);
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
