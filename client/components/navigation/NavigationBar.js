import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Image, Button } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import { ThemeSwitch } from '@components/theme-switch';
import SideMenu from '@components/navigation/partials/SideMenu';
import SearchBar from '@components/navigation/partials/SearchBar';
import UserMenu from '@components/navigation/partials/userMenu';
import CartMenu from '@components/navigation/partials/cartMenu';
import AuthMenu from '@components/auth/authMenu';
import NotificationMenu from '@components/navigation/partials/notificationMenu';
import BrandLogo from '@icons/BrandLogo';
import { SearchIcon } from '@icons/SearchIcon';

import { useRouter } from 'next/router';
import Link from 'next/link';

const NavigationBar = () => {
    const { isLoggedIn } = useAppContext();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const router = useRouter();
    const currentPath = router.pathname;

    const handleSearchButtonClick = () => {
        setIsSearchVisible(!isSearchVisible);
    };
    return (
        <Navbar isBordered className={`w-full flex items-center py-4 ${currentPath === '/' ? '' : 'bg-default-50'}`}>
            <NavbarContent className='w-full flex flex-row justify-between'>
                <NavbarItem>
                    <SideMenu />
                </NavbarItem>
                <NavbarItem className="px-1 ">
                    <Link href='/' className='flex flex-row justify-center items-center gap-2 focus:outline-primary'>
                        <section className='w-12'>
                            <BrandLogo />
                        </section>
                        <h1 className="font-bold text-3xl md:block hidden">PowerFuel</h1>
                    </Link>
                </NavbarItem>
                <NavbarItem className='flex-grow w-full h-full flex flex-row items-center'>
                    <div className='sm:block hidden w-full'>
                        <SearchBar />
                    </div>
                    <div className='sm:hidden w-full flex justify-end'>
                        <Button isIconOnly onClick={handleSearchButtonClick}><SearchIcon size={16} /></Button>
                    </div>
                </NavbarItem>
                <NavbarItem className='h-full flex flex-row items-center '>
                    <CartMenu />
                </NavbarItem>
                {isLoggedIn &&
                    <NavbarItem className='h-full hidden sm:flex flex-row items-center'>
                        <NotificationMenu />
                    </NavbarItem>
                }
                <NavbarItem className='h-full flex flex-row items-center'>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className='h-full flex flex-row items-center '>
                    {isLoggedIn ?
                        (
                            <UserMenu />
                        ) : (
                            <AuthMenu />
                        )
                    }
                </NavbarItem>
            </NavbarContent>
            <div className='absolute top-full w-[92%] sm:hidden block'>
                {isSearchVisible && <SearchBar />}
            </div>
        </Navbar>
    );
};

export default NavigationBar;