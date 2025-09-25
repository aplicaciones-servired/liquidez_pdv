import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import ErrorIcon from '@mui/icons-material/Error';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export const getIconByEstado = (estado: string) => {
    switch (estado) {
        case "BAJA LIQUIDEZ":
            return <ErrorIcon color="error" fontSize="medium" />;
        case "EXCESO DE EFECTIVO":
            return <MonetizationOnIcon color="primary" fontSize="medium" />;
        default:
            return <LibraryAddCheckIcon color="success" fontSize="medium" />;
    }
};




