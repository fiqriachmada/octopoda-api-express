import { Router } from 'express';
import { Product } from '../../model/product.js';

const getProductById = Router();

getProductById.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const products = await Product.findOne({ where: { id: id } });

    const response = {
      status: res.statusCode,
      data: products,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to query SELECT:', error);
    res.json(error);
  }
});

export default getProductById;
