import { useMemo, useState } from "react";
import { Liquidez } from "../interface/liquidez.dt";

export function useFilters(data: Liquidez[]) {
  const [searchLiquidez, setSearchLiquidez] = useState<string>("");
  const [searchDispositivo, setSearchDispositivo] = useState<string>("");
  const [searchPDV, setSearchPDV] = useState<string>("");

  const filteredLiquidez = useMemo(() => {
    return data.filter(
      (product) =>
        product.ESTADO_LIQUIDEZ.toLowerCase().includes(
          searchLiquidez.toLowerCase()
        ) &&
        product.DISPOSITIVO.toLowerCase().includes(
          searchDispositivo.toLowerCase()
        )
        &&
        product.NOMBRE.toLowerCase().includes(
          searchPDV.toLowerCase()
        )
    );
  }, [data, searchLiquidez, searchDispositivo, searchPDV]);

  return {
    filteredLiquidez,
    searchLiquidez,
    setSearchLiquidez,
    searchDispositivo,
    setSearchDispositivo,
    setSearchPDV,
    searchPDV
  };
}
