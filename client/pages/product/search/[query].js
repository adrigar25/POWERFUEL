import React, { useEffect, useState } from 'react';
import ProductCard from '@components/product/ProductCard';
import { useRouter } from 'next/router';
import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import ProductService from '@services/productService';
import useTitle from '@hooks/useTitle';

const Search = () => {
    const router = useRouter();
    const { query } = router.query;
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    useTitle(`"${query}"`);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                if (query) {
                    const response = await ProductService.getProductsSearch(query, 50, 1);
                    setProducts(response.products);
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    return (
        <main className="p-10">
            <Card className="w-full shadow-lg" >
                <CardHeader className="flex-col !items-start">
                    <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                        Resultados para: "{query}"
                    </h1>
                </CardHeader>
                <CardBody className='w-full flex flex-row gap-3 items-center justify-center'>
                    {loading ? (
                        <Spinner />
                    ) : products ? (
                        <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
                            {products.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </section>
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                </CardBody>
            </Card>
        </main>
    );
};

export default Search;