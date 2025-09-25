import { useState } from "react";
import { Liquidez } from "../interface/liquidez.dt";

export function useFilters(data: Liquidez[]) {
  const [searchLiquidez, setSearchLiquidez] = useState<string>("");

  const filteredProducts = data.filter(product =>
    product.ESTADO_LIQUIDEZ.toLowerCase().includes(searchLiquidez.toLowerCase())
  );

  return { searchLiquidez, setSearchLiquidez, filteredProducts };
}