import { useEffect, useState } from "react";
import { Liquidez } from "../interface/liquidez.dt";
import axios from "axios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CustomizedDialogs from "./LiquidezDalog";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useFilters } from "../hook/useFilters";

export default function LiquidezForm({ zona }: { zona: string }): JSX.Element {
    const [data, setData] = useState<Liquidez[]>([]);
    const [open, setOpen] = useState(false); // controla si está abierto el diálogo
    const [selectedItem, setSelectedItem] = useState<Liquidez | null>(null); // guarda el item clicado
    const { filteredProducts, searchLiquidez, setSearchLiquidez } = useFilters(data)

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                const response = await axios.post(`http://localhost:5000/liquidazion`, {
                    params: {
                        zona: zona,
                    },
                });
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
            <Box className="w-80 m-4 justify-self-center">
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

            <div className="flex justify-center flex-wrap gap-4 py-4 mt-4">
                {filteredProducts.map((item, index) => (
                    <Card
                        key={index}
                        className={
                            "text-center w-60 h-46 rounded-bl-md border-2  hover:scale-110 hover:shadow-lg transition-transform duration-200 " +
                            (item.ESTADO_LIQUIDEZ === "BAJA LIQUIDEZ" ||
                                item.ESTADO_LIQUIDEZ === "EXCESO DE EFECTIVO"
                                ? "border-2 border-red-300"
                                : "border-2 border-blue-400")
                        }
                        onClick={() => {
                            setSelectedItem(item); // guardo el item
                            setOpen(true); // abro el diálogo
                        }}
                    >
                        <CardActionArea className="h-full">
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {item.NOMBRE}
                                </Typography>
                                <Typography variant="body2" className="text-black space-y-2">
                                    <h1>{item.FECHA}</h1>
                                    <h1>{item.SUCURSAL}</h1>
                                    <h1>{item.ESTADO_LIQUIDEZ}</h1>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}

                {/* Diálogo con la info completa del item clicado */}
                {open && (
                    <CustomizedDialogs
                        open={open}
                        handleClose={() => setOpen(false)}
                        item={selectedItem}
                    />
                )}
            </div>
        </>
    );
}
