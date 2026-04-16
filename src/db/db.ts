import mongoose from 'mongoose';
import 'dotenv/config';

const dbUrl = process.env.DB_URL
if (!dbUrl) {
  throw new Error("DB_URL not found in .env ");
}


mongoose.connect(dbUrl)
.then(()=>{
     console.log("MongoDB connected ✅");
})
.catch((err)=>{
    console.log("DB Error ❌", err)
})


