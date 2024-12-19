import { Router } from "express";
import SupplierController from "../controllers/supplier.controller";

const supplierRouter = Router();
const supplierController = new SupplierController();

supplierRouter.get('/', supplierController.getSuppliers);
supplierRouter.post('/add-new', supplierController.createSupplier);


export default supplierRouter;