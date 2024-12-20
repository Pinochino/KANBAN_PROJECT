import { Application } from "express";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, 'uploads/')
    },
    filename: (req: any, file: any, cb: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix, path.extname(file.originalName));
    }
})

// Kiểm tra file upload
const fileFilter = (req: any, file: any, cb: any) => {
    // Chỉ cho phép file ảnh
    const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
        return cb(new Error('Chỉ cho phép upload file ảnh!'), false);
    }
    cb(null, true);
};
// Cấu hình giới hạn dung lượng và số lượng file
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Giới hạn dung lượng 5MB
        files: 5,                  // Giới hạn số lượng file 5
    },
});


const multerConfig = (app: Application) => {

}