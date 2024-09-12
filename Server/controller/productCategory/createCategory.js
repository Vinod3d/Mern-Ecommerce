import slugify from "slugify";
import { Category } from "../../models/category.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";

const createCategory = async (req, res, next) => {
  try {
    const {
      category_name,
      category_url,
      desc,
      meta_description,
      meta_title,
      meta_keywords,
      parent_category,
      status,
    } = req.body;

    // Validate if category name exists
    const isNameAvailable = await checkIfCategoryExists("name", category_name);
    if (!isNameAvailable) {
      return next(
        CustomErrorHandler.badRequest(
          "category with this name already exists",
          "name"
        )
      );
    }

    // Validate if category URL exists
    const isUrlAvailable = await checkIfCategoryExists("url", category_url);
    if (!isUrlAvailable) {
      return next(
        CustomErrorHandler.badRequest(
          "category with this name already exists",
          "url"
        )
      );
    }

    const addcategory = new Category({
      category_name,
      category_url: slugify(category_url),
      desc,
      meta_description,
      meta_title,
      meta_keywords,
      parent_category : parent_category == '' ? [] : parent_category,
      status,
      banner: req.files?.category_image?.[0]?.filename || "",
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
  const query = key === "name" ? { name: value } : { url: value };
  const category_response = await Category.findOne(query);
  return !category_response;
}

export default createCategory;
