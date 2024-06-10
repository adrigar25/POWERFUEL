// product.js
import React, { useEffect, useState } from 'react';
import ProductService from '@services/productService';
import { Skeleton } from "@nextui-org/react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/router';
import QuantityInput from '@components/product/productPage/QuantityInput';
import ProductCarousel from '@components/product/productPage/ProductCarousel';
import useTitle from '@hooks/useTitle'; 
import { set } from 'date-fns';

const Product = () => {
    const router = useRouter();
    const { id } = router.query
    const [product, setProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const {setTitle} = useTitle("Página de Producto");

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setIsLoaded(false); // Muestra el esqueleto
                const productData = await ProductService.getProductById(id);
                    setProduct(productData);
                    setTitle(productData.product_name);
                    setIsLoaded(true); 
            } catch (error) {
                console.error('Error fetching product:', error.message);
                setIsLoaded(true); // Muestra el contenido del esqueleto
            }
        };
    
        fetchProducto();
    }, [id]);

    return (
        <main className='flex flex-col items-center justify-center p-6'>
            <section className='w-full max-w-4xl p-8 flex flex-col sm:flex-row justify-center bg-gray-500 bg-opacity-25 rounded-lg'>
                <section className="sm:w-96 sm:h-auto">
                    <ProductCarousel
                        id={id}
                    />
                </section>
                <section className='w-full md:w-1/2 md:pl-8 h-full'>
                    <section className='w-full max-w-4xl rounded-lg flex items-center'>
                        <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2">
                            <h1 className='text-3xl font-bold'>{product?.product_name}</h1>
                        </Skeleton>
                    </section>
                    <section className='mb-4'>
                        <h2 className='text-xl font-semibold'>{"Precio:"}</h2>
                        <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2 mt-2">
                            <p>{product?.price} €</p>
                        </Skeleton>
                    </section>
                    <QuantityInput
                        dataProduct={product}
                    />
                </section>
            </section>
            <section className='mt-4 w-full max-w-4xl p-8 bg-gray-500 bg-opacity-25 rounded-lg'>
                <h2 className='text-xl font-semibold'>{"Descripción:"}</h2>
                
                <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2">
                    <p style={{whiteSpace: 'pre-line'}}>{product?.description}</p>
                </Skeleton>
            </section>
        </main>
    );
};

export default Product;