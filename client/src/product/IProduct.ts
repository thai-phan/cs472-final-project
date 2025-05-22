export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  dateAdded: Date;
  imageUrl: string;
  reviewCount: number;
  averageRating: number;
}