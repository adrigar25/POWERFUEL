const { Brand } = require('../../model');
const errorDisplay = "(Error en el modelo de Brands)";

class model {
    /**
     * Función para insertar una nueva marca en la base de datos.
     * Function to insert a new brand into the database.
     * 
     * @param {Object} brand - El objeto de la marca que se quiere insertar. Debe contener una propiedad 'brand_name'. | The brand object to be inserted. It should contain a 'brand_name' property.
     * @returns {Object} - Un objeto con el ID de la marca insertada. | An object with the ID of the inserted brand.
     * @throws {Error} - Lanza un error si hay un problema al insertar la marca en la base de datos. | Throws an error if there is a problem inserting the brand into the database.
     */
    async insertBrand(brand) {
        try {
            return await Brand.create({
                brand_name: brand.brand_name
            });
        } catch (error) {
            console.log(`Error al intentar insertar la marca ${errorDisplay}`, error);
        }
    }

    /**
     * Función para actualizar una marca en la base de datos.
     * Function to update a brand in the database.
     * 
     * @param {number} brandId - El ID de la marca que se quiere actualizar. | The ID of the brand to be updated.
     * @param {Object} brand - El objeto de la marca con los datos actualizados. Debe contener una propiedad 'brand_name'. | The brand object with the updated data. It should contain a 'brand_name' property.
     * @throws {Error} - Lanza un error si hay un problema al actualizar la marca en la base de datos. | Throws an error if there is a problem updating the brand in the database.
     */
    async updateBrand(brandId, brand) {
        try {
            await Brand.update({
                brand_name: brand.brand_name
            }, {
                where: {
                    id_brand: brandId
                }
            });
        } catch (error) {
            console.log(`Error al intentar actualizar la marca ${errorDisplay}`, error);
        }
    }

    /**
     * Función para obtener marcas de la base de datos.
     * Function to get brands from the database.
     * 
     * @param {number} skip - Número de marcas a saltar para la paginación. Si no se proporciona, no se salta ninguna marca. | Number of brands to skip for pagination. If not provided, no brands are skipped.
     * @param {number} limit - Número máximo de marcas a devolver. Si no se proporciona, se devuelven todas las marcas. | Maximum number of brands to return. If not provided, all brands are returned.
     * @param {number} brandId - El ID de la marca que se quiere obtener. Si se proporciona, solo se devuelve esa marca. Si no se proporciona, se devuelven todas las marcas. | The ID of the brand to be obtained. If provided, only that brand is returned. If not provided, all brands are returned.
     * @returns {Array} - Un array de marcas. | An array of brands.
     * @throws {Error} - Lanza un error si hay un problema al obtener las marcas de la base de datos. | Throws an error if there is a problem getting the brands from the database.
     */
    async getBrands(skip, limit, brandId) {
        try {
            const query = {
                where: brandId ? {id_brand: brandId} : {},
            };

            if (typeof skip !== 'undefined') {
                query.offset = skip;
            }

            if (typeof limit !== 'undefined') {
                query.limit = limit;
            }

            return await Brand.findAll(query);
        } catch (error) {
            console.log(`Error al intentar obtener las marcas ${errorDisplay}`, error);
        }
    }

    /**
     * Función para eliminar una marca de la base de datos.
     * Function to delete a brand from the database.
     * 
     * @param {number} brandId - El ID de la marca que se quiere eliminar. | The ID of the brand to be deleted.
     * @throws {Error} - Lanza un error si hay un problema al eliminar la marca de la base de datos. | Throws an error if there is a problem deleting the brand from the database.
     */
    async deleteBrand(brandId) {
        try {
            await Brand.destroy({
                where: {
                    id_brand: brandId
                }
            });
        } catch (error) {
            console.log(`Error al intentar eliminar la marca ${errorDisplay}`, error);
        }
    }
    
    /**
     * Función para obtener el conteo total de marcas en la base de datos.
     * Function to get the total count of brands in the database.
     * 
     * @returns {number} - El número total de marcas en la base de datos. | The total number of brands in the database.
     * @throws {Error} - Lanza un error si hay un problema al obtener el conteo de marcas de la base de datos. | Throws an error if there is a problem getting the count of brands from the database.
     */
    async getBrandsCount() {
        try {
            return await Brand.count();
        } catch (error) {
            console.log(`Error al intentar obtener el conteo de marcas ${errorDisplay}`, error);
        }
    }
}

module.exports = new model();