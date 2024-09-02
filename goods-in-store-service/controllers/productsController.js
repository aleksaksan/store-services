const { Product, Stock } = require('../models/models');

class ProductsController {
  async create (req, res) {
    try {
      const { plu, name } = req.body;
      console.log( plu, name )
      const product = await Product.create({ plu, name });
      return res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  async getByFilter (req, res) {
    try {
      const { plu, name } = req.query;
      const filter = {};

      if (plu && name) {
        throw new Error('query parametr is wrong or void');
      } else if (plu) {
        filter.plu = plu;
      } else if (name) {
        filter.name = name
      } else {
        throw new Error('query parametr is wrong or void');
      };

      const product = await Product.findAll(({ where: filter, include: [Stock] }));

    
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  };
}

module.exports = new ProductsController();
