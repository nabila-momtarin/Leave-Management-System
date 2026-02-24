import fs from "fs";
import path from "path";

export const ensureUploadDirs = () => {
  const baseDir = path.join(process.cwd(), "media");

  const folders = [
    path.join(baseDir, "profilePics"),
    path.join(baseDir, "visitHistories"),
  ];

  folders.forEach((folder) => {
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
      console.log(`Created folder: ${folder}`);
    }
  });
};