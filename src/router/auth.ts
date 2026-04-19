import express from "express";
import { serchData, signUp } from "../controller/authController";


const routerAuth = express.Router()
routerAuth.post('/contact',signUp)
routerAuth.get('/contact',serchData)

export default routerAuth;