import { Router } from 'express';
// import { Product, Image, ImageGroup } from '../../model';

import { ImageGroup } from '../../model/imageGroup.js';
import { Product } from '../../model/product.js';
import { Image } from '../../model/image.js';

const getAllProduct = Router();

getAllProduct.get('/', async (req, res) => {
  try {
    const page = req.query.page || 1;
    let limit = req.query.limit || 10;

    limit = parseInt(limit);
    const offset = (page - 1) * limit;

    const products = await Product.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['created_at', 'DESC']],
      include: [
        {
          model: ImageGroup,
          include: [
            {
              model: Image,
            },
          ],
        },
      ],
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

export default getAllProduct;
