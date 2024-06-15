import 'dotenv/config'
import express from "express";
import cors from "cors"
import authRouter from "../routers/auth.js"
import passwordRouter from "../routers/password.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth/", authRouter);
app.use("/password/", passwordRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is up running on ${PORT} port.`)
})