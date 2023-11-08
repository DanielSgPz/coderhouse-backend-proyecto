import express from 'express';
import { ProductManager } from './ProductsManager.js';
import { productsRouter } from '../routes/products.router.js';
import { CartManager } from './cartManager.js'; 
import { cartRouter } from '../routes/cart.router.js'

import { PORT } from './config.js'


const app = express();

export const productManager = new ProductManager();
export const cartManager = new CartManager();

app.use(express.json())

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);


app.listen(PORT, (req, res) => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
}
)