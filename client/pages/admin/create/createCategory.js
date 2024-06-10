import { Button, Input, Select, SelectItem, Card } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateCategory = () => {
    const [nameCategory, setName] = useState('');
    const [parentCategory, setParentCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const router = useRouter();
    const {id} = router.query;
    useTitle(id?'Editar Categoría':'Crear Categoría');

    const isNameValid = () => {
        const regex = /^[a-zA-Z0-9\s]{1,50}$/;
        return nameCategory && regex.test(nameCategory);
    };
    const isFormValid = () => isNameValid();

    const handleRegister = async (e) => {
        e.preventDefault();
    
        if (!isFormValid()) {
            return;
        }
    
        try {
            const category = {
                category_name: nameCategory,
                parent_category_id: parentCategory === null ? '' : parentCategory,
            };

    
            if(id) {
                await CategoryService.updateCategory(id, category);
            }
            else {
                await CategoryService.createCategory(category);
            }
            router.push('/admin/Categorias');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchParentCategories = async () => {
            const response = await CategoryService.getCategories(1 , 10000)
            setCategories(response.categories);
        };
        
        fetchParentCategories();
    }, []);

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                const category = await CategoryService.getCategoryById(id);
                setParentCategory(category.parent_category_id);
                setName(category.category_name);
            };
            fetchCategory();
        }
    }, [id]);

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Categoría' : 'Crear Categoría'}</h1>
                <form onSubmit={handleRegister}>
                    <section className="mb-4">
                        <Select 
                            key={parentCategory}
                            name='category' 
                            label='Categoría padre' 
                            onChange={(e) => setParentCategory(e.target.value)} 
                            defaultSelectedKeys={[`${parentCategory}`]}
                            data-filled
                        >
                            <SelectItem value={null}>Ninguna</SelectItem>
                            {categories.map((category) => (
                                <SelectItem key={category.category_id} value={category.category_name}>
                                    {category.category_name}
                                </SelectItem>
                            ))}
                        </Select>
                    </section>
                    <section className="mb-4">
                    <Input 
                        isRequired
                        type='text' 
                        label='Nombre de la categoría' 
                        value={nameCategory}
                        onChange={(e) => setName(e.target.value)} 
                        onClear={() => setName('')}
                        defaultValue={nameCategory}
                        isInvalid={!isNameValid() && nameCategory !== ''}
                        errorMessage='Formato inválido. Solo se permiten letras, números y espacios. Máximo 50 caracteres.'
                    />
                    </section>
                    <section className="grid w-full sm:flex sm:justify-between gap-2">
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Categorias')} className="w-full sm:w-1/4">Cancelar</Button>
                        <Button type='submit' color="primary" className="w-full sm:w-1/4">Guardar cambios</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateCategory;