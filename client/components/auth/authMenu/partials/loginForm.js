// LoginForm.js
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import UserService from '@services/userService';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  { setIsLoggedIn } = useAppContext();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const emailInput = email;
            const passwordInput = password;
            try {
                await UserService.loginUser(emailInput, passwordInput);
                setIsLoggedIn(true);
                router.push('/');
              } catch (error) {
                console.error("Error during login: ", error);
                setIsLoggedIn(false);
              }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="w-full grid gap-6 z-99">
            <form
                onSubmit={handleLogin}
                className='flex flex-col w-full justify-between gap-5'
            >
                    <Input
                        fullWidth
                        name="email"
                        type="email"
                        label="Email"
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Iniciar sesión'}</Button>
            </form>
        </section>
    );
};

export default LoginForm;