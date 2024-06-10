import React, { useState } from 'react';
import { Card, CardBody, Textarea, Button, Input, Select, SelectItem } from '@nextui-org/react';
import useTitle from '@hooks/useTitle';
import SupportService from '@services/supportService';

const Help = () => {

    useTitle('Ayuda');
    const [errors, setErrors] = useState({});
    const [formState , setFormState] = useState({
        name: '',
        email: '',
        message: '',
        type: 'Otro'
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, message, type } = formState;
        setErrors({});
        // Validación de los campos
        if (!name || !email || !message) {
            setErrors({ ...errors, all: 'Todos los campos son obligatorios' });
            return;
        }

        // Validación del formato del correo electrónico
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setErrors({ ...errors, email: 'El correo debe ser un correo válido (ejemplo: usuario@dominio.com)' });
            return;
        }

        const data = { name, email, message, type };
        const response = await SupportService.createTicket(data);
        console.log(response);
    }

    return (
        <section className='w-full grid gap-8 p-8'>
            <section className='w-full flex justify-center text-5xl'>
                <h1>Ayuda</h1>
            </section>
            <section className='w-full flex justify-center'>
                <Card className='w-full sm:w-2/3'>
                    <CardBody className='w-full px-16 py-8'>
                        <form method="post" className='grid gap-8' onSubmit={handleSubmit}>
                            <section className='grid'>
                                <label htmlFor="name">Nombre</label>
                                <Input type="text" id="name" name="name" label='Nombre' value={formState.name} onChange={onChange}/>
                            </section>
                            <section  className='grid'>
                                <label htmlFor="email">Correo</label>
                                <Input type="email" id="email" name="email" label='Correo electrónico' value={formState.email} onChange={onChange}/>
                            </section>
                            <section  className='grid'>
                                <label htmlFor="message">Mensaje</label>
                                <Textarea id="message" name="message" label='Descripción del problema' value={formState.message} onChange={onChange}></Textarea>
                            </section>
                            <section className='grid'>
                                <label htmlFor="type">Tipo de problema</label>
                                <Select id="type" name="type" defaultSelectedKeys={["Otro"]} value={formState.type} onChange={onChange}>
                                    <SelectItem key="Problema de Pago" value="Problema de Pago">Problema de Pago</SelectItem>
                                    <SelectItem key="Problema de Envío" value="Problema de Envío">Problema de Envío</SelectItem>
                                    <SelectItem key="Producto Dañado" value="Producto Dañado">Producto Dañado</SelectItem>
                                    <SelectItem key="Producto Incorrecto" value="Producto Incorrecto">Producto Incorrecto</SelectItem>
                                    <SelectItem key="Consulta de Producto" value="Consulta de Producto">Consulta de Producto</SelectItem>
                                    <SelectItem key="Solicitud de Reembolso" value="Solicitud de Reembolso">Solicitud de Reembolso</SelectItem>
                                    <SelectItem key="Problema de Inicio de Sesión" value="Problema de Inicio de Sesión">Problema de Inicio de Sesión</SelectItem>
                                    <SelectItem key="Problema de Cuenta" value="Problema de Cuenta">Problema de Cuenta</SelectItem>
                                    <SelectItem key="Otro" value="Otro">Otro</SelectItem>
                                </Select>
                            </section>
                            <section className='grid'>
                                <span className='text-red-500'>{errors.all}</span>
                            </section>
                            <section className='w-full flex justify-center'>
                                <Button type="submit">Enviar</Button>
                            </section>
                        </form>
                    </CardBody>
                </Card>
            </section>
        </section>
    )
}

export default Help;