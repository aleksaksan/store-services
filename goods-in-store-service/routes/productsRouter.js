const Router = require('express');
const router = new Router();
const ProductsController = require('../controllers/productsController');

// - Создание товара
// - Получение товаров по фильтрам
//     - name
//     - plu

router.post('/', ProductsController.create);

router.get('/', ProductsController.getByFilter);

module.exports = router;
