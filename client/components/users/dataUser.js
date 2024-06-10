import React, { useState, useEffect } from 'react';
import EditUserImage from '@components/users/editUserImage';
import UserImage from '@components/users/userImage';
import UserService from '@services/userService';
import { Input, Button, Image, Link , Skeleton, Card, Divider, CardHeader, CardBody, CardFooter, Avatar } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import useTitle from '@hooks/useTitle';

const DataUser = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser} = useAppContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordErrors, setPasswordErrors] = useState({});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const dniRegex = /^\d{8}[A-Za-z]$/;
    const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const [formState, setFormState] = useState({
        email: user ? user.email : '',
        first_name: user ? user.first_name : '',
        last_name:  user ? user.last_name : '',
        dni: user ? user.dni : ''
    });

    useTitle('Mis Datos');

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await UserService.updateUser( user.user_id, formState);
                setUser({...user, ...formState});
                if (!response) {
                    console.log('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        let newErrors = { ...errors };

        setFormState({ ...formState, [name]: value });
    
        switch (name) {
            case 'email':
                if (!emailRegex.test(value)) error = 'El correo debe ser un correo válido (ejemplo: usuario@dominio.com)';
                break;
            case 'first_name':
                if (!nameRegex.test(value)) error = 'El nombre debe contener solo letras y espacios';
                break;
            case 'last_name':
                if (!nameRegex.test(value)) error = 'El apellido debe contener solo letras y espacios';
                break;
            case 'dni':
                if (!dniRegex.test(value)) error = 'El DNI debe contener solo números y tener 8 dígitos';
                break;
            default:
                break;
        }
    
        newErrors[name] = error;
        setErrors(newErrors);
    }

    const resetPasswordInputs = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handlePasswordChange = (e, name) => {
        let error = '';
        let newErrors = { ...errors };
    
        switch(name) {
            case 'oldPassword':
                setOldPassword(e.target.value);
                break;
            case 'newPassword':
                setNewPassword(e.target.value);
                if (!passwordRegex.test(e.target.value)) error = 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula, un número o un carácter especial.';
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
            default:
                break;
        }
    
        newErrors[name] = error;
        setPasswordErrors(newErrors);
    }

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    const changePassword = async () => {
        try {
            const response = await UserService.changePasswordUser(oldPassword, newPassword, confirmPassword);
            if (!response) {
                console.log('Error changing password');
            }else{
                resetPasswordInputs();
            }
        } catch (error) {
            console.error('Error changing password:', error.message);
        }
    }

    return (
        <main className='grid sm:p-10 w-64 sm:w-full gap-6 mx-auto'>
            <section className='flex flex-raw pb-5 gap-3 lg:gap-5 items-center'>
                <section className='rounded'>
                    <Skeleton isLoaded={!isLoading} className="rounded-full">
                        {user &&
                            <EditUserImage >
                                <UserImage user={user} className="rounded-full object-cover"/>
                            </EditUserImage>
                        }
                    </Skeleton>
                </section>
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2 w-full sm:w-auto">
                    <p className="font-bold text-center sm:text-left">{user ? user.email : ''}</p>
                </Skeleton>
            </section>
            <section className='w-full grid gap-3 md:flex'>
                <form className='w-full flex flex-col gap-5'>
                    <Input type='text' className='w-full' value={formState.email} onChange={onChange} disabled={!isEditing} label="Email:" name="email" isInvalid={errors.email} />
                    <Input type='text' className='w-full' value={formState.first_name} onChange={onChange} disabled={!isEditing} label="Nombre:" name="first_name" isInvalid={errors.first_name} />
                    <Input type='text' className='w-full' value={formState.last_name} onChange={onChange} disabled={!isEditing} label="Apellido:" name="last_name" isInvalid={errors.last_name} />
                    <Input type='text' className='w-full' value={formState.dni} onChange={onChange} disabled={!isEditing} label="DNI:" name="dni" isInvalid={errors.dni} />
                    <Button color={isEditing ? 'primary' : 'default'} onClick={toggleEdit} className='w-full'>{isEditing ? 'Guardar' : 'Editar'}</Button>
                </form>
                <Divider orientation='vertical' />
                <section className='w-full flex flex-col gap-5'>
                    <Card className='p-4'>
                        <CardHeader>
                            <h2 className='text-xl font-bold'>Cambiar Contraseña</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody className='grid gap-3'>
                            <Input type='password' className='w-full' value={oldPassword} onChange={(e) => handlePasswordChange(e, 'oldPassword')} label="Contraseña antigua:" name="oldPassword" />
                            <Input type='password' className='w-full' value={newPassword} onChange={(e) => handlePasswordChange(e, 'newPassword')} label="Contraseña nueva:" name="newPassword" />
                            <Input type='password' className='w-full' value={confirmPassword} onChange={(e) => handlePasswordChange(e, 'confirmPassword')} label="Confirmar contraseña :" name="confirmPassword" />
                        </CardBody>
                        <section>
                            {Object.keys(passwordErrors).map((key, index) => (
                                <p key={index} className='text-tiny text-danger'>{passwordErrors[key]}</p>
                            ))}
                        </section>
                        <Divider />
                        <CardFooter className='justify-between'>
                            <Button color='default' className='w-12 sm:w-32' onClick={resetPasswordInputs}>Borrar</Button>
                            <Button color='primary' className='w-12 sm:w-32' disabled={newPassword !== confirmPassword} onClick={changePassword}>Cambiar</Button>
                        </CardFooter>
                    </Card>
                </section>
            </section>
        </main>
    )
}

export default DataUser;