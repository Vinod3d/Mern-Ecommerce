import express from "express";
import userList from "../controller/user/userList.js";
import register from "../controller/user/register.js";
import login from "../controller/user/login.js";
import userSingle from "../controller/user/usersingle.js";
import updateUser from "../controller/user/updateuser.js";
import auth from "../middlewares/auth.js";
import deleteUser from "../controller/user/deleteuser.js";
const router = express.Router()

router.get("/", userList);
router.post("/register", register);
router.post("/login", login);
router.get("/:id", userSingle);
router.patch("/update", auth , updateUser);
router.delete("/delete/:id", auth , deleteUser);

export default router