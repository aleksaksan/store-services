const Router = require('express');
const router = new Router();
const stocksRouter = require('./stocksRouter');
const productsRouter = require('./productsRouter');

router.use('/stocks', stocksRouter);
router.use('/products', productsRouter);

module.exports = router;
