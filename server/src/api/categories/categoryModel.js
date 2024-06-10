const { Category } = require('../../model');
const errorDisplay = "(Error en el modelo de Categories)";

class model {
    /**
     * Función para añadir una nueva categoría.
     * Function to add a new category.
     * 
     * @param {Object} category - El objeto con los datos de la nueva categoría. | The object with the new category data.
     * @returns {number} - El ID de la nueva categoría añadida. | The ID of the added new category.
     * @throws {Error} - Error al añadir la categoría. | Error when adding the category.
     */
    addCategory = async (category) => {
        try {
            const newCategory = await Category.create({
                category_name: category.category_name,
                parent_category_id: category.parent_category_id
            });
            return newCategory.category_id;
        } catch (error) {
            console.log(`Error al añadir la categoría ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para actualizar una categoría existente.
     * Function to update an existing category.
     * 
     * @param {number} categoryId - El ID de la categoría que se quiere actualizar. | The ID of the category to be updated.
     * @param {Object} category - El objeto con los datos actualizados de la categoría. | The object with the updated category data.
     * @throws {Error} - Error al actualizar la categoría. | Error when updating the category.
     */
    updateCategory = async (categoryId, category) => {
        try {
            await Category.update({
                category_name: category.category_name,
                parent_category_id: category.parent_category_id
            }, {
                where: {
                    category_id: categoryId
                }
            });
        } catch (error) {
            console.log(`Error al actualizar la categoría ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener categorías con paginación y filtrado por ID.
     * Function to get categories with pagination and filtering by ID.
     * 
     * @param {number} skip - El número de categorías a saltar para la paginación. | The number of categories to skip for pagination.
     * @param {number} limit - El número de categorías a obtener por página. | The number of categories to get per page.
     * @param {number} categoryId - El ID de la categoría a filtrar. | The ID of the category to filter.
     * @returns {Array} - Un array de categorías. | An array of categories.
     * @throws {Error} - Error al obtener las categorías. | Error when getting the categories.
     */
    getCategories = async (skip = null, limit = null, categoryId) => {
        try {
            if (categoryId === null) {
                return null;
            }
            
            const query = {
                where: categoryId ? {category_id: categoryId} : {},
            };

            if (skip !== null) {
                query.offset = skip;
            }

            if (limit !== null) {
                query.limit = limit;
            }

            return await Category.findAll(query);
        } catch (error) {
            console.log(`Error al obtener las categorías ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener todas las categorías principales.
     * Function to get all the main categories.
     * 
     * @returns {Array} - Un array de categorías principales. | An array of main categories.
     * @throws {Error} - Error al obtener las categorías principales. | Error when getting the main categories.
     */
    getParentCategories = async () => {
        try {
            const categories = await Category.findAll({
                where: {
                    parent_category_id: null
                }
            });
            return categories;
        } catch (error) {
            console.log(`Error al obtener las categorías principales ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener todas las categorías hijas de una categoría principal.
     * Function to get all child categories of a main category.
     * 
     * @param {number} parentCategoryId - El ID de la categoría principal. | The ID of the main category.
     * @returns {Array} - Un array de categorías hijas. | An array of child categories.
     * @throws {Error} - Error al obtener las categorías hijas. | Error when getting the child categories.
     */
    getChildCategories = async (parentCategoryId) => {
        try {
            const categories = await Category.findAll({
                where: {
                    parent_category_id: parentCategoryId
                }
            });
            return categories;
        } catch (error) {
            console.log(`Error al obtener las categorías hijas ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para eliminar una categoría existente.
     * Function to delete an existing category.
     * 
     * @param {number} categoryId - El ID de la categoría que se quiere eliminar. | The ID of the category to be deleted.
     * @throws {Error} - Error al eliminar la categoría. | Error when deleting the category.
     */
    deleteCategory = async (categoryId) => {
        try {
            await Category.destroy({
                where: {
                    category_id: categoryId
                }
            });
        } catch (error) {
            console.error(error);
            console.log(`Error al eliminar la categoría ${errorDisplay}`, error);
        }
    };
    
    /**
     * Función para obtener el conteo total de categorías.
     * Function to get the total count of categories.
     * 
     * @returns {number} - El conteo total de categorías. | The total count of categories.
     * @throws {Error} - Error al obtener el conteo de categorías. | Error when getting the count of categories.
     */
    getCategoriesCount = async () => {
        try {
            return await Category.count();
        } catch (error) {
            console.log(`Error al obtener el conteo de categorías ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener todas las categorías, incluyendo las categorías hijas.
     * Function to get all categories, including child categories.
     * 
     * @returns {Array} - Un array de categorías, cada una con un array de sus categorías hijas. | An array of categories, each with an array of its child categories.
     * @throws {Error} - Error al obtener todas las categorías. | Error when getting all categories.
     */
    getAllCategories = async () => {
        try {
            const categories = await Category.findAll({
                include: [{
                    model: Category,
                    as: 'children',
                    hierarchy: true
                }]
            });
            return categories;
        } catch (error) {
            console.log(`Error al obtener todas las categorías ${errorDisplay}`, error);
        }
    };
}


module.exports = new model();