const Router = require('express');
const router = new Router();
const stocksRouter = require('./stocks');
const goodsRouter = require('./goods');

router.use('/stocks', stocksRouter);
router.use('/goods', goodsRouter);

module.exports = router;
