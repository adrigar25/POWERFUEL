// controller.js
const model = require('./productModel');
const path = require('path');
const appRoot = path.dirname(require.main.filename);
const { createProduct, deleteProduct, updateProduct} = require('../stripe/controller');
const { deleteProductImages, getImageCount, uploadProduct } = require('../files/controller');
const e = require('express');
const errorDisplay = "(Error en el controlador de Productos)";

/**
 * Función para añadir un producto.
 * Function to add a product.
 * 
 * @param {Object} productData - Los datos del producto a añadir. | The data of the product to add.
 * @property {string} productData.product_name - El nombre del producto. | The name of the product.
 * @property {string} productData.description - La descripción del producto. | The description of the product.
 * @property {number} productData.price - El precio del producto. | The price of the product.
 * 
 * @returns {Object} - El producto añadido. | The added product.
 * @throws {Error} - Error al intentar añadir el producto. | Error when trying to add the product.
 */
const addProduct = async (productData) => {
    try {
        console.log('productData', productData);
        const product = await createProduct(productData.product_name, productData.description, parseInt(productData.price));

        productData.stripe_product_id = product.stripe_product_id;
        productData.stripe_price_id = product.stripe_price_id;

        await model.insertProduct(productData);
        const productId = await model.getLastProductId();

        uploadProduct(productId, productData.images);

        return 
    } catch (error) {
        console.log(`Error al intentar añadir el producto ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar un producto por su ID.
 * Function to delete a product by its ID.
 * 
 * @param {string} productId - El ID del producto a eliminar. | The ID of the product to delete.
 * 
 * @returns {Object} - El producto eliminado. | The deleted product.
 * @throws {Error} - Error al intentar eliminar el producto. | Error when trying to delete the product.
 */
const deleteProductById = async (productId) => {
    try {
        const product = await model.getProducts(0, 1, productId);
        const deletedProduct = await model.deleteProduct(productId);
        deleteProductImages(productId);
        deleteProduct(product[0].stripe_product_id);
        return deletedProduct;
    } catch (error) {
        console.log(`Error al intentar eliminar el producto ${errorDisplay}`, error);
    }
};

/**
 * Función para modificar un producto por su ID.
 * Function to modify a product by its ID.
 * 
 * @param {string} productId - El ID del producto a modificar. | The ID of the product to modify.
 * @param {Object} productData - Los nuevos datos del producto. | The new data of the product.
 * 
 * @returns {Object} - El producto modificado. | The modified product.
 * @throws {Error} - Error al intentar modificar el producto. | Error when trying to modify the product.
 */
const updateProductById = async (productId, productData) => {
    try {
        if(productId) {
            
            const product = await model.getProducts(0, 1, productId);
            const newPrice = updateProduct(product[0].stripe_product_id, productData);
            productData.stripe_price_id = newPrice;
            const response = await model.updateProduct(productId, productData);
            
            return response;
        }
       
        return false;
    } catch (error) {
        console.log(`Error al intentar modificar el producto ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener un producto por su ID.
 * Function to get a product by its ID.
 * 
 * @param {string} productId - El ID del producto a obtener. | The ID of the product to get.
 * 
 * @returns {Object} - El producto obtenido. | The obtained product.
 * @throws {Error} - Error al intentar obtener el producto. | Error when trying to get the product.
 */
const getProductById = async (productId, status) => {
    try {
        const product = await model.getProducts(0, 1, productId, status);
        return product[0];
    } catch (error) {
        console.log(`Error al intentar obtener el producto ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los productos con paginación.
 * Function to get the products with pagination.
 * 
 * @param {number} page - La página a obtener. | The page to get.
 * @param {number} limit - El límite de productos por página. | The limit of products per page.
 * 
 * @returns {Object} - Los productos obtenidos y la información de la paginación. | The obtained products and the pagination information.
 * @property {number} total - El total de productos. | The total of products.
 * @property {number} pages - El total de páginas. | The total of pages.
 * @property {Array} products - Los productos de la página actual. | The products of the current page.
 * 
 * @throws {Error} - Error al intentar obtener los productos. | Error when trying to get the products.
 */
const getProducts = async (page, limit, status) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        let products = await model.getProducts(skip, limit, null, status);
        const total = await model.getProductsCount();

        return {
            total,
            pages: Math.ceil(total / limit),
            products
        };
    } catch (error) {
        console.log(`Error al intentar obtener los productos ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los productos basados en una búsqueda.
 * Function to get the products based on a search.
 * 
 * @param {string} query - La consulta de búsqueda. | The search query.
 * @param {number} limit - El límite de productos por página. | The limit of products per page.
 * @param {number} page - La página a obtener. | The page to get.
 * 
 * @returns {Array} - Los productos obtenidos. | The obtained products.
 * @throws {Error} - Error al intentar obtener los productos. | Error when trying to get the products.
 */
const getProductsSearch = async (query, limit, page, status) => {
    try {
        return await model.getProductsSearch(query, limit, page, status);
    } catch (error) {
        console.log(`Error al intentar obtener los productos ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener los productos de una categoría con paginación.
 * Function to get the products of a category with pagination.
 * 
 * @param {number} page - La página a obtener. | The page to get.
 * @param {number} limit - El límite de productos por página. | The limit of products per page.
 * @param {string} id - El ID de la categoría. | The ID of the category.
 * 
 * @returns {Array} - Los productos de la categoría obtenidos. | The obtained products of the category.
 * @throws {Error} - Error al intentar obtener los productos por categoría. | Error when trying to get the products by category.
 */
const getProductsByCategory = async (page, limit, id, status) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;
        return await model.getProductsByCategory(skip, limit, id, status);
    } catch (error) {
        console.log(`Error al intentar obtener los productos por categoría ${errorDisplay}`, error);
    }
};



/**
 * Función para obtener los productos por fecha con paginación.
 * Function to get the products by date with pagination.
 * 
 * @param {number} page - La página a obtener. | The page to get.
 * @param {number} limit - El límite de productos por página. | The limit of products per page.
 * @param {string} startDate - La fecha de inicio. | The start date.
 * @param {string} endDate - La fecha de fin. | The end date.
 * @param {string} order - El orden de los productos. | The order of the products.
 * 
 * @returns {Array} - Los productos obtenidos. | The obtained products.
 * @throws {Error} - Error al intentar obtener los productos por fecha. | Error when trying to get the products by date.
 */
const getProductsByDate = async (page, limit, startDate, endDate, order, status) => {
    try {
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 15;
        const skip = (page - 1) * limit;
        let products = await model.getProductsByDate(limit, skip, startDate, endDate, order, status);
        return products;
    } catch (error) {
        console.log(`Error al intentar obtener los productos por fecha ${errorDisplay}`, error);
    }
}

/**
 * Función para obtener productos aleatorios.
 * Function to get random products.
 * 
 * @param {number} limit - El límite de productos a obtener. | The limit of products to get.
 * 
 * @returns {Array} - Los productos aleatorios obtenidos. | The obtained random products.
 * @throws {Error} - Error al intentar obtener los productos aleatorios. | Error when trying to get the random products.
 */
const getRandomProducts = async (limit, status) => {
    try {
        return await model.getRandomProducts(limit, status);
    } catch (error) {
        console.log(`Error al intentar obtener los productos aleatorios ${errorDisplay}`, error);
    }
}

/**
 * Función para obtener la información general del panel.
 * Function to get the general panel information.
 * 
 * @returns {Object} - La información general del panel. | The general panel information.
 * @property {number} totalProducts - El total de productos. | The total of products.
 * @property {number} productDisabled - El total de productos deshabilitados. | The total of disabled products.
 * @property {number} productEnabled - El total de productos habilitados. | The total of enabled products.
 * @property {number} productOutStock - El total de productos sin stock. | The total of products out of stock.
 * 
 * @throws {Error} - Error al intentar obtener la información general del panel. | Error when trying to get the general panel information.
 */

const getGeneralPanelInfo = async () => {
    try {
        const totalProducts = await model.getProductsCount();
        const productDisabled = await model.getCountProductStatus("Disabled");
        const productEnabled = await model.getCountProductStatus("Enabled");
        const productOutStock = await model.getCountOutStock();

        return {
            totalProducts,
            productDisabled,
            productEnabled,
            productOutStock
        };
    } catch (error) {
        console.log(`Error al intentar obtener la información general del panel ${errorDisplay}`, error);
    }
}

const updateProductStock = async (productId, quantity) => {
    try {
        return await model.updateProductStock(productId, quantity);
    } catch (error) {
        console.log(`Error al intentar modificar el stock del producto ${errorDisplay}`, error);
    }
};

module.exports = {
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
    getGeneralPanelInfo,
    updateProductStock
};