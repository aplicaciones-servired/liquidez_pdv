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
          (i) => normalize(i.ESTADO_LIQUIDEZ) === "exceso de efectivo"
        )
        .sort((a, b) => parseLiquidez(b.LIQUIDEZ) - parseLiquidez(a.LIQUIDEZ))
        .slice(0, 5),
    [items]
  );

  const topBaja = React.useMemo(
    () =>
      [...items]
        .filter(
          (i) => normalize(i.ESTADO_LIQUIDEZ) !== "exceso de efectivo"
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
