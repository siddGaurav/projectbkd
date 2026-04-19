import nodemailer from "nodemailer";
import "dotenv/config";


const data = process.env.ZOHOMAIL_PWD
const dataa = process.env.ZOHOMAIL
console.log(data,dataa)
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHOMAIL,
    pass: process.env.ZOHOMAIL_PWD,
  },
});



export default transporter
