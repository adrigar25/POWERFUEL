import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Spinner} from "@nextui-org/react";
import { useRouter } from 'next/router';
import BrandService from '@services/brandService';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';
import PlusIcon from '@icons/PlusIcon';
import EyeIcon from '@icons/EyeIcon';
import useTitle from '@hooks/useTitle'; 

const BrandAdministration = () => {
    const router = useRouter();
    const [Brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useTitle('Administración de Marcas');

    
    const fetchBrandData = async () => {
        const response = await BrandService.getBrands(page);
        setBrands(response.brands??[]);
        setTotalPages(response.pages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        
        fetchBrandData();
    }, [page]);

    const deleteBrand = async (brandId) => {
        await BrandService.deleteBrand(brandId);
        setBrands(prevBrands => prevBrands.filter(brand => brand.id_brand !== brandId));
    
        if (Brands.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    const deleteSelectedBrands = async () => {

        if (selectedKeys === "all") {
            for (const brand of Brands) {
                await deleteBrand(brand.id_brand);
            }
            setBrands([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }
    
        for (const brandId of selectedKeys) {
            await deleteBrand(brandId);
        }
        setSelectedKeys([]);
    
        if (Brands.length === 1 && page > 1) {
            setPage(page - 1);
        }
        
        fetchBrandData();
    
    };

    return (
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <section className='h-full w-full'>
                <Table aria-label='Tabla de marcas'
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    className="w-full h-full"
                    topContent={
                        <section className='grid flex-row w-full lg:flex gap-2'>
                            <section className="relative lg:absolute flex justify-left gap-2 sm:absolute">
                                <Tooltip color="danger" content="Eliminar Categoría/s">
                                    <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedBrands}>
                                        <DeleteIcon color="white" />
                                    </Button>
                                </Tooltip>
                                <Tooltip color="success" content="Añadir Categoría" className='text-white'>
                                    <Button isIconOnly color="success" className="text-lg  cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createBrand')}>
                                        <PlusIcon color="white" />
                                    </Button>
                                </Tooltip>
                            </section>
                            <section className='flex justify-center items-center h-auto w-full'>
                                <h1 className="text-center text-2xl font-bold">Listado de Marcas</h1>
                            </section>
                        </section>
                    }
                    bottomContent={
                        totalPages > 0 ? (
                            <section className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={totalPages}
                                    onChange={(page) => setPage(page)}
                                />
                            </section>
                        ) : null
                    }>
                    <TableHeader>
                        <TableColumn>
                            <p>Marca</p>
                        </TableColumn>
                        <TableColumn>
                            <p>ID</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        emptyContent="No hay marcas disponibles"
                    >
                        {Brands.map((brand) => (
                            <TableRow key={brand.id_brand}>
                                <TableCell>
                                    <p>{brand.brand_name}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{brand.id_brand}</p>
                                </TableCell>
                                <TableCell>
                                    <section className="relative flex justify-center items-center gap-2">
                                        <Tooltip color="success" content="Editar Marca" className="text-white">
                                            <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createBrand?id=${brand.id_brand}`)}>
                                                <EditIcon color="green"/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Eliminar Marca">
                                            <Button isIconOnly color="danger" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => deleteBrand(brand.id_brand)}>
                                                <DeleteIcon color="red" />
                                            </Button>
                                        </Tooltip>
                                    </section>
                                </TableCell>
                            </TableRow>   
                        ), )}
                    </TableBody>
                </Table>
            </section>
        )
    );
};

export default BrandAdministration;