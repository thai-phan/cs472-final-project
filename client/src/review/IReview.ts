export interface IReview {
  id: number;
  productId: number;
  author: string;
  authorEmail: string;
  rating: number;
  comment: string;
  date: Date;
}

