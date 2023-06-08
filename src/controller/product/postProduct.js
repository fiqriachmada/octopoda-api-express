import { Router } from 'express';

import { randomUUID } from 'crypto';
import {Product} from '../../model/product.js';

const postProduct = Router();

postProduct.post('/', async (req, res) => {
  try {
    const {
      sku,
      name,
      price,
      category,
      brand,
      barcode,
      stock_thin,
      buy,
      status,
      user_id,
    } = req.body;

    const newProduct = await Product.create({
      sku,
      name,
      price,
      category: randomUUID(),
      brand: randomUUID(),
      barcode: sku,
      stock_thin: 1,
      buy: price,
      status: 1,
      user_id: 1,
      image_group_id: 1,
    });

    const response = {
      status: res.statusCode,
      data: newProduct,
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to add product:', error);
    res.json(error);
  }
});

export default postProduct;
