import { Router } from 'express';
import Product from '../../model/product';


const getAllProductCopy = Router();

getAllProductCopy.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1; // Mendapatkan nomor halaman dari query parameter, default: 1
    let limit = req.query.limit || 10; // Mendapatkan batasan jumlah data per halaman dari query parameter, default: 10

    // Memastikan limit adalah angka yang valid
    limit = parseInt(limit);

    const offset = (page - 1) * limit; // Menghitung offset berdasarkan nomor halaman

    const products = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['created_at', 'DESC']], // Mengurutkan berdasarkan kolom "created_at" secara descending
    });

    const totalCount = products.count;

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

export default getAllProductCopy;
