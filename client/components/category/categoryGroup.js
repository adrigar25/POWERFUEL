import React, { useState, useEffect } from 'react';
import CategoryService from '@services/categoryService';
import { Card, Spinner, CardHeader } from '@nextui-org/react';
import { useRouter } from 'next/router';


const CategoryGroup = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [rand, setRand] = useState([0, 0]);
    const router = useRouter();

    useEffect(() => {
        fetchCategories();
    
        let rand1, rand2;
        do {
            rand1 = Math.floor(Math.random() * 3 + 1);
            rand2 = Math.floor(Math.random() * 3 + 1);
        } while (rand1 === rand2);
        setRand([rand1, rand2]);
    
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
    
        return () => clearTimeout(timer);
    }, []);

    const fetchCategories = async () => {
        try {
            const categories = await CategoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };

    const generarCard = (categoria) => {
        const generarColorAleatorio = () => {
            const rojo = Math.floor(Math.random() * (256 - 150) + 150);
            const verde = Math.floor(Math.random() * (256 - 150) + 150);
            const azul = Math.floor(Math.random() * (256 - 150) + 150);
            const luminancia = (0.299 * rojo + 0.587 * verde + 0.114 * azul) / 50;
            const colorTexto = luminancia > 10 ? 'black' : 'white';
            return { colorFondo: `rgb(${rojo}, ${verde}, ${azul})`, colorTexto };
        };

        const colores = generarColorAleatorio();
        return (
            categoria && (
                <Card key={categoria.category_id} className="hover:scale-105 h-40" isPressable onPress={() => router.push(`/category/${categoria.category_id}`)} style={{backgroundColor: colores.colorFondo}}>
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny uppercase text-default-900 font-bold text-shadow-md text-left">Categoria</p>
                        <h4 className="font-bold text-large text-default-900 text-shadow-lg text-left ">{categoria.category_name}</h4>
                    </CardHeader>
                </Card>
            )
        );
    };

    const seleccionarCategoriasYGenerarCards = (numCards) => {
        const categoriasCopia = [...categories];
        if (categoriasCopia.length < numCards) return <p>No hay suficientes categorias disponibles.</p>;

        const categoriasSeleccionadas = Array.from({length: numCards}, () => {
            const indiceAleatorio = Math.floor(Math.random() * categoriasCopia.length);
            const categoriaAleatoria = categoriasCopia[indiceAleatorio];
            categoriasCopia.splice(indiceAleatorio, 1);
            return categoriaAleatoria;
        });

        return categoriasSeleccionadas.map(generarCard);
    };

    return (
        !isLoading ? (
            <section className='flex flex-col gap-3 max-w-[85rem] '>
                <section className="grid grid-flow-col gap-3">
                    {seleccionarCategoriasYGenerarCards(rand[0])}
                </section>
                <section className="grid grid-flow-col gap-3">
                    {seleccionarCategoriasYGenerarCards(rand[1])}
                </section>
            </section>
        ) : (
            <Spinner />
        )
    );
}

export default CategoryGroup;   