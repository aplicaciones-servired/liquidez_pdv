// LiquidezTable.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { getIconByEstado } from "./icons";
import { Liquidez } from "../../interface/liquidez.dt";

const parseLiquidez = (value: unknown) => {
  if (!value) return 0;
  return parseFloat(String(value).replace(/[^0-9.-]+/g, "")) || 0;
};

const normalize = (value: string) => value?.toLowerCase().trim();

type LiquidezTableProps = {
  items: Liquidez[];
};

export default function Tables({ items }: LiquidezTableProps) {

  // 🔹 Top 5 fijos (no dependen del ordenamiento de la tabla principal)
  const topExceso = React.useMemo(
    () =>
      [...items]
        .filter(
          (i) => normalize(i.ESTADO_LIQUIDEZ) === "EXCESO DE EFECTIVO"
        )
        .sort((a, b) => parseLiquidez(b.LIQUIDEZ) - parseLiquidez(a.LIQUIDEZ))
        .slice(0, 5),
    [items]
  );

  const topBaja = React.useMemo(
    () =>
      [...items]
        .filter(
          (i) => normalize(i.ESTADO_LIQUIDEZ) !== "BAJA LIQUIDEZ"
        )
        .sort((a, b) => parseLiquidez(a.LIQUIDEZ) - parseLiquidez(b.LIQUIDEZ))
        .slice(0, 5),
    [items]
  );

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {/* 🔹 Top 5 Exceso de Efectivo */}
      <Paper className="border-1 border-blue-500 rounded-2xl w-full ">
        <Typography variant="h6" sx={{ p: 2 }}>
          Top 5 Exceso de Efectivo
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Liquidez</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topExceso.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.NOMBRE}</TableCell>
                <TableCell align="center">
                  {getIconByEstado(row.ESTADO_LIQUIDEZ)} {row.ESTADO_LIQUIDEZ}
                </TableCell>
                <TableCell align="center">{row.LIQUIDEZ}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* 🔹 Top 5 Baja Liquidez */}
      <Paper className="border-1 border-red-500 rounded-2xl w-full">
        <Typography variant="h6" sx={{ p: 2 }}>
          Top 5 Baja Liquidez
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Estado</TableCell>
              <TableCell align="center">Liquidez</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topBaja.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.NOMBRE}</TableCell>
                <TableCell align="center">
                  {getIconByEstado(row.ESTADO_LIQUIDEZ)} {row.ESTADO_LIQUIDEZ}
                </TableCell>
                <TableCell align="center">{row.LIQUIDEZ}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );

}


// // card.tsx
// import { useState } from "react";
// import { Liquidez } from "../../interface/liquidez.dt";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import CardActionArea from "@mui/material/CardActionArea";
// import { getIconByEstado } from "./icons";
// import CustomizedDialogs from "../LiquidezDalog";

// type CardFormProps = {
//   items: Liquidez[];
// };

// export function CardForm({ items }: CardFormProps) {
//   const [selectedItem, setSelectedItem] = useState<Liquidez | null>(null);
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="flex justify-center flex-wrap gap-4 py-4 mt-4">
//       {items.map((item, index) => (
//         <Card
//           key={index}
//           component="div"
//           className={`group text-center w-96 h-48 rounded-md border-2 transition-transform duration-300 hover:scale-105 hover:shadow-lg
//             ${item.ESTADO_LIQUIDEZ === "BAJA LIQUIDEZ"
//               ? "border-red-300"
//               : item.ESTADO_LIQUIDEZ === "EXCESO DE EFECTIVO"
//               ? "border-blue-400"
//               : "border-green-400"} `}
//           onClick={() => {
//             setSelectedItem(item);
//             setOpen(true);
//           }}
//         >
//           <CardActionArea className="h-full">
//             <CardContent
//               className={`h-full flex flex-col items-center justify-center gap-2 bg-white transition-colors duration-300 
//                 ${item.ESTADO_LIQUIDEZ === "BAJA LIQUIDEZ"
//                   ? "group-hover:bg-red-50"
//                   : item.ESTADO_LIQUIDEZ === "EXCESO DE EFECTIVO"
//                   ? "group-hover:bg-blue-50"
//                   : "group-hover:bg-green-50"} `}
//             >
//               <Typography variant="h6" className="font-bold">
//                 {item.NOMBRE}
//               </Typography>

//               <Typography variant="body2" className="text-gray-600">
//                 {item.FECHA} • {item.SUCURSAL}
//               </Typography>

//               <Typography variant="subtitle2" className="font-medium flex items-center gap-1">
//                 {getIconByEstado(item.ESTADO_LIQUIDEZ)} {item.ESTADO_LIQUIDEZ}
//               </Typography>

//               <Typography variant="h6" className="font-bold text-gray-800">
//                 {Number(item.LIQUIDEZ).toLocaleString("es-CO")}
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       ))}

//       {open && (
//         <CustomizedDialogs
//           open={open}
//           handleClose={() => setOpen(false)}
//           item={selectedItem}
//         />
//       )}
//     </div>
//   );
// }
