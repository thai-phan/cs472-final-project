import { Request, Response, NextFunction } from 'express';
import { pool } from '../models/db';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const conn = await pool.getConnection();
    const users = await conn.query("SELECT id, name, email FROM users");
    conn.release();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};
