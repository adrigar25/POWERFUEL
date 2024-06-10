const model = require('./brandModel');
const errorDisplay = "(Error en el controlador de Brands)";

/**
 * Función para obtener marcas de la base de datos con paginación.
 * Function to get brands from the database with pagination.
 * 
 * @param {number} page - La página de marcas que se quiere obtener. Si no se proporciona, se obtiene la primera página. | 
 *                        The page of brands to be obtained. If not provided, the first page is obtained.
 * @param {number} limit - El número máximo de marcas a devolver por página. Si no se proporciona, se devuelven 10 marcas por página. | 
 *                         The maximum number of brands to return per page. If not provided, 10 brands are returned per page.
 * @returns {Object} - Un objeto con el total de marcas, el total de páginas y un array de las marcas de la página solicitada. | 
 *                     An object with the total number of brands, the total number of pages, and an array of the brands on the requested page.
 * @throws {Error} - Lanza un error si hay un problema al obtener las marcas de la base de datos. | 
 *                   Throws an error if there is a problem getting the brands from the database.
 */
const getBrands = async (page = 1, limit = 10) => {
    try {
        const skip = page && limit ? (page - 1) * limit : null;
        let brands = await model.getBrands(skip, limit);
        const total = await model.getBrandsCount();

        return {
            total,
            pages: Math.ceil(total / limit),
            brands
        };
    } catch (error) {
        console.log(`Error al obtener las marcas ${errorDisplay}`);
    }
};

/**
 * Función para obtener una marca específica de la base de datos por su ID.
 * Function to get a specific brand from the database by its ID.
 * 
 * @param {number} brandId - El ID de la marca que se quiere obtener. | The ID of the brand to be obtained.
 * @returns {Object} - Un objeto de la marca. | A brand object.
 * @throws {Error} - Lanza un error si hay un problema al obtener la marca de la base de datos. | 
 *                   Throws an error if there is a problem getting the brand from the database.
 */
const getBrandById = async (brandId) => {
    try {
        return await model.getBrands(null, null , brandId);
    } catch (error) {
        console.log(`Error al obtener la marca por ID ${errorDisplay}`);
    }
};

/**
 * Función para añadir una nueva marca a la base de datos.
 * Function to add a new brand to the database.
 * 
 * @param {Object} newBrand - El objeto de la nueva marca que se quiere añadir. Debe contener una propiedad 'brand_name'. | 
 *                            The new brand object to be added. It should contain a 'brand_name' property.
 * @returns {Object} - El objeto de la marca que se ha añadido. | The brand object that has been added.
 * @throws {Error} - Lanza un error si hay un problema al añadir la marca a la base de datos. | 
 *                   Throws an error if there is a problem adding the brand to the database.
 */
const addBrand = async (newBrand) => {
    try {
        return await model.insertBrand(newBrand);
    } catch (error) {
        console.log(`Error al añadir la marca ${errorDisplay}`);
    }
};

/**
 * Función para actualizar una marca específica en la base de datos por su ID.
 * Function to update a specific brand in the database by its ID.
 * 
 * @param {number} brandId - El ID de la marca que se quiere actualizar. | The ID of the brand to be updated.
 * @param {Object} updatedBrand - El objeto de la marca actualizada. Debe contener una propiedad 'brand_name'. | The updated brand object. It should contain a 'brand_name' property.
 * @returns {Object} - El objeto de la marca que se ha actualizado. | The brand object that has been updated.
 * @throws {Error} - Lanza un error si hay un problema al actualizar la marca en la base de datos. | Throws an error if there is a problem updating the brand in the database.
 */
const updateBrandById = async (brandId, updatedBrand) => {
    try {
        return await model.updateBrand(brandId, updatedBrand);
    } catch (error) {
        console.log(`Error al actualizar la marca por ID ${errorDisplay}`);
    }
};

/**
 * Función para eliminar una marca específica de la base de datos por su ID.
 * Function to delete a specific brand from the database by its ID.
 * 
 * @param {number} brandId - El ID de la marca que se quiere eliminar. | The ID of the brand to be deleted.
 * @throws {Error} - Lanza un error si hay un problema al eliminar la marca de la base de datos. | Throws an error if there is a problem deleting the brand from the database.
 */
const deleteBrandById = async (brandId) => {
    try {
        await model.deleteBrand(brandId);
    } catch (error) {
        console.log(`Error al eliminar la marca por ID ${errorDisplay}`);
    }
};

module.exports = {
    getBrands,
    getBrandById,
    addBrand,
    updateBrandById,
    deleteBrandById
};