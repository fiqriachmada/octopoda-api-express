import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';


import getProductById from './src/controller/product/getProductById.js';
import putProductById from './src/controller/product/putProductById.js';
import postProduct from './src/controller/product/postProduct.js';
import deleteProductById from './src/controller/product/deleteProductById.js';
import getAllProduct from './src/controller/product/getAllProduct.js';


dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Octopoda API' });
});

app.use('/products', getAllProduct);

app.use('/products', getProductById);

app.use('/products', putProductById);

app.use('/products', deleteProductById);

app.use('/products', postProduct);

const port = 5001;

app.listen(port, () => {
  console.log(
    'App is Listening...and the server is up to port http://localhost:' + port
  );
});
