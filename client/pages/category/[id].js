import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const ProductListCategory = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setTitle} = useTitle("Página de Categoría");

    useEffect(() => {
        const fetchProductos = async () => {
            const dataCategory = await CategoryService.getCategoryById(id);
            setCategory(dataCategory);
            setTitle(dataCategory.category_name);
            const data = await ProductService.getAllProductsByCategory(id);
            const newChildCategories = await CategoryService.getChildCategories(id);
            if (newChildCategories.length > 0) {
                for (let category of newChildCategories) {
                    const products = await ProductService.getAllProductsByCategory(category.category_id);
                    addUniqueProducts(data, products);
                }
            }
            if (data) {
                setProductos(data);
            }
            setLoading(false);
        };
        if(id){
            fetchProductos();
        }
    }, [id]);

    const addUniqueProducts = (existingProducts, newProducts) => {
        const productIds = new Set(existingProducts.map(product => product.product_id));
        newProducts.forEach(product => {
            if (!productIds.has(product.product_id)) {
                existingProducts.push(product);
            }
        });
    };

    return (
        loading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <main className="flex flex-col p-6 gap-4 items-center justify-center">
                <Card className="sm:w-full max-w-[85rem] shadow-lg bg-gray-200 bg-opacity-50" >
                    <CardHeader className="flex-col !items-start">
                        {category && category.category_name &&
                            <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                                {category.category_name}
                            </h1>
                        }
                    </CardHeader>
                    <CardBody className='flex flex-row gap-3 items-center justify-center'>
                        {loading ? (
                            <Spinner />
                        ) : productos && productos.length > 0 ? (
                            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
                                {productos.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </section>
                        ) : (
                            <div className="flex items-center justify-center">
                                <p>No hay productos</p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </main>
        )
    )
};

export default ProductListCategory;