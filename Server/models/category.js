import mongoose from "mongoose";

var categorySchema = new mongoose.Schema({
    category_name:{
        type:String,
        required:[true, "name is required"],
        unique:[true,"name must be unique"],
    },
    category_url:{
        type:String,
        required:[true, "name is url"],
        unique:true,
        lowercase:true,
    },
    desc:{
        type:String,
        required:[true, "description is required"],
    },
    meta_title:{
        type:String,
        required:[true, "title is required"],
    },
    meta_description:{
        type:String,
        required:[true, "meta description is required"],
    },
    meta_keywords:{
        type:String,
        required:[true, "meta Keywords is required"],
    },
    parent_category:{
        type:Array,
        default:[]
    },
    attribute:{
        type:Array,
        default:[]
    },
    status: {
        type: String,
        default:"Active",
      },
    banner:{
        type:String,
        default:null
    },
},{timestamps:true});


export const Category = mongoose.model('Category', categorySchema);