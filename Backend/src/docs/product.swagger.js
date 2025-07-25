/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management APIs
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, type, sku, quantity, price]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Phone
 *               type:
 *                 type: string
 *                 example: Electronics
 *               sku:
 *                 type: string
 *                 example: PHN-001
 *               image_url:
 *                 type: string
 *                 example: https://example.com/phone.jpg
 *               description:
 *                 type: string
 *                 example: Latest model with AMOLED screen
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               price:
 *                 type: number
 *                 example: 999.99
 *     responses:
 *       201:
 *         description: Product created
 *       400:
 *         description: Invalid input or validation error
 */

/**
 * @swagger
 * /products/{id}/quantity:
 *   put:
 *     summary: Update quantity of a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB product ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Quantity updated
 *       400:
 *         description: Invalid quantity
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (paginated)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of products
 *       401:
 *         description: Unauthorized
 */
