import {Request, Response, NextFunction} from 'express';
import {Product} from "../models/product.model";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Product.getProducts();
  res.status(200).json(result);
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  const result = await Product.getProductById(parseInt(id));
  res.status(200).json(result);
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;
  const result = await Product.addProduct(product);
  res.status(200).json(result)
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;
  const result = await Product.updateProduct(product);
  res.status(200).json(result);
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Product.deleteProduct(req.body.id);
  res.status(200).json(result);
}





