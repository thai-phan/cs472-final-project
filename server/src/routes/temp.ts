
// /**
//  * @swagger
//  * /:id:
//  *   post:
//  *     summary: create product
//  *     requestBody:
//  *       required: true
//  *       description: product object
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               id:
//  *                 type: number
//  *               name:
//  *                 type: string
//  *               category:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               image:
//  *                 type: string
//  *               rating:
//  *                 type: number
//  *     responses:
//  *       200:
//  *         description: returns a new product
//  */
// router.post('/create', addProduct)
//
// /**
//  * @swagger
//  * /:id:
//  *   post:
//  *     summary: create product
//  *     responses:
//  *       200:
//  *         description: returns a new product
//  */
// router.put('/update/:id', updateProduct);
//
// /**
//  * @swagger
//  * /:id:
//  *   delete:
//  *     summary: delete product
//  *     responses:
//  *       200:
//  *         description: returns a new product
//  */
// router.delete('/delete/:id', deleteProduct);