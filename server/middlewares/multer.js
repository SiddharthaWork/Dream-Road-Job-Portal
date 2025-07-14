import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({
  storage: storage,
}).single("file");  
export const profileUpload = multer({
  storage: storage,
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },
]);
