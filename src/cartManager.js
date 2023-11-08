import { promises as fs } from 'fs'
import { CART_JSON } from '../src/config.js'


export class CartManager {
    constructor() {
        this.path = CART_JSON;
        this.cart = [];
    }

    getCart = async () => {
        try {
            const res = await fs.readFile(this.path, 'utf8')
            if (!res) {
                return [];
            }
            const resJson = JSON.parse(res)
            return resJson
        } catch (error) {
            return [];
        }
    }

    getCartProducts = async (id) => {
        const carts = await this.getCart();
        const numericId = parseInt(id, 10);

        const cart = carts.find(cart => cart.id === numericId)
        // console.log(cart);
        if (cart) {
            return cart.products
        } else {
            console.log("No existe carrito (Manager)");
        }
    }

    newCart = async () => {
        try {
            const id = await this.generateId();
            if (id) {
                const newCart = { id, products: [] }

                this.cart = await this.getCart();
                this.cart.push(newCart);

                await fs.writeFile(this.path, JSON.stringify(this.cart))

                return newCart;

            } else {
                console.log('Error al generar Id cartManager');
                return null;

            }

        } catch (error) {
            console.error('Error al agregar el producto:', error);
            return null;
        }

    }

    addProductsToCart = async (cid, pid) => {
        const carts = await this.getCart()
        const convertToNumberCartId = parseInt(cid, 10);
        const convertToNumberProductId = parseInt(pid, 10);
        const index = carts.findIndex(cart => cart.id === convertToNumberCartId)
        console.log(index);

        if (index !== -1) {
            const cartProducts = await this.getCartProducts(cid)
            const indexProduct = cartProducts.findIndex(product => product.id === convertToNumberProductId)
            console.log(indexProduct);
            if (indexProduct !== -1) {
                cartProducts[indexProduct].quantity = cartProducts[indexProduct].quantity + 1
            } else {
                cartProducts.push({ pid, quantity: 1 })
            }
            carts[index].products = cartProducts;
            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log('Producto agregado!');
        } else {
            console.log('No se encontro el carrito (Manager)');
        }

    }

    generateId = async () => {
        const allcart = await this.getCart();

        try {
            if (allcart.length === 0) {
                return 1;
            } else {
                const lastCart = allcart[allcart.length - 1]
                return lastCart.id + 1;
            }
        } catch (error) {
            console.log('Error al generar el Id para Cart', error);

        }
    }
}