# Proyecto e-comerce Backend con Node.js y Express

Este README proporciona una descripción detallada de los componentes de tu aplicación de backend desarrollada en Node.js con Express. La aplicación consta de 6 componentes en total:

## Componente 1: `app.js`

`app.js` es el archivo principal de la aplicación y configura el servidor Express, establece rutas y escucha las solicitudes entrantes.

### Descripción:

-   Importa los módulos necesarios, incluyendo Express, `ProductManager`, `productsRouter`, `CartManager`, `cartRouter`, y `config.js`.
-   Crea una instancia de Express y almacénala en la variable `app`.
-   Exporta instancias de `ProductManager` y `CartManager` que se utilizarán en otros lugares de la aplicación.
-   Configura el uso de middleware Express para analizar solicitudes en formato JSON.
-   Establece rutas para los recursos de productos y carritos utilizando `productsRouter` y `cartRouter`.
-   Inicia el servidor Express en el puerto especificado en `PORT` y muestra un mensaje en la consola para indicar que el servidor está en ejecución.

### Pruebas:

-   Asegúrate de que todos los módulos importados se encuentren en las rutas especificadas.
-   Ejecuta la aplicación con `node app.js`.
-   Verifica que el servidor esté en ejecución en el puerto especificado (en este caso, el puerto 8080).
-   Realiza pruebas adicionales para asegurarte de que las rutas y el middleware funcionen según lo esperado.

## Componente 2: `config.js`

`config.js` contiene la configuración de la aplicación, incluyendo rutas a archivos JSON y el puerto en el que se ejecutará el servidor.

### Descripción:

-   Exporta constantes como `PRODUCTOS_JSON`, `CART_JSON`, y `PORT` que almacenan las rutas a archivos JSON y el puerto del servidor.

## Componente 3: `ProductsManager.js`

`ProductsManager.js` es responsable de la gestión de productos en la aplicación, incluyendo la adición, lectura, actualización y eliminación de productos.

### Descripción:

-   Importa el módulo `fs` de Node.js y la constante `PRODUCTOS_JSON` de `config.js` para trabajar con los datos de productos.
-   Define una clase `ProductManager` con métodos para gestionar productos.
-   Los métodos permiten agregar nuevos productos, leer productos existentes, obtener productos por ID, actualizar productos y eliminar productos.

### Pruebas:

-   Crea una instancia de `ProductManager`.
-   Utiliza los métodos de la instancia para agregar, leer, actualizar y eliminar productos.
-   Verifica que los cambios se reflejen en el archivo JSON de productos y que los datos se manipulen correctamente.

## Componente 4: `cartManager.js`

`cartManager.js` se encarga de la gestión de carritos de compra en la aplicación, incluyendo la obtención de carritos, obtención de productos de un carrito, creación de nuevos carritos y adición de productos a carritos existentes.

### Descripción:

-   Importa el módulo `fs` de Node.js y la constante `CART_JSON` de `config.js` para trabajar con los datos de carritos.
-   Define una clase `CartManager` con métodos para gestionar carritos.
-   Los métodos permiten obtener carritos, obtener productos de un carrito, crear nuevos carritos y agregar productos a carritos existentes.

### Pruebas:

-   Crea una instancia de `CartManager`.
-   Utiliza los métodos de la instancia para obtener carritos, obtener productos de un carrito, crear nuevos carritos y agregar productos a carritos.
-   Verifica que los cambios se reflejen en el archivo JSON de carritos y que los datos se manipulen correctamente.

## Componente 5: `cartRouter.js`

`cartRouter.js` es un módulo que define rutas relacionadas con la gestión de carritos de compra en la aplicación.

### Descripción:

-   Importa los módulos necesarios, incluyendo `Router` de Express y `cartManager` de la aplicación principal.
-   Define rutas para realizar operaciones en los carritos, como obtener los productos de un carrito, agregar productos a un carrito y crear un nuevo carrito.

### Rutas:

-   `GET /:cid`: Obtiene los productos de un carrito específico mediante el identificador del carrito (`:cid`). Utiliza `cartManager.getCartProducts` para obtener los productos y responde con la lista de productos del carrito.
    
-   `POST /:cid/products/:pid`: Permite agregar productos a un carrito específico. Utiliza `cartManager.addProductsToCart` para realizar la operación y responde con un mensaje.
    
-   `POST /`: Crea un nuevo carrito. Utiliza `cartManager.newCart` para crear un carrito y responde con el nuevo carrito creado.
    

### Pruebas:

-   Define rutas de prueba para cada una de las operaciones mencionadas.
-   Utiliza herramientas como Postman o curl para realizar solicitudes a estas rutas y verificar que las operaciones en los carritos funcionen correctamente.

## Componente 6: `productsRouter.js`

`productsRouter.js` es un módulo que define rutas relacionadas con la gestión de productos en la aplicación.

### Descripción:

-   Importa los módulos necesarios, incluyendo `Router` de Express y `productManager` de la aplicación principal.
-   Define rutas para realizar operaciones en productos, como obtener una lista de productos, obtener un producto por ID, agregar un nuevo producto, actualizar un producto y eliminar un producto.

### Rutas:

-   `GET /`: Obtiene una lista de productos. Si se proporciona un parámetro `limit`, se limita la cantidad de productos devueltos. Utiliza `productManager.getProducts` para obtener los productos y responde con la lista.
    
-   `GET /:pid`: Obtiene un producto específico por su identificador (`:pid`). Utiliza `productManager.getProductsById` para obtener el producto y responde con los detalles del producto.
    
-   `POST /`: Permite agregar un nuevo producto. Utiliza `productManager.addProducts` para agregar un nuevo producto y responde con los detalles del producto creado.
    
-   `PUT /:pid`: Permite actualizar un producto existente por su identificador. Utiliza `productManager.updateProduct` para realizar la actualización y responde con un mensaje de éxito.
    
-   `DELETE /:pid`: Permite eliminar un producto existente por su identificador. Utiliza `productManager.deleteProducts` para eliminar el producto y responde con un mensaje de éxito.
    

### Pruebas:

-   Define rutas de prueba para cada una de las operaciones mencionadas.
-   Utiliza herramientas como Postman o curl para realizar solicitudes a estas rutas y verificar que las operaciones en productos funcionen correctamente.

