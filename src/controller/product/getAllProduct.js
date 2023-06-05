import { Router } from 'express';
import { Product } from '../../model/product.js';

const getAllProduct = Router();

getAllProduct.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1; // Mendapatkan nomor halaman dari query parameter, default: 1
    const limit = req.query.limit || 10; // Mendapatkan batasan jumlah data per halaman dari query parameter, default: 10

    const offset = (page - 1) * limit; // Menghitung offset berdasarkan nomor halaman

    const products = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
    });

    const totalCount = products.count;

    console.log('Product', await Product.findAll);

    const totalPages = Math.ceil(totalCount / limit);

    const response = {
      status: res.statusCode,
      data: products.rows,
      meta: {
        pagination: {
          page: page,
          itemsPerPage: limit,
          totalCount: totalCount,
          totalPages: totalPages,
          links: {
            ...(page < totalPages && {
              next: `${process.env.BASE_URL}/products?page=${
                parseInt(page) + 1
              }`,
            }),
            ...(page > 1 &&
              page <= totalPages && {
                previous: `${process.env.BASE_URL}/products?page=${
                  parseInt(page) - 1
                }`,
              }),
          },
        },
      },
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to query SELECT:', error);
    res.json(error);
  }
});

export default getAllProduct;
