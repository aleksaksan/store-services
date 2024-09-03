const Router = require('express');
const router = new Router();
const { create, getByFilter } = require('../controllers/productsController');

// - Создание товара
// - Получение товаров по фильтрам
//     - name
//     - plu

router.post('/', create);

router.get('/', getByFilter);

module.exports = router;
