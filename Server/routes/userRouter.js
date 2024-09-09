import express from "express";
import userList from "../controller/user/userList.js";
import register from "../controller/user/register.js";
const router = express.Router()

router.get("/", userList);
router.post("/register", register);

export default router