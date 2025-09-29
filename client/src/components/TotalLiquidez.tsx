import axios from "axios";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getIconByEstado } from "./ui/icons";
import { useState, useEffect } from 'react';
import { ToLiquidez } from "../interface/liquidez.dt";
import { Empresa } from "./ui/Empresa";
import { API_URL } from "../utils/contanst";

export default function TotalLiquidez({ zona }: { zona: string }): JSX.Element {
    const [data, setData] = useState<ToLiquidez[]>([]);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response =
                //await axios.post(`http://localhost:5000/Totalliquidez/${zona}`);
                await axios.post(`${API_URL}/Totalliquidez/${zona}`);
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
        <Box display="flex" flexDirection="column" gap={2} flex={1}>
            {/* 🔹 Top 5 Exceso de Efectivo */}
            <Paper className="border-1 border-blue-500 rounded-2xl w-full ">
                <Typography variant="h6" sx={{ p: 2 }}>
                    TOTAL PDV
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Zona</TableCell>
                            <TableCell align="center">Estado Liquidez</TableCell>
                            <TableCell align="center">Total PDV</TableCell>
                            <TableCell align="center">Porcentaje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{Empresa(row.ZONA)}</TableCell>
                                <TableCell align="center">
                                    {getIconByEstado(row.ESTADO_LIQUIDEZ)} {row.ESTADO_LIQUIDEZ}
                                </TableCell>
                                <TableCell>{row.TOTAL_PDV}</TableCell>
                                <TableCell align="center">{Number(row.PORCENTAJE).toLocaleString("es-CO")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}