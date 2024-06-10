import { useState, useEffect } from 'react';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle';
import { Button, Card, Image, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import CategoryService from '@services/categoryService';
import BrandService from '@services/brandService';
import DeleteIcon from '@icons/deleteIcon';


const CreateProduct = () => {
    const [isLoading, setisLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [imageCount, setImageCount] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    console.log(imageCount);
    const [formState, setFormState] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
        status: 'Activo'
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    useTitle(id ? 'Editar Producto' : 'Crear Producto');

    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    const quantityRegex = /^\d+$/;

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const product = await ProductService.getProductById(id);
                    setFormState({
                        product_name: product.product_name,
                        description: product.description,
                        price: product.price,
                        stock_quantity: product.stock_quantity,
                        status: product.status,
                        category_id: product.category_id,
                        id_brand: product.id_brand,
                    });
                } catch (error) {
                    console.error(error);
                }
            }

            const fetchProductImages = async () => {
                try {
                    const imageCount = await ProductService.getImageCount(id);
                    setImageCount(imageCount);
                } catch (error) {
                    console.error(error);
                }
            }
            fetchProduct();
        }
        
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });

        let formErrors = { ...errors };

        switch (name) {
            case 'product_name':
                if (!nameRegex.test(value)) formErrors.name = "Nombre no válido. Solo se permiten letras y espacios";
                else delete formErrors.name;
                break;
            case 'price':
                if (!priceRegex.test(value)) formErrors.price = "Precio no válido. Debe ser un número con hasta dos decimales";
                else delete formErrors.price;
                break;
            case 'stock_quantity':
                    if (!quantityRegex.test(value)) formErrors.stock_quantity = "Cantidad no válida. Debe ser un número entero";
                    else delete formErrors.stock_quantity; 
                    break;
            case 'status':
                if (!value) formErrors.status = "Estado es requerido";
                else delete formErrors.status;
                break;
            default:
                break;
        }

        setErrors(formErrors);
        setIsFormValid(Object.keys(formErrors).length === 0);
    };  

    const handleSubmit = async (event) => {
        event.preventDefault();
        setisLoading(true);
        if (!isFormValid) {
            setisLoading(false); 
            alert('Por favor, corrija los errores en el formulario antes de enviar.');
            return;
        }
        if (id) {
            try {
                await ProductService.updateProduct(id, formState);
                router.push('/admin/Productos');
            } catch (error) {
                console.error(error);
            }
        } else {
            try {
                await ProductService.createProduct(formState);
                router.push('/admin/Productos');
            } catch (error) {
                console.error(error);
            }
        }
        setisLoading(false);
    };

    useEffect(() => {
        const fetchParentCategories = async () => {
            const response = await CategoryService.getCategories(1,1000);
            setCategories(response.categories);
        };

        const fetchBrands = async () => {
            const response = await BrandService.getAllBrandsNoPagination();
            setBrands(response.brands);
        };
        
        fetchParentCategories();
        fetchBrands();
    }, []);

    const renderProductImages = (isThumbnail = false) => {
        const images = [];
        for (let i = 1; i <= imageCount; i++) {
            if (id) {
                images.push(
                    <div key={i} className='rounded-xl '>
                        <Button 
                            color='danger' 
                            variant='flat' 
                            isIconOnly 
                            radius='full' 
                            onClick={() => ProductService.deleteImage(id, i)}
                            className='absolute z-50 m-1 h-auto p-1'
                        >
                            <DeleteIcon/>
                        </Button>
                        <Image 
                            isZoomed
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${id}/${i}.png`}
                            alt={`Imagen ${i} del producto ${id}`}
                            className={`rounded shadow-lg object-cover cursor-pointer z-10 max-h-32`}
                            disableSkeleton= {imageCount}
                        />
                    </div>
                );
            }
        }
        return images;
    };


    return (
        <main className="max-w-4xl mx-auto mt-10 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Producto' : 'Crear Producto'}</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input 
                            type='text' 
                            label='Nombre del Producto' 
                            name="product_name" 
                            value={formState.product_name} 
                            onChange={handleChange}
                            errorMessage={errors.product_name}
                            isRequired
                        />
                    </section>
                    <section className="mb-4">
                        <Textarea 
                            name='description'
                            label='Descripción del Producto' 
                            value={formState.description} 
                            onChange={handleChange}
                            isRequired
                        />
                    </section>
                    <section className="mb-4">
                    <Select 
                        name='id_brand' 
                        label='Marca' 
                        defaultSelectedKeys={[formState?.id_brand?.toString()]}
                        onChange={handleChange}
                        isRequired
                    >
                        {brands.map((brand) => (<SelectItem key={brand.id_brand.toString()} value={brand.id_brand}>{brand.brand_name}</SelectItem>))}
                    </Select>
                    </section>
                    <section className="mb-4">
                        <Input 
                            name='stock_quantity'
                            type='number' 
                            label='Cantidad en Stock' 
                            value={formState.stock_quantity} 
                            onChange={handleChange}
                            errorMessage={errors.stock_quantity}
                            isInvalid={errors.stock_quantity}
                            isRequired
                        />
                    </section>
                    <section className="mb-4">
                        <Input 
                            name='price'
                            type='number' 
                            label='Precio del Producto' 
                            value={formState.price} 
                            onChange={handleChange}
                            errorMessage={errors.price}
                            isInvalid={errors.price||errors.price === ''}
                            isRequired
                        />
                    </section>
                    <section className="mb-4">
                        <Select 
                            name='category_id' 
                            label='Categoría' 
                            defaultSelectedKeys={[formState?.category_id?.toString()]}
                            onChange={handleChange}
                            isRequired
                        >
                            {categories.map((category) => (<SelectItem key={category.category_id.toString()} value={category.category_id}>{category.category_name}</SelectItem>))}
                        </Select>
                    </section>
                    <section className="mb-4">
                        <Select 
                            name='status' 
                            label='Estado del Producto' 
                            defaultSelectedKeys={[formState.status.toString()]}
                            onChange={handleChange}
                            errorMessage={errors.status}
                            isInvalid={errors.status}
                            isRequired
                        >
                            <SelectItem key="Enabled" value="Enabled">Enabled</SelectItem>
                            <SelectItem key="Disabled" value="Disabled">Disabled</SelectItem>
                        </Select>
                    </section>
                    {id && (    
                        <section className="mb-4">
                            <h2 className="text-xl font-bold mb-2">Imágenes del Producto</h2>
                            <section className="flex flex-row gap-4 w-full max-h-32">
                                {imageCount === 0 ? (
                                    <p>No hay imágenes para mostrar</p>
                                ) : renderProductImages(true)}
                            </section>
                        </section>
                    )}
                    <section className="mb-4">
                        <input 
                            type='file' 
                            multiple 
                            id='images' 
                            hidden
                            onChange={(e) => {
                                if (e.target.files.length > 5) {
                                    alert('No puedes subir más de 5 imágenes');
                                } else {
                                    setFormState({...formState, images: e.target.files})
                                }
                            }}
                        />  
                        <label htmlFor='images' className="text-sm text-default-500 p-4 bg-default rounded-xl hover:bg-default-300 cursor-pointer">
                                Añadir imágenes del producto (máximo 5)
                        </label>
                    </section>
                    <section className="grid w-full sm:flex sm:justify-between gap-2">
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Productos')} className="w-full sm:w-1/4">Cancelar</Button>
                        <Button 
                            type='submit' 
                            className="w-full sm:w-1/4"
                            color='primary' 
                        >
                            {isLoading ? 'Cargando...' : (id ? 'Guardar cambios' : 'Crear Producto')}
                        </Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateProduct;
