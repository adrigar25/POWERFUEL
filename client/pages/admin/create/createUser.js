import { Button, Input, Select, SelectItem, Divider, Card, CardHeader, CardBody, CardFooter, Spinner, Checkbox } from "@nextui-org/react";
import { useState, useEffect } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';
import UserIcon2 from "@icons/UserIcon2";
import useTitle from '@hooks/useTitle';
import toast from 'toastr';

const CreateUser = () => {
    const router = useRouter();
    const [roles, setRoles] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const { id, readOnly } = router.query;
    const [formState, setFormState] = useState({
        email: '',
        current_password: '',
        new_password: '',
        confirm_new_password: '',
        first_name: '',
        last_name: '',
        dni: '',
        role_id: '10',
        status: 'Activo'
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [errors, setErrors] = useState({});
    useTitle(id ? 'Editar Usuario' : 'Crear Usuario');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const dniRegex = /^\d{8}[A-Za-z]$/;

    useEffect(() => {
        setisLoading(true);
        console.log(readOnly);

        if (id) {
            const fetchUser = async () => {
                try {
                    const user = await UserService.getUserById(id);
                    setFormState({
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        dni: user.dni,
                        role_id: user.role_id,
                        status: user.status
                    });
                } catch (error) {
                    console.error(error);
                }
            }
            fetchUser();
        }
        const fetchRoles = async () => {
            try {
                const response = await RoleService.getAllRoles();
                setRoles(response);
                setisLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRoles();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });

        let formErrors = { ...errors };

        switch (name) {
            case 'email':
                if (!emailRegex.test(value)) formErrors.email = "Email no válido. Debe ser de la forma 'nombre@dominio.com'";
                else delete formErrors.email;
                break;
            case 'first_name':
                if (!nameRegex.test(value)) formErrors.first_name = "Nombre no válido. Solo se permiten letras y espacios";
                else delete formErrors.first_name;
                break;
            case 'last_name':
                if (!nameRegex.test(value)) formErrors.last_name = "Apellidos no válidos. Solo se permiten letras y espacios";
                else delete formErrors.last_name;
                break;
            case 'dni':
                if (!dniRegex.test(value)) formErrors.dni = "DNI no válido. Debe ser un número de 8 dígitos";
                else delete formErrors.dni;
                break;
            case 'role_id':
                if (!value) formErrors.role = "Rol es requerido";
                else delete formErrors.role;
                break;
            case 'status':
                if (!value) formErrors.status = "Estado es requerido";
                else delete formErrors.status;
                break;
            case 'current_password':
                if (!passwordRegex.test(value)) formErrors.current_password = "Contraseña no válida. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
                else delete formErrors.current_password;
                break;
            case 'confirm_current_password':
                if (value !== formState.current_password) formErrors.confirm_current_password = "Las contraseñas no coinciden";
                else delete formErrors.confirm_current_password;
                break;
            case 'new_password':
                if (!passwordRegex.test(value)) formErrors.new_password = "Contraseña no válida. Debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
                else delete formErrors.new_password;
                break;

            case 'confirm_new_password':
                if (value !== formState.new_password) formErrors.confirm_new_password = "Las contraseñas no coinciden";
                else delete formErrors.confirm_new_password;
                break;
            default:
                break;
        }

        setErrors(formErrors);
        setIsFormValid(Object.keys(formErrors).length === 0);
    };
    const handleCheckboxChange = (event) => {
        setChangePassword(event.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        if (!isFormValid) {
            toast.error('Por favor, rellene correctamente el formulario');
        } else {
            try {
                if (id)
                    if (changePassword)
                        await UserService.changePasswordUser(formState.current_password, formState.new_password, formState.confirm_new_password);
                    else
                        await UserService.updateUser(id, formState);
                else
                    await UserService.registerUser(formState);
                
                toast.success('Usuario guardado correctamente');
                router.push('/admin/Usuarios');
            } catch (error) {
                console.log(error);
            }
        }
        console.log(formState);
        setisLoading(false);
    }

    return (
        isLoading ? (
            <div className='w-[20rem] h-[20rem] flex justify-center items-center'>
                <Spinner />
            </div>
        ) : (
            <main className="max-w-full sm:max-w-4xl mx-auto my-10 p-4 sm:p-6">
                <Card shadow className="p-5">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <CardHeader className="flex flex-col sm:flex-row justify-between items-center gap-2">
                            <h1 className="text-2xl sm:text-3xl font-bold">{id ? 'Editar Usuario' : 'Crear Usuario'}</h1>
                            <section className="w-10">
                                <UserIcon2 />
                            </section>
                        </CardHeader>
                        <Divider />
                        <CardBody className="grid gap-3 sm:gap-3">
                            <section>
                                <Input
                                    label="Email"
                                    name="email"
                                    placeholder="Email"
                                    value={formState.email}
                                    onChange={handleChange}
                                    aria-label="Email"
                                    fullWidth
                                    isRequired
                                    type="email"
                                    isInvalid={errors.email?.length > 0 && formState.email.length > 0}
                                    errorMessage={errors.email}
                                    isDisabled={readOnly === "true"}
                                />
                            </section>
                            {!id && (
                                <section className="flex flex-row gap-3">
                                    <Input
                                        label="Contraseña"
                                        name="current_password"
                                        placeholder="Contraseña"
                                        value={formState.current_password}
                                        onChange={handleChange}
                                        aria-label="Contraseña"
                                        isRequired
                                        type="password"
                                        isInvalid={errors.current_password?.length > 0 && formState.current_password.length > 0}
                                        errorMessage={errors.current_password}
                                        isDisabled={readOnly === "true"}
                                    />
                                    <Input
                                        label="Confirmar contraseña actual"
                                        name="confirm_current_password"
                                        value={formState.confirm_current_password}
                                        isRequired
                                        onChange={handleChange}
                                        type="password"
                                        isInvalid={errors.confirm_current_password?.length > 0 && formState.confirm_current_password.length > 0}
                                        errorMessage={errors.confirm_current_password}
                                        isDisabled={readOnly === "true"}
                                    />
                                </section>
                            )}
                            <Input
                                label="Nombre"
                                name="first_name"
                                placeholder="Nombre"
                                value={formState.first_name}
                                onChange={handleChange}
                                aria-label="Nombre"
                                fullWidth
                                isRequired
                                type="text"
                                isInvalid={errors.first_name?.length > 0 && formState.first_name.length > 0}
                                errorMessage={errors.first_name}
                                isDisabled={readOnly === "true"}
                            />
                            <Input
                                label="Apellidos"
                                name="last_name"
                                placeholder="Apellidos"
                                value={formState.last_name}
                                onChange={handleChange}
                                aria-label="Apellidos"
                                fullWidth
                                isRequired
                                type="text"
                                isInvalid={errors.last_name?.length > 0 && formState.last_name.length > 0}
                                errorMessage={errors.last_name}
                                isDisabled={readOnly === "true"}
                            />
                            <Input
                                label="DNI"
                                name="dni"
                                placeholder="DNI"
                                value={formState.dni}
                                onChange={handleChange}
                                aria-label="DNI"
                                fullWidth
                                isRequired
                                type="text"
                                isInvalid={errors?.dni?.length > 0 && formState.dni.length > 0}
                                errorMessage={errors.dni}
                                isDisabled={readOnly === "true"}
                            />
                            <Select
                                label="Rol"
                                name="role_id"
                                placeholder="Role"
                                value={formState.role_id}
                                onChange={handleChange}
                                aria-label="Role"
                                defaultSelectedKeys={[formState.role_id.toString()]}
                                fullWidth
                                isRequired
                                isInvalid={errors.role_id?.length > 0 && formState.role_id.length > 0}
                                errorMessage={errors.role_id}
                                isDisabled={readOnly === "true"}
                            >
                                {roles && roles.map((role) => (
                                    <SelectItem key={role.role_id.toString()} value={role.role_id}>
                                        {role.role_name}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select
                                label="Estado"
                                name="status"
                                placeholder="Status"
                                value={formState.status}
                                onChange={handleChange}
                                aria-label="Status"
                                defaultSelectedKeys={[formState.status ? formState.status : "Activo"]}
                                fullWidth
                                isRequired
                                isInvalid={errors.status?.length > 0 && formState.status.length > 0}
                                errorMessage={errors.status}
                                isDisabled={readOnly === "true"}
                            >
                                <SelectItem key="Activo" value="Activo">Activo</SelectItem>
                                <SelectItem key="Inactivo" value="Inactivo">Inactivo</SelectItem>
                                <SelectItem key="Suspendido" value="Suspendido">Suspendido</SelectItem>
                            </Select>
                            {id && readOnly !== "true" && (
                                <section className="flex flex-col items-start gap-3 w-full">
                                    <Checkbox
                                        isSelected={changePassword}
                                        onChange={handleCheckboxChange}
                                        color="primary"
                                    >
                                        Cambiar contraseña
                                    </Checkbox>
                                    {changePassword && (
                                        <section className="flex flex-col w-full gap-3">
                                            <Input
                                                label="Contraseña Actual"
                                                name="current_password"
                                                placeholder="Contraseña Actual"
                                                value={formState.current_password}
                                                onChange={handleChange}
                                                aria-label="Contraseña Actual"
                                                isRequired
                                                type="password"
                                                isInvalid={errors.current_password?.length > 0 && formState.current_password?.length > 0}
                                                errorMessage={errors.current_password}
                                            />
                                            <Input
                                                label="Nueva Contraseña"
                                                name="new_password"
                                                placeholder="Nueva Contraseña"
                                                value={formState.new_password}
                                                onChange={handleChange}
                                                aria-label="Nueva Contraseña"
                                                isRequired
                                                type="password"
                                                isInvalid={errors.new_password?.length > 0 && formState.new_password?.length > 0}
                                                errorMessage={errors.new_password}
                                            />
                                            <Input
                                                label="Confirma Nueva Contraseña"
                                                name="confirm_new_password"
                                                placeholder="Confirma Nueva Contraseña"
                                                value={formState.confirm_new_password}
                                                onChange={handleChange}
                                                aria-label="Confirma Nueva Contraseña"
                                                isRequired
                                                type="password"
                                                isInvalid={errors.confirm_new_password?.length > 0 && formState.confirm_new_password?.length > 0}
                                                errorMessage={errors.confirm_new_password}
                                            />
                                        </section>
                                    )}
                                </section>
                            )}
                        </CardBody>
                        <Divider />
                        <CardFooter className="flex flex-col gap-3 sm:flex-row justify-between">
                            <Button
                                color="danger"
                                onClick={() => router.push('/admin/Usuarios')}
                                className="w-full sm:w-1/4"
                            >
                                Cancelar
                            </Button>
                            {readOnly !== "true" && (
                                <Button
                                    color="primary"
                                    type="submit"
                                    className="w-full sm:w-1/4"
                                >
                                    {isLoading ? 'Cargando...' : id ? 'Guardar cambios' : 'Crear'}
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            </main>
        )
    );
};

export default CreateUser;
