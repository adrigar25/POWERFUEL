import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Calendar, Spinner, CircularProgress, ScrollShadow, Listbox, ListboxItem } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import UserService from '@services/userService';
import OrderService from '@services/orderService';
import ProductService from '@services/productService';
import serverService from '@services/serverService';
import CategoryService from '@services/categoryService';
import RoleService from '@services/roleService';
import BrandService from '@services/brandService';
import useTitle from '@hooks/useTitle';

const GeneralAdministration = () => {
    const [numUsersRegisterWeek, setNumUsersRegisterWeek] = useState(0);
    const [numTotalUsers, setNumTotalUsers] = useState(0);
    const [numTotalUsersActive, setNumTotalUsersActive] = useState(0);
    const [numTotalUsersDisabled, setNumTotalUsersDisabled] = useState(0);
    const [numTotalOrders, setNumTotalOrders] = useState(0);
    const [numTotalOrdersWeek, setNumTotalOrdersWeek] = useState(0);
    const [numTotalOrdersDelivey, setNumTotalOrdersDelivey] = useState(0);
    const [numTotalOrdersDelivered, setNumTotalOrdersDelivered] = useState(0);
    const [numTotalProducts, setNumTotalProducts] = useState(0);
    const [numTotalProductsEnabled, setNumTotalProductsEnabled] = useState(0);
    const [numTotalProductsDisabled, setNumTotalProductsDisabled] = useState(0);
    const [numTotalProductsOutOfStock, setNumTotalProductsOutOfStock] = useState(0);
    const [usoRAMPorcentaje, setUsoRAMPorcentaje] = useState(0);
    const [usoCPUPorcentaje, setUsoCPUPorcentaje] = useState(0);
    const [usoDiskPorcentaje, setUsoDiskPorcentaje] = useState(0);
    const [temperatureCPU, setTemperatureCPU] = useState(0);
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colorCPU, setColorCPU] = useState(null);
    const [colorRAM, setColorRAM] = useState(null);
    const [colorDisk, setColorDisk] = useState(null);
    const [colorTemperature, setColorTemperature] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useTitle('Administración General');

    useEffect(() => {
        const interval = setInterval(() => {
            serverService.getServerInfo()
                .then((result) => {
                    setUsoCPUPorcentaje(result.cpu);
                    setUsoRAMPorcentaje(result.ram);
                    setUsoDiskPorcentaje(result.disk);
                    setTemperatureCPU(result.temperature);
                })
                .then(() => {
                    setColorCPU(colores(usoCPUPorcentaje));
                    setColorRAM(colores(usoRAMPorcentaje));
                    setColorDisk(colores(usoDiskPorcentaje));
                    setColorTemperature(colores(temperatureCPU));
                })
                .catch((err) => {
                    console.error("Error al obtener la información del rendimiento del servidor")
                });
        }, 5000);

        return () => clearInterval(interval);
    })

    function colores(data) {
        if (data > 80) {
            return "danger";
        } else if (data > 50) {
            return "warning";
        } else {
            return "success";
        }
    }

    function formatDate(date) {
        const t = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return t;
    }

    const getUserInfo = async () => {
        const response = await UserService.generalPanelInfo();
        setNumTotalUsers(response.totalUsers);
        setNumTotalUsersActive(response.totalActiveUsers);
        setNumTotalUsersDisabled(response.totalInactiveUsers);
        setNumUsersRegisterWeek(response.totalUsersRegitrationWeek);
    }

    const getOrdersInfo = async () => {
        const response = await OrderService.generalPanelInfo();
        setNumTotalOrders(response.orders);
        setNumTotalOrdersWeek(response.ordersWeek);
        setNumTotalOrdersDelivey(response.orderDelivery);
        setNumTotalOrdersDelivered(response.orderDelivered);
    }

    const getProductsInfo = async () => {
        const response = await ProductService.generalPanelInfo();
        setNumTotalProducts(response.totalProducts);
        setNumTotalProductsEnabled(response.productEnabled);
        setNumTotalProductsDisabled(response.productDisabled);
        setNumTotalProductsOutOfStock(response.productOutStock);
    }

    const fetchAllCategories = async () => {
        const categories = await CategoryService.getAllCategories();
        setCategories(categories);
    };

    const fetchAllRoles = async () => {
        const roles = await RoleService.getAllRoles();
        setRoles(roles);
    };

    const fetchAllBrands = async () => {
        const response = await BrandService.getAllBrandsNoPagination();
        setBrands(response.brands);
    };

    useEffect(() => {
        getUserInfo();
        getOrdersInfo();
        getProductsInfo();
        fetchAllCategories();
        fetchAllRoles();
        fetchAllBrands();
        setIsLoading(false);
    }, [])

    return (
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <section className='grid gap-3'>
                <section className="w-full flex flex-col gap-3">
                    <section className='w-full flex flex-col sm:flex-row gap-3'>
                        <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Usuarios</p>
                                <h4 className="font-medium text-large">Estadísticas</h4>
                            </CardHeader>
                            <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                                <Card className='bg-blue-500 bg-opacity-50 rounded-[0.375rem] '>
                                    <CardHeader >
                                        <h4 className="font-medium text-2xs text-tiny">Número total de usuarios</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsers}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs  text-tiny">Usuarios registrados esta semana</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numUsersRegisterWeek}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto  bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Usuarios activos</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsersActive}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Usuarios deshabilitados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsersDisabled}</p>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                        <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Marcas</p>
                                <h4 className="font-medium text-large">Listado</h4>
                            </CardHeader>
                            <CardBody>
                                <ScrollShadow aria-label='Brands' className='max-h-[240px] w-full rounded-lg p-1'>
                                    <ul className="gap-2 flex flex-col divide-y divide-divider">
                                        {
                                            brands?.map((brand) => (
                                                <li className="w-full rounded-lg px-3 py-2 text-small  bg-default-100 hover:bg-default-200" key={brand.id_brand}>
                                                    <p className="font-bold">{brand.brand_name}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </ScrollShadow>
                            </CardBody>
                        </Card>
                        <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Roles</p>
                                <h4 className="font-medium text-large">Listado</h4>
                            </CardHeader>
                            <CardBody>
                                <ScrollShadow aria-label='Roles' className='max-h-[240px] w-full rounded-lg p-1'>
                                    <ul className="gap-2 flex flex-col divide-y divide-divider">
                                        {
                                            roles?.map((rol) => (
                                                <li className="w-full rounded-lg px-3 py-2 text-small bg-default-100 hover:bg-default-200" key={rol.role_id}>
                                                    <p className="font-bold">{rol.role_name}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </ScrollShadow>
                            </CardBody>
                        </Card>
                    </section>

                    <section className='w-full flex flex-col sm:flex-row gap-3'>
                        <Card className="col-span-12 sm:col-span-6 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Pedidos</p>
                                <h4 className="font-medium text-large">Estadísticas</h4>
                            </CardHeader>
                            <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                                <Card className='bg-pink-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Número total de pedidos</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalOrders}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-pink-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Pedidos de esta semana</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalOrdersWeek}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-pink-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Pedidos en delivery</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalOrdersDelivey}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-pink-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Pedidos entregados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalOrdersDelivered}</p>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                        <Card className="col-span-12 sm:col-span-6 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Productos</p>
                                <h4 className="font-medium text-large">Estadísticas</h4>
                            </CardHeader>
                            <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                                <Card className='bg-yellow-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Productos Totales</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalProducts}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-yellow-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Productos habilitados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalProductsEnabled}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-yellow-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Productos deshabilitados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalProductsDisabled}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-yellow-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Productos agotados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalProductsOutOfStock}</p>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </section>

                    <section className='w-full flex flex-col sm:flex-row gap-3'>
                        <Card className="col-span-12 sm:col-span-6 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Rendimiento del servidor</p>
                                <h4 className="font-medium text-large">Estado</h4>
                            </CardHeader>
                            <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                                <section className='w-full h-full flex flex-col justify-center items-center'>
                                    <h3 className='text-center text-xl font-bold'>Uso de Procesador</h3>
                                    <CircularProgress
                                        aria-label="Loading data..."
                                        value={usoCPUPorcentaje}
                                        color={colorCPU}
                                        classNames={{
                                            svg: "w-36 h-36 drop-shadow-md",
                                            track: "stroke-white/10",
                                            value: "text-3xl font-semibold",
                                        }}
                                        showValueLabel={true}
                                    >
                                    </CircularProgress>
                                </section>
                                <section className='w-full h-full flex flex-col justify-center items-center'>
                                    <h3 className='text-center text-xl font-bold'>Uso de RAM</h3>
                                    <CircularProgress 
                                        aria-label="Loading data..."
                                        value={usoRAMPorcentaje}
                                        color={colorRAM}
                                        classNames={{
                                            svg: "w-36 h-36 drop-shadow-md",
                                            track: "stroke-white/10",
                                            value: "text-3xl font-semibold",
                                        }}
                                        showValueLabel={true}
                                    />
                                </section>
                                <section className='w-full h-full flex flex-col justify-center items-center'>
                                    <h3 className='text-center text-xl font-bold'>Uso de Disco</h3>
                                    <CircularProgress
                                        aria-label="Loading data..."
                                        value={usoDiskPorcentaje}
                                        color={colorDisk}
                                        classNames={{
                                            svg: "w-36 h-36 drop-shadow-md",
                                            track: "stroke-white/10",
                                            value: "text-3xl font-semibold ",
                                        }}
                                        showValueLabel={true}
                                    />
                                </section>
                            </CardBody>
                        </Card>
                        <Card className="col-span-12 sm:col-span-6 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Categorías</p>
                                <h4 className="font-medium text-large">Listado</h4>
                            </CardHeader>
                            <CardBody>
                                <ScrollShadow aria-label='Roles' className='max-h-[20rem] w-full rounded-lg p-1'>
                                    <ul className="gap-2 flex flex-col divide-y divide-divider">
                                        {
                                            categories?.map((category) => (
                                                <li className="w-full rounded-lg px-3 py-2 text-small  bg-default-100 hover:bg-default-200" key={category.category_id}>
                                                    <p className="font-bold">{category.category_name}</p>
                                                    <p className="text-2xs text-default-600">{category.parent_category_id ? `Categoria padre: ${category.parent_category_id}` : null}</p>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </ScrollShadow>
                            </CardBody>
                        </Card>
                    </section>

                    <section className='w-full flex flex-col sm:flex-row gap-3'>
                        <Card className="col-span-12 sm:col-span-6 h-auto w-full">
                            <CardHeader className="flex-col !items-start pb-0">
                                <p className="text-tiny uppercase font-bold">Usuarios</p>
                                <h4 className="font-medium text-large">Estadísticas</h4>
                            </CardHeader>
                            <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Número total de usuarios</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsers}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Usuarios habilitados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsersActive}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Usuarios deshabilitados</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsersDisabled}</p>
                                    </CardBody>
                                </Card>
                                <Card className='bg-blue-500 w-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                                    <CardHeader className="z-10 flex-col !items-start pb-0">
                                        <h4 className="font-medium text-2xs text-tiny">Usuarios con bloqueos</h4>
                                    </CardHeader>
                                    <CardBody>
                                        <p className="uppercase text-6xl">{numTotalUsersDisabled}</p>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </section>
                </section>
            </section>
        )
    )
}

export default GeneralAdministration;