import { Button, Input, Select, SelectItem, Card, Image, ScrollShadow } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderService from '@services/orderService';
import ProductService from '@services/productService';
import useTitle from '@hooks/useTitle';

const CreateOrder = () => {
    const router = useRouter();
    const id = router.query.id;
    const [formState, setFormState] = useState({
        order_id: '',
        user_id: '',
        order_date: '',
        status: '',
        details: '',
        shipping_address: {
            street: '',
            city: '',
            zip: '',
            province: '',
            country: '',
            phone_number: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    useTitle(id ? 'Editar Pedido' : 'Crear Pedido');

    const getOrder = async () => {
        if (id) {
            const orderDetails = await OrderService.getOrderById(id);
            setOrder(orderDetails);
            formatForm(orderDetails);
            setLoading(false);
        }
    }

    const formatForm = (order) => {
        if (!order || !order.shipping_address) return;
        const datosDireccion = JSON.parse(order.shipping_address);
        setFormState({
            order_id: order.order_id,
            user_id: order.user_id,
            order_date: order.order_date,
            status: order.status,
            details: order.details,
            shipping_address: {
                street: datosDireccion.street,
                city: datosDireccion.city,
                zip: datosDireccion.zip,
                province: datosDireccion.province,
                country: datosDireccion.country,
                phone_number: datosDireccion.phone_number
            }
        });
    }

    useEffect(() => {
        const fetchProduct = async () => {
            if (!order || !order.details) return;
            let total = 0;
            const detailsAux = JSON.parse(order.details);
            const detailsTemp = [];
            for (const item of detailsAux) {
                const productData = await ProductService.getProductById(item.product_id);
                detailsTemp.push({ ...productData, quantity: item.quantity });
                total += productData.price * item.quantity;
            }
            setProducts(detailsTemp);
        };

        fetchProduct();
    }, [order]);

    useEffect(() => {
        if (id) {
            setLoading(true);
            getOrder();
            formatForm();
        }
    }, [id]);

    const handleChange = (name) => (value) => {

        if(name === 'status') {
            setFormState({
                ...formState,
                [name]: value.target.value
            });
            return;
        }

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = JSON.parse(JSON.stringify({
                ...formState,
                shipping_address: formState.shipping_address,
                details: formState.details
            }));
    
            console.log(dataToSend);
            await OrderService.updateOrder(id, dataToSend);
            router.push('/admin/Pedidos');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddressChange = (name) => (value) => {
        setFormState({
            ...formState,
            shipping_address: {
                ...formState.shipping_address,
                [name]: value
            }
        });
    };

    return (
        <main className="max-w-4xl mx-auto mt-10 p-6 ">
            <Card shadow className="p-5 ">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Pedido' : 'Crear Pedido'}</h1>
                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <section >
                        <Select
                            label="Estado del Pedido"
                            name="status"
                            defaultSelectedKeys={[formState.status.toString()]}
                            onChange={handleChange('status')}
                        >
                            <SelectItem key={"pendiente"} value="pendiente">Pendiente</SelectItem>
                            <SelectItem key={"en proceso"} value="en proceso">En Proceso</SelectItem>
                            <SelectItem key="enviado" value="enviado">Enviado</SelectItem>
                            <SelectItem key="entregado" value="entregado">Entregado</SelectItem>
                            <SelectItem key="cancelado" value="cancelado">Cancelado</SelectItem>
                            <SelectItem key="devuelto" value="devuelto">Devuelto</SelectItem>
                            <SelectItem key="fallido" value="fallido">Fallido</SelectItem>
                            <SelectItem key="en proceso de devolución" value="en proceso de devolución">En proceso de devolución</SelectItem>
                        </Select>
                        <p>{console.log(formState)}</p>
                    </section>
                    <ScrollShadow className="h-[15rem] bg-zinc-600 bg-opacity-10 rounded-lg p-4 grid gap-2">
                        {products && products.map((product, index) => (
                            <section key={index} className="flex flex-row gap-2 items-center">
                                <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
                                <section className="w-full">
                                    <p>{product.product_name} x {product.quantity}</p>
                                    <section className="flexjustify-between w-full">
                                        <section className="flexgap-4">
                                            <p><span className="font-bold">Precio:</span> {product.price} €</p>
                                            <p><span className="font-bold">Cantidad:</span> x{product.quantity} unidades</p>
                                        </section>
                                        <section>
                                            <p><span className="font-bold">Total:</span> {product.price * product.quantity} €</p>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </ScrollShadow>
                    <section className="flex flex-col justify-center gap-4 items-center w-full">
                        <Input
                            name="street"
                            label="Dirección:"
                            aria-label='Dirección de envío'
                            value={formState.shipping_address.street}
                            onValueChange={handleAddressChange('street')}
                        />
                        <Input
                            name="city"
                            label="Ciudad:"
                            aria-label='Ciudad de envío'
                            value={formState.shipping_address.city}
                            onValueChange={handleAddressChange('city')}
                        />
                        <Input
                            name="zip"
                            label="Código Postal:"
                            aria-label='Código Postal de envío'
                            value={formState.shipping_address.zip}
                            onValueChange={handleAddressChange('zip')}
                        />
                    </section>
                    <section className="flex flex-col justify-center gap-4 items-center w-full">
                        <Input
                            name="province"
                            label="Provincia/Estado:"
                            aria-label='Provincia/Estado de envío'
                            value={formState.shipping_address.province}
                            onValueChange={handleAddressChange('province')}
                        />
                        <Input
                            name="country"
                            label="País:"
                            aria-label='País de envío'
                            value={formState.shipping_address.country}
                            onValueChange={handleAddressChange('country')}
                        />
                        <Input
                            name="phone_number"
                            label="Teléfono:"
                            aria-label='Teléfono de envío'
                            value={formState.shipping_address.phone_number}
                            onValueChange={handleAddressChange('phone_number')}
                        />
                    </section>
                    <section className="grid w-full sm:flex sm:justify-between gap-2">
                        <Button type="button" color="danger" onClick={() => router.push('/admin/Pedidos')} className="w-full sm:w-1/4">Cancelar</Button>
                        <Button type="submit" color="primary" disabled={loading} className="w-full sm:w-1/4">
                            {loading ? 'Cargando...' : 'Guardar cambios'}
                        </Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateOrder;