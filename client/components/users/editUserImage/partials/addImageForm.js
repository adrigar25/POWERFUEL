import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';

const AddImageForm = ({onOpenChange}) => {
    const [image, setImage] = useState();
    const router = useRouter();

    const handleImageUpload = (event) => {
        event.preventDefault();
        UserService.setUserImage(image)
            .then(responseData => {
                onOpenChange(false);
                router.reload();
            })
            .catch(error => {
                onOpenChange(false)
            });
    };

    return (
        <form className='grid'>
            <h2 className="text-2xl font-bold">Añadir Imagen:</h2>
            <section className="mb-4">
                <input 
                    type='file' 
                    multiple 
                    id='image' 
                    className="w-full px-4 py-2 rounded-lg" 
                    onChange={(e) => {
                        setImage(e.target.files[0]);
                    }}
                />
            </section>
            <Button type="submit" className='bg-gray-400 text-black' onClick={handleImageUpload}>Guardar</Button>
        </form>
    );
};

export default AddImageForm;