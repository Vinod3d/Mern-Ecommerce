import mongoose from "mongoose";

var categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "name is required"],
        unique:[true,"name must be unique"],
        index:true,
    },
    url:{
        type:String,
        required:[true, "name is url"],
        unique:true,
        lowercase:true,
    },
    desc:{
        type:String,
        required:[true, "description is required"],
    },
    metatitle:{
        type:String,
        required:[true, "title is required"],
    },
    metadesc:{
        type:String,
        required:[true, "meta description is required"],
    },
    metakeywords:{
        type:String,
        required:[true, "meta Keywords is required"],
    },
    parentcategory:{
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
      categoryimage:{
        type:String,
        default:null
    },
},{timestamps:true});


export const Category = mongoose.model('Category', categorySchema);