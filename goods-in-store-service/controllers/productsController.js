const { Product } = require('../models/models');

class ProductsController {
  async create (req, res) {
    try {
      const { plu, name } = req.body;
      console.log(plu, name)
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

      if (plu) {
        filter.plu = plu;
      } else if (name) {
        filter.name = name
      } else {
        res.status(500).json({ error: 'query parametr is wrong or void'})
      };

      const product = await Product.findAll(({ where: filter, include: [Product] }));

    
      return res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  };
}

module.exports = new ProductsController();
