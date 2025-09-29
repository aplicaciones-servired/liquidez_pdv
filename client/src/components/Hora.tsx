import { useEffect, useState } from "react";
import { Liquidez, LiquidezHora } from "../interface/liquidez.dt";
import axios from "axios";
import { toast } from "react-toastify";
import { Empresa } from "./ui/Empresa";
import { API_URL } from "../utils/contanst";

export default function UlltimaHora({ horazona }: { horazona?: Liquidez }): JSX.Element {
    const [hora, setHora] = useState<LiquidezHora[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                //const response = await axios.get(`http://localhost:5000/Horaliquidez`);
                const response = await axios.get(`${API_URL}/Horaliquidez`);
                if (response.status === 200) {
                    setHora(response.data.datos);
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

        void fetchData();
        const interval = setInterval(() => void fetchData(), 60000);
        return () => clearInterval(interval);
    }, []);

    if (!horazona) return <h1>No hay zona seleccionada</h1>;

    // Buscar coincidencia en hora
    const match = hora.find((row) => row.zona === horazona.ZONA);

    return (
        <>
            {Empresa(horazona.ZONA)} {(match ? new Date(match.ultima_fecha).toLocaleString() : "No hay fecha")}
        </>
    );
}
