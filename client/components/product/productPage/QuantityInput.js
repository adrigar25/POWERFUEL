import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import { useCart } from '@hooks/useCart';

const QuantityInput = ({ dataProduct }) => {
    const { cart } = useAppContext();
    const [countProduct, setCountProduct] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const { addToCart } = useCart();

    const handlePlusClick = () => {
        if (countProduct < dataProduct.stock_quantity) {
            setCountProduct(countProduct + 1);
        }
    };

    const handleMinusClick = () => {
        if (countProduct > 1)
            setCountProduct(countProduct - 1);
        else
            setCountProduct(1);
    };

    const handleAddToCart = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsAdded(true);
            addToCart(dataProduct.product_id, countProduct);
            setTimeout(() => setIsAdded(false), 1000);
        }, 1000);
    };

    return (
        <section>
            <section className='flex justify-center  space-x-2'>
                <Button isIconOnly onPress={handleMinusClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </Button>
                <Input className={`m-0`} value={countProduct} />
                <Button isIconOnly onPress={handlePlusClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Button>
            </section>
            <Button color="primary" auto className='w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600' disabled={dataProduct ? countProduct > dataProduct.stock_quantity : true} onClick={handleAddToCart}>
                {dataProduct && dataProduct.stock_quantity <= 0 ? "No Disponible" :
                    isLoading ? <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25" />
                        <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                            <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                        </path>
                    </svg>
                        : isAdded ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                            </svg>
                        ) : "Añadir al carrito"}
            </Button>
        </section>
    );
};

export default QuantityInput;