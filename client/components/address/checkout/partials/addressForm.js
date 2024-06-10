import React, { useState, useEffect } from 'react';
import {Input, Button} from '@nextui-org/react';
import AddressService from '@services/addressService';

const AddressForm = ({setShowForm, editAddress ,setEditAddress}) => {
    const [formState, setFormState] = useState({
        street: '',
        city: '',
        country: '',
        zip: '',
        province: '',
        phone_number: ''
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    
        let formErrors = { ...errors };
    
        switch (name) {
            case 'street':
            case 'city':
            case 'country':
            case 'province':
                if (!value.trim()) formErrors[name] = "Este campo es requerido";
                else delete formErrors[name];
                break;
            case 'zip':
                if (!/^\d+$/.test(value)) formErrors.zip = "Código Postal no válido. Debe ser un número entero";
                else delete formErrors.zip;
                break;
            case 'phone_number':
                if (!/^\d+$/.test(value)) formErrors.phone_number = "Número de teléfono no válido. Debe ser un número entero";
                else delete formErrors.phone_number;
                break;
            default:
                break;
        }
    
        setErrors(formErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { street, city, country, zip, province, phone_number } = formState;
        const address = {
            street,
            city,
            country,
            zip,
            province,
            phone_number
        };
        try {
            let response;
            if (editAddress) {
                response = await AddressService.updateAddress(editAddress.address_id, address);
                if (response) {
                    setEditAddress(null);
                }
            } else {
                response = await AddressService.addAddress(address);
            }
            setShowForm(response ? false : true);
        } catch (error) {
            console.error("Ha ocurrido un error al añadir la dirección", error);
        }
    }

    useEffect(() => {
        
        if (editAddress) {
            setFormState({
                street: editAddress.street,
                city: editAddress.city,
                country: editAddress.country,
                zip: editAddress.zip,
                province: editAddress.province,
                phone_number: editAddress.phone_number
            });
        }
    }
    , [editAddress]);

    return (
        <section className="w-full">
            <h2 className="text-2xl font-bold">Añadir dirección</h2>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3 justify-content w-full'>
                <section className="flex flex-row justify-center gap-3 items-center w-full">
                    <section className="flex flex-col justify-center gap-3 items-center w-full">
                        <Input name="street" label="Dirección:" value={formState.street} onChange={handleChange}  isInvalid={errors.street}/>
                        <Input name="city" label="Ciudad:" value={formState.city} onChange={handleChange}  isInvalid={errors.city}/>
                        <Input name="zip" label="Código Postal:" value={formState.zip} onChange={handleChange}  isInvalid={errors.zip}/>
                    </section>
                    <section className="flex flex-col justify-center gap-3 items-center w-full">
                        <Input name="province" label="Provincia/Estado:" value={formState.province} onChange={handleChange}  isInvalid={errors.province}/>
                        <Input name="country" label="País:" value={formState.country} onChange={handleChange}  isInvalid={errors.country}/>
                        <Input name="phone_number" label="Teléfono:" value={formState.phone_number} onChange={handleChange}  isInvalid={errors.phone_number}/>
                    </section>
                </section>
                <section>
                    {Object.keys(errors).map((key, index) => (
                        <p key={index} className="text-red-500">{errors[key]}</p>
                    ))}
                </section>
                <Button color="primary" auto onClick={handleSubmit}>
                    {editAddress ? 'Guardar cambios' : 'Añadir dirección'}
                </Button>
            </form>
        </section>
    );
};

export default AddressForm;