import { useEffect, useState } from "react";
import { Liquidez } from "../interface/liquidez.dt";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useFilters } from "../hook/useFilters";
import { API_URL } from "../utils/contanst";
import CardForm from "./ui/Tablas";
import Tables from "./ui/Tables";
import UlltimaHora from "./Hora";
import TotalLiquidez from "./TotalLiquidez";
import { useAuth } from "../auth/AuthContext";


export default function LiquidezForm({ zona }: { zona: string }): JSX.Element {
    const [data, setData] = useState<Liquidez[]>([]);// guarda el item clicado
    const { searchLiquidez, setSearchLiquidez, filteredLiquidez, searchDispositivo, setSearchDispositivo, searchPDV, setSearchPDV, setCentroc, centroc } = useFilters(data)

    const { username } = useAuth()

    const empresa = username.company

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                //const response = await axios.post(`http://localhost:5000/liquidazion/${zona}`);
                const response = await axios.post(`${API_URL}/liquidazion/${zona}`);
                if (response.status === 200) {
                    setData(response.data.datos);
                }
            } catch (error) {
                const err = error as { response?: { data?: { message?: string } } };
                const msg = err.response?.data?.message || "Error desconocido";
                toast.error(msg, {
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        };

        void fetchData()

        // Ejecutar cada 2 minutos (60000 ms)
        const interval = setInterval(() => {
            void fetchData()
        }, 60000)

        // Limpiar al desmontar
        return () => clearInterval(interval)
    }, [zona]);


    return (
        <>
            <div className="mt-4 mb-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_0_10px_rgba(15,23,42,0.06)]">
                <div className="flex justify-between">
                    <h2 className="mb-3 text-lg font-semibold text-slate-900">Filtros</h2>
                    <h2 className="mb-3 text-lg font-semibold text-slate-600">
                        Última hora de actualización: <UlltimaHora horazona={filteredLiquidez[0]} />
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                    {/* Estado */}
                    <div>

                        <label className="mb-1 block text-sm font-medium text-slate-700">Selecione el Estado</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Estado Liquidez"
                            className="h-12 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
                            value={searchLiquidez}
                            onChange={(e) => setSearchLiquidez(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>

                            <MenuItem value={'NORMAL'}>NORMAL</MenuItem>
                            <MenuItem value={'SOBREGIRADO'}>SOBREGIRADO</MenuItem>
                            <MenuItem value={'BAJA LIQUIDEZ'}>BAJA LIQUIDEZ</MenuItem>
                            <MenuItem value={'EXCESO DE EFECTIVO'}>EXCESO DE EFECTIVO</MenuItem>
                        </Select>
                    </div>
                    {/* Dispositivo */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Selecione el Dispositivo</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Dispositivo"
                            className="h-12 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
                            value={searchDispositivo}
                            onChange={(e) => setSearchDispositivo(e.target.value)}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <em>Todos</em>
                            </MenuItem>

                            <MenuItem value={'PC'}>PC</MenuItem>
                            <MenuItem value={'PDA'}>PDA</MenuItem>

                        </Select>
                    </div>
                    {/*centro de constos */}
                    {empresa === "Multired" && (
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                                Seleccione el centro de costos
                            </label>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Dispositivo"
                                className="h-12 w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900"
                                value={centroc}
                                onChange={(e) => setCentroc(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>

                                {/* Opciones reales */}
                                <MenuItem value={"39629"}>Yumbo</MenuItem>
                                <MenuItem value={"39630"}>Vijes</MenuItem>
                                <MenuItem value={"39631"}>La Cumbre</MenuItem>
                            </Select>
                        </div>
                    )}

                    {/* Punto de Venta */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">Punto de Venta</label>
                        <input
                            type="text"
                            placeholder="Buscar punto de venta"
                            className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 placeholder:text-slate-400"
                            value={searchPDV} onChange={(e) => setSearchPDV(e.target.value)}
                        />
                    </div>
                </div>
            </div>


            <Box display="flex" gap={1} className="w-full p-4">
                {/* 📊 Tabla grande */}
                <Box flex={2.5} minWidth="0">
                    <CardForm items={filteredLiquidez} />
                </Box>

                <Box flex={1} display="flex" flexDirection="column" gap={1}>
                    <TotalLiquidez zona={zona} />
                    <Tables items={data} />
                </Box>
            </Box>
        </>
    );
}
