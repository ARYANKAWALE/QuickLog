import dotenv from "dotenv"
dotenv.config()

import express from 'express'
import connectDB from './database/db.database.js'
const app = express()
const PORT = process.env.PORT || 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
