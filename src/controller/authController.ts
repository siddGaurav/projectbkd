import { NextFunction,Response,Request } from "express";
import { User } from "../model/authModel";
import transporter from "../mail/nodemailer";



export async function signUp(request:Request,response:Response,next:NextFunction) {
    try{
        const {name,email,message} = request.body;
        

   const user = await User.create({
    name,
    email,
    message
   })

if (user) {
  await transporter.sendMail({
    from: `"Qubnix" <${process.env.ZOHOMAIL}>`,
    to: email,
    subject: "Thanks for contacting Qubnix",
    html: `
  <div style="background:#050816;padding:40px 20px;font-family:Arial,sans-serif;">
    <div style="
      max-width:600px;
      margin:auto;
      background:linear-gradient(135deg,#0f172a,#111827);
      border-radius:24px;
      overflow:hidden;
      border:1px solid rgba(139,92,246,.25);
      box-shadow:0 0 40px rgba(139,92,246,.25);
    ">

      <div style="
        background:linear-gradient(90deg,#7c3aed,#ec4899,#22d3ee);
        padding:3px;
      ">
        <div style="
          background:#0b1020;
          padding:36px 32px;
          text-align:center;
        ">
          <h1 style="
            margin:0;
            font-size:32px;
            color:#fff;
            letter-spacing:.5px;
          ">
            Welcome to Qubnix 
          </h1>

          <p style="
            margin:16px 0 0;
            color:#cbd5e1;
            font-size:17px;
            line-height:1.8;
          ">
            Hi ${name}, your request has been received successfully.
          </p>
        </div>
      </div>

      <div style="padding:32px;">
        <div style="
          background:rgba(255,255,255,.04);
          border:1px solid rgba(255,255,255,.08);
          border-radius:18px;
          padding:22px;
          margin-bottom:28px;
        ">
          <p style="
            margin:0 0 10px;
            color:#a78bfa;
            font-size:12px;
            letter-spacing:2px;
            text-transform:uppercase;
          ">
            Your Message
          </p>

          <p style="
            margin:0;
            color:#f8fafc;
            font-size:16px;
            line-height:1.8;
          ">
            ${message}
          </p>
        </div>

        <p style="
          color:#d1d5db;
          font-size:16px;
          line-height:1.9;
          margin:0 0 28px;
        ">
          Our team will personally contact you within the next 12 hours.
          Until then, sit back and let Qubnix create something amazing for you.
        </p>

        <div style="text-align:center;">
          <a href="https://qubnix.com" style="
            display:inline-block;
            padding:14px 30px;
            border-radius:999px;
            background:linear-gradient(90deg,#7c3aed,#ec4899,#22d3ee);
            color:white;
            text-decoration:none;
            font-weight:700;
            font-size:15px;
            box-shadow:0 0 20px rgba(139,92,246,.35);
          ">
            Visit Qubnix
          </a>
        </div>

        <p style="
          margin:36px 0 0;
          text-align:center;
          color:#94a3b8;
          font-size:14px;
        ">
          — Team Qubnix
        </p>
      </div>
    </div>
  </div>
`,
  });

  return response.status(200).json({
    status: "success",
    message: "Within 12 hours, our team at Qubnix will contact you.",
    data: name,
  });
}else{
    response.status(400).json({
        status:"failed",
        message:"Pleace submit the all requird feilds",

    })
   }

    }catch(err){
        response.status(500).json({
        status:"failed",
        message:"Server Error inSignup",err,

    })
    }   
}


export async function serchData(req:Request,res:Response,next:NextFunction) {
       try{
        const getData = await User.find({},'name email message -_id')
        if(!getData){
            throw new Error("Databases not Work")
        }
          if(getData){
            return res.json({
                status:"success",
                message:"get All data",
                data:getData
            })
          }


       }catch(err){

       }
}