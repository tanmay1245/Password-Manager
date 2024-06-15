import jwt from "jsonwebtoken";
import db from "../db/mysql.js"

const verifyToken = (req, res, next) => {
    var token = req.header("Authorization");
    if (token) token = token.replace("Bearer ", "");
    if (!token || token === "null") {
        return res.status(404).send({ sucess: false, error: "Unauthorized" })
    }
    const { id } = jwt.verify(token, process.env.JWT_SIGN_KEY);
    db.query("SELECT * from user WHERE id=?", [id], (error, results) => {
        if (results.length === 0) {
            return res.status(404).send({ sucess: false, error: "Please Authenticate" })
        }
        req.id = id;
        next();
    })
}

export default verifyToken;