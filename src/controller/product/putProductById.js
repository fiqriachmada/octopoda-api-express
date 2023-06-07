import { Router } from 'express';
import { Product } from '../../model/product.js';

const putProductById = Router();

putProductById.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    // const dataProduct = { ...req.body };
    const { name, price } = req.body;

    const product = await Product.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ name, price });

    const response = {
      status: res.statusCode,
      // data: { id, ...dataProduct },
      data: { id, name, price },
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to update product:', error);
    res.json(error);
  }
});

export default putProductById;
