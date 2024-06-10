import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '@context/AppContext';
import SideMenu from '@components/users/sideMenu';
import DataUser from '@components/users/dataUser';
import AddressList from '@components/address/addressList';
import NotificationList from '@components/notification/NotificationList';
import OrderList from '@components/orders/orderList';

const Config = () => {
    const router = useRouter();
    const routerRef = useRef(router);
    const { user, setUser, isLoggedIn} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    const components = {
        'DataUser': <DataUser />,
        'AddressList': <AddressList />,
        'NotificationList': <NotificationList />,
        'OrderList': <OrderList />,
    };

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn) {
                routerRef.current.push('/');
            } else {
                setIsLoading(false);
            }
        }, 1000);
    
        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn]);

    useEffect(() => {
        if (router.isReady) {
            const view = router.asPath.split('/')[3] || 'DataUser';
            setSelectedOption(view);
        }
    }, [router.asPath, router.isReady]);

    useEffect(() => {
        if (selectedOption) {
            routerRef.current.replace(`/users/config/${selectedOption}`, undefined, { shallow: true });
        }
    }, [selectedOption]);


    if (!selectedOption) {
        return null;
    }

    return (
        <section className='h-full flex flex-col sm:flex-row w-full gap-3 p-3'>
            <section>
                <SideMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            </section>
            <section className="w-full p-4 flex-1">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedOption}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='lg:pr-36'
                    >
                        {components[selectedOption]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    );
}
export default Config;