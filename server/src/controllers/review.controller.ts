import {Request, Response, NextFunction} from 'express';
import {Review} from "../models/review.model";

export const getReviewFromProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {pid} = req.params;
  const result = await Review.getProductReviews(parseInt(pid));
  res.status(200).json(result);
};

export const addReviewForProduct = async (req: Request, res: Response, next: NextFunction) => {
  let review: Review = await Review.addReview(req.body)
  res.status(201).json({message: 'Product created successfully', reviewId: req.query.pid});
}

export const updateReviewForProduct = async (req: Request, res: Response, next: NextFunction) => {
  let review: Review = await Review.updateReview(req.body)
  res.status(200).json({message: 'Product updated successfully', reviewId: review.id});
}

export const deleteReviewFromProduct = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Review.deleteReview(req.params.rid);
  res.status(200).json(result);
}


