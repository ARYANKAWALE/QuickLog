import express from 'express'
import connectDB from './database/db.database.js'
const app = express()
const port = process.env.PORT


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
