const model = require('./notificationModel');
const errorDisplay = "(Error en el controlador de Notifications)";

/**
 * Función para insertar una nueva notificación en la base de datos.
 * Function to insert a new notification into the database.
 * 
 * @param {Object} notificationData - Los datos de la notificación que se quiere insertar. | The data of the notification to be inserted.
 * @returns {Object} - La notificación insertada. | The inserted notification.
 * @throws {Error} - Error al intentar insertar la notificación. | Error when trying to insert the notification.
 */
const insertNotification = async (notificationData) => {
    try {
        return await model.insertNotification(notificationData);
    } catch (error) {
        console.log(`Error al intentar insertar la notificación ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener las notificaciones de un usuario de la base de datos.
 * Function to get a user's notifications from the database.
 * 
 * @param {string} userId - El ID del usuario del cual se quieren obtener las notificaciones. | The ID of the user from which the notifications are to be obtained.
 * @param {number} limit - El número máximo de notificaciones a devolver. | The maximum number of notifications to return.
 * @param {number} page - La página de notificaciones a devolver. | The page of notifications to return.
 * @returns {Array} - Un array de notificaciones. | An array of notifications.
 * @throws {Error} - Error al intentar obtener las notificaciones por usuario. | Error when trying to get the notifications by user.
 */
const getNotificationsByUser = async (userId, limit, page) => {
    try {
        return await model.getNotificationsByUser(userId , limit, page);
    } catch (error) {
        console.log(`Error al intentar obtener las notificaciones por usuario ${errorDisplay}`, error);
    }
};

/**
 * Función para obtener todas las notificaciones de la base de datos.
 * Function to get all notifications from the database.
 * 
 * @returns {Array} - Un array de todas las notificaciones. | An array of all notifications.
 * @throws {Error} - Error al intentar obtener todas las notificaciones. | Error when trying to get all notifications.
 */
const getAllNotifications = async () => {
    try {
        return await model.getAllNotifications();
    } catch (error) {
        console.log(`Error al intentar obtener todas las notificaciones ${errorDisplay}`, error);
    }
};

/**
 * Función para marcar todas las notificaciones de un usuario como vistas en la base de datos.
 * Function to mark all notifications of a user as viewed in the database.
 * 
 * @param {string} userId - El ID del usuario cuyas notificaciones se quieren marcar como vistas. | The ID of the user whose notifications are to be marked as viewed.
 * @returns {Object} - Resultado de la operación. | Result of the operation.
 * @throws {Error} - Error al intentar marcar al usuario como visto. | Error when trying to mark the user as viewed.
 */
const markAsViewedUser = async (userId) => {
    try {
        return await model.markAsViewedUser(userId);
    } catch (error) {
        console.log(`Error al intentar marcar al usuario como visto ${errorDisplay}`, error);
    }
};

/**
 * Función para eliminar una notificación de la base de datos.
 * Function to delete a notification from the database.
 * 
 * @param {string} notificationId - El ID de la notificación que se quiere eliminar. | The ID of the notification to be deleted.
 * @returns {Object} - Resultado de la operación. | Result of the operation.
 * @throws {Error} - Error al intentar eliminar la notificación. | Error when trying to delete the notification.
 */
const deleteNotification = async (notificationId) => {
    try {
        return await model.deleteNotification(notificationId);
    } catch (error) {
        console.log(`Error al intentar eliminar la notificación ${errorDisplay}`, error);
    }
};

module.exports = {
    insertNotification,
    getNotificationsByUser,
    getAllNotifications,
    markAsViewedUser,
    deleteNotification
}