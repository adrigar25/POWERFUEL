import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '@context/AppContext';
import GeneralAdministration from './generalAdministration';
import SideMenuAdministrador from "./SideMenuAdministrador";
import UserAdministration from "./userAdministration";
import RoleAdministration from "./roleAdministration";
import ProductoAdministration from "./productAdministration";
import CategoryAdministration from "./categoryAdministration";
import BrandAdministration from './brandAdministration';
import OrderAdministration from "./orderAdministration"
import {Divider} from '@nextui-org/react';

const Administrador = () => {
    const router = useRouter();
    const { user } = useAppContext();
    const [selectedOption, setSelectedOption] = useState('General');

    const components = {
        'General': <GeneralAdministration />,
        'Usuarios': <UserAdministration />,
        'Roles': <RoleAdministration />,
        'Productos': <ProductoAdministration />,
        'Categorias': <CategoryAdministration />,
        'Marcas': <BrandAdministration />,
        'Pedidos': <OrderAdministration />,
    };

    useEffect(() => {
        if (router.isReady) {
            const view = router.asPath.split('/')[2] || 'General';
            setSelectedOption(view);
            console.log(view);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (selectedOption && router.asPath.split('/')[2] !== selectedOption) {
            router.replace(`/admin/${selectedOption}`, undefined, { shallow: true });
        }
    }, [selectedOption, router]);

    return (
        <section className="h-full flex flex-col sm:flex-row w-full gap-3 p-3">
            <section>
                <SideMenuAdministrador setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            </section>
            <section className='w-full h-full '>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedOption}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='w-full h-full'
                    >
                        {components[selectedOption]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    );
}

export default Administrador;
