// UserMenu.js
import React, { use, useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Spinner } from "@nextui-org/react";
import UserImage from '../../users/userImage';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';


const UserMenu = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user, isAdmin, isLoggedIn , setIsLoggedIn } = useAppContext();
    const router = useRouter();
    
    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        setIsLoggedIn(false);
        router.push('/');
    };

    useEffect(() => {
        if (!user || user === null || user === undefined || !isLoggedIn ) {
            setIsLoading(true);
            return;
        }

        setIsLoading(false);
    }, [user, isLoggedIn, setIsLoading]);   
    
    return (
        isLoading ? <Spinner size="large" /> :
            <Dropdown>
                <DropdownTrigger style={{ zIndex: 1 }}>
                    <Button radius="full" size="lg" className='flex justify-center items-center pt-0 ' isIconOnly aria-label="User Menu">
                        <UserImage user={user}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Profile Actions"
                    closeOnSelect={false}
                >
                    <DropdownItem key="profile" className='dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:shadow-lg bg-gray-200 text-black border-gray-200 shadow-lg' textValue={user.email}>
                        <p className='font-bold'>Hola,</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="Settings" onClick={() => router.push('/users/config/DataUser')}>
                        Configuración
                    </DropdownItem>
                    {isAdmin && isAdmin === true ? (
                            <DropdownItem key="panel" textValue="panel" onClick={() => router.push('/admin/General')}>
                                <p>Panel de Administración </p>
                            </DropdownItem>
                    ) : null}
                    <DropdownItem key="team_settings" showDivider textValue="Delivered" onClick={() => router.push('/users/config/OrderList')}>
                        Pedidos
                    </DropdownItem>
                    <DropdownItem key="information" textValue="Help" onClick={() => router.push('/web/Information')}>
                        Información
                    </DropdownItem>
                    <DropdownItem key="Terminos y condiciones" textValue='Terms and conditions' onClick={() => router.push('/web/termsConditions')}>
                        Términos y condiciones
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback" textValue="Help" onClick={() => router.push('/web/help')}>
                        Ayuda
                    </DropdownItem>
                    <DropdownItem key="logout" textValue="Logout" className='p-0' >
                        <Button color="danger" className='w-full' onPress={() => handleLogout()}>
                            Cerrar Sesión
                        </Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
    );
};

export default UserMenu;