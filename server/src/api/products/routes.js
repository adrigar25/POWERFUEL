// routes.js

const express = require('express');
const {
    addProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getImageCount,
    getProductsByCategory,
    getProductsSearch,
    getProductsByDate,
    getRandomProducts,
    getGeneralPanelInfo
} = require('./controller');

const router = express.Router();

router.route('/')
    /**
     * @route POST /
     * Endpoint para agregar un nuevo producto.
     * Endpoint to add a new product.
     * 
     * @param {Object} req.body - El cuerpo de la solicitud, que contiene la información del producto. | The request body, which contains the product information.
     * @returns {Object} 200 - El producto agregado. | The added product.
     * @returns {Error} 500 - Error al intentar agregar el producto. | Error when trying to add the product.
     */
    .post(async (req, res) => {
        try {
            
            const product = await addProduct(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al agregar el producto' });
        }
    })
    /**
     * @route GET /
     * Endpoint para obtener productos.
     * Endpoint to get products.
     * 
     * @param {number} req.query.page - La página de productos a obtener. | The page of products to get.
     * @param {number} req.query.limit - El límite de productos por página. | The limit of products per page.
     * @returns {Array} 200 - Los productos obtenidos. | The obtained products.
     * @returns {Error} 500 - Error al intentar obtener los productos. | Error when trying to get the products.
     */
    .get(async (req, res) => {
        try {
            const data = await getProducts(req.query.page, req.query.limit, req.query.status);
            res.status(200).json(data);
        } catch (error) {
            res.status(500);
        }
    });

router.route('/:productId')
    /**
     * @route GET /:productId
     * Endpoint para obtener un producto por su ID.
     * Endpoint to get a product by its ID.
     * 
     * @param {string} req.params.productId - El ID del producto a obtener. | The ID of the product to get.
     * @returns {Object} 200 - El producto obtenido. | The obtained product.
     * @returns {Object} 404 - Producto no encontrado. | Product not found.
     * @returns {Error} 500 - Error al obtener el producto. | Error when getting the product.
     */
    .get(async (req, res) => {
        try {
            const product = await getProductById(req.params.productId, req.query.status);
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el producto' });
        }
    })
    /**
     * @route PUT /:productId
     * Endpoint para modificar un producto por su ID.
     * Endpoint to modify a product by its ID.
     * 
     * @param {string} req.params.productId - El ID del producto a modificar. | The ID of the product to modify.
     * @param {Object} req.body - El cuerpo de la solicitud, que contiene la información del producto a modificar. | The request body, which contains the information of the product to modify.
     * @returns {Object} 200 - Producto modificado exitosamente. | Product successfully modified.
     * @returns {Object} 404 - Producto no encontrado. | Product not found.
     * @returns {Error} 500 - Error al modificar el producto. | Error when modifying the product.
     */
    .put(async (req, res) => {
        try {
            const product = req.body;
            const productId = req.params.productId;
            const response = await updateProductById(productId, product);
            if (!response) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.status(200).json({ message: 'Producto modificado exitosamente' });
        } catch (error) {
            res.status(500).json({ message: 'Error al modificar el producto' });
        }
    })
    /**
     * @route DELETE /:productId
     * Endpoint para eliminar un producto por su ID.
     * Endpoint to delete a product by its ID.
     * 
     * @param {string} req.params.productId - El ID del producto a eliminar. | The ID of the product to delete.
     * @returns {Object} 200 - Producto eliminado exitosamente. | Product successfully deleted.
     * @returns {Object} 404 - Producto no encontrado. | Product not found.
     * @returns {Error} 500 - Error al eliminar el producto. | Error when deleting the product.
     */
    .delete(async (req, res) => {
        try {
            const deletedProduct = await deleteProductById(req.params.productId);
            if(deletedProduct === 3)
                return res.status(409).json({ message: 'Error al eliminar el producto, existen pedidos con este producto, no se puede eliminar, solo desactivar' });

            if(deletedProduct === 4)
                return res.status(404).json({ message: 'Producto no encontrado' });

            if(deletedProduct === 1)
                return res.status(200).json({ message: 'Producto desactivado exitosamente' });

            if(deletedProduct === 0)
                return res.status(500).json({ message: 'Error al eliminar el producto' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el producto' });
        }
    });

router.route('/search')
    /**
     * @route POST /search
     * Endpoint para buscar productos.
     * Endpoint to search for products.
     * 
     * @param {Object} req.body - El cuerpo de la solicitud, que contiene la consulta de búsqueda, el límite de productos por página y la página a obtener. | The request body, which contains the search query, the limit of products per page, and the page to get.
     * @param {string} req.body.query - La consulta de búsqueda. | The search query.
     * @param {number} req.body.query - El límite de productos por página. | The limit of products per page.
     * @param {number} req.body.query - La página de productos a obtener. | The page of products to get.
     * @returns {Object} 200 - Los productos encontrados. | The found products.
     * @returns {Object} 404 - Productos no encontrados. | Products not found.
     * @returns {Error} 500 - Error al buscar los productos. | Error when searching for the products.
     */
    .post(async (req, res) => {
        try {
            let {query} = req.body;
            let {limit, status, page} = req.query
            limit = parseInt(limit);
             
            const products = await getProductsSearch(query, limit, page, status);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json({products});
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    });

router.route('/category/:id')
    /**
     * @route POST /category/:id
     * Endpoint para obtener productos por categoría.
     * Endpoint to get products by category.
     * 
     * @param {string} req.params.id - El ID de la categoría de los productos a obtener. | The ID of the category of the products to get.
     * @param {number} req.query.page - La página de productos a obtener. | The page of products to get.
     * @param {number} req.query.limit - El límite de productos por página. | The limit of products per page.
     * @returns {Object} 200 - Los productos obtenidos. | The obtained products.
     * @returns {Object} 404 - Productos no encontrados. | Products not found.
     * @returns {Error} 500 - Error al obtener los productos. | Error when getting the products.
     */
    .post(async (req, res) => {
        try {
            const products = await getProductsByCategory(req.query.page, req.query.limit, req.params.id, req.query.status);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json({products});
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    });

router.route('/img/count/:id')
    /**
     * @route GET /img/count/:id
     * Endpoint para obtener el conteo de imágenes para un producto específico.
     * Endpoint to get the image count for a specific product.
     * 
     * @param {string} req.params.id - El ID del producto para el cual obtener el conteo de imágenes. | The ID of the product for which to get the image count.
     * @returns {Object} 200 - El conteo de imágenes para el producto. | The image count for the product.
     * @returns {Error} 500 - Error al obtener el conteo de imágenes. | Error when getting the image count.
     */
    .get(async (req, res) => {
        try {
            const count = await getImageCount(req.params.id);
            res.status(200).json(count);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el conteo de imágenes' });
        }
    });

router.route('/date')
    /**
     * @route POST /date
     * Endpoint para obtener productos por fecha.
     * Endpoint to get products by date.
     * 
     * @param {number} req.query.page - La página de productos a obtener. | The page of products to get.
     * @param {number} req.query.limit - El límite de productos por página. | The limit of products per page.
     * @param {string} req.query.startDate - La fecha de inicio del rango de fechas. | The start date of the date range.
     * @param {string} req.query.endDate - La fecha de fin del rango de fechas. | The end date of the date range.
     * @param {string} req.query.order - El orden de los productos (ascendente o descendente). | The order of the products (ascending or descending).
     * @returns {Object} 200 - Los productos obtenidos. | The obtained products.
     * @returns {Object} 404 - Productos no encontrados. | Products not found.
     * @returns {Error} 500 - Error al obtener los productos. | Error when getting the products.
     */
    .post(async (req, res) => {
        try {
            const products = await getProductsByDate(req.query.page, req.query.limit, req.query.startDate, req.query.endDate, req.query.order, req.query.status);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    });


router.route('/random')
    /**
     * @route POST /random
     * Endpoint para obtener productos aleatorios.
     * Endpoint to get random products.
     * 
     * @param {number} req.query.limit - El número de productos aleatorios a obtener. | The number of random products to get.
     * @returns {Object} 200 - Los productos aleatorios obtenidos. | The obtained random products.
     * @returns {Object} 404 - Productos no encontrados. | Products not found.
     * @returns {Error} 500 - Error al obtener los productos. | Error when getting the products.
     */
    .post(async (req, res) => {
        try {
            const products = await getRandomProducts(parseInt(req.query.limit), req.query.status);
            if (!products) {
                return res.status(404).json({ message: 'Productos no encontrados' });
            }
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los productos' });
        }
    });

router.route('/generalPanelInfo')
    .post(async (req, res) => {
        try {
            const generalPanelInfo = await getGeneralPanelInfo();
            res.status(200).json(generalPanelInfo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener la información general del panel' });
        }
    });

module.exports = router;