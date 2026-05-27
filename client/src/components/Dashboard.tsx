import { BarChart } from '@mui/x-charts/BarChart'
import { Liquidez } from '../interface/liquidez.dt'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useFilter } from '../hook/InformeFilter'
import { API_URL } from '../utils/contanst'

export default function Graficas(): JSX.Element {
    const [data, setData] = useState<Liquidez[]>([])
    const { username } = useAuth()
    const zona = username.company

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await axios.post(`${API_URL}/liquidazion/${zona}`)
                if (response.status === 200) {
                    const result = Array.isArray(response.data.datos) ? response.data.datos : []
                    setData(result)
                }
            } catch (error) {
                const err = error as { response?: { data?: { message?: string } } }
                const msg = err.response?.data?.message || 'Error desconocido'
                toast.error(msg, { autoClose: 2000 })
            }
        }

        void fetchData()
        const interval = setInterval(() => void fetchData(), 60000)
        return () => clearInterval(interval)
    }, [zona])

    const { filteredPDV } = useFilter(data)

    const categories = ['BRONCE', 'DIAMANTE1A', 'DIAMANTE2A', 'DIAMANTE3A', 'DIAMANTE4A', 'ORO', 'PLATA', 'ZAFIRO']
    const estados = ['BAJA LIQUIDEZ', 'NORMAL', 'SOBREGIRADO', 'EXCESO DE EFECTIVO']

    const counts = categories.map(category => estados.map(estado =>
        filteredPDV.filter((pdv: { CATEGORIA: string, ESTADO_LIQUIDEZ: string }) => pdv.CATEGORIA === category && pdv.ESTADO_LIQUIDEZ === estado).length
    ))

    const totalPDV = counts.flat().reduce((s, v) => s + v, 0)
    const estadoTotals = estados.map((_, idx) => counts.reduce((s, row) => s + row[idx], 0))

    const colors: { [key: string]: string } = {
        'BAJA LIQUIDEZ': '#ef4444',
        'NORMAL': '#10b981',
        'SOBREGIRADO': '#f59e0b',
        'EXCESO DE EFECTIVO': '#3b82f6'
    }

    return (
        <section className="mx-auto w-full max-w-[1200px]">
            <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Dashboard de Liquidez</h3>
                        <p className="text-sm text-slate-600">Resumen por categoría y estado</p>
                    </div>

                    <div className="mt-2 flex gap-3 sm:mt-0">
                        <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2">
                            <div className="text-sm text-slate-500">Total PDV</div>
                            <div className="text-xl font-bold text-slate-900">{totalPDV}</div>
                        </div>

                        {estados.map((e, i) => (
                            <div key={e} className="flex items-center gap-3 rounded-lg bg-slate-50 px-4 py-2">
                                <div className="h-3 w-3 rounded-full" style={{ background: colors[e] }} />
                                <div className="text-sm text-slate-600">{e}</div>
                                <div className="ml-2 font-semibold text-slate-900">{estadoTotals[i]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <BarChart
                    xAxis={[{ id: 'categorias', data: categories, scaleType: 'band' }]}
                    series={estados.map((estado, index) => ({
                        label: estado,
                        data: counts.map(count => count[index]),
                        color: colors[estado],
                        stack: 'total'
                    }))}
                    height={420}
                    width={900}
                    borderRadius={12}
                    slotProps={{ legend: { direction: 'horizontal', position: { vertical: 'bottom', horizontal: 'center' } } }}
                />
            </div>
        </section>
    )
}
