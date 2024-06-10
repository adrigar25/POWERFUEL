const express = require('express');
const {getAllNotifications, getNotificationsByUser, insertNotification ,markAsViewedUser, deleteNotification} = require('./controller');

const router = express.Router();

router.route('/user')
    /**
     * Endpoint para obtener las notificaciones de un usuario especificado por su ID.
     * Endpoint to get notifications of a user specified by its ID.
     * 
     * @route GET /user
     * @param {string} req.user.userId - El ID del usuario del cual se quieren obtener las notificaciones. | The ID of the user from which the notifications are to be obtained.
     * @param {number} req.query.limit - El número máximo de notificaciones a devolver. Por defecto es 10. | The maximum number of notifications to return. Default is 10.
     * @param {number} req.query.page - La página de notificaciones a devolver. Por defecto es 1. | The page of notifications to return. Default is 1.
     * @returns {Array} 200 - Un array de notificaciones. | An array of notifications.
     * @returns {Error} 500 - Error al obtener las notificaciones. | Error when getting the notifications.
     */
    .get(async (req, res) => {
        try {
            const { userId } = req.user;
            const { limit = 10, page = 1 } = req.query;
            const notifications = await getNotificationsByUser(userId, parseInt(limit), parseInt(page));
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al obtener las notificaciones' });
        }
    });

router.route('/:notificationId')
    /**
     * Endpoint para eliminar una notificación especificada por su ID.
     * Endpoint to delete a notification specified by its ID.
     * 
     * @route DELETE /:notificationId
     * @param {string} req.params.notificationId - El ID de la notificación que se quiere eliminar. | The ID of the notification to be deleted.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al eliminar la notificación. | Error when deleting the notification.
     */
    .delete(async (req, res) => {
        try {
            const { notificationId } = req.params;
            await deleteNotification(notificationId);
            res.json({ message: 'La notificación ha sido eliminada correctamente.' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar la notificación' });
        }
    });

router.route('/')
    /**
     * @route POST /
     * Endpoint para crear una nueva notificación.
     * Endpoint to create a new notification.
     * 
     * @param {Object} req.body - Los datos de la notificación que se quiere crear. | The data of the notification to be created.
     * @returns {Object} 200 - La notificación creada. | The created notification.
     * @returns {Error} 500 - Error al crear la notificación. | Error when creating the notification.
     */
    .post(async (req, res) => {
        try {
            const notificationData = req.body;
            const newNotification = await insertNotification(notificationData);
            res.json(newNotification);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al crear la notificación' });
        }
    })
    /**
     * @route GET /
     * Endpoint para obtener todas las notificaciones.
     * Endpoint to get all notifications.
     * 
     * @returns {Array} 200 - Un array de todas las notificaciones. | An array of all notifications.
     * @returns {Error} 500 - Error al obtener todas las notificaciones. | Error when getting all notifications.
     */
    .get(async (req, res) => {
        try {
            const notifications = await getAllNotifications();
            res.json(notifications);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al obtener las notificaciones' });
        }
    });

router.route('/viewed')
    /**
     * Endpoint para marcar todas las notificaciones de un usuario como vistas.
     * Endpoint to mark all notifications of a user as viewed.
     * 
     * @route PUT /viewed
     * @param {string} req.user.userId - El ID del usuario cuyas notificaciones se quieren marcar como vistas. | The ID of the user whose notifications are to be marked as viewed.
     * @returns {Object} 200 - Mensaje de éxito. | Success message.
     * @returns {Error} 500 - Error al marcar las notificaciones como vistas. | Error when marking the notifications as viewed.
     */
    .put(async (req, res) => {
        try {
            const userId = req.user.userId;
            await markAsViewedUser(userId);
            res.json({ message: 'Todas las notificaciones han sido marcadas como vistas.' });
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al marcar las notificaciones como vistas' });
        }
    });

module.exports = router;