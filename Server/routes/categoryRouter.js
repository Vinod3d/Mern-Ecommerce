import express from "express";
import createCategory from "../controller/productCategory/createCategory.js";
import upload from "../middlewares/image-uploader.js";
const router = express.Router()

router.post('/', upload, createCategory )

export default router