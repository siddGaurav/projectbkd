import express from  "express";
import routerAuth from "./router/auth";
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json())
app.use('/app',routerAuth)


export default app;


