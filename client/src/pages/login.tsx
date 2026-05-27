import type { JSX } from "react/jsx-runtime";
import { toast } from 'react-toastify';
import { useLogin } from '../services/useLogin';
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
        <section className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.16),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.14),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#e2e8f0_48%,_#f8fafc_100%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:52px_52px]" />

            <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_30px_120px_rgba(15,23,42,0.12)] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
                    <aside className="hidden flex-col justify-between bg-gradient-to-br from-cyan-100 via-slate-50 to-rose-100 p-10 lg:flex">
                        <div>
                            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
                                Liquidez PDV
                            </div>
                            <h1 className="max-w-md text-4xl font-black leading-tight text-slate-900 xl:text-5xl">
                                Acceso para el panel de control de liquidez de puntos de venta.
                            </h1>
                        </div>
                    </aside>

                    <form className="flex flex-col justify-center gap-6 p-6 sm:p-8 lg:p-10" onSubmit={handleSubmit(handleLogin)}>
                        <header className="space-y-3 text-center lg:text-left">
                            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700 lg:justify-start">
                                Inicio de sesión
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Bienvenido de nuevo
                            </h2>
                            <p className="text-sm leading-6 text-slate-600 sm:text-base">
                                Ingresa tus credenciales para continuar al panel de trabajo.
                            </p>
                        </header>

                        <div className="space-y-5">
                            <article className="space-y-2">
                                <label htmlFor="username" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    Usuario
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    {...register('username')}
                                    placeholder='CP1118342523'
                                    autoComplete="username"
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
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
                            </article>

                            <article className="space-y-2">
                                <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    Contraseña
                                </label>
                                <input
                                    type='password'
                                    id="password"
                                    {...register('password')}
                                    placeholder='••••••••'
                                    autoComplete="current-password"
                                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
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
                            </article>
                        </div>

                        <button
                            type="submit"
                            className="cursor-pointer inline-flex h-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-600 to-blue-700 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-300/60"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage

