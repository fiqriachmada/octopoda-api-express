import { Router } from 'express';
// import Product from '../../model/product';
import { Product } from '../../model/product.js';

const deleteProductById = Router();

deleteProductById.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id: id } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.destroy({ where: { id: id } });

    const response = {
      status: 200,
      data: product,
      message: 'Product deleted successfully',
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to delete product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

export default deleteProductById;
