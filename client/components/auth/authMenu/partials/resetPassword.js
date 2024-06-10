import React, { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import UserService from '@services/userService';

const resetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try{
            if (!codeSent) {
                const emailInput = email;
                try {
                    setLoading(true);
                    await UserService.getPasswordResetCode(emailInput);
                    setLoading(false);
                    setCodeSent(true);
                } catch (error) {
                    setCodeSent(false);
                    console.error("Error al enviar el correo de reseteo de contraseña: ", error);
                }
            } else if (!codeVerified){
                try{
                    setIsLoading(true);
                    await UserService.verifyPasswordResetCode(email, code);
                    setIsLoading(false);
                    setCodeVerified(true);
                } catch (error) {
                    console.error("Error al verificar el código de reseteo de contraseña", error);
                }
            } else if (codeVerified) {
                try {
                    setIsLoading(true);
                    await UserService.resetPassword(email, code, newPassword, confirmPassword);
                    setIsLoading(false);
                    router.push('/');
                } catch (error) {
                    console.error("Error al resetear la contraseña", error);
                }
            }
        }catch(err){
            console.error(err);
        }
    };

    const renderFormContent = () => {
        if (loading) {
            return <Spinner />;
        } else if (!codeSent) {
            return (
                <Input 
                    className="w-full mt-16"
                    type="email" 
                    label="Correo Electrónico de recuperación"
                    onChange={(e) => setEmail(e.target.value)}
                />
            );
        } else if (!codeVerified) {
            return (
                <Input 
                    className="w-full mt-16"
                    type="text" 
                    label="Código de verificación"
                    defaultValue={""}
                    onChange={(e) => setCode(e.target.value)}
                />
            );
        } else {
            return (
                <>
                    <Input 
                        type="password" 
                        label="Nueva contraseña"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Input 
                        type="password" 
                        label="Confirmar nueva contraseña"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </>
            );
        }
    };

    return (
        <section className="w-full">
            <form 
                className="w-full flex flex-col gap-4"
                onSubmit={handleResetPassword}
            >
                {renderFormContent()}
                <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Enviar'}</Button>
            </form>
        </section>
    );
};

export default resetPassword;

    
