import { useEffect, useState } from "react";
import { Liquidez } from "../interface/liquidez.dt";
import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFilters } from "../hook/useFilters";
import { API_URL } from "../utils/contanst";
import CardForm from "./ui/Tablas";
import Tables from "./ui/Tables";


export default function LiquidezForm({ zona }: { zona: string }): JSX.Element {
    const [data, setData] = useState<Liquidez[]>([]);// guarda el item clicado
    const { filteredProducts, searchLiquidez, setSearchLiquidez } = useFilters(data)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response =
                //await axios.post(`http://localhost:5000/liquidazion/${zona}`);
                await axios.post(`${API_URL}/liquidazion/${zona}`);
                if (response.status === 200) {
                    setData(response.data.datos);
                    toast.success(response.data.message, {
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
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
            <section className="justify-self-center">
                <Box className="w-80 m-4 ">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Estado Liquidez</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Estado Liquidez"
                            value={searchLiquidez}
                            onChange={(e) => setSearchLiquidez(e.target.value)}
                        >
                            <MenuItem value={''}>TODOS</MenuItem>
                            <MenuItem value={'NORMAL'}>NORMAL</MenuItem>
                            <MenuItem value={'SOBREGIRADO'}>SOBREGIRADO</MenuItem>
                            <MenuItem value={'BAJA LIQUIDEZ'}>BAJA LIQUIDEZ</MenuItem>
                            <MenuItem value={'EXCESO DE EFECTIVO'}>EXCESO DE EFECTIVO</MenuItem>

                        </Select>
                    </FormControl>
                </Box>
            </section>

            <Box display="flex" gap={1} className="w-full p-4">
                {/* 📊 Tabla grande */}
                <Box flex={2.5} minWidth="0">
                    <CardForm items={filteredProducts} />
                </Box>

                {/* 📈 Tablas laterales */}
                <Box flex={1.2} display="flex" flexDirection="column" gap={2}>
                    <Tables items={data} />
                </Box>
            </Box>



        </>
    );
}
