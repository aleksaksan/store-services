const { Product, Stock } = require('../models/models');
const { Op } = require('sequelize');


class StockController {
  // - Создание остатка

  async create (req, res) {
    try {
      const { plu, storeId, storeQuantity, orderQuantity } = req.body;
      const product = await Product.findOne({ where: { plu } });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      };

      const prevStock = await Stock.findOne({where: {productId: product.id, storeId}});

      if (prevStock) {
        prevStock.storeQuantity = storeQuantity;
        prevStock.orderQuantity = orderQuantity;
        await prevStock.save();
        return res.status(200).json(prevStock);
      } else {
        const stock = await Stock.create({
          productId: product.id,
          storeId,
          storeQuantity,
          orderQuantity,
        });
        return res.status(201).json(stock);
      }

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// - Увеличение остатка
// - Уменьшение остатка
  async editQuantity (req, res) {
    try {
      const { id } = req.params;
      console.log(id)
      const { changeStoreQuantity = 0, changeOrderQuantity = 0 } = req.body;
      const stock = await Stock.findByPk(id);
      if (!stock) {
        return res.status(404).json({ error: 'Stock not found' });
      };

      stock.storeQuantity += Number(changeStoreQuantity);
      stock.orderQuantity += Number(changeOrderQuantity);
      await stock.save();

      return res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
// - Получение остатков по фильтрам
//     - plu
//     - shop_id
//     - количество остатков на полке (с-по)
//     - количество остатков в заказе (с-по)

  async getStock (req, res) {
    try {
      const { plu, shopId: storeId, from, to, isByStore = false, isByOrder = false } = req.query;
      const filter = {};
      if (plu) {
        const product = await Product.findOne({where: { plu }});
        filter.productId = product.id;
      }
      if (storeId) {
        filter.storeId = storeId;
      }
      if (isByStore) {
        filter.storeQuantity = {[Op.between]: [from, to]};
      } 
      if (isByOrder) {
        filter.orderQuantity = {[Op.between]: [from, to]};
      }

      const stock = await Stock.findAll({where: filter});

      return res.status(200).json(stock);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = new StockController();
