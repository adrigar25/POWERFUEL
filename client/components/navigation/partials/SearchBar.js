// SearchBar.js
import React, { useState, useEffect } from 'react';
import { Input, Image, Card, ScrollShadow, Button } from "@nextui-org/react";
import ProductService from '@services/productService';
import { SearchIcon } from '@icons/SearchIcon';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false); // Nueva variable de estado
    const router = useRouter();

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchTerm]);

    useEffect(() => {
        const searchProduct = async (data) => {
            if (data && data != null && data != undefined && data != '') {
                const response = await ProductService.getProductsSearch(data, 4, 1, "Enabled");
                if (response && Array.isArray(response.products)) {
                    setResults(response.products);
                    setSearched(true); // Se ha realizado una búsqueda
                } else {
                    console.error('Response does not contain an array of products:', response);
                }
            } else {
                setResults([]);
                setSearched(false); // No se ha realizado una búsqueda
            }
        }

        if (debouncedTerm) {
            searchProduct(debouncedTerm);
        } else {
            setResults([]);
            setSearched(false); // No se ha realizado una búsqueda
        }
    }, [debouncedTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm && searchTerm != null && searchTerm != undefined && searchTerm != '') {
            router.push(`/product/search/${searchTerm}`);
            setSearchTerm('');
            setDebouncedTerm('');
            setResults([]);
            setSearched(false); // No se ha realizado una búsqueda
        }
    }

    return (
        <div className='w-full relative'>
            <form onSubmit={handleSubmit}>
                <Input 
                    className="w-full bg-transparent" variant='faded' placeholder="Buscar..." type="text" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    startContent={
                        <Button variant='light' isIconOnly radius='full' type="submit" className='p-0 m-0' onPress={(e)=>handleSubmit(e)}>
                            <SearchIcon size={16}/>
                        </Button>
                    }
                />
            </form>
            {searched && (
                    <section className='absolute top-full w-full left-0 bg-default-50 rounded-lg shadow-lg border-1 border-default-200 p-2 flex flex-col gap-1 h-auto' style={{ zIndex: 9999 }}>
                        {results.length > 0 ? (
                            results.map((result, index) => (
                                <Card key={index} 
                                    className="flex flex-row items-center space-x-2 p-2 focus:bg-default-100 hover:bg-default-100" 
                                    isPressable
                                    onPress={() => router.push(`/product/${result.product_id}`)}
                                >
                                    <Image 
                                        src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${result.product_id}/1.png`} 
                                        width={50} 
                                        height={50} 
                                        alt={result.product_name}
                                    />
                                    <div className="flex-grow text-sm text-start">
                                        <h2 className="font-bold overflow-hidden text-overflow ellipsis whitespace-nowrap max-w-[200px] w-full">{result.product_name}</h2>
                                        <p>{result.Brand.brand_name}</p>
                                    </div>
                                    <p className="text-sm font-bold">{result.price} €</p>
                                </Card>
                            ))
                        ) : (
                            searched && <p>No se encontraron resultados</p> // Solo mostrar si se ha realizado una búsqueda
                        )}
                    </section>
                )}
        </div>
    );
};

export default SearchBar;