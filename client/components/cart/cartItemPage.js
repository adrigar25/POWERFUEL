import { Card, CardBody, Image, Button, Select, SelectItem, Input } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import { useEffect, useState } from "react";
import ProductService from '@services/productService';
import { useCart } from "@hooks/useCart";
import DeleteIcon from '@icons/DeleteIcon';

function CartItemPageComponent({ item }) {
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
      <Card isBlurred className="border-none bg-blue-300 bg-opacity-25 w-full h-auto">
        <CardBody>
          <section className="flex flex-col md:flex-row items-start gap-4 w-full">
            <section className="w-full md:w-32 h-32 flex items-center justify-center">
              <Image
                shadow="sm"
                radius="lg"
                alt={product.product_name}
                className="object-cover h-24 w-24 z-1"
                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`}
              />
            </section>
            <section className="flex flex-col w-full">
              <section className="flex w-full justify-between items-start">
                <h3 className="text-xl font-medium mt-4">{product.product_name}</h3>
                <Button
                  isIconOnly
                  className="text-lg bg-red-500 bg-opacity-25 hover:bg-opacity-300" 
                  radius="full"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteCartProduct(product.product_id, event);
                  }}
                >
                  <DeleteIcon color="white" />
                </Button>
              </section>
              <section className="flex flex-col md:flex-row w-full justify-between items-center pt-4">
                <section className="flex gap-2 items-center">
                    <section className="flex gap-2 items-center">
                      <Button isIconOnly onClick={() => handleQuantityChange(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      </Button>
                      <Input className="min-w-2 max-w-10 m-0" value={quantity.toString()} readOnly/>
                      <Button isIconOnly onClick={() => handleQuantityChange(1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </Button>
                    </section>
                </section>
                <p className="mt-2 md:mt-0">{(product.price * quantity ?? 0).toFixed(2)} €</p>
              </section>
            </section>
          </section>
        </CardBody>
      </Card>
    )
  );
}

export default CartItemPageComponent;
