import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from "@nextui-org/react";
import BrandService from '@services/brandService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateBrand = () => {
    const router = useRouter();
    const [brandName, setBrandName] = useState(null); 
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id, readOnly } = router.query;
    useTitle(id ? 'Editar Marca' : 'Crear Marca');

    useEffect(() => {
        if (id) {
            const fetchBrand = async () => {
                const res = await BrandService.getBrandById(id);
                setBrandName(res.brand_name);
            }
            fetchBrand();
        }
    }, [id]);

    useEffect(() => {
        const brandNameRegex = /^[a-zA-Z0-9\s]{1,50}$/;
        setIsInvalid(!brandNameRegex.test(brandName));
    }, [brandName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isInvalid) {
            return;
        }

        try {
            setIsLoading(true);
            if (id) {
                await BrandService.updateBrand(id, brandName);
            } else {
                await BrandService.addBrand(brandName);
            }
            setIsLoading(false);
            router.push('/admin/Marcas');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Marca' : 'Crear Marca'}</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input
                            name='brand_name'
                            type='text'
                            label='Nombre de la marca'
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value.trim())}
                            onClear={() => setBrandName('')}
                            readOnly={readOnly === "true"}
                            isInvalid={isInvalid}
                            isRequired
                            errorMessage='Formato inválido. Solo se permiten letras, números y espacios. Máximo 50 caracteres.'
                        />
                    </section>
                    <section className="grid w-full sm:flex sm:justify-between gap-2">
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Marcas')} className="w-full sm:w-1/4">Cancelar</Button>
                        <Button type='submit' color="primary" className="w-full sm:w-1/4">{isLoading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear'}</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateBrand;