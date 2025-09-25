import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import type { Liquidez } from "../interface/liquidez.dt";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


interface ItemProps {
  estado: string;
  children: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ estado, children }) => {
  const baseClasses =
    " p-4 text-center rounded-lg shadow-md transition-transform duration-200 hover:scale-110 hover:shadow-lg hover:bg-gray-100";

  const borderClasses =
    (estado === "BAJA LIQUIDEZ") ? "border-2 border-red-300" : estado === "EXCESO DE EFECTIVO"
      ? "border-2 border-blue-300"
      : "border-2 border-green-400";
      
  return <div className={`${baseClasses} ${borderClasses}`}>{children}</div>;
};


export default function CustomizedDialogs({
    open,
    handleClose,
    item,
}: {
    open: boolean;
    handleClose: () => void;
    item: Liquidez | null;
}) {
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" className={'text-center'}>
                PUNTO DE VENTA {item?.NOMBRE ? `DE ${item.NOMBRE}` : ""}
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
                {item ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                            className={"mb-4 flex justify-center flex-wrap"}>
                            <Grid size={3}>
                                <label htmlFor="FECHA">FECHA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.FECHA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="ZONA">ZONA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.ZONA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="CCOSTO">CENTRO DE COSTO  <Item estado={item.ESTADO_LIQUIDEZ}>{item.CCOSTO}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="SUPERVISOR">SUPERVISOR  <Item estado={item.ESTADO_LIQUIDEZ}>{item.SUPERVISOR}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="SUCURSAL">SUCURSAL  <Item estado={item.ESTADO_LIQUIDEZ}>{item.SUCURSAL}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="NOMBRE">PUNTO DE VENTA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.NOMBRE}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="CATEGORIA">CATEGORIA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.CATEGORIA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="CELULA">CELULA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.CELULA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="DISPOSITIVO">DISPOSITIVO  <Item estado={item.ESTADO_LIQUIDEZ}>{item.DISPOSITIVO}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="UMBRAL_MINIMO">UMBRAL MINIMO  <Item estado={item.ESTADO_LIQUIDEZ}>{Number(item.UMBRAL_MINIMO).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="UMBRAL_MAXIMO">UMBRAL MAXIMO  <Item estado={item.ESTADO_LIQUIDEZ}>{Number(item.UMBRAL_MAXIMO).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="HORA">HORA  <Item estado={item.ESTADO_LIQUIDEZ}>{item.HORA}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="LIQUIDEZ">LIQUIDEZ  <Item estado={item.ESTADO_LIQUIDEZ}>{Number(item.LIQUIDEZ).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                            <Grid size={3}>
                                <label htmlFor="ESTADO_LIQUIDEZ" >ESTADO LIQUIDEZ  <Item estado={item.ESTADO_LIQUIDEZ}>{Number(item.UMBRAL_MAXIMO).toLocaleString("es-CO")}</Item></label>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Typography>No hay datos disponibles</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}
