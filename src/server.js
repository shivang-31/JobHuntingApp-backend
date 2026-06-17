import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Your DB utility
import { app } from "./app.js";       // The configured express app

dotenv.config({ path: './.env' });

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});