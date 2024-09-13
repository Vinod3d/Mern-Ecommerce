import { Category } from "../../models/category.js"

const getAllCategory = async (req, res, next) =>{
    try {
        const categorys = await Category.find();
        res.status(200).json({
            status: 'success',
            message : 'get all categorys',
            categorys
        })
    } catch (error) {
        return next(error);
    }
}

export default getAllCategory;