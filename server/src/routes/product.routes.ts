import {Router} from 'express';
import {
  addProduct, analyzeWithAI,
  deleteProduct,
  getProductById,
  getProducts,
  searchProducts,
  updateProduct
} from '../controllers/product.controller';
import {
  addReviewForProduct,
  deleteReviewFromProduct,
  getReviewFromProduct,
  updateReviewForProduct
} from "../controllers/review.controller";

const router = Router();

/**
 * @swagger
 * /products/analysis:
 *   get:
 *     summary: Get price analysis of a product
 *     parameters:
 *     - name: name
 *       in: query
 *       description: name of the product
 *       type: string
 *     - in: query
 *       name: price
 *       description: price of the product
 *       type: number
 *     responses:
 *       200:
 *         description: returns a price analysis of a product
 *       404:
 *         description: recommend not found
 */
router.get('/analysis', analyzeWithAI)

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     parameters:
 *     - name: page
 *       in: query
 *       description: page number
 *       type: number
 *     responses:
 *       200:
 *         description: returns a list of products
 *       404:
 *         description: products not found
 */
router.get('', getProducts);


/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     parameters:
 *     - name: q
 *       in: query
 *       description: search query
 *       type: string
 *     - name: category
 *       in: query
 *       description: category
 *       type: string
 *     responses:
 *       200:
 *         description: returns a list of products
 */
router.get('/search', searchProducts);

/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *     - name: id
 *       in: path
 *       description: ID of the product
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: returns a product
 */
router.get('/:id', getProductById)

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
 *     summary: Create review for a product
 *     requestBody:
 *       required: true
 *       description: review object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               author:
 *                 type: string
 *               authorEmail:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns a new review
 *       400:
 *         description: missing required fields
 */

let a = {
  "productId": 6,
  "author": "Thai",
  "authorEmail": "thai@miu.edu",
  "rating": 5,
  "comment": "Nice",
  "date": "2025-05-23T01:58:53.830Z"
}

router.post('/:pid/reviews', addReviewForProduct);

/**
 * @swagger
 * /:pid/review/:rid:
 *   put:
 *     summary: Update review for a product
 *     requestBody:
 *       required: true
 *       description: review object
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               productId:
 *                 type: string
 *               author:
 *                 type: string
 *               authorEmail:
 *                 type: string
 *               rating:
 *                 type: number
 *               comment:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       200:
 *         description: returns a new review
 *       400:
 *         description: missing required fields
 */
router.put('/:pid/reviews/:rid', updateReviewForProduct);

/**
 * @swagger
 * /:pid/review/:rid:
 *   delete:
 *     summary: Delete a review for a product
 *     parameters:
 *     - name: pid
 *       in: path
 *       description: ID of the product
 *       required: true
 *       type: number
 *     - name: rid
 *       in: path
 *       description: ID of the review
 *       required: true
 *       type: number
 *     responses:
 *       200:
 *         description: returns the deleted review
 */
router.delete('/:pid/reviews/:rid', deleteReviewFromProduct);

export default router;
