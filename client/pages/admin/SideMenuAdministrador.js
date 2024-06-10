import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import { Button, Select, SelectItem, Divider, Card, CardHeader, CardBody } from '@nextui-org/react';

const SideMenuAdministrador = ({ selectedOption,setSelectedOption }) => {
    const { user } = useAppContext();
    const [roleUser, setRoleUser] = useState("");

    const ADMIN_ACTIONS = {
        '99': ['General', 'Usuarios', 'Roles', 'Productos', 'Categorias', 'Pedidos', 'Marcas'],
        '96': ['General', 'Usuarios', 'Roles', 'Pedidos', 'Productos', 'Categorias'],
        '94': ['General', 'Productos', 'Categorias', 'Pedidos', 'Marcas'],
        '97': ['General', 'Productos', 'Pedidos', 'Categorias'],
        '95': ['General', 'Usuarios', 'Roles'],
        '98': ['General', "Usuarios"]
    };


    useEffect(() => {
        if (user) {
            setRoleUser(user.role_id);
        }

    }, [user]);

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <Card className='w-full sm:w-64 h-full flex flex-col items-center lg:items-start p-4 '>
            <CardHeader className="w-full ">
                <h1 className="font-bold text-xl text-center">Menú Administrador</h1>
            </CardHeader>
            <Divider />
            <CardBody className="w-full flex flex-col items-center">
                <Select
                    aria-label="Admin Actions"
                    className="w-full mt-4 flex sm:hidden"
                    placeholder="Selecciona una opción"
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    {ADMIN_ACTIONS[roleUser]?.map((action, index) => (
                        <SelectItem 
                            key={action} 
                            value={action}
                            onClick={() => handleSelectChange(action)}
                        >
                            {action}
                        </SelectItem>
                    ))}
                </Select>
                <ul className="hidden sm:flex items-center gap-2 w-full h-full flex-col">
                    {ADMIN_ACTIONS[roleUser]?.map((action, index) => (
                    <li className="w-full" key={index}>
                        <Button 
                            radius="sm" 
                            variant="light" 
                            className={`w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100  ${
                                action === selectedOption
                                ? 'bg-blue-500 text-white'
                                : ''
                            }`} 
                            onClick={() => handleSelectChange(action)}
                        >
                            {action}
                        </Button>
                    </li>
                    ))}
                </ul>
            </CardBody>
        </Card>
    );
}

export default SideMenuAdministrador;
