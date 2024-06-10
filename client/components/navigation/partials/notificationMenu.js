import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import NotificationService from '@services/notificationService';
import { Modal, useDisclosure, ModalContent } from '@nextui-org/react';
import { useRouter } from 'next/router';
import NotificationItem from "@components/notification/notificationItem";
import NotificationIcon  from '@icons/NotificationIcon';

const NotificationMenu = () => {
    const [unseenNotifications , setUnseenNotifications] = useState([]);
    const { notifications } = useAppContext();
    const {isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    const [selectedNotification, setSelectedNotification] = useState(null);
    const router = useRouter();

    useEffect(() => {
      setUnseenNotifications(notifications.filter(notification => notification.viewed === "0"));
    }, [notifications])

    useEffect(() => {
      if(unseenNotifications.length > 0){
        NotificationService.markAsViewed();
      }
    }, [unseenNotifications])

    const handleOpen = () => {
      if(unseenNotifications.length > 0){
        NotificationService.markAsViewed();
        setUnseenNotifications([]);
      }
    }

    return (
      <>
        <Dropdown onOpen={handleOpen}>
          <Badge
            content={unseenNotifications?.length || null}
            color="primary"
            isInvisible={unseenNotifications?.length === 0}
          >
            <DropdownTrigger>
              <Button isIconOnly aria-label='Notification Menu'>
                <NotificationIcon />
              </Button>
            </DropdownTrigger>
          </Badge>
          <DropdownMenu
            aria-label="Cart Actions"
            className="min-w-16 max-h-48 overflow-y-auto pb-8"
            closeOnSelect={false}
            emptyContent="No hay notificaciones"
          >
            {notifications.map((notification) => (
              <DropdownItem key={notification.notification_id} textValue={notification.title} onClick={() => { setSelectedNotification(notification); onOpen(); }}>
                <p>{notification.title}</p>
              </DropdownItem>
            ))}
              {notifications.length > 0 && (
                <DropdownItem key="viewAll" textValue="Ver más" className='fixed h-auto w-[92%] p-0 bottom-2'>
                <Button color="primary" className='w-full h-6' onPress={() => router.push('/users/config/NotificationList')}>
                  Ver más
                </Button>
              </DropdownItem>
              )
            }
          </DropdownMenu>
        </Dropdown>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-6 overflow-hidden max-w-[60%] max-h-[80%]' backdrop="blur">
          <ModalContent className='w-full'>
            {selectedNotification && <NotificationItem notification={selectedNotification} key={selectedNotification.notification_id} />}
          </ModalContent>
        </Modal>
      </>
    );
};

export default NotificationMenu;