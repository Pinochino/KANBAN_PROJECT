import { Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
  private productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }

  async getProducts(req: Request, res: Response) {
    try {
      res.status(200).json({ message: "Products", data: [] });
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  }
}
export default ProductController;
