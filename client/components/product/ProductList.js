import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Spinner } from '@nextui-org/react';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';

const ProductList = ({data}) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        if(data !== null){
            setProductos(data);
            setLoading(false);
        } else {
            const fetchProductos = async () => {
                try {
                    const data = await ProductService.getAllProducts(); 
                    setProductos(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching products:', error.message);
                    setLoading(false); 
                }
            };
    
            fetchProductos();
        }
    }, [data]);

    return (
        <main className='mt-4'>
            <section className="mx-auto flex flex-wrap justify-start items-center">
                {loading ? (
                    <Spinner />
                ) : productos && productos.length > 0 ? (
                    productos.map((product) => (
                        <section 
                            key={product.product_id} 
                            onClick={() => router.push(`/product/${product.product_id}`)}
                            className="cursor-pointer m-2"
                        >
                            <ProductCard product={product} />
                        </section>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos.</p>
                )}
            </section>
        </main>
    );
};

export default ProductList;