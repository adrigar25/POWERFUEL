
import React, { useEffect } from 'react';
import DefaultLayout from '@layouts/default';
import {NextUIProvider, Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import HomeComponent from '@pages/home/index';

const HomePage = () => {

    return (
        <NextUIProvider >
            <HomeComponent />
        </NextUIProvider>
    );
};

export default HomePage;