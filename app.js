import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import bodyParser from 'body-parser';

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

// app.use('/characters', getAllCharacter)

// app.use('/characters', putCharacterById)

// app.use('/characters', postCharacter)

// app.use('/characters', getCharacterById)

// app.use('/characters', putCharacterById)

// app.use('/characters', putCharacterById)

// app.use('/characters', deleteCharacterById)

// app.use('/species', getCharacterSpecies)

// app.use('/house', getCharacterHouse)

// app.use('/users', postUser)

// app.use('/users', loginUser)

// app.use('/users', getAllUser)

// app.use('/users', getUserById)

// app.use('/users', putUserById)

// app.use('/', uploadImage)

// app.get('/wands', async (req, res) => {
//   const query = 'SELECT * FROM wand'
//   const [rows] = await connection().query(query)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.send(rows)
// })

// app.get('/wands/:id', async (req, res) => {
//   const { id } = req.params
//   const query = 'SELECT * FROM wand WHERE wand.id=?'
//   const [rows] = await (await connection()).query(query, [id])

//   if (!rows[0]) {
//     return res.json({ msg: "Couldn't find that character" })
//   }
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.json(rows[0])
// })

const port = 5001;

app.listen(port, () => {
  console.log(
    'App is Listening...and the server is up to port http://localhost:' + port
  );
});
