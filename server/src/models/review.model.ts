import {pool} from './db';
import {Request, Response, NextFunction} from 'express';

export class Review {
  id: number | null;
  productId: string;
  description: string;
  author: string;
  rating: number;
  comment: number;
  date: Date;

  constructor(id: number, name: string, description: string, author: string, rating: number, comment: number, date: Date) {
    this.id = id;
    this.productId = name;
    this.description = description;
    this.author = author;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
  }

  static getProductReviews = async (id: number) => {
    try {
      const conn = await pool.getConnection();
      const [reviews] = await conn.query("SELECT * FROM review WHERE productId = ?", [id]);
      await conn.release();
      return reviews;
    } catch (error) {
      throw new Error('Error fetching reviews');
    }
  }

  static addReview = async (review: Review) => {
    const {description, author, rating, comment, date} = review;
    const conn = await pool.getConnection();
    const result = await conn.query("INSERT INTO review (description, author, rating, comment, date) VALUES (?, ?, ?, ?, ?)",
        [description, author, rating, comment, date]);
    await conn.release();
    return result;
  }

  static updateReview = async (review: Review) => {
    const {id, description, author, rating, comment, date} = review;
    const conn = await pool.getConnection();
    const result = await conn.query("UPDATE review SET  description = ?, author = ?, rating = ? , comment = ?, date = ? WHERE id = ?",
        [description, author, rating, comment, date, id]);
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



