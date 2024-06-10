import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductService from '@services/productService';
import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';
import useTitle from '@hooks/useTitle';
import CategoryGroup from '@components/category/categoryGroup';

const HomeComponent = () => {
    const router = useRouter();
    const [productosNovedades, setProductosNovedades] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    useTitle('Inicio');

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        }
      };
    
    useEffect(() => {
        fetchProductos();
        fetchRamdomProducts();
    }, []);
    
    const fetchProductos = async () => {
        try {
            const novedades = await ProductService.getProductsNovedades(15, 1, 'DESC');
            setProductosNovedades(novedades);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setLoading(false);
        }
    };

    const fetchRamdomProducts = async () => {
        try {
            const productRamdom = await ProductService.getRandomProducts(20);
            setProductos(productRamdom);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const renderProductosNovedades = () => {
        return productosNovedades.map((product) => (
            <ProductCard product={product} key={product.product_id} />
        ));
    }
    

        

    return (
        loading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <main className="flex flex-col p-6 gap-4 m-4">
                <section >
                    <h1 className="font-bold text-4xl">Bienvenido a <span className='text-blue-500'>PowerFuel!</span></h1>
                </section>
                <section>
                    <section className="flex flex-row gap-3 h-60 w-full">
                        <Card className='w-full h-full shadow-lg hover:scale-105' isPressable onPress={() => router.push(`/search/novedades`)}> 
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                                <h4 className="text-white font-medium text-large">Novedades</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card backgroun Novedades"
                                className="z-0 w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/novedades.webp`}
                            />
                        </Card>
                        <Card className='w-full h-full shadow-lg hover:scale-105' isPressable onPress={() => router.push(`/search/antiguos`)}>
                            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                                <h4 className="text-white font-medium text-large">Más antiguos</h4>
                            </CardHeader>
                            <Image
                                removeWrapper
                                alt="Card background Ofertas"
                                className="z-0 w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/ofertas.webp`}
                            />
                        </Card>
                    </section>
                </section>
                    <CategoryGroup/>
                <section className='flex flex-col sm:flex-row justify-center items-center'>
                    <Card className="shadow-lg max-w-[85rem]">
                        <CardHeader className="flex-col !items-start">
                            <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                                Lo mas nuevo
                            </h1>
                        </CardHeader>
                        <CardBody className='w-full'>
                                <Carousel
                                    swipeable={true}
                                    draggable={false}
                                    arrows={false}
                                    showDots={false}
                                    responsive={responsive}
                                    centerMode={true}
                                    infinite={true}
                                    autoPlay={true}
                                    autoPlaySpeed={1300}
                                    keyBoardControl={false}
                                    transitionDuration={1000}
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    dotListClass="custom-dot-list-style"
                                    containerClass='p-4'
                                    itemClass="carousel-item-padding-40-px mr-4"
                                    
                                >
                                    {renderProductosNovedades()}
                                </Carousel>
                        </CardBody>
                    </Card>
                </section>
                <CategoryGroup/>
                <section>
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
                </section> 
                <CategoryGroup/>
            </main>
        )
    );
}

export default HomeComponent;