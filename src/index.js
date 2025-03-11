// require('dotenv').config({ path: '/.env' })

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({ path: "/.env" });

const app = express();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on Port:${process.env.port}`);
    });
    app.on("error", (error) => {
      console.log("express app error: ", error);
    });
  })
  .catch((error) => {
    console.log("Mongo DB connection failed!!", error);
  });

// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Error", error)
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(" app is listening on port",process.env.PORT)
//         })
//     }
//     catch (error) {
//         console.log("Error:", error)
//         throw err
//     }
// })()
