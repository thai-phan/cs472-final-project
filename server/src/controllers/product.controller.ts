import {Request, Response, NextFunction} from 'express';
import {Product} from "../models/product.model";

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.API_KEY
});

export const analyzeWithAI =  async (req: Request, res: Response, next: NextFunction) => {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: `Get review of this item ${req.query.name}, 
    and how about this price $${req.query.price} compare to previous 3 months. In 5 sentences.` }],
    model: "deepseek-chat",
  });

  res.status(200).json(completion.choices[0].message.content);
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const {page} = req.query;
  const result = await Product.getProducts(page as string);
  res.status(200).json(result);
};

export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
  const {q, category} = req.query;
  const result = await Product.searchProducts(q as string, category as string);
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





