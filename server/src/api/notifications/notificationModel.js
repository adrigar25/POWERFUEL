const { Notification } = require('../../model');
const errorDisplay = "(Error en el modelo de Notifications)";

class notificationModel {
    /**
     * Método para insertar una nueva notificación en la base de datos.
     * Method to insert a new notification into the database.
     * 
     * @param {Object} notificationData - Los datos de la notificación que se quiere insertar. | The data of the notification to be inserted.
     * @returns {Object} - La notificación insertada. | The inserted notification.
     * @throws {Error} - Error al intentar insertar la notificación. | Error when trying to insert the notification.
     */
    async insertNotification(notificationData) {
        try {
            const notification = await Notification.create(notificationData);
            return notification;
        } catch (error) {
            console.log(`Error al insertar la notificación ${errorDisplay}`, error);
        }
    }

    /**
     * Método para obtener las notificaciones de un usuario de la base de datos.
     * Method to get a user's notifications from the database.
     * 
     * @param {string} userId - El ID del usuario del cual se quieren obtener las notificaciones. | The ID of the user from which the notifications are to be obtained.
     * @param {number} limit - El número máximo de notificaciones a devolver. | The maximum number of notifications to return.
     * @param {number} page - La página de notificaciones a devolver. | The page of notifications to return.
     * @returns {Array} - Un array de notificaciones. | An array of notifications.
     * @throws {Error} - Error al intentar obtener las notificaciones por usuario. | Error when trying to get the notifications by user.
     */
    async getNotificationsByUser(userId , limit, page) {
        try {
            const notifications = await Notification.findAll({
                where: {
                    notification_user: userId
                },
                limit,
                offset: (page - 1) * limit,
                order: [['notification_date', 'DESC']]
            });
            return notifications;
        } catch (error) {
            console.log(`Error al obtener las notificaciones del usuario ${errorDisplay}`, error);
        }
    }

    /**
     * Método para obtener todas las notificaciones de la base de datos.
     * Method to get all notifications from the database.
     * 
     * @returns {Array} - Un array de todas las notificaciones. | An array of all notifications.
     * @throws {Error} - Error al intentar obtener todas las notificaciones. | Error when trying to get all notifications.
     */
    async getAllNotifications() {
        try {
            const notifications = await Notification.findAll();
            return notifications;
        } catch (error) {
            console.log(`Error al obtener todas las notificaciones ${errorDisplay}`, error);
        }
    }

    /**
     * Método para marcar todas las notificaciones de un usuario como vistas en la base de datos.
     * Method to mark all notifications from a user as viewed in the database.
     * 
     * @param {string} userId - El ID del usuario del cual se quieren marcar las notificaciones como vistas. | The ID of the user from which the notifications are to be marked as viewed.
     * @returns {Array} - Un array con el número de filas afectadas y un array de las filas afectadas. | An array with the number of affected rows and an array of the affected rows.
     * @throws {Error} - Error al intentar marcar las notificaciones como vistas. | Error when trying to mark the notifications as viewed.
     */
    async markAsViewedUser(userId) {
        try {
            const result = await Notification.update({ viewed: true }, {
                where: {
                    notification_user: userId
                }
            });
            return result;
        } catch (error) {
            console.log(`Error al marcar las notificaciones como vistas ${errorDisplay}`, error);
        }
    }

    /**
     * Método para eliminar una notificación de la base de datos.
     * Method to delete a notification from the database.
     * 
     * @param {string} notificationId - El ID de la notificación que se quiere eliminar. | The ID of the notification to be deleted.
     * @returns {number} - El número de notificaciones eliminadas. | The number of deleted notifications.
     * @throws {Error} - Error al intentar eliminar la notificación. | Error when trying to delete the notification.
     */
    async deleteNotification(notificationId) {
        try {
            const result = await Notification.destroy({
                where: {
                    notification_id: notificationId
                }
            });
            return result;
        } catch (error) {
            console.log(`Error al eliminar la notificación ${errorDisplay}`, error);
        }
    }
}

module.exports = new notificationModel();