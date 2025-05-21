import {Router} from 'express';
import {addProduct, deleteProduct, getProductById, getProducts, updateProduct} from '../controllers/product.controller';
import {
  addReviewForProduct,
  deleteReviewFromProduct,
  getReviewFromProduct,
  updateReviewForProduct
} from "../controllers/review.controller";

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: returns a list of products
 */
router.get('/all', getProducts);

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Get product by ID
 *     responses:
 *       200:
 *         description: returns a product
 */
router.get('/:id', getProductById)

/**
 * @swagger
 * /create:
 *   post:
 *     summary: create product
 *     responses:
 *       200:
 *         description: returns a new product
 */
router.post('/create', addProduct)

/**
 * @swagger
 * /:id:
 *   post:
 *     summary: create product
 *     responses:
 *       200:
 *         description: returns a new product
 */
router.put('/update/:id', updateProduct);

/**
 * @swagger
 * /:id:
 *   delete:
 *     summary: delete product
 *     responses:
 *       200:
 *         description: returns a new product
 */
router.delete('/delete/:id', deleteProduct);

/**
 * @swagger
 * /:pid/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     responses:
 *       200:
 *         description: returns a list of reviews
 */
router.get('/:pid/reviews', getReviewFromProduct);

/**
 * @swagger
 * /:pid/review:
 *   post:
 *     summary: Add a review for a product
 *     responses:
 *       200:
 *         description: returns a new review
 */
router.post('/:pid/review', addReviewForProduct);

/**
 * @swagger
 * /:pid/review/:rid:
 *   put:
 *     summary: Update a review for a product
 *     responses:
 *       200:
 *         description: returns the updated review
 */
router.put('/:pid/review/:rid', updateReviewForProduct);

/**
 * @swagger
 * /:pid/review/:rid:
 *   delete:
 *     summary: Delete a review for a product
 *     responses:
 *       200:
 *         description: returns the deleted review
 */
router.delete('/:pid/review/:rid', deleteReviewFromProduct);

export default router;
