
import { CambiarCompany } from '../components/DefineCompany'
import { useAuth } from '../auth/AuthContext'
import LiquidezForm from '../components/LiquidezForm'

function EmpresaPage(): JSX.Element {
    const { username } = useAuth()
    const empresa = username?.company ?? ''
    const usuario = username?.names || username?.username || 'Usuario autenticado'
    const isCompanySelected = empresa === 'Servired' || empresa === 'Multired'

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-slate-50 text-slate-900">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(244,63,94,0.12),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)]" />
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />

            {isCompanySelected
                ? (
                    <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
                        <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_25px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
                            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                <div className="max-w-3xl space-y-3">
                                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                                        Panel de liquidez
                                    </p>
                                    <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">
                                        Home operativo para revisar liquidez y alertas
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                                        Consulta estados, filtra puntos de venta y sigue la operación diaria desde una vista más limpia y enfocada.
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[560px]">
                                    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Usuario</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{usuario}</p>
                                    </article>

                                    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Empresa activa</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">{empresa}</p>
                                    </article>

                                    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Actualización</p>
                                        <p className="mt-2 text-sm font-semibold text-slate-900">Cada 60 segundos</p>
                                    </article>
                                </div>
                            </div>
                        </header>

                        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6">
                            <LiquidezForm zona={empresa} />
                        </div>
                    </div>
                )
                : (
                    <CambiarCompany />
                )}
        </section>
    )
}

export default EmpresaPage
