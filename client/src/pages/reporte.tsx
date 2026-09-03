import { useState, type FormEvent } from 'react'
import axios from 'axios'
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { toast } from 'react-toastify'
import { useAuth } from '../auth/AuthContext'
import { API_URL } from '../utils/contanst'
import type { User } from '../interface/usuario.dt'

interface ReporteRow {
    FECHA: string
    TIPO: string | null
    SUCURSAL: string
    NOMBRE: string | null
    ING: number | string | null
    EGR: number | string | null
    BALANCE: number | string | null
}

const today = (): string => {
    const date = new Date()
    const offset = date.getTimezoneOffset() * 60000
    return new Date(date.getTime() - offset).toISOString().slice(0, 10)
}

const amount = (value: number | string | null): string =>
    Number(value ?? 0).toLocaleString('es-CO')

const getAvailableCompanies = (user: User): string[] => {
    const userData = user as User & { companies?: unknown; company: unknown }
    const rawCompanies = userData.companies ?? userData.company
    const values = Array.isArray(rawCompanies) ? rawCompanies : [rawCompanies]
    const available: string[] = []

    values.forEach((value) => {
        const company = String(value ?? '').toLowerCase()
        if (company.includes('multired')) available.push('Multired')
        if (company.includes('servired')) available.push('Servired')
    })

    return Array.from(new Set(available))
}

export default function ReportePage(): JSX.Element {
    const { username } = useAuth()
    const availableCompanies = getAvailableCompanies(username)
    const defaultCompany = availableCompanies[0] ?? ''
    const [fecha, setFecha] = useState(today)
    const [empresa, setEmpresa] = useState(defaultCompany)
    const [tipo, setTipo] = useState('TODOS')
    const [rows, setRows] = useState<ReporteRow[]>([])
    const [loading, setLoading] = useState(false)
    const [searched, setSearched] = useState(false)

    const buscarReporte = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        if (!fecha) return

        setLoading(true)
        try {
            const response = await axios.post(`${API_URL}/Reporte/${empresa}`, { fecha })
            const result = Array.isArray(response.data.datos) ? response.data.datos as ReporteRow[] : []
            setRows(result)
            setTipo('TODOS')
            setSearched(true)
            if (result.length === 0) {
                toast.info('No hay datos para la fecha y empresa seleccionadas', { autoClose: 2500 })
            } else {
                toast.success(`Reporte consultado: ${result.length} sucursales encontradas`, { autoClose: 2500 })
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } } }
            toast.error(err.response?.data?.message || 'No fue posible obtener el reporte', { autoClose: 2500 })
            setRows([])
            setSearched(true)
        } finally {
            setLoading(false)
        }
    }

    const tipos = Array.from(new Set(rows.map((row) => row.TIPO).filter((value): value is string => Boolean(value))))
    const filteredRows = tipo === 'TODOS' ? rows : rows.filter((row) => row.TIPO === tipo)

    return (
        <section className="min-h-[calc(100vh-5rem)] bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.12),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eef2f7_100%)] px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1500px]">
                <header className="mb-6 flex flex-col gap-5 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.09)] backdrop-blur sm:flex-row sm:items-end sm:justify-between sm:p-8">
                    <div>
                        <div className="mb-3 flex items-center gap-3 text-cyan-700">
                            <AssessmentOutlinedIcon />
                            <span className="text-xs font-bold uppercase tracking-[0.25em]">Consulta histórica</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Reporte de liquidez</h1>
                        <p className="mt-2 text-sm text-slate-600">{empresa || 'Sin empresa asignada'} · cierre de operación por punto de venta</p>
                    </div>

                    <form onSubmit={(event) => void buscarReporte(event)} className="grid gap-3 sm:grid-cols-3 sm:items-end">
                        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                            Fecha
                            <input
                                type="date"
                                value={fecha}
                                onChange={(event) => setFecha(event.target.value)}
                                className="h-11 rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                                required
                            />
                        </label>
                        {availableCompanies.length > 1 && (
                            <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                                Empresa
                                <select
                                    value={empresa}
                                    onChange={(event) => setEmpresa(event.target.value)}
                                    className="h-11 rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                                >
                                    {availableCompanies.map((option) => <option key={option} value={option}>{option}</option>)}
                                </select>
                            </label>
                        )}
                        <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
                            Tipo
                            <select
                                value={tipo}
                                onChange={(event) => setTipo(event.target.value)}
                                className="h-11 rounded-lg border border-slate-300 bg-white px-3 font-normal text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                            >
                                <option value="TODOS">Todos</option>
                                {tipos.map((option) => <option key={option} value={option}>{option}</option>)}
                            </select>
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-cyan-700 px-5 font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-wait disabled:opacity-60 sm:col-span-3"
                        >
                            <SearchIcon fontSize="small" />
                            {loading ? 'Consultando...' : 'Consultar'}
                        </button>
                    </form>
                </header>

                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                    <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 sm:px-8">
                        <h2 className="font-bold text-slate-900">Resultados</h2>
                        <span className="text-sm text-slate-500">{filteredRows.length} sucursales</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-6 py-4 font-bold sm:px-8">Fecha</th>
                                    <th className="px-4 py-4 font-bold">Tipo</th>
                                    <th className="px-4 py-4 font-bold">Sucursal</th>
                                    <th className="px-4 py-4 font-bold">Nombre</th>
                                    <th className="px-4 py-4 text-right font-bold">Ingresos</th>
                                    <th className="px-4 py-4 text-right font-bold">Egresos</th>
                                    <th className="px-6 py-4 text-right font-bold sm:px-8">Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRows.map((row) => (
                                    <tr key={`${row.SUCURSAL}-${row.FECHA}`} className="transition hover:bg-cyan-50/40">
                                        <td className="whitespace-nowrap px-6 py-4 text-slate-600 sm:px-8">{row.FECHA}</td>
                                        <td className="px-4 py-4 text-slate-600">{row.TIPO || '-'}</td>
                                        <td className="px-4 py-4 font-semibold text-slate-900">{row.SUCURSAL}</td>
                                        <td className="px-4 py-4 text-slate-600">{row.NOMBRE || '-'}</td>
                                        <td className="px-4 py-4 text-right tabular-nums text-emerald-700">{amount(row.ING)}</td>
                                        <td className="px-4 py-4 text-right tabular-nums text-rose-700">{amount(row.EGR)}</td>
                                        <td className="px-6 py-4 text-right font-bold tabular-nums text-slate-900 sm:px-8">{amount(row.BALANCE)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredRows.length === 0 && (
                        <div className="px-6 py-16 text-center text-sm text-slate-500 sm:px-8">
                            {searched ? 'No hay resultados para la fecha seleccionada.' : 'Selecciona una fecha para consultar el reporte.'}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}