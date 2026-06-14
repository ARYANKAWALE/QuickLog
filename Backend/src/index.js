import express from 'express'
import connectDB from './database/db.database.js'

import dotenv from "dotenv"
dotenv.config({
  path: './.env'
})

const app = express()

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 3000, () => {
      console.log(`server is running on port ${process.env.PORT || 3000}`);
    });
})
.catch((err)=>{
  console.log("Mongo DB connection failed!!!",err)
})

