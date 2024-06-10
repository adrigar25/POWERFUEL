import { useEffect, useState } from 'react';
import { Button, Card, Tooltip } from '@nextui-org/react';
import AddressService from '@services/addressService';
import AddressForm from '@components/address/checkout/partials/addressForm';
import PlusIcon from '@icons/PlusIcon';
import EditIcon from '@icons/EditIcon';
import DeleteIcon from '@icons/DeleteIcon';

const AddressList = () => {
    const [addressList, setAddressList] = useState([]);
    const [editAddress, setEditAddress] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const fetchAddress = async () => {
        const addressData = await AddressService.getAddressByUserId();
        setAddressList(addressData.addresses);
        if(addressData.length === 0) {
            setShowForm(true);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, [showForm]);

    const deleteAddress = async (addressId) => {
        await AddressService.deleteAddress(addressId);
        fetchAddress();
    };

    const handleEdit = (address) => {
        setShowForm(true);
        setEditAddress(address);
    }

    const handleAddAddress = () => {
        setEditAddress(null);
        setShowForm(true);
    }

    const setDefaultAddress = async (addressId) => {
        await AddressService.setDefaultAddress(addressId);
        fetchAddress();
    };

    return (
        <section className="flex flex-col gap-4 p-6" >
            <h1 className="font-bold text-3xl mb-4">Lista de direcciones de envio</h1>
            {showForm && (
                <section className='w-auto flex flex-col justify-center gap-3'>
                    <AddressForm
                        setShowForm={setShowForm}
                        editAddress={editAddress}
                        setEditAddress={setEditAddress}
                    />
                    {addressList.length !== 0 && (
                        <Button 
                            onClick={() => setShowForm(false)}
                        >
                            Cancelar
                        </Button>
                    )}
                </section>
            )}
            {!showForm && (
                <section>
                    <section className='flex flex-row justify-start items-center w-full mb-4'>
                        <Tooltip content="Añadir dirección" color='primary'>
                            <Button 
                                onClick={handleAddAddress} 
                                isIconOnly
                                color='primary'
                            >
                                <PlusIcon />
                            </Button>
                        </Tooltip>
                    </section>
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                        {addressList.map((address, index) => (
                            <Card key={index} shadow className="p-4 flex-col justify-between">
                                <section>
                                    <p className="font-semibold text-lg mb-2">{address.street}</p>
                                    <p className="mb-1">{address.city}</p>
                                    <p className="mb-1">{address.province}</p>
                                    <p className="mb-1">{address.zip}</p>
                                    <p className="mb-1">{address.country}</p>
                                    <p className="mb-1">{address.phone_number}</p>
                                </section>
                                <section className="flex justify-start items-center mt-4 gap-2 ">
                                    <Tooltip content="Editar" color='success'>
                                        <Button 
                                            isIconOnly
                                            onClick={() => handleEdit(address)}
                                            color='success'
                                        >
                                            <EditIcon color="white"/>
                                        </Button>
                                    </Tooltip>
                                    <Tooltip content="Borrar" color='danger'>
                                        <Button 
                                            isIconOnly
                                            onClick={() => deleteAddress(address.address_id)}
                                            color='danger'
                                        >
                                            <DeleteIcon color="white"/>
                                        </Button>
                                    </Tooltip>
                                    {address.is_default == 0 && (
                                        <Tooltip content="Establecer como predeterminada" color='warning'>
                                        <Button 
                                            isIconOnly
                                            onClick={() => setDefaultAddress(address.address_id)}
                                            color='warning'
                                        >
                                            <PlusIcon />
                                        </Button>
                                    </Tooltip>
                                    )}
                                </section>
                            </Card>
                        ))}
                    </section>
                </section>
            )}
        </section>
    );
}

export default AddressList;