import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Button, Pagination, Spinner} from "@nextui-org/react";
import { useRouter } from 'next/router';
import CategoryService from '@services/categoryService';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';
import PlusIcon from '@icons/PlusIcon';
import EyeIcon from '@icons/EyeIcon';
import useTitle from '@hooks/useTitle'; 

const CategoryAdministration = () => {
    const router = useRouter();
    const [Categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useTitle('Administración de Categorías');

    const fetchCategoryData = async () => {
        const response = await CategoryService.getCategories(page);
        setCategories(response.categories??[]);
        setTotalPages(response.pages);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCategoryData();
    }, [page]);


    const deleteCategory = async (categoryId) => {
        await CategoryService.deleteCategory(categoryId);
        setCategories(Categories.filter(category => category.category_id !== categoryId));

        if (Categories.length === 1 && page > 1) {
            setPage(page - 1);
        }
        fetchCategoryData();
    };

    const deleteSelectedCategories = async () => {

        if (selectedKeys === "all") {
            for (const category of Categories) {
                await deleteCategory(category.cate);
            }
            setCategories([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }

        for (const categoryId of selectedKeys) {
            await deleteCategory(categoryId);
            setCategories(Categories.filter(category => category.category_id !== categoryId));
        }
        setPage(1);
        setSelectedKeys([]);

        if (Categories.length === 1 && page > 1) {
            setPage(page - 1);
        }

        fetchCategoryData();

    };

    return (
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <section className='h-full w-full'>
                <Table aria-label='Tabla de categorias'
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    topContent={
                        <section className='grid flex-row w-full lg:flex gap-2'>
                            <section className="relative lg:absolute flex justify-left gap-2 sm:absolute">
                                <Tooltip color="danger" content="Eliminar Categoría/s">
                                    <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedCategories}>
                                        <DeleteIcon color="white" />
                                    </Button>
                                </Tooltip>
                                <Tooltip color="success" content="Añadir Categoría" className='text-white'>
                                    <Button isIconOnly color="success" className="text-lg  cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createCategory')}>
                                        <PlusIcon color="white" />
                                    </Button>
                                </Tooltip>
                            </section>
                            <section className='flex justify-center items-center h-auto w-full'>
                                <h1 className="text-center text-2xl font-bold">Listado de Categorias</h1>
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
                            <p>Categoría</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Categoria Padre</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        emptyContent="No hay categorías disponibles"
                    >
                        {Categories.map((category) => (
                            <TableRow key={category.category_id}>
                                <TableCell>
                                    <p className="text-bold text-sm capitalize">{category.category_name}</p>
                                    <p className="text-bold text-sm capitalize text-default-400"> Id de la categoría: {category.category_id}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="text-bold text-sm capitalize">{category.parent_category_name||"Ninguna"}</p>
                                    <p className="text-bold text-sm capitalize text-default-400"> {category.parent_category_id?`Id de la categoría: ${category.parent_category_id}`:''}</p>
                                </TableCell>
                                <TableCell>
                                    <section className="relative flex justify-center items-center gap-2">
                                        <Tooltip color="success" content="Editar Categoría" className="text-white">
                                            <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createCategory?id=${category.category_id}`)}>
                                                <EditIcon color="green"/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Eliminar Categoría">
                                            <Button isIconOnly color="danger" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => deleteCategory(category.category_id)}>
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

export default CategoryAdministration;