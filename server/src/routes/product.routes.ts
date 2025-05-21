import {Router} from 'express';
import {addProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../controllers/product.controller';
import {
  addReviewForProduct,
  deleteReviewFromProduct,
  getReviewFromProduct,
  updateReviewForProduct
} from "../controllers/review.controller";

const router = Router();

router.get('', getProducts);
router.get('/:id', getProductById)
router.post('/create', addProduct)
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

router.get('/:pid/reviews', getReviewFromProduct);
router.post('/:pid/review', addReviewForProduct);
router.put('/:pid/review/:rid', updateReviewForProduct);
router.delete('/:pid/review/:rid', deleteReviewFromProduct);

export default router;
