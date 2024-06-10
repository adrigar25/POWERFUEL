// AddressMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalContent, ModalFooter, Tabs, Tab } from '@nextui-org/react';
import { useRouter } from 'next/router';
import AddressService from '@services/addressService';
import AddressList from '@components/address/checkout/partials/addressList';
import AddressForm from '@components/address/checkout/partials/addressForm';

const AddressMenu = ({setSelectedAddress}) => {
    const [ UserAddress, SetUserAddress ] = useState([]);
    const [ showForm, setShowForm ] = useState(false);
    const [ editAddress, setEditAddress ] = useState(null);

    const fetchAddress = async () => {
        const addressData = await AddressService.getAddressByUserId();
        SetUserAddress(addressData.addresses);
        if(!addressData.addresses || addressData.addresses.length === 0) {
            setShowForm(true);
        }
    };

    useEffect(() => {
        if(!showForm){
            fetchAddress();
        }
    }, [showForm]);

    const handleDelete = async (id) => {
        await AddressService.deleteAddress(id);
        fetchAddress();
    }

    const handleEdit = (address) => {
        setShowForm(true);
        setEditAddress(address);
        fetchAddress();
    }
    const handleOpenAddForm = () => {
        setShowForm(true);
        setEditAddress(null);

    }

    return (
        <section className="flex flex-col items-center w-full">
                <section className='w-full'>
                    {!showForm && UserAddress?.length > 0 && (
                        <section className="flex flex-col items-center gap-4 w-full p-8">
                            <h2 className="text-2xl font-bold">Seleccionar dirección</h2>
                            <section className='flex flex-row justify-end items-center w-full p-0'>
                                <Button 
                                    onPress={handleOpenAddForm} 
                                    isIconOnly
                                    className='m-o'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </Button>
                            </section>
                            <section className="w-full">
                                <AddressList 
                                    addressList={UserAddress}
                                    handleDelete={handleDelete}
                                    handleEdit={handleEdit}
                                    setSelectedAddress={setSelectedAddress}
                                />
                            </section>
                        </section>
                    )}
                    {showForm &&(
                        <section className="flex flex-col items-center ">
                            <AddressForm setShowForm={setShowForm} editAddress={editAddress} setEditAddress={setEditAddress}/>
                            {UserAddress?.length !== 0 && (
                                <Button onPress={() => setShowForm(false)} className="w-full">Cancelar</Button>
                            )}
                        </section>
                    )}
                </section>
        </section>
    );
};

export default AddressMenu;