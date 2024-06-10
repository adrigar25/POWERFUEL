import React, { useState, useEffect } from 'react';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip, Button, Pagination, Spinner} from "@nextui-org/react";
import { useRouter } from 'next/router';
import UserService from '@services/userService';
import DeleteIcon from '@icons/DeleteIcon';
import EyeIcon from '@icons/EyeIcon';
import EditIcon from '@icons/EditIcon';
import PlusIcon from '@icons/PlusIcon';
import useTitle from '@hooks/useTitle'; 


const statusColorMap = {
    "Activo": "success",
    "Inactivo": "danger",
    "Suspendido": "warning",
};  

const UserAdministration = () => {
    const router = useRouter();
    const [Users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);
    useTitle('Administración de Usuarios');

    useEffect(() => {
        setIsLoading(true);
        const fetchUserData = async () => {
            const response = await UserService.getAllUsersInfo(page);
            setUsers(response.users??[]);
            setTotalPages(response.pages);
            setIsLoading(false);
        }
        fetchUserData();
    }, [page]);

    const deleteUser = async (userId) => {
        await UserService.deleteUser(userId);
        setUsers(Users.filter(user => user.user_id !== userId));

        if (Users.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    const deleteSelectedUsers = async () => {

        if (selectedKeys === "all") {
            for (const user of Users) {
                await deleteUser(user.user_id);
            }
            setUsers([]);
            setSelectedKeys([]);
            setPage(1);
            return;
        }

        for (const userId of selectedKeys) {
            await deleteUser(userId);
            setUsers(Users.filter(user => user.user_id !== userId));
        }
        setSelectedKeys([]);

        if (Users.length === 1 && page > 1) {
            setPage(page - 1);
        }
    };

    return (
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <section className='h-[100%]'>
                <Table 
                    aria-label='Tabla de usuarios'
                    selectionMode="multiple"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    topContent={
                        <section className='flex flex-col sm:flex-row w-full justify-between items-start sm:items-center'>
                            <section className="flex justify-left gap-2 sm:absolute">
                                <Tooltip color="danger" content="Eliminar Rol/es">
                                    <Button isIconOnly color="danger" className="text-lg cursor-pointer active:opacity-50" onClick={deleteSelectedUsers}>
                                        <DeleteIcon color="white" />
                                    </Button>
                                </Tooltip>
                                <Tooltip color="success" content="Añadir Rol" className='text-white'>
                                    <Button isIconOnly color="success" className="text-lg  cursor-pointer active:opacity-50" onClick={() => router.push('/admin/create/createUser')}>
                                        <PlusIcon color="white" />
                                    </Button>
                                </Tooltip>
                            </section>
                            <section className='flex justify-center items-center h-auto w-full'>
                                <h1 className="text-center text-2xl font-bold">Listado de Usuarios</h1>
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
                            <p>Usuario</p>
                        </TableColumn>
                        <TableColumn>
                            <p>DNI</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Role</p>
                        </TableColumn>
                        <TableColumn>
                            <p>Estado</p>
                        </TableColumn>
                        <TableColumn className='flex justify-center items-center'>
                            <p>Acciones</p>
                        </TableColumn>
                    </TableHeader>
                    <TableBody
                        emptyContent="No hay usuarios disponibles"
                    >
                        {Users.map((user) => (
                            <TableRow key={user.user_id}>
                                <TableCell>
                                    <User
                                        avatarProps={{radius: "lg", src: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/user/${user.user_id}/1.png`}}
                                        description={user.email}
                                        name={user.first_name + " " + user.last_name}
                                    >
                                        {user.email}
                                    </User>
                                </TableCell>
                                <TableCell>
                                    <p>{user.dni}</p>
                                </TableCell>
                                <TableCell>
                                    <section className="flex flex-col">
                                        <p className="text-bold text-sm capitalize">{user.role_name}</p>
                                        <p className="text-bold text-sm capitalize text-default-400">Id Role: {user.role_id}</p>
                                    </section>
                                </TableCell>
                                <TableCell>
                                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                                        {user.status}
                                    </Chip>
                                </TableCell>
                                <TableCell>
                                    <section className="relative flex justify-center items-center gap-2">
                                        <Tooltip color="primary" content="Detalles">
                                            <Button isIconOnly color="primary" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createUser?readOnly=true&&id=${user.user_id}`)}>
                                                <EyeIcon color="primary" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="success" content="Editar Usuario" className="text-white">
                                            <Button isIconOnly color="success" variant="light" className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => router.push(`/admin/create/createUser?id=${user.user_id}`)}>
                                                <EditIcon color="green"/>
                                            </Button>
                                        </Tooltip>
                                        <Tooltip color="danger" content="Eliminar Usuario">
                                            <Button isIconOnly color="danger" variant="light" className="text-lg cursor-pointer active:opacity-50" onClick={() => deleteUser(user.user_id)}>
                                                <DeleteIcon color="red" />
                                            </Button>
                                        </Tooltip>
                                    </section>
                                </TableCell>
                            </TableRow>   
                        ) , [])}
                    </TableBody>
                </Table>
            </section>
        )
    );
};

export default UserAdministration;