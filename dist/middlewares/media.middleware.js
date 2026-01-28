"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// import path from "path";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log("File infor", req.files);
        // const folder = file.filename === 'image' ? 'profilePic' : 'documents';
        // cb(null, `./uploads/${folder}`);
        console.log("file name", file);
        // console.log(process.cwd());
        const profilePicFolderPath = path_1.default.join(process.cwd(), 'uploads', 'profilePic');
        const documentsFolderPath = path_1.default.join(process.cwd(), 'uploads', 'documents');
        console.log(profilePicFolderPath, "file path profile pic");
        console.log(documentsFolderPath, "file path documents");
        // cb(null,documentsFolderPath)
        if (file.fieldname === "image") {
            if (!file.mimetype.includes("image")) {
                console.log("NOT AN IMAGE");
                throw new Error("error");
            }
            cb(null, profilePicFolderPath);
        }
        else if (file.fieldname === "docs") {
            console.log("Came here");
            cb(null, documentsFolderPath);
        }
    },
    filename: (req, file, cb) => {
        console.log(file, "file");
        cb(null, Date.now() + "-" + file.originalname /*+path.extname(file.originalname)*/);
    },
});
const upload = (0, multer_1.default)({
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
exports.default = upload;
