import {Request, Response, NextFunction} from 'express';
import {Review} from "../models/review.model";

export const getReviewFromProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params;
  res.status(200).json(Review.getProductReviews(parseInt(id)));
};

export const addReviewForProduct = async (req: Request, res: Response, next: NextFunction) => {
  let review: Review = await Review.addReview(req.body)
  res.status(201).json({message: 'Product created successfully', productId: review.id});
}

export const updateReviewForProduct = async (req: Request, res: Response, next: NextFunction) => {
  let review: Review = await Review.updateReview(req.body)
  res.status(200).json({message: 'Product updated successfully'});
}

export const deleteReviewFromProduct = async (req: Request, res: Response, next: NextFunction) => {
  const result = await Review.deleteReview(req.body)
  res.status(200).json(result);
}


