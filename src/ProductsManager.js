import { promises as fs } from 'fs'
import { PRODUCTOS_JSON } from '../src/config.js'


export class ProductManager {
    constructor() {
        this.path = PRODUCTOS_JSON;
        this.products = []
    }

    addProducts = async ({ title, description, code, price, status, stock, category, thumbnail }) => {
        try {
            const id = await this.generateId(); // Espera hasta obtener un ID válido
    
            if (id) {
                let newProduct = { id, title, description, code, price, status, stock, category, thumbnail };
    
                this.products = await this.getProducts();
                this.products.push(newProduct);
    
                await fs.writeFile(this.path, JSON.stringify(this.products));
    
                return newProduct;
            } else {
                console.log('Error al generar el ID');
                return null;
            }
        } catch (error) {
            console.error('Error al agregar el producto:', error);
            return null; 
        }

        /* 
        const id = await this.generateId()
        console.log(id);
        let newProduct = { id:id, title, description, code, price, status, stock, category, thumbnail }

        this.products = await this.getProducts()
        this.products.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct; */
    }

    getProducts = async () => {


        try {
            const res = await fs.readFile(this.path, 'utf8');
            if (!res) {
                return []; // Si el archivo JSON está vacío, devuelvo un array vacío por defecto.
            }
    
            const resJson = JSON.parse(res);
            return resJson;
        } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
            return []; // En caso de error, también devuelve un array vacío.
        }

    }

    getProductsById = async (id) => {
        const numericId = parseInt(id, 10);

        const res = await this.getProducts()
        const product = res.find(product => product.id === numericId)
        
        if (product) {
            return product
        } else {
            console.log('Producto no encontrado en manager');
        }
    }

    updateProduct = async (id, { ...data }) => {
        const allProducs = await  this.getProducts()
        const index = allProducs.findIndex(product => product.id === id)

        if (index !== -1) {
            allProducs[index] = { id, ...data }
            await fs.writeFile(this.path, JSON.stringify(allProducs))
            return allProducs[index]
        } else {
            console.log('No se encontró el producto');
        }
    }

    deleteProducts = async (id) => {
        const allProducs = await this.getProducts()
        const index = allProducs.findIndex(product => product.id === id)

        if (index !== -1) {
            allProducs.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(allProducs))
            console.log('Producto eliminado');
        } else {
            console.log('No se encontró el producto');
        }
    }

    generateId = async () => {
        const allproducts = await this.getProducts();

       try {
         if (allproducts.length === 0) {
             return 1;
         } else {
             const lastProduct = allproducts[allproducts.length - 1]
             return lastProduct.id + 1;
         }
       } catch (error) {
        console.log('Error al generar el Id', error);

       }
    }
}