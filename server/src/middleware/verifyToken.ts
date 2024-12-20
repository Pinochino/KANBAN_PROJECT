require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const header = req.headers?.authorization;
    const accessToken = header ? header.split(' ')[1] : '';

    try {
        if (!accessToken) {
            throw new Error('Không có quyền truy cập');
        }


        const verify: any = jwt.verify(accessToken, process.env.SECRET_KEY as string);
        
        if (!verify) {
            throw new Error("Invalid token");
        }
        req._id = verify._id;

        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
             res.status(401).json({ error: "jwt expired" });
             return;
        }
        res.status(401).json({ error: "Invalid token" });
    }
}
