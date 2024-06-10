const model = require('./categoryModel');
const errorDisplay = "(Error en el controlador de Categorias)";

/**
 * Función para manejar los errores internos del servidor.
 * Function to handle internal server errors.
 * 
 * @param {Object} error - El error que se va a manejar. | The error to be handled.
 * @returns {Object} - Un objeto con el estado y el mensaje de error. | An object with the status and error message.
 * @throws {Error} - Error al manejar el error interno del servidor. | Error when handling the internal server error.
 */
const handleInternalServerError = (error) => {
    try {
        return { status: 500, json: { message: `Error al manejar el error interno del servidor ${errorDisplay}` } };
    } catch (error) {
        console.log(`Error al manejar el error interno del servidor ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener una lista paginada de categorías, incluyendo el nombre de la categoría principal para cada una.
 * Function to get a paginated list of categories, including the name of the main category for each one.
 * 
 * @param {number} page - La página que se quiere obtener. | The page to be obtained.
 * @param {number} limit - El número de categorías por página. | The number of categories per page.
 * @returns {Object} - Un objeto que contiene el total de categorías, el número de páginas y un array de categorías. | An object containing the total number of categories, the number of pages and an array of categories.
 * @throws {Error} - Error al obtener las categorías. | Error when getting the categories.
 */
const getCategories = async (page, limit) => {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    try {
        let categories = await model.getCategories(skip, limit);
        const total = await model.getCategoriesCount();

        const categoriesWithParentNames = await Promise.all(
            categories.map(async category => {
                const parentCategory = await getCategoryById(category.parent_category_id);
                const categoryWithParentName = {
                    "category_id": category.category_id,
                    "category_name": category.category_name,
                    "parent_category_id": category.parent_category_id ?? null,
                    "parent_category_name": parentCategory.category_name ?? null
                };

                console.log(categoryWithParentName);
                return categoryWithParentName;
            })
        );

        return {
            total,
            pages: Math.ceil(total / limit),
            categories: categoriesWithParentNames
        };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para obtener una categoría por su ID.
 * Function to get a category by its ID.
 * 
 * @param {number} categoryId - El ID de la categoría que se quiere obtener. | The ID of the category to be obtained.
 * @returns {Object} - La categoría obtenida. | The obtained category.
 * @throws {Error} - Error al obtener la categoría. | Error when getting the category.
 */
const getCategoryById = async (categoryId) => {
    try {
        const category = await model.getCategories(null, null , categoryId);
        return category[0];
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para añadir una nueva categoría.
 * Function to add a new category.
 * 
 * @param {Object} newCategory - La nueva categoría que se quiere añadir. | The new category to be added.
 * @returns {Object} - La categoría añadida con su ID. | The added category with its ID.
 * @throws {Error} - Error al añadir la categoría. | Error when adding the category.
 */
const addCategory = async (newCategory) => {
    if(newCategory.parent_category_id === "" || newCategory.parent_category_id === undefined || newCategory.parent_category_id === "null" || newCategory.parent_category_id === "$.0")
        newCategory.parent_category_id = null;

    try {
        const categoryId = await model.addCategory(newCategory);
        return { category_id: categoryId, ...newCategory };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para actualizar una categoría por su ID.
 * Function to update a category by its ID.
 * 
 * @param {number} categoryId - El ID de la categoría que se quiere actualizar. | The ID of the category to be updated.
 * @param {Object} updatedCategory - La categoría actualizada. | The updated category.
 * @returns {Object} - La categoría actualizada con su ID. | The updated category with its ID.
 * @throws {Error} - Error al actualizar la categoría. | Error when updating the category.
 */
const updateCategoryById = async (categoryId, updatedCategory) => {
    try {
        await model.updateCategory(categoryId, updatedCategory);
        return { category_id: categoryId, ...updatedCategory };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para eliminar una categoría por su ID.
 * Function to delete a category by its ID.
 * 
 * @param {number} categoryId - El ID de la categoría que se quiere eliminar. | The ID of the category to be deleted.
 * @returns {Object} - Un objeto con el estado y el mensaje de éxito. | An object with the status and success message.
 * @throws {Error} - Error al eliminar la categoría. | Error when deleting the category.
 */
const deleteCategoryById = async (categoryId) => {
    try {
        await model.deleteCategory(categoryId);
        return { status: 200, json: { message: 'Category deleted successfully' } };
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para obtener todas las categorías principales.
 * Function to get all parent categories.
 * 
 * @returns {Array} - Un array de categorías principales. | An array of parent categories.
 * @throws {Error} - Error al obtener las categorías principales. | Error when getting the parent categories.
 */
const getParentCategories = async () => {
    try {
        const categories = await model.getParentCategories();
        return categories;
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para obtener todas las categorías hijas de una categoría específica.
 * Function to get all child categories of a specific category.
 * 
 * @param {number} categoryId - El ID de la categoría de la que se quieren obtener las categorías hijas. | The ID of the category from which to get the child categories.
 * @returns {Object} - Un objeto que contiene un array de categorías hijas. | An object containing an array of child categories.
 * @throws {Error} - Error al obtener las categorías hijas. | Error when getting the child categories.
 */
const getChildCategories = async (categoryId) => {
    try {
        const categories = await model.getChildCategories(categoryId);
        return {categories};
    } catch (error) {
        return handleInternalServerError(error);
    }
};

/**
 * Función para obtener todas las categorías.
 * Function to get all categories.
 * 
 * @returns {Array} - Un array de todas las categorías. | An array of all categories.
 * @throws {Error} - Error al obtener todas las categorías. | Error when getting all categories.
 */
const getAllCategories = async () => {
    try {
        const categories = await model.getAllCategories();
        return categories;
    } catch (error) {
        return handleInternalServerError(error);
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    addCategory,
    updateCategoryById,
    deleteCategoryById,
    getParentCategories,
    getChildCategories,
    getAllCategories
};