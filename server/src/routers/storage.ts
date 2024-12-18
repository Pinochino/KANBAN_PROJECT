import { Router } from "express";
import ProductController from "../controllers/product.controller";

const storageRouter = Router();
const productController = new ProductController();

storageRouter.get('/products', productController.getProducts);


export default storageRouter;