import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import PaymentService from '@services/paymentService';
import OrderService from '@services/orderService';
import AddressService from '@services/addressService';
import {useAppContext} from '@context/AppContext';
import PartyIcon from '@icons/PartyIcon';
import { Card, Button } from '@nextui-org/react';
import useTitle from '@hooks/useTitle';

const SuccessPage = () => {
    const router = useRouter();
    let success = router.query.success;
    const {cart, setCart} = useAppContext();
    useTitle('Pedido Completado');

    useEffect(() => {
        const handleSuccess = async () => {
            if (success) {
                const addressId = await localStorage.getItem('shipping_address');
                let shipping = null;
                if (addressId) 
                    shipping = await AddressService.getAddressById(addressId);
                else
                    shipping = await AddressService.getDefaultAddress();
    
                const lastPayment = await PaymentService.getLastPayment();
                const order = {
                    order_id: lastPayment.id,
                    order_date: new Date(),
                    status: 'pendiente',
                    details: JSON.stringify(cart),
                    shipping_address: JSON.stringify(shipping), 
                };
                
                setCart([]);
                await OrderService.createOrder(order);
            }
        }
        handleSuccess();

    }, [success]);

    return (
        <main className='flex justify-center items-center h-full p-8 sm:p-20'>
            <Card className='shadow-md px-8 pt-6 pb-8 mb-4 w-full sm:w-96'>
            <section className='mb-4 text-center'>
                <h1 className='font-bold text-xl mb-2'>¡Pedido completado con éxito!</h1> 
                <PartyIcon className="w-16 h-16 mx-auto"/>
            </section>
            <p className='mb-6 text-center'>Gracias por tu compra. Tu pedido está siendo procesado y te llegará pronto.</p>
            <section className='flex flex-col gap-4'>
                <Button color='primary' block onPress={() => router.push('/')} className='w-full'>Seguir comprando</Button>
                <Button color='primary' block onPress={() => router.push('/users/config/OrderList')} className='w-full'>Ver mis pedidos</Button>
            </section>
            </Card>
        </main>
    );
};

export default SuccessPage;