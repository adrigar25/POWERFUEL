import { Card, CardBody, Button, Chip, Tooltip, } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@hooks/useCart';
import EuroIcon from '@icons/EuroIcon';
import Link from 'next/link';


const ProductCard = ({ product }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(isMobile);
    const [isLoading, setIsLoading] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const checkMobile = () => {
            if (window.innerWidth <= 640) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };
    
        checkMobile();
    
        window.addEventListener('resize', checkMobile);
    
        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddToCart(event);
        }
    };
    const handleAddToCart = (event) => {
        event.stopPropagation();
        event.preventDefault();
    
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsAdded(true);
            addToCart(product.product_id);
            setTimeout(() => setIsAdded(false), 1000);
        }, 1000);
    };


    return (
        <Link 
            href={`/product/${product.product_id}`}
        >
            <Card 
                tabIndex="10" 
                onKeyDown={handleKeyDown} 
                onMouseEnter={() => !isMobile && setIsHovered(true)} 
                onMouseLeave={() => !isMobile && !isLoading && setIsHovered(false)} 
                className={`w-32 sm:w-64 h-40 sm:h-80 shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500}`}
            >
                <CardBody className="overflow-visible p-0 relative h-full">
                    <section className='bg-cover bg-center h-full w-full relative' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png)` }}> 
                        <motion.section 
                            className="absolute bottom-2 left-2"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: isHovered ? 0 : 27, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Chip 
                                size="auto" 
                                radius="full"
                            >
                                <p className="font-bold">{product.price} €</p>
                            </Chip>
                            <motion.section 
                                initial={{ y: 24}}
                                animate={{ y: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <p 
                                    className="overflow-hidden whitespace-nowrap text-overflow-ellipsis max-w-[150px] text-sm font-bold bg-default-200 border-gray-600 bg-opacity-50 mt-2 rounded " 
                                    style={{textOverflow: 'ellipsis', paddingLeft: '2px'}}
                                >
                                    {product.product_name}
                                    </p>
                            </motion.section>
                        </motion.section>
                        <motion.section
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: isHovered || isAdded ? 1 : 0, scale: isHovered ? 1 : 0.9 }} 
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-2 right-2 z-0"
                        >
                            <Button 
                                radius="full" 
                                className={`text-black transition-opacity duration-2000 hidden sm:block`} 
                                isIconOnly 
                                disabled={product ? 1 > product.stock_quantity : true}
                                onClick={(e) => handleAddToCart(e)}
                                onKeyDown={(e)=>handleKeyDown(e)}
                                onFocus={() => setIsHovered(true)}
                                onBlur={() => !isLoading && setIsHovered(false)}
                            >
                                <Tooltip 
                                    content={product && product.stock_quantity <= 0 ? "No quedan unidades" : "Añadir al carrito"}
                                    className="mb-2 font-bold" 
                                >
                                    <motion.div
                                        key={isAdded ? 'added' : 'not-added'}
                                        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
                                        animate={{ opacity: 1, scale: 1, rotate: isAdded ? 360 : 0 }}
                                        exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="flex justify-center items-center"
                                    >
                                        {product && product.stock_quantity <= 0 ? 
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-45">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        : isLoading ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/>
                                                <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                                    <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                                                </path>
                                            </svg>
                                        ) : isAdded ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 576 512">
                                                <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                            </svg>
                                        )}
                                    </motion.div>
                                </Tooltip>
                            </Button>
                        </motion.section>
                    </section>
                </CardBody>
            </Card>
        </Link>
    );
}

export default ProductCard;