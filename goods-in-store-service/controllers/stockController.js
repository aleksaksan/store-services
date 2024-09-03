const { Product, Stock } = require('../models/models');
// - Создание остатка
// - Увеличение остатка
// - Уменьшение остатка
// - Получение остатков по фильтрам
//     - plu
//     - shop_id
//     - количество остатков на полке (с-по)
//     - количество остатков в заказе (с-по)
class StockController {
  async create (req, res) {
    try {
      const { plu, storeId, storeQuantity, orderQuantity } = req.body;
      const product = await Product.findOne({ where: { plu } });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      };

      const stock = await Stock.create({
        productId: product.id,
        storeId,
        storeQuantity,
        orderQuantity,
      });

      return res.status(201).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async editQuantity (res, req) {
    try {
      const { stockId, changeStoreQuantity = 0, changeOrderQuantity = 0 } = req.body;
      const stock = await Stock.findByPk(stockId);
      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      };

      stock.storeQuantity += changeStoreQuantity;
      stock.orderQuantity += changeOrderQuantity;
      await stock.save();

      return res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = new StockController();
