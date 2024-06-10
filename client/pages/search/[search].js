import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';
import ProductCard from '@components/product/ProductCard';
import useTitle from '@hooks/useTitle';

const SearchComponent = () => {
    const router = useRouter();
    const search = router.query.search;
    const [productos, setProductos] = useState([]);
    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setTitle } = useTitle(`Productos`);

    useEffect(() => {
        const searchNovedades = async () => {
            const data = await ProductService.getProductsNovedades(20, page, 'DESC');
            setProductos(data);
            setLoading(false);
        }

        const searchAntiguos = async () => {
            const data = await ProductService.getProductsNovedades(20, page, 'ASC');
            setProductos(data);
            setLoading(false);
        }

        const searchTodos = async () => {
            const response = await ProductService.getProducts(page, 20);
            setProductos(response.products);
            setLoading(false);
        }

        setLoading(true);

        switch (search) {
            case 'novedades':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchNovedades();
                break;
            case 'antiguos':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchAntiguos();
                break;
            case 'all':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchTodos();
                break;
        }

    }, [search, page])

    return (
        loading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <main className="flex flex-col p-6 gap-4">
                <Card className="w-full shadow-lg" >
                        <CardHeader className="flex-col !items-start">
                            <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                                Productos
                            </h1>
                        </CardHeader>
                        <CardBody className='w-full flex flex-row gap-3 items-center justify-center'>
                        {loading ? (
                            <Spinner />
                        ) : productos ? (
                            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
                                {productos.map((product) => (
                                    <ProductCard key={product.product_id} product={product} />
                                ))}
                            </section>
                        ) : (
                            <p>No hay productos disponibles.</p>
                        )}
                        </CardBody>
                    </Card>
            </main>
        )
    );
}

export default SearchComponent;