import express from "express";
import verifyToken from "../middleware/verifyToken.js"
import db from "../db/mysql.js";

const router = new express.Router();

// Get all passwords for given user id
router.get("/", verifyToken, (req, res) => {
    db.query("SELECT * FROM password WHERE userid=?", [req.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).send({ success: true, passwords: results });
    })
});

// Create password
router.post("/create", verifyToken, (req, res) => {
    db.query("INSERT INTO password (website, email, password, userid) VALUES(?)", [[req.body.website, req.body.email, req.body.password, req.body.userid]], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).send({ success: true });
    })
});

// Get password info using id
router.get("/:id", verifyToken, (req, res) => {
    db.query("SELECT website, email, password FROM password WHERE id=?", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).send({ success: true, password: results[0] });
    })
});

// Update password
router.post("/update/:id", verifyToken, (req, res) => {
    db.query("UPDATE password SET website=?, email=?, password=? WHERE id=?", [req.body.website, req.body.email, req.body.password, req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).send({ success: true });
    })
});

// Delete password
router.post("/delete/:id", verifyToken, (req, res) => {
    db.query("DELETE FROM password WHERE id=?", [req.params.id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        return res.status(200).send({ success: true });
    })
});

export default router;