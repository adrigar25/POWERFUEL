const express = require('express');
const { uploadProduct, deleteProductImages, uploadUser } = require('./controller');

const router = express.Router();

router.route('/uploadProduct/:id')
    /**
     * Endpoint para subir imágenes de un producto especificado por su ID.
     * Endpoint to upload images of a product specified by its ID.
     * 
     * @route POST /uploadProduct/:id
     * @param {string} req.params.id - El ID del producto al que se quieren subir las imágenes. | The ID of the product to which the images are to be uploaded.
     * @param {Object} req.files.images - Las imágenes que se quieren subir. | The images to be uploaded.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al subir las imágenes del producto. | Error when uploading the product images.
     */
    .post(async (req, res) => {
        try {
            const { id } = req.params;
            const { images } = req.files;
            await uploadProduct(id, images);
            res.status(200).send({message: 'Imágenes subidas correctamente'});
        } catch (error) {
            res.status(500).send({message: 'Error al subir las imágenes del producto'});
        }
    });

router.route('/deleteProduct/:id/:image')
    /**
     * Endpoint para eliminar una imagen de un producto especificado por su ID.
     * Endpoint to delete an image of a product specified by its ID.
     * 
     * @route POST /deleteProduct/:id/:image
     * @param {string} req.params.id - El ID del producto del cual se quiere eliminar la imagen. | The ID of the product from which the image is to be deleted.
     * @param {string} req.params.image - El nombre de la imagen que se quiere eliminar. | The name of the image to be deleted.
     */
    .post(async (req, res) => {
        try{
            const { id } = req.params;
            const { image } = req.params;
            await deleteProductImages(id, image)

            res.status(200).send({message: 'Imagen eliminada correctamente'});
        } catch (error) {
            res.status(500).send({message: 'Error al eliminar la imagen del producto'});
        }

    });

router.route('/uploadUser')
    /**
     * Endpoint para subir imágenes de un usuario especificado por su ID.
     * Endpoint to upload images of a user specified by its ID.
     * 
     * @route POST /uploadUser
     * @param {string} req.user.userId - El ID del usuario al que se quieren subir las imágenes. | The ID of the user to which the images are to be uploaded.
     * @param {Object} req.body.images - Las imágenes que se quieren subir. | The images to be uploaded.
     */
    .post(async (req, res) => {
        try {
            const userId = req.user.userId;
            const image = req.files.image; 
            const response = await uploadUser(userId, image);
            res.status(200).send({data: response, message: 'Imágenes subidas correctamente'});
        } catch (error) {
            console.log(error);
            res.status(500).send({message: 'Error al subir las imágenes del producto'});
        }
    });

module.exports = router; 