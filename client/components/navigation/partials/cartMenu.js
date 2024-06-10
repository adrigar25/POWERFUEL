import React, { useState, useEffect, useCallback }from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, useDisclosure, user, ScrollShadow } from "@nextui-org/react";
import CartItem from '@components/cart/cartItem';
import { useRouter } from 'next/router';
import { useAppContext } from "@context/AppContext";
import { AnimatePresence } from 'framer-motion';
import { useCart } from '@hooks/useCart';
import DeleteIcon from '@icons/DeleteIcon';
import CartIcon from '@icons/CartIcon';


const CartMenu = () => {
    const { cart, isCartOpen ,onOpenCartChange, onOpenCart } = useAppContext();
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const { emptyCart, getTotal } = useCart()

    const handleReviewOrder = () => {
        onOpenCartChange(false);
        router.push('/cart')
    }

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getTotal();
            setTotal(total);
        };
        fetchTotal();
    }, [cart, getTotal])
    
    return (
        <Dropdown
            isOpen={isCartOpen}
            onOpenChange={onOpenCartChange}
        >
        <Badge content={
                cart?cart.length:0
            }  
            color="primary" 
            isInvisible={cart && cart.length === 0}
            style={{ zIndex: 1 }}
            >
                <DropdownTrigger style={{ zIndex: 1 }}>
                    <Button
                        isIconOnly
                        onPress={onOpenCart}
                        aria-label='Cart Menu'
                    >
                       <CartIcon/>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu
                aria-label="Cart Actions"
                className="w-full sm:w-96 max-h-96 p-1 overflow-y-auto"
                closeOnSelect={false}
            >
                {cart && cart.length > 0 && (
                    <DropdownItem key="cart" className="gap-2 sticky top-0 z-10 w-full bg-gray-300" textValue='Cart'>
                        <section className='flex justify-between items-center'>
                            <section className='flex items-center'>
                                <p className="font-bold">Carrito</p>
                            </section>
                            <Button color="danger" className='m-1' variant="flat" onClick={emptyCart} isIconOnly>
                                <DeleteIcon color="white" />
                            </Button>
                        </section>
                    </DropdownItem>
                )}
                {cart && cart.length > 0 ? (
                    cart.map((item, index) => (
                        <DropdownItem
                            key={item.product_id}
                            color='none'
                            textValue={item.product_id}
                            showDivider
                            onClick={() => router.push(`/product/${item.product_id}`)}
                        >
                            <AnimatePresence>
                                <CartItem item={item}/>
                            </AnimatePresence>
                        </DropdownItem>
                    ))
                ) : (
                    <DropdownItem key="empty" textValue="empty">
                        <p>Vacío</p>
                    </DropdownItem>
                )}
                {cart && cart.length > 0 && (
                    <DropdownItem key="checkout" className='items-center bg-green-200 hover:bg-green-50 sticky bottom-0 z-10 text-black' color='success' textValue="checkout" onClick={handleReviewOrder}>
                        <section className='flex justify-between mx-2'>
                            <p>Revisar pedido:</p>
                            <p className='font-semibold'>{total} €</p>
                        </section>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CartMenu;
