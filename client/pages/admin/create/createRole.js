import React, { useState, useEffect, use } from 'react';
import { Input, Button, Card } from "@nextui-org/react";
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const CreateRole = () => {
    const router = useRouter();
    const [roleName, setRoleName] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = router.query;
    useTitle(id ? 'Editar Rol' : 'Crear Rol');
    
    useEffect(() => {
        if (roleName.trim() === '') {
            setIsInvalid(false); 
        } else {
            const roleNameRegex = /^[a-zA-Z\s]{1,50}$/;
            setIsInvalid(!roleNameRegex.test(roleName));
        }
    }, [roleName]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isInvalid) {
            return;
        }

        try {
            setIsLoading(true);
            if (id) {
                await RoleService.updateRole(id, roleName);
            } else {
                await RoleService.addRole(roleName);
            }
            setIsLoading(false);
            router.push('/admin/Roles');
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        if (id) {
            const fetchRole = async () => {
                const res = await RoleService.getRoleById(id);
                setRoleName(res.role_name);
            }
            fetchRole();
        }
    }, [id]);

    return (
        <main className="max-w-4xl mx-auto my-32 p-6">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Rol' : 'Crear Rol'}</h1>
                <form onSubmit={handleSubmit}>
                    <section className="mb-4">
                        <Input
                            name='role_name'
                            type='text'
                            label='Nombre del Rol'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            onClear={() => setRoleName('')}
                            isInvalid={isInvalid}
                            isRequired
                            errorMessage='Formato inválido. Solo se permiten letras y espacios. Máximo 50 caracteres.'
                        />
                    </section>
                    <section className="grid w-full sm:flex sm:justify-between gap-2">
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Roles')} className="w-full sm:w-1/4">Cancelar</Button>
                        <Button type='submit' color="primary" className="w-full sm:w-1/4">{isLoading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear'}</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateRole;
