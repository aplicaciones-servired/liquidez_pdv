import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import type { DetalleLiquidez } from "../interface/liquidez.dt";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
            maxWidth="xl"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={'text-center'}>
                DETALLE PUNTO DE VENTA
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
                {detalles.map((row, index) => (
                    <Box sx={{ flexGrow: 1 }} key={index}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 } }
                            className={"mb-4 flex justify-center flex-wrap"}>
                            <Grid size={3}>
                                <label htmlFor="FECHA">FECHA  <Item estado={row.FECHA}>{row.FECHA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="SUCURSAL">SUCURSAL  <Item estado={row?.SUCURSAL}>{row.SUCURSAL}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="CATEGORIA COMERCIAL">CATEGORIA COMERCIAL  <Item estado={row.CATEGORIACOMERCIAL}>{row.CATEGORIACOMERCIAL}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="INGRESO">INGRESO  <Item estado={row.ING}>{Number(row.ING).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="EGRESO">EGRESO  <Item estado={row.EGR}>{Number(row.EGR).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                        </Grid>
                    </Box>

                ))}
            </DialogContent>
        </Dialog>
    );
}
