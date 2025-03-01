// require('dotenv').config({ path: '/.env' })

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";

dotenv.config({ path: "/.env" });

const app = express();

connectDB();

// ; (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", () => {
//             console.log("Error", error)
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(" app is listening on port",process.env.PORT)
//         })
//     }
//     catch (error) {
//         console.log("Error", error)
//         throw err
//     }
// })()
