const Router = require('express');
const router = new Router();
const { create, editQuantity, getStock } = require('../controllers/stockController');

// - Создание остатка
// - Увеличение остатка
// - Уменьшение остатка
// - Получение остатков по фильтрам
//     - plu
//     - shop_id
//     - количество остатков на полке (с-по)
//     - количество остатков в заказе (с-по)

router.post('/', create);
router.patch('/:id', editQuantity);
router.get('/', getStock);

module.exports = router;
