import express from "express"
import {login, register, logout, verifyToken} from "../controllers/auth.js"
const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.get("/verifyToken", verifyToken)

export default router;