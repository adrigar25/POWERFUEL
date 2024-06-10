import React, { useEffect } from 'react';
import { Button, Modal, ModalContent, User, useDisclosure } from "@nextui-org/react";
import AuthTabs from './partials/authTabs';
import { motion } from 'framer-motion';
import UserIcon from '@icons/UserIcon';
import { useAppContext } from '@context/AppContext';

const AuthMenu = () => {
    const { isAuthOpen , onOpenAuthMenu } = useAppContext();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                onOpenAuthMenu(true)
            }
        };
    
        // Agregar el event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Devolver una función para limpiar el event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <motion.section layout className="flex flex-col gap-2">
            <Button onClick={onOpenAuthMenu} className='hidden sm:flex'>Iniciar sesión</Button>
            <Button onClick={onOpenAuthMenu} isIconOnly className='flex sm:hidden'>
                <UserIcon/>
            </Button>
            <Modal isOpen={isAuthOpen} onClose={() => {onOpenAuthMenu(false)}} className='p-8 overflow-hidden' backdrop="blur" >
                <ModalContent className="w-12/12">
                    <AuthTabs/>
                </ModalContent>
            </Modal>
        </motion.section>
    );
};

export default AuthMenu;