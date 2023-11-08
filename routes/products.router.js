import { Router, response } from 'express';
import { productManager } from '../src/app.js'

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();
        if (limit) {
            const limitProducts = products.slice(0, limit)
            res.json(limitProducts)
        } else {
            res.json(products);
        }


    } catch (error) {
        console.log(error);
        res.send('Error al consultar productos')

    }
})

productsRouter.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await productManager.getProductsById(pid)
        res.json(product)
    } catch (error) {
        console.log(error);
        res.send(`Error al consultar producto con ${pid}`)
    }
})

productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body;
        const status = req.body.status || true;
        const resp = await productManager.addProducts({ title, description, code, price, status, stock, category, thumbnail });
        res.json(resp);
        console.log('Producto agregado');
    } catch (error) {
        console.log(error);
        res.json('Error al agregar el producto')
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body;
        const status = req.body.status || true;
        const resp = await productManager.updateProduct(id, { title, description, code, price, status, stock, category, thumbnail })
        console.log('Producto actualizado');
    } catch (error) {
        console.log(error);
        res.send('Error al actualizar el producto')
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProducts(pid)
        res.send('Porudcto eliminado!')
    } catch (error) {
        console.log(error);
        res.send('Error al intentar eliminar el producto')

    }
})

export { productsRouter };