import type { JSX } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { useLogin } from '../services/useLogin';
import Button from '@mui/material/Button';
import { FieldValues, useForm } from "react-hook-form";
import formSchema from "../schemas/scheUser";
import { zodResolver } from "@hookform/resolvers/zod";

function LoginPage(): JSX.Element {
    const { errorString, onSubmit } = useLogin()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
    });

    const handleLogin = (data: FieldValues) => {
        const loginPromise = onSubmit(data);

        toast.promise(loginPromise, {
            pending: "Iniciando sesión...",
            success: "¡Bienvenido!",
            error: {
                render({ data }) {
                    // This will show the actual error message from the API
                    return data instanceof Error ? data.message : errorString;
                }
            } // <-- aquí mostramos el mensaje de error
        });
    };



    return (
        <section className="h-[100vh] flex items-center justify-center bg-gradient-to-b from-blue-400 to-red-400">
            <form className='w-full max-w-4/12 mb-2 border p-12 rounded-lg bg-white/30 flex flex-col gap-4 shadow-xl' onSubmit={handleSubmit(handleLogin)}>

                <article className='w-full flex flex-col gap-2'>
                    <label htmlFor="username" className="flex justify-center uppercase">Usuario</label>
                    <div className='flex justify-center mb-2'>
                        <input
                            type="text"
                            id="username"
                            {...register('username')}
                            placeholder='CP1118342523'
                            className="w-72 h-8 rounded-full text-center bg-white"
                        />

                        {errors.username && (
                            toast.warning(errors.username.message, {
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            })
                        )}
                    </div>
                </article>

                <article className='w-full flex flex-col gap-2'>
                    <label className="flex justify-center uppercase ">contraseña</label>
                    <div className='flex justify-center mb-2'>
                        <input
                            type='password'
                            id="password"
                            {...register('password')}
                            placeholder='***********'
                            autoComplete="off"
                            className="w-72 h-8 rounded-full text-center bg-white"
                        />

                        {errors.password && (
                            toast.warning(errors.password.message, {
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            })
                        )}
                    </div>
                </article>
                <section className="flex justify-center uppercase ">
                    <Button variant="contained" type='submit' className="bg-blue-100 w-72 h-8 rounded-full" disableElevation >
                        Iniciar Sesión
                    </Button>
                </section>
            </form >

        </section >
    )
}

export default LoginPage

