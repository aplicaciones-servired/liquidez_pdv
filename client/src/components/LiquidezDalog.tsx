import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { DetalleLiquidez } from "../interface/liquidez.dt";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../utils/contanst';

interface ItemProps {
    estado: string;
    children: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ children }) => {
    const baseClasses =
        "border p-4 text-center rounded-lg shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-gray-100";
    return <div className={`${baseClasses} `}>{children}</div>;
};


export default function CustomizedDialogs({
    open,
    handleClose,
    sucursal
}: {
    open: boolean;
    handleClose: () => void;
    sucursal: string | null
}) {

    const [detalles, setDetalles] = useState<DetalleLiquidez[]>([]);

    useEffect(() => {
        const fechData = async (): Promise<void> => {
            try {
                //const response = await axios.post(`http://localhost:5000/Detalleliquidez/${sucursal}`);
                const response = await axios.post(`${API_URL}/Detalleliquidez/${sucursal}`);
                if (response.status === 200) {
                    setDetalles(response.data.detalle);
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
        }
        void fechData()

        // Ejecutar cada 2 minutos (60000 ms)
        const interval = setInterval(() => {
            void fechData()
        }, 60000)

        // Limpiar al desmontar
        return () => clearInterval(interval)
    }, [sucursal]);



    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={'text-center'}>
                DETALLE DEL PUNTO VENTA {sucursal} DIA {detalles[0]?.FECHA}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={(theme) => ({
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                })}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">CATEGORIA COMERCIAL</TableCell>
                                <TableCell align="center">INGRESO</TableCell>
                                <TableCell align="center">EGRESO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detalles.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">
                                        {row.CATEGORIACOMERCIAL}
                                    </TableCell>
                                    <TableCell align="center">
                                        {Number(row.ING).toLocaleString("es-CO")}
                                    </TableCell>
                                    <TableCell align="center">{Number(row.EGR).toLocaleString("es-CO")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    );
}
