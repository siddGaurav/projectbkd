import express from "express";
import { signUp } from "../controller/authController";


const routerAuth = express.Router()
routerAuth.post('/contact',signUp)

export default routerAuth;