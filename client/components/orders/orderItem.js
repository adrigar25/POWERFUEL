import React, { useEffect, useState } from 'react';
import { Button, Card, Chip, Image, ScrollShadow } from '@nextui-org/react';
import ProductService from '@services/productService';
import { format } from 'date-fns';
import OrderService from '@services/orderService';
import { useRouter } from 'next/router';

const OrderItem = ({ order }) => {
  const router = useRouter();
  const [details, setDetails] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);
  const isAdminPage = router.pathname.includes('/admin');

  const getStatusColor = (status) => {
    switch (status) {
      case 'entregado':
      case 'finalizado':
        return 'success';
      case 'enviado':
      case 'pendiente':
      case 'en proceso':
      case 'en proceso de devolucion':
        return 'warning';
      case 'cancelado':
      case 'devuelto':
      case 'fallido':
        return 'danger';
      default:
        return 'default';
    }
  };
  const fetchProduct = async () => {
    let total = 0;
    const detailsAux = JSON.parse(order.details);
    const detailsTemp = [];
    for (const item of detailsAux) {
      const productData = await ProductService.getProductById(item.product_id, null);
      if(productData){
        detailsTemp.push({ ...productData, quantity: item.quantity });
        total += productData.price * item.quantity;
      }
    }
    setDetails(detailsTemp);
    order.total = total.toFixed(2);
    setShippingAddress(JSON.parse(order.shipping_address));
  };

  useEffect(() => {
    fetchProduct();
  }, [order]);

  return (
    <Card shadow className="p-6 shadow-lg flex flex-col gap-2">
      <p className="font-bold text-lg">Order ID: {order.order_id}</p>
      <p>Fecha del pedido: {format(new Date(order.order_date), 'dd-MM-yyyy HH:mm')}</p>
      <p>Detalles del pedido:</p>
      <ScrollShadow className="mb-4 max-h-[13rem] bg-zinc-600 bg-opacity-10 rounded-lg p-4 grid gap-2 overflow-auto">        
        {details.map((product, index) => (
          <section key={index} className='flex flex-row gap-2 items-center'>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
            <p>{product.product_name} x {product.quantity} {product.quantity>1?'unidades':'unidad'}  Precio: {product.price} €</p>
          </section>
        ))}
      </ScrollShadow>
      {shippingAddress && (
        <div>
          <p>Dirección de envío:</p>
          <p>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.country}, {shippingAddress.zip}</p>
          <p>Teléfono: {shippingAddress.phone_number}</p>
        </div>
      )}
      <section className='flex flex-col sm:flex-row justify-between items-center'>
        <Chip color={getStatusColor(order.status)} variant='flat' className='mb-2 sm:mb-0'>{order.status}</Chip>
        <p className='text-xl font-bold'>Total: {order.total} €</p>
      </section>
      {!isAdminPage && order.status !== 'cancelado' && order.status !== 'fallido' && order.status !== 'devuelto' && order.status !== 'entregado' && order.status !== 'en proceso de devolucion' && (
        <section className='w-full flex justify-end items-center'>
          <Button color='danger'
            onClick={() => {OrderService.cancelOrder(order.order_id); window.location.reload();;}}
          >
            Cancelar
          </Button>
        </section>
      )}
      {!isAdminPage && order.status === 'entregado' && (
        <Button color='primary'
          onClick={() =>{OrderService.returnOrder(order.order_id); window.location.reload();;}}
        >
          Devolver
        </Button>
      )}
    </Card>
  )
}

export default OrderItem;