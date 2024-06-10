const fs = require('fs');
const path = require('path');
const errorDisplay = "(Error en el controlador de Archivos)";
const appRoot = path.dirname(require.main.filename);

/**
 * Función para subir un producto.
 * Function to upload a product.
 * 
 * @param {string} productId - El ID del producto que se va a subir. | The ID of the product to be uploaded.
 * @param {Array|Object} files - Un array de archivos o un solo archivo que se va a subir. | An array of files or a single file to be uploaded.
 * @throws {Error} Si hay un error al intentar crear el directorio o leer los archivos existentes. | If there is an error trying to create the directory or read the existing files.
 * @throws {Error} Si hay un error al intentar mover las imágenes del producto. | If there is an error trying to move the product images.
 */
const uploadProduct = (productId, files) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);

    let fileIndex = 1;

    try {
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath, { recursive: true });
        } else {
            const existingFiles = fs.readdirSync(newPath);
            fileIndex = existingFiles.length + 1;

            const totalFilesAfterUpload = existingFiles.length + (Array.isArray(files) ? files.length : 1);
            if (totalFilesAfterUpload > 5) {
                console.log(`El número máximo de imágenes permitidas es 5. Actualmente hay ${existingFiles.length} imágenes y estás intentando subir ${totalFilesAfterUpload - existingFiles.length}.`);
            }
        }
    } catch (error) {
        console.error(error);
        console.log(`Error al intentar crear el directorio o leer los archivos existentes ${errorDisplay}`, error);
    }

    if(Array.isArray(files)) {
        files.slice(0, 5).forEach((file, index) => {
            const filename = `${fileIndex + index}.png`;
            try{
                if (file.mv) {
                    file.mv(path.join(newPath, filename));
                } else {
                    console.log('El archivo no tiene un método mv');
                }
            }catch(error) {
                console.log(`Error al intentar mover las imagenes del producto ${errorDisplay}`, error);
            }
        });
    } else {
        const filename = `${fileIndex}.png`;
        try{
            if (files.mv) {
                files.mv(path.join(newPath, filename));
            } else {
                console.log('El archivo no tiene un método mv');
            }
        }catch(error) {
            console.log(`Error al intentar mover la imagen del producto ${errorDisplay}`, error);
        }
    }
};

/**
 * Función para eliminar las imágenes de un producto.
 * Function to delete a product's images.
 * 
 * @param {string} productId - El ID del producto cuyas imágenes se van a eliminar. | The ID of the product whose images are to be deleted.
 * @param {string|null} imageId - El ID de la imagen específica a eliminar. Si es null, se eliminarán todas las imágenes. | The ID of the specific image to delete. If null, all images will be deleted.
 * @throws {Error} Si hay un error al intentar eliminar las imágenes del producto. | If there is an error trying to delete the product images.
 */
const deleteProductImages = (productId, imageId=null) => {
    const newPath = path.join(appRoot, '/../public/images/product/', productId);
    const tempPath = path.join(appRoot, '/../public/images/temp/', productId);

    try {
        if (fs.existsSync(newPath)) {
            if (imageId === null) {
                fs.rmSync(newPath, { recursive: true });
            } else {
                let files = fs.readdirSync(newPath);
                const image = files.find(file => file.includes(imageId));

                if (image) {
                    fs.unlinkSync(path.join(newPath, image));
                    files = fs.readdirSync(newPath);
                    
                    files.sort((a, b) => {
                        const numA = parseInt(a.split('.')[0]);
                        const numB = parseInt(b.split('.')[0]);
                        return numA - numB;
                    });
                    
                    if (!fs.existsSync(tempPath)) {
                        fs.mkdirSync(tempPath, { recursive: true });
                    }
                    for (let i = 0; i < files.length; i++) {
                        const oldPath = path.join(newPath, files[i]);
                        const newFileName = `${i + 1}.png`;
                        const newPathTemp = path.join(tempPath, newFileName);
                        fs.renameSync(oldPath, newPathTemp);
                    }

                    files = fs.readdirSync(tempPath);
                    for (let i = 0; i < files.length; i++) {
                        const oldPath = path.join(tempPath, files[i]);
                        const newFileName = `${i + 1}.png`;
                        const newPathFinal = path.join(newPath, newFileName);
                        fs.renameSync(oldPath, newPathFinal);
                    }

                    fs.rmdirSync(tempPath, { recursive: true });
                }
            }
        }
    } catch (error) {
        console.log(`Error al intentar eliminar las imágenes del producto ${errorDisplay}`, error);
    }
};

/**
 * Función para subir un usuario.
 * Function to upload a user.
 * 
 * @param {string} userId - El ID del usuario que se va a subir. | The ID of the user to be uploaded.
 * @param {Array|Object} files - Un array de archivos o un solo archivo que se va a subir. | An array of files or a single file to be uploaded.
 * @throws {Error} Si hay un error al intentar crear el directorio o leer los archivos existentes. | If there is an error trying to create the directory or read the existing files.
 * @throws {Error} Si hay un error al intentar mover las imágenes del usuario. | If there is an error trying to move the user images.
 */
const uploadUser = (userId, files) => {
    const newPath = path.join(appRoot, `/../public/images/user/${userId}`);

    try{
        // Crear el directorio si no existe
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath, { recursive: true });
        }

        // Si 'files' es un array, subir todos los archivos. Si no, subir el único archivo.
        if (Array.isArray(files)) {
            files.forEach((file, index) => {
                if (file && file.data && file.name) {
                    const newFilePath = path.join(newPath, `${index}_${file.name}`);
                    fs.writeFileSync(newFilePath, file.data);
                } else {
                    console.error('Archivo inválido:', file);
                }
            });
        } else {
            if (files && files.data && files.name) {
                const newFilePath = path.join(newPath,'1.png');
                fs.writeFileSync(newFilePath, files.data);
            } else {
                console.error('Archivo inválido:', files);
            }
        }
    }catch(error) {
        console.log(error)
        console.log(`Error al intentar mover las imágenes del usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener el conteo de imágenes de un producto.
 * Function to get the image count of a product.
 * 
 * @param {string} id - El ID del producto. | The ID of the product.
 * 
 * @returns {Object} - El conteo de imágenes. | The image count.
 * @property {number} count - El número de imágenes. | The number of images.
 * 
 * @throws {Error} - Error al intentar obtener el conteo de imágenes. | Error when trying to get the image count.
 */
const getImageCount = async (id) => {
    try {
        const directoryPath = path.join(appRoot, `/../public/images/product/${id}`);
        if (!fs.existsSync(directoryPath)) {
            return { count: 0 };
        }
        const files = fs.readdirSync(directoryPath);
        return { count: files.length };
    } catch (error) {
        console.log(error);
        console.log(`Error al intentar obtener el conteo de imágenes ${errorDisplay}`, error);
    }
};

module.exports = {
    uploadProduct,
    uploadUser,
    deleteProductImages,
    getImageCount
};
