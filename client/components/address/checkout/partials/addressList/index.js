import React, { useState, useEffect } from 'react';
import AddressItem from './partials/addressItem';
import { RadioGroup, Radio , cn} from '@nextui-org/react';

const AddressList = ({addressList, handleDelete, handleEdit, setSelectedAddress}) => {
    const [selectedRadio, setSelectedRadio] = useState(null);

    useEffect(() => {
        const defaultAddress = addressList.find(address => address.is_default === 1);
        if (defaultAddress) {
            setSelectedRadio(defaultAddress.address_id);
            setSelectedAddress(defaultAddress.address_id);
        }
    }, [addressList]);

    const handleValueChange = (value) => {
        setSelectedRadio(value);
        setSelectedAddress(value);
    }

    return (
        <section className="flex flex-col w-full items-center">
            <RadioGroup 
                value={selectedRadio} 
                onValueChange={handleValueChange}
                className='w-full'
            >
                {addressList.map((address) => (
                    <Radio
                        key={address.address_id}
                        value={address.address_id}
                        classNames={{
                            base: cn(
                            " m-0 bg-content1 hover:bg-content2 items-center",
                            " max-w-[100%] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                            "data-[selected=true]:border-primary border-default",
                            ),
                        }}
                    >
                        <AddressItem
                            address={address}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    </Radio>
                ))}
            </RadioGroup>   
        </section>
    );
};

export default AddressList;