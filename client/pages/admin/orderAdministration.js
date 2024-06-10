import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Chip, Spinner} from "@nextui-org/react";
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Modal, useDisclosure, ModalContent } from '@nextui-org/react';
import OrderItem from '@components/orders/orderItem';
import OrderService from '@services/orderService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import useTitle from '@hooks/useTitle'; 

const statusColorMap = {
    'entregado': 'success',
    'enviado': 'warning',
    'pendiente': 'warning',
    'en proceso': 'warning',
    'cancelado': 'danger',
    'devuelto': 'primary',
    'fallido': 'danger'
};

const OrderAdministration = () => {
    const [orders, setOrders] = useState([]);
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const {isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
    const [selectedOrder, setSelectedOrder] = useState(null);
    useTitle('Administración de Pedidos');

    useEffect(() => {
        const fetchOrderData = async () => {
            setIsLoading(true);
            const response = await OrderService.getAllOrders(page); 
            setOrders(response.orders ?? []);
            setTotalPages(response.pages);
            setIsLoading(false);
        }
        fetchOrderData();
    }, [page]);

    const deleteOrder = async (orderId) => {
        await OrderService.deleteOrder(orderId);
        setOrders(orders.filter(order => order.order_id !== orderId));

        if (orders.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    const deleteSelectedOrders = async () => {

        if (selectedKeys === "all") {
            for (const order of orders) {
                await deleteOrder(order.order_id);
            }
            setOrders([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }

        for (const orderId of selectedKeys) {
            await deleteOrder(orderId);
            setOrders(orders.filter(order => order.order_id !== orderId));
        }
        setSelectedKeys([]);

        if (orders.length === 1 && page > 1) {
            setPage(page - 1);
        }

    };

    return(
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner aria-label="Loading" />
            </div>
        ) : (
            <section className='h-full w-full'>
                <Table aria-label='Tabla de pedidos'
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    className="w-full h-full "
                    topContent={
                        <section className='grid flex-row w-full lg:flex gap-2'>
                            <section className="relative lg:absolute flex justify-left gap-2 sm:absolute">
                                <Tooltip color="danger" content="Eliminar Categoría/s">
                                    <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50"  onClick={deleteSelectedOrders}>
                                        <DeleteIcon color="white" />
                                    </Button>
                                </Tooltip>
                            </section>
                            <section className='flex justify-center items-center h-auto w-full'>
                                <h1 className="text-center text-2xl font-bold">Listado de Pedidos</h1>
                            </section>
                        </section>
                    }
                    bottomContent={
                        totalPages > 0 ? (
                            <section className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(page) => setPage(page)}
                                />
                            </section>
                        ) : null
                    }>
                    <TableHeader>
                        <TableColumn>
                            <p>ID</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Usuario</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Fecha de Pedido</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Status</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        emptyContent="No hay categorías disponibles"
                    >
                        {orders.map((order) => (
                            <TableRow key={order.order_id}>
                                <TableCell>
                                    <p>{order.order_id}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{order.user_id}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{format(new Date(order.order_date), 'dd-MM-yyyy HH:mm')}</p>
                                </TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={statusColorMap[order.status]} size="sm" variant="flat">
                                        {order.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <section className="relative flex justify-center items-center gap-2">
                                        <Tooltip content="Detalles">
                                            <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onPress={() => { setSelectedOrder(order); onOpen(); }}>
                                                <EyeIcon color="primary" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="success" content="Editar Pedido" className="text-white">
                                            <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createOrder?id=${order.order_id}`)}>
                                                <EditIcon color="green"/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Eliminar Pedido">
                                            <Button isIconOnly color="danger" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => deleteOrder(order.order_id)}>
                                                <DeleteIcon color="red" />
                                            </Button>
                                        </Tooltip>
                                    </section>
                                </TableCell>
                            </TableRow>   
                        ), )}
                    </TableBody>
                </Table>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-6 overflow-hidden max-w-[90%] max-h-[95%]' backdrop="blur">
                    <ModalContent className='w-full'>
                        {selectedOrder && <OrderItem order={selectedOrder} key={selectedOrder.order_id} />}
                    </ModalContent>
                </Modal>
            </section>
        )
    )
};

export default OrderAdministration;