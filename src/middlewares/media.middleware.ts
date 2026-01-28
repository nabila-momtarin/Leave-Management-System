import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
    // const folder =
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({ 
    storage: storage,
    limits : { fileSize: 5*1024*1024 },
    // fileFilter: (req, file, cb) => {
    //     if( 
    //         file.mimetype == "image/png" || 
    //         file.mimetype == "image/jpg" || 
    //         file.mimetype == "image/jpeg"
    //     )
    // }
 });
export default upload;
