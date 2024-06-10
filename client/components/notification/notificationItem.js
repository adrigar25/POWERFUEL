import React from 'react';
import { Card, CardBody, Chip, Button } from '@nextui-org/react';
import NotificationService from '@services/notificationService';

const NotificationItem = ({ notification, deleteNotification }) => {
    const getStatusColor = (type) => {
        switch (type) {
            case 'Order':
                return 'success';
            case 'Warning':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getCardColor = (viewed) => {
        switch (viewed) {
            case "1":
                return 'bg-default';
            case "0":
                return 'bg-blue-500';
            default:
                return 'bg-red-200';
        }
    };

  return (
    <Card key={notification.notification_id} className="w-full md:w-auto">
      <CardBody>
        <section className="flex flex-col md:flex-row justify-between">
          <section className="w-full md:w-auto">
            <h3 className="text-xl md:text-2xl font-bold m-3">{notification.title}</h3>
            <section className="mx-4 grid gap-y-1">
              <section className="font-bold">Descripción:</section>
              <section>{notification.description}</section>
            </section>
            <section className="mx-4 my-1 grid gap-y-1">
              <section>
                <section className="font-bold">Fecha:</section>
                <section>
                  {new Date(notification.notification_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </section>
              </section>
            </section>
          </section>
          <section className="flex flex-col items-start md:items-end justify-between md:w-auto m-4">
            <section className="flex justify-end">
              <Chip color={getStatusColor(notification.type)} variant="flat" className="mb-2 md:mb-0">
                {notification.type}
              </Chip>
            </section>
            <section className="flex justify-end">
              <Button onClick={() => deleteNotification(notification.notification_id)} color="danger">
                Eliminar
              </Button>
            </section>
          </section>
        </section>
      </CardBody>
    </Card>
  );
};

export default NotificationItem;