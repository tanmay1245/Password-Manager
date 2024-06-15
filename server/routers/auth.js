import express from "express";
import db from "../db/mysql.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const router = new express.Router();

// Sign Up
router.post("/signup", (req, res) => {
    bcrypt.hash(req.body.password, 8).then((hashedPassword) => {
        db.query("INSERT INTO user (username, email, password) VALUES(?)", [[req.body.username, req.body.email, hashedPassword]], (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            const token = jwt.sign({ id: results.insertId }, process.env.JWT_SIGN_KEY);
            res.status(200).send({ success: true, token, id: results.insertId });
        });
    });
});

// Sign In
router.post("/signin", (req, res) => {
    db.query("SELECT * FROM user WHERE email=?", [req.body.email], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (results.length === 0) {
            return res.status(404).send({ sucess: false, error: "Invalid Credentials" })
        }
        const user = results[0];
        bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SIGN_KEY);
                res.status(200).send({ success: true, token, id: user.id });
            } else {
                res.status(404).send({ sucess: false, error: "Invalid Credentials" })
            }
        });
    });
});

export default router;
