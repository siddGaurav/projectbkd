import { NextFunction,Response,Request } from "express";
import { User } from "../model/authModel";
import transporter from "../mail/nodemailer";




export async function signUp(req: Request, res: Response) {

  try {

    const { name, email, message, phone } = req.body;

    // Validation
    if (!name || !email || !message || !phone) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required"
      });
    }

    // Create User
    const user = await User.create({
      name,
      email,
      message,
      phone
    });

    // Send Mail
    try {

      await transporter.sendMail({
        from: `"Qubnix" <${process.env.ZOHOMAIL}>`,
        to: email,
        subject: "Thanks for contacting Qubnix",

        html: `
        <div style="background:#050816;padding:40px 20px;font-family:Arial,sans-serif;">
          <div style="
            max-width:600px;
            margin:auto;
            background:#111827;
            border-radius:20px;
            padding:30px;
            color:white;
          ">

            <h1 style="text-align:center;">
              Welcome to Qubnix
            </h1>

            <p>
              Hi ${name},
            </p>

            <p>
              Your request has been received successfully.
            </p>

            <div style="
              background:#1f2937;
              padding:20px;
              border-radius:10px;
              margin:20px 0;
            ">
              <p><b>Your Message:</b></p>
              <p>${message}</p>
            </div>

            <p>
              Our team will contact you within 12 hours.
            </p>

            <div style="text-align:center;margin-top:30px;">
              <a 
                href="https://qubnix.com"
                style="
                  background:#7c3aed;
                  color:white;
                  padding:12px 24px;
                  border-radius:50px;
                  text-decoration:none;
                "
              >
                Visit Qubnix
              </a>
            </div>

          </div>
        </div>
        `
      });

    } catch (mailError) {

      console.log("Mail Error:", mailError);

    }

    // Final Response
    return res.status(200).json({
      status: "success",
      message: "Within 12 hours, our team at Qubnix will contact you.",
      data: user
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      status: "failed",
      message: "Server Error in Signup",
      error: err
    });

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
         return res.status(500).json({
    status: "failed",
    message: "Server error",
    error: err
  });

       }
}