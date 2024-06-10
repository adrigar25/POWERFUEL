import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem, Card, CardHeader, CardBody, Divider } from '@nextui-org/react';
import UserIcon3 from '@icons/UserIcon3';
import IdentifyTargetIcon from '@icons/IdentifyTargetIcon';
import PaymentTargetIcon from '@icons/PaymentTargetIcon';
import OrderIcon from '@icons/OrderIcon';
import NotificationIcon from '@icons/NotificationIcon';

const SideMenu = ({selectedOption, setSelectedOption }) => {
    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <Card className='w-full sm:w-64 h-full flex flex-col items-center lg:items-start p-4 '>
            <CardHeader className="w-full">
                <h1 className="font-bold text-xl text-center">Menú Configuración</h1>
            </CardHeader>
            <Divider />
            <CardBody className="w-full flex flex-col">
                <Select
                    className="w-full mt-4 flex sm:hidden"
                    placeholder="Selecciona una opción"
                    value={selectedOption}
                >
                    <SelectItem value="DataUser" key="DataUser" onClick={() => handleSelectChange('DataUser')} startContent={<UserIcon3 />}>Mis datos</SelectItem>
                    <SelectItem value="AddressList" key="AddressList" onClick={() => handleSelectChange('AddressList')} startContent={<IdentifyTargetIcon />}>Mis direcciones</SelectItem>
                    <SelectItem value="NotificationList" key="NotificationList" onClick={() => handleSelectChange('NotificationList')} startContent={<PaymentTargetIcon />}>Mis notificaciones</SelectItem>
                    <SelectItem value="OrderList" key="OrderList" onClick={() => handleSelectChange('OrderList')} startContent={<OrderIcon />}>Mis pedidos</SelectItem>
                </Select>
                <ul className="hidden sm:flex items-center gap-2 w-full h-full flex-col ">
                    <li className="w-full" key='DataUser'>
                        <Button
                            radius="sm"
                            variant="light"
                            className={`w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 ${'DataUser' === selectedOption
                                    ? 'bg-blue-500 text-white'
                                    : ''
                                }`}
                            onClick={() => handleSelectChange('DataUser')}
                            startContent={<UserIcon3 />}
                        >
                            Mis datos
                        </Button>
                    </li>
                    <li className="w-full" key='AddressList'>
                        <Button
                            radius="sm"
                            variant="light"
                            className={`w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 ${'AddressList' === selectedOption
                                    ? 'bg-blue-500 text-white'
                                    : ''
                                }`}
                            onClick={() => handleSelectChange('AddressList')}
                            startContent={<IdentifyTargetIcon />}
                        >
                            Mis direcciones
                        </Button>
                    </li>
                    <li className="w-full" key='NotificationList'>
                        <Button
                            radius="sm"
                            variant="light"
                            className={`w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 ${'NotificationList' === selectedOption
                                    ? 'bg-blue-500 text-white'
                                    : ''
                                }`}
                            onClick={() => handleSelectChange('NotificationList')}
                            startContent={<NotificationIcon />}
                        >
                            Mis notificaciones
                        </Button>
                    </li>
                    <li className="w-full" key='OrderList'>
                        <Button
                            radius="sm"
                            variant="light"
                            className={`w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 ${'OrderList' === selectedOption
                                    ? 'bg-blue-500 text-white'
                                    : ''
                                }`}
                            onClick={() => handleSelectChange('OrderList')}
                            startContent={<OrderIcon />}
                        >
                            Mis pedidos
                        </Button>
                    </li>
                </ul>
            </CardBody>
        </Card>
    );
}

export default SideMenu;