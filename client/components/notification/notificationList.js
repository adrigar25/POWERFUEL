import React, { useState, useEffect } from 'react';
import NotificationItem from '@components/notification/notificationItem';
import NotificationService from '@services/notificationService';

const NotificationList = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, [loading]);

    const fetchNotifications = async () => {
        try {
            const notifications = await NotificationService.getNotificationsByUser();
            setNotifications(notifications);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }

    const deleteNotification = async (notificationId) => {
        try {
            NotificationService.deleteNotificationById(notificationId);
            setLoading(true);
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    }

    return (
        <section className="py-5 flex flex-col gap-4">
            <section>
                <h1 className="font-bold text-3xl">Listado de notificaciones</h1>
            </section>
            <section className='w-full h-full flex flex-col gap-4'>
                {notifications.map((notification) => (
                    <NotificationItem 
                        key={notification.notification_id} 
                        notification={notification} 
                        deleteNotification={deleteNotification}
                    />
                ))}
                {notifications.length <= 0 && (
                    <p>No tienes notificaciones</p>
                )}
            </section>
        </section>
    );
};

export default NotificationList;