// LiquidezTable.tsx
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { getIconByEstado } from "./icons";
import { Liquidez } from "../../interface/liquidez.dt";
import CustomizedDialogs from "../LiquidezDalog";
import { useState } from "react";
import { CentroCosto } from "./CCosto";
import { Empresa } from "./Empresa";

type Order = "asc" | "desc";

// ✅ INICIO: CÓDIGO CORREGIDO
// Comparador genérico mejorado
function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy];
  const bValue = b[orderBy];

  // Manejar valores nulos o indefinidos para evitar errores
  if (aValue == null && bValue == null) return 0;
  if (aValue == null) return 1; // Mover nulos al final
  if (bValue == null) return -1;

  const aIsExceso = aValue === "Exceso de efectivo";
  const bIsExceso = bValue === "Exceso de efectivo";

  // Lógica para "Exceso de efectivo": siempre se considera el valor más alto
  if (aIsExceso && !bIsExceso) return -1;
  if (!aIsExceso && bIsExceso) return 1;
  if (aIsExceso && bIsExceso) return 0;

  // Lógica de conversión numérica robusta
  const aNum = parseFloat(String(aValue).replace(/[^0-9.-]+/g, ""));
  const bNum = parseFloat(String(bValue).replace(/[^0-9.-]+/g, ""));
  
  // Si ambos son números válidos, compararlos
  if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
    if (bNum < aNum) return -1;
    if (bNum > aNum) return 1;
    return 0;
  }

  // Fallback a comparación de texto si no son números
  return String(bValue).localeCompare(String(aValue));
}
// ✅ FIN: CÓDIGO CORREGIDO

function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
  return order === "desc"
    ? (a, b) => descendingComparator<T>(a, b, orderBy)
    : (a, b) => -descendingComparator<T>(a, b, orderBy);
}

interface HeadCell {
  id: keyof Liquidez;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "FECHA", label: "Fecha", sortable: false },
  { id: "ZONA", label: "Zona", sortable: false },
  { id: "CCOSTO", label: "CCosto", sortable: false },
  { id: "DISPOSITIVO", label: "Dispositivo", sortable: false },
  { id: "NOMBRE", label: "Nombre", sortable: false },
  { id: "ESTADO_LIQUIDEZ", label: "Estado", sortable: false },
  { id: "LIQUIDEZ", label: "Liquidez", sortable: true },
];

interface EnhancedTableHeadProps {
  order: Order;
  orderBy: string;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Liquidez) => void;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property: keyof Liquidez) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.id === "LIQUIDEZ" ? "center" : headCell.numeric ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={headCell.id === "LIQUIDEZ" ? { fontWeight: "bold" } : {}}
          >
            {headCell.sortable ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "ordenado descendente" : "ordenado ascendente"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

type LiquidezTableProps = {
  items: Liquidez[];
};

export default function LiquidezTable({ items }: LiquidezTableProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof Liquidez>("LIQUIDEZ");
  const [selectedItem, setSelectedItem] = useState<Liquidez | null>(null);
  const [open, setOpen] = useState(false);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Liquidez) => {
    if (property !== "LIQUIDEZ") return;
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const visibleRows = React.useMemo(
    () => [...items].sort(getComparator<Liquidez>(order, orderBy)),
    [items, order, orderBy]
  );

  return (
    <div>
      <Box display="flex" flexDirection="column" gap={2} flex={1} className="border-1 border-gray-500  rounded-2xl w-11/12">
        <Paper sx={{ width: "100%", mb: 2, overflowX: "hidden" }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Liquidez
          </Typography>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={String(orderBy)}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {visibleRows.map((row, index) => (
                  <TableRow
                    hover
                    key={index}
                    onClick={() => {
                      setSelectedItem(row);
                      setOpen(true);
                    }}
                    
                  >
                    <TableCell>{row.FECHA}</TableCell>
                    <TableCell>{Empresa(row.ZONA)}</TableCell>
                    <TableCell>{CentroCosto(row.CCOSTO)}</TableCell>
                    <TableCell>{row.DISPOSITIVO}</TableCell>
                    <TableCell>{row.NOMBRE}</TableCell>
                    <TableCell>
                      {getIconByEstado(row.ESTADO_LIQUIDEZ)} {row.ESTADO_LIQUIDEZ}
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>
                      {Number(row.LIQUIDEZ).toLocaleString("es-CO")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      {open && (
        <CustomizedDialogs open={open} handleClose={() => setOpen(false)} item={selectedItem} />
      )}
    </div>
  );
}
