import express from  "express";
import routerAuth from "./router/auth";
import cors from "cors";


const app = express();
app.use(
  cors({
    origin: [
      "https://qubnix.com",
      "https://www.qubnix.com",
      "http://localhost:8005",
      "https://projectown-tm2k.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json())
app.use('/app',routerAuth)


export default app;


