import React, { useEffect, useState } from 'react';
import { ScrollShadow } from '@nextui-org/react';
import { useAppContext } from '@context/AppContext';
import OrderService from '@services/orderService';
import OrderItem from './orderItem';
import { Modal, useDisclosure, ModalContent } from '@nextui-org/react';

const OrdersList = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user, isLoggedIn } = useAppContext();
  const {isOpen, onOpenChange, onOpen } = useDisclosure();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getUserOrders();
        setUserOrders(response || []);
      } catch (error) {
        setUserOrders([]);
      }
    };
  
    fetchOrders();
  }, [user, isLoggedIn]);

  return (
    <section className="flex flex-col space-y-4">
      <section>
        <h1 className="font-bold text-3xl">Listado de pedidos</h1>
      </section>
      {userOrders.length > 0 ? (
        userOrders.map((order, index) => (
          <section className='w-full cursor-pointer' key={order.order_id} onClick={() => { setSelectedOrder(order); onOpen(); }}>
            <OrderItem order={order} />
          </section>
        ))
      ) : (
        <p>No tienes ningún pedido aún</p>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-6 overflow-hidden max-w-[90%] max-h-[95%]' backdrop="blur">
        <ModalContent className='w-full'>
          {selectedOrder && <OrderItem order={selectedOrder} />}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default OrdersList;