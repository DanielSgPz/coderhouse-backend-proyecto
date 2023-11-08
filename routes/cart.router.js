import { Router, response } from 'express';
import { cartManager } from '../src/app.js'

const cartRouter = Router();

cartRouter.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cartProduct = await cartManager.getCartProducts(cid)
        res.json(cartProduct)
    } catch (error) {
        console.log(error);
        res.send(`Error al enviar productos al carrito (router)`)
    }
})

cartRouter.post('/:cid/products/:pid' , async (req, res ) =>{
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductsToCart(cid, pid)
        res.send('Producto agregado! (router)')
    } catch (error) {
        res.send('Error al guardar producto en el carrito (router)')
        
    }
})

cartRouter.post('/', async (req, res ) =>{
    try {
        const newCart = await cartManager.newCart()
        res.json(newCart)
    } catch (error) {
        res.send('Error al crear carrito (router)')
        
    }
})
export {cartRouter};