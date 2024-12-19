import { Request, Response } from "express";
import SupplierModel from "../models/SupplierModel";

class SupplierController {

    async getSuppliers(req: Request, res: Response) {
        try {
            res.status(200).json({
                message: 'Suppliers',
                data: [],
            })
        } catch (error: any) {
            res.status(400).json({
                message: error.message
            })
        }
    }

    createSupplier = async (req:Request, res: Response) => {
        const body = req.body;
        try {
            const newSupplier = new SupplierModel(body);
            newSupplier.save();

            res.status(200).json({
                message: 'Add new supplier successfully',
                data: newSupplier,
            })
        } catch (error: any) {
            res.status(400).json({
                message: error.message
            })
        }
    }

}
export default SupplierController;