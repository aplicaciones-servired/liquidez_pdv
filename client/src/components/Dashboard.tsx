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
                const response =
                    await axios.post(`http://localhost:5000/liquidazion/${zona}`);
                //await axios.post(`${API_URL}/liquidazion/${zona}`);

                if (response.status === 200) {
                    const result = Array.isArray(response.data.datos) ? response.data.datos : [];
                    setData(result);
                }
            } catch (error) {
                const err = error as { response?: { data?: { message?: string } } }
                const msg = err.response?.data?.message || 'Error desconocido'
                toast.error(msg, {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
            }
        }
        void fetchData()

        // Ejecutar cada 1 minuto (60000 ms)
        const interval = setInterval(() => {
            void fetchData()
        }, 60000)

        // Limpiar al desmontar
        return () => clearInterval(interval)
    }, [zona])

    // BarChart: agrupado por grupo de categorías
    const { filteredPDV } = useFilter(data)

    const categories = [
        'BRONCE',
        'DIAMANTE1A',
        'DIAMANTE2A',
        'DIAMANTE3A',
        'DIAMANTE4A',
        'ORO',
        'PLATA',
        'ZAFIRO'
    ];

    const estados = ['BAJA LIQUIDEZ', 'NORMAL', 'SOBREGIRADO', 'EXCESO DE EFECTIVO'];

    const counts = categories.map(category => {
        return estados.map(estado => {
            return filteredPDV.filter(
                (pdv: { CATEGORIA: string, ESTADO_LIQUIDEZ: string }) =>
                    pdv.CATEGORIA === category && pdv.ESTADO_LIQUIDEZ === estado
            ).length;
        });
    });

    // Definir el tipo de colors
    const colors: { [key: string]: string } = {
        'BAJA LIQUIDEZ': '#FF5733', // Rojo
        'NORMAL': '#28A745',        // Verde
        'SOBREGIRADO': '#FFC107',   // Amarillo
        'EXCESO DE EFECTIVO': '#007BFF' // Azul
    };

    return (
        <section className="flex flex-wrap justify-center gap-6 my-6">
            <BarChart
                xAxis={[
                    {
                        id: 'categorias',
                        data: categories,
                        scaleType: 'band'
                    }
                ]}
                series={estados.map((estado, index) => ({
                    label: estado,
                    data: counts.map(count => count[index]),
                    color: colors[estado],
                    stack: 'total' // ← ESTA ES LA CLAVE: hace que las barras se apilen
                }))}
                height={400}
                width={800}
                borderRadius={23}
                slotProps={{
                    legend: {
                        direction: 'horizontal', // en lugar de 'row'
                        position: {
                            vertical: 'bottom',
                            horizontal: 'center' // en lugar de 'middle'
                        },
                    },
                }}
            />
        </section>
    )
}