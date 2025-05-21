import {Request, Response, NextFunction} from 'express';
import {pool} from '../models/db';
import {Product} from "../models/product.model";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(Product.getProducts());
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  res.status(200).json(Product.getProductById(parseInt(id)));
}

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;
  res.status(200).json(Product.addProduct(product))
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const product: Product = req.body;
  res.status(200).json(Product.updateProduct(product));
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json(Product.deleteProduct(req.body.id));
}





