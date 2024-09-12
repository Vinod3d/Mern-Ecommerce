import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "public/uploads/";

    if (file.fieldname === "category_image") {
      folder = "public/uploads/category_images/";
    } else if (file.fieldname === "banner_image") {
      folder = "public/uploads/banner_images/";
    }

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true }); // Ensure the folder and parent folders are created
    }

    // Ensure the folder exists (if necessary, you can create folders dynamically)
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        String(Date.now()).slice(0, 5) +
        path.extname(file.originalname)
    );
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).fields([
  { name: "category_image", maxCount: 1 },
  { name: "banner_image", maxCount: 1 },
]);

export default upload;
