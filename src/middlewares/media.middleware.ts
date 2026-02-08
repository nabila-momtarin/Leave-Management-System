import multer from "multer";
import path from "path";
import { ApiError } from "../utils/api.response";
// import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File infor", req.files);
    // const folder = file.filename === 'image' ? 'profilePic' : 'documents';
    // cb(null, `./uploads/${folder}`);

    console.log("file name", file);

    // console.log(process.cwd());

    const profilePicFolderPath=path.join(process.cwd(), 'uploads', 'profilePic');

    const documentsFolderPath=path.join(process.cwd(), 'uploads', 'documents');

    console.log(profilePicFolderPath,"file path profile pic");

    console.log(documentsFolderPath,"file path documents");


    // cb(null,documentsFolderPath)

    if (file.fieldname === "image") {
      if(!file.mimetype.includes("image")) {
        console.log("NOT AN IMAGE")
        throw new ApiError("error", 400);
      }
      cb(null, profilePicFolderPath);
    } else if (file.fieldname === "docs") {
      console.log("Came here")
      cb(null, documentsFolderPath);
    }
  },
  filename: (req, file, cb) => {
    console.log(file, "file");
    cb( null, Date.now() + "-" + file.originalname /*+path.extname(file.originalname)*/ );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  // fileFilter: (req, file, cb) => {
  //     if(
  //         file.mimetype == "image/png" ||
  //         file.mimetype == "image/jpg" ||
  //         file.mimetype == "image/jpeg"
  //     )
  // }
});
export default upload;
