import {pool} from './db';
import {Request, Response, NextFunction} from 'express';

export class Review {
  id: number | null;
  productId: number;
  author: string;
  authorEmail: string;
  rating: number;
  comment: string;
  date: Date;

  constructor(id: number, productId: number, author: string, authorEmail: string,
              rating: number, comment: string, date: Date) {
    this.id = id;
    this.productId = productId;
    this.author = author;
    this.authorEmail = authorEmail;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }

  static getProductReviews = async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const reviews = await conn.query("SELECT * FROM review WHERE product_id = ?", [id]);
      await conn.release();
      return reviews;
    } catch (error) {
      throw new Error('Error fetching reviews');
    }
  }

  static addReview = async (review: Review) => {
    const {productId, author, authorEmail, rating, comment, date} = review;
    if (!productId || !author || !authorEmail || !rating || !comment || !date) {
      throw new Error('Missing required fields');
    }
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO review (product_id, author, author_email, rating, comment, date) VALUES (?, ?, ?, ?, ?, ?)",
        [productId, author, authorEmail, rating, comment, new Date(date)]);
    await conn.release();
    return result;
  }

  static updateReview = async (review: Review) => {
    const {id, productId, author, authorEmail, rating, comment, date} = review;
    if (!productId || !author || !authorEmail || !rating || !comment || !date) {
      throw new Error('Missing required fields');
    }
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE review SET  product_id = ?, author = ?, author_email = ?, " +
        "rating = ? , comment = ?, date = ? WHERE id = ?",
        [productId, author, authorEmail, rating, comment, new Date(date), id]);
    await conn.release();
    if (result.affectedRows === 0) {
      throw new Error('Error updating review');
    }
    return result;
  }

  static deleteReview = async (id: number) => {
    const conn = await pool.getConnection();
    const result = await conn.query("DELETE FROM review WHERE id = ?", [id]);
    await conn.release();
    if (result.affectedRows === 0) {
      throw new Error('Error deleting review');
    }
    return result;
  }
}



