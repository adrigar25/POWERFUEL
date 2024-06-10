import { Button, Image, Input, Select, SelectItem, Tooltip } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import ProductService from '@services/productService';
import { useCart } from "@hooks/useCart";

function Cartproduct({ item }) {
  const { cart, setCart } = useAppContext();
  const { changeQuantity } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const productData = await ProductService.getProductById(item.product_id);
        if (productData) {
          setQuantity(item.quantity);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product:', error.message);
      }
    };

    fetchProducto();
  }, [item]);

  const handleDeleteCartProduct = (id) => {
    setCart(cart.filter(product => product.product_id !== id));
  };

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
  
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
      changeQuantity(item.product_id, newQuantity);
    }
  };


  return (
    product && quantity && (
      <motion.section
        initial={{ opacity: 0, height: "auto" }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: "auto" }}
        transition={{ duration: 0.3 }}
        className='flex products-center justify-between w-full gap-2'
      >
        <section className="w-auto">
          <Image
            shadow="sm"
            radius="lg"
            alt={product.product_name}
            className="object-cover h-20 w-20 z-1"
            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`}
          />
        </section>
        <section className='flex-grow flex flex-col gap-2'>
          <section className='products-center max-w-40'>
            <Tooltip content={product.product_name} delay={1250}>
              <p className='font-semibold overflow-hidden overflow-ellipsis whitespace-nowrap'>{product.product_name}</p>
            </Tooltip>
          </section>
          <section className='flex gap-2 justify-center items-center products-center'>
            <section className='flex gap-2 justify-center products-center'>
            <Button isIconOnly onClick={() => handleQuantityChange(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </Button>
              <Input className={`min-w-2 max-w-10 m-0`} value={quantity.toString()} readOnly />
              <Button isIconOnly onClick={() => handleQuantityChange(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </Button>
            </section>
            <section className='flex items-center justify-center'>
              <p className="h-full">{(product.price * quantity ?? 0).toFixed(2)} €</p>
            </section>
          </section>
        </section>
        <section className='products-center'>
          <Button
            color="danger"
            variant="light"
            onClick={(event) => {
              event.stopPropagation();
              handleDeleteCartProduct(product.product_id, event);
            }}
            className='m-1'
            isIconOnly
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </Button>
        </section>
      </motion.section>
    )
  );
}

export default Cartproduct;