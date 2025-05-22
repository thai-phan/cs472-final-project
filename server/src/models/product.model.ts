import {pool} from './db';
import {Request, Response, NextFunction} from 'express';

export class Product {
  id: number;
  name: string;
  description: string;
  category: string;
  dateAdded: Date;
  price: number;
  averageRating: number;
  imageUrl: string;
  reviewCount: number;

  constructor(id: number, name: string, category: string, description: string, dateAdded: Date,
              price: number, averageRating: number, imageUrl: string, reviewCount: number,) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.category = category;
    this.dateAdded = dateAdded;
    this.price = price;
    this.averageRating = averageRating;
    this.imageUrl = imageUrl;
    this.reviewCount = reviewCount;
  }

  static getProducts = async () => {
    try {
      const conn = await pool.getConnection();
      const products = await conn.query("SELECT * FROM product");
      conn.release();
      return products.map(((product: any) =>
          new Product(product.id, product.name, product.category, product.description, product.date_added,
              product.price, product.average_rating, product.image_url, product.review_count)));
    } catch (error) {
      throw new Error('Error fetching products');
    }
  }

  static getProductById = async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const [product] = await conn.query("SELECT * FROM product WHERE id = ?", [id]);
      await conn.release();
      return new Product(product.id, product.name, product.category, product.description, product.date_added,
          product.price, product.average_rating, product.image_url, product.review_count);
    } catch (error) {
      throw new Error('Error fetching product');
    }
  }

  static addProduct = async (product: Product) => {
    try {
      const {name, description, category, price, dateAdded} = product;
      const conn = await pool.getConnection();
      const result = await conn.query("INSERT INTO product (name, description, category, price, date_added) VALUES (?, ?, ?, ?, ?)",
          [name, description, category, price, dateAdded]);
      await conn.release();
      return result
    } catch (error) {
      throw new Error('Error adding product');
    }
  }

  static updateProduct = async (product: Product) => {
    const {id, name, description, category, price, dateAdded} = product;

    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE product SET  name=?, description = ?, category= ?, price = ?, date_added = ? WHERE id = ?",
        [name, description, category, price, dateAdded, id]);
    await conn.release();
    if (result.affectedRows === 0) {
      throw new Error("Product not found");
    }
    return product;

  }

  static deleteProduct = async (id: number) => {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM product WHERE id = ?", [id]);
    await conn.release();
    if (result.affectedRows === 0) {
      throw new Error("Product not found");
    }
    return result;
  }

}



