import slugify from "slugify";
import { Category } from "../../models/category.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const createCategory = async (req, res, next) => {
  try {
    const {
      name,
      desc,
      metadesc,
      metatitle,
      metakeywords,
      parentcategory,
      status,
    } = req.body;
    console.log(req.files?.categoryimage?.[0]?.filename)

    // Validate if category name exists
    const isNameAvailable = await checkIfCategoryExists("name", name);
    if (!isNameAvailable) {
      return next(
        CustomErrorHandler.badRequest(
          "category with this name already exists",
          "name"
        )
      );
    }

    const addcategory = new Category({
      name,
      url: slugify(name).toString(),
      desc,
      metadesc,
      metatitle,
      metakeywords,
      parentcategory : parentcategory == '' ? [] : parentcategory,
      status,
      banner: req.files?.categoryimage?.[0]?.filename || "",
    });

    const result = await addcategory.save();
    res.status(201).json({
      success: true,
      message: "Category create successfully",
      result,
    });
  } catch (error) {
    return next(error);
  }
};

async function checkIfCategoryExists(key, value) {
  const query = key === "name" && { name: value };
  const category_response = await Category.findOne(query);
  return !category_response;
}

export default createCategory;