import { Router } from 'express';
import { Product } from '../../model/product.js';
import { Image } from '../../model/image.js';
import { Sequelize } from 'sequelize';
import { ImageGroup } from '../../model/imageGroup.js';

const getProductById = Router();

getProductById.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      where: { id: id },

      include: {
        model: ImageGroup,
        include: [
          {
            model: Image,
          },
        ],
      },
    });

    const response = {
      status: res.statusCode,

      data: {
        ...product.toJSON(),
        imageUrl: product.image_group.images[0].uri, // Mengambil objek gambar pertama dari array "Images"
      },
    };

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(response);
  } catch (error) {
    console.error('Failed to query SELECT:', error);
    res.json(error);
  }
});

export default getProductById;
