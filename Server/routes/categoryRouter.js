import express from "express";
import createCategory from "../controller/productCategory/createCategory.js";
import upload from "../middlewares/image-uploader.js";
import getAllCategory from "../controller/productCategory/getAllCategory.js";
const router = express.Router()

router.get('/',  getAllCategory)
router.post('/create', upload, createCategory )

export default router