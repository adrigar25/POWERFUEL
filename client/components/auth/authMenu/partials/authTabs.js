import React, { useState } from 'react';
import { Tabs, Tab, Button } from '@nextui-org/react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import ResetPassword from './resetPassword';
import { AnimatePresence, motion } from 'framer-motion';

const AuthTabs = () => {
    const [selectedTab, setSelectedTab] = useState('login');
    const [direction, setDirection] = useState(1);

    const handleTabChange = (newTab) => {
        setDirection(newTab === 'login' ? 1 : -1);
        setSelectedTab(newTab);
    };

    const pageVariants = {
        inRight: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        outRight: {
            opacity: 0,
            x: "100%",
            scale: 0.8,
        },
        inLeft: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        outLeft: {
            opacity: 0,
            x: "-100%",
            scale: 0.8,
        }
    };

    return (
        <section
            className='h-96 flex flex-col gap-4 justify-top items-center overflow-hidden'
        >
            {selectedTab !== "resetPassword" && (
                <Tabs
                    fullWidth
                    aria-label="Admin Tabs"
                    selectedKey={selectedTab}
                    onSelectionChange={handleTabChange}
                    className="w-auto"
                >
                    <Tab key="login" title="Iniciar sesión" className="w-full" />
                    <Tab key="register" title="Registrarse" className="w-full" />
                </Tabs>
            )}
            <AnimatePresence 
                mode="sync"
            >
                <section className='w-96'>
                    {selectedTab === 'login' && (
                        <motion.div
                            className='absolute top-24 left-16 right-16 w-auto h-auto flex flex-col gap-4 justify-center items-center p-2 overflow-hidden'
                            key="loginMotion"
                            initial="outLeft"
                            animate="inLeft"
                            exit="outLeft"
                            variants={pageVariants}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30, mass: 0.3 },
                                opacity: { duration: 0.1 } // Reduced duration
                            }}
                        >
                            <h2 className='font-bold text-xl'>Iniciar sesión</h2>
                            <LoginForm />
                            <section className='w-full flex justify-center'>
                                <Button 
                                    className="text-center text-sm text-gray-500 bg-transparent h-fit w-fit"
                                    onPress={() => setSelectedTab('resetPassword')}
                                >¿Olvidaste tu contraseña?</Button>
                            </section>
                        </motion.div>
                    )}
                    {selectedTab === 'register' && (
                        <motion.div                      
                            className='absolute top-24 left-16 right-16 w-auto h-auto flex flex-col gap-4 justify-center items-center p-2 overflow-hidden'
                            key="registerMotion"
                            initial="outRight"
                            animate="inRight"
                            exit="outRight"
                            variants={pageVariants}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30, mass: 0.3 },
                                opacity: { duration: 0.1 } // Reduced duration
                            }}
                        >
                            <h2 className='font-bold text-xl'>Registrarse</h2>
                            <RegisterForm />
                        </motion.div>
                    )}
                    {selectedTab === 'resetPassword' && (
                        <motion.div                      
                            className='absolute top-14 left-16 right-16 w-auto h-auto flex flex-col gap-8 justify-center items-center p-2 overflow-hidden'
                            key="resetPasswordMotion"
                            initial="outRight"
                            animate="inRight"
                            exit="outRight"
                            variants={pageVariants}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30, mass: 0.3 },
                                opacity: { duration: 0.1 } // Reduced duration
                            }}
                        >
                            <h2 className='font-bold text-xl'>Restablecer contraseña</h2>
                            <section className='w-full flex flex-col gap-3 justify-center items-center'>
                                <ResetPassword />
                                <Button 
                                    className="text-center text-sm text-gray-500 bg-transparent h-fit w-fit"
                                    onPress={() => setSelectedTab('login')}
                                >
                                    Iniciar sesión
                                </Button>
                            </section>
                        </motion.div>
                    )}
                </section>
            </AnimatePresence>
        </section>
    );
};

export default AuthTabs;