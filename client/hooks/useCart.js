import { useAppContext } from '@context/AppContext';
import ProductService from '@services/productService';

export const useCart = () => {
    const { cart, setCart ,onOpenCartChange} = useAppContext();
    
    const addToCart = async (product_id, quantity = 1) => {
        const fetchProduct = async () => {
            const product = await ProductService.getProductById(product_id, null);
            return product;
        }
        const product = await fetchProduct();
        product_id = parseInt(product_id);
        const existingItem = cart.find(item => item.product_id === product_id);
    
        if (product.stock_quantity < quantity) {
            alert('No hay suficiente stock');
            return;
        }
    
        if (existingItem) {
            if (existingItem.quantity + quantity > product.stock_quantity) {
                alert('No hay suficiente stock');
                return;
            }
    
            const updatedCart = cart.map(item => {
                if (item.product_id === product_id) {
                    return { ...item, quantity: item.quantity + quantity };
                }
                return item;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { product_id, quantity }]);
        }
        onOpenCartChange(true);
    };

    const changeQuantity = (product_id, quantity) => {
        if (quantity > 50) {
            quantity = 50;
        }
        const updatedCart = cart.map(product => product.product_id === product_id ? {...product, quantity: parseInt(quantity)} : product);

        setCart(updatedCart);
    };

    const emptyCart = () => {
        setCart([]);
        onOpenCartChange(false);
    };

    const getTotal = async () => {
        let total = 0;
        await Promise.all(cart.map(async (item) => {
            const product = await ProductService.getProductById(item.product_id, null);
            total += product.price * item.quantity;
        }));
        return parseFloat(total.toFixed(2));
    };

    return { addToCart, changeQuantity, emptyCart, getTotal };
};
