import React, { use, useCallback, useEffect, useState } from 'react';
import { Button, Modal, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import AddressMenu from '@components/address/checkout';
import PaymentMenu from '@components/payments/checkout';
import { useAppContext } from '@context/AppContext';
import { on } from 'events';

const CheckOut = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [currentStep, setCurrentStep] = useState(1);
    const { isLoggedIn } = useAppContext();
    const { onOpenAuthMenu } = useAppContext();

    const handleContinue = (volver=false) => {
        if(!volver) {
            setCurrentStep(2);
        }else{
            setCurrentStep(1);
        }
    }

    useEffect(() => {
        setCurrentStep(1);
        setSelectedAddress(null);
    },[isOpen]);

    useEffect(() => {
        if(currentStep === 2 && selectedAddress){
            localStorage.setItem('shipping_address', JSON.stringify(selectedAddress));
        }
    },[currentStep, selectedAddress]);

    useEffect(() => {
        if (!isLoggedIn && isOpen) {
            onOpenChange(false);
            onOpenAuthMenu(true);
        }
    }, [isLoggedIn, isOpen]);
    
    return (
        <section className='w-full flex justify-center'>
            <Button onPress={onOpen} className='items-center bg-green-200 hover:bg-green-500 sticky bottom-0 z-10 flex justify-center w-full sm:w-1/2' color='success'>
                <p>Pagar</p>
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='' backdrop="blur">
                <ModalHeader className="flex flex-col gap-1">Pagar</ModalHeader>
                <ModalContent className='flex flex-col items-center'>
                    {isLoggedIn && currentStep === 1 && (
                        <AddressMenu 
                            setSelectedAddress={setSelectedAddress}
                        />
                    )}
                    {isLoggedIn && currentStep === 2 && (
                        <PaymentMenu/>
                    )}
                    {isLoggedIn && currentStep === 3 && (
                        <p>Pago realizado correctamente</p>
                    )}
                    <ModalFooter className='w-full'>
                        {isLoggedIn && currentStep === 1 && (
                            <Button fullWidth color="default" onPress={() => handleContinue()}>Continuar</Button>
                        )}
                        {isLoggedIn && currentStep === 2 && (
                            <Button fullWidth color="default" onPress={() => handleContinue(true)}>Volver</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    );
};

export default CheckOut;