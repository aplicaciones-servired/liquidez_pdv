import { useMemo, useState } from 'react'
import { Liquidez } from '../interface/liquidez.dt'

interface FilterPDV {
  filteredPDV: Liquidez[]
  searchPDV: string
  searchPDS: string
  setSearchPDV: React.Dispatch<React.SetStateAction<string>>
  setSearchPDS: React.Dispatch<React.SetStateAction<string>>
}

// 👉 Recibe un array de Liquidez y devuelve un array filtrado
function filterByPDV(pdv: Liquidez[], searchPDV: string): Liquidez[] {
  return pdv.filter(({ FECHA }) =>
    FECHA?.toLowerCase().includes(searchPDV.toLowerCase())
  )
}

// 👉 Hook que trabaja sobre un array de Liquidez
export function useFilter(pdv: Liquidez[]): FilterPDV {
  const [searchPDV, setSearchPDV] = useState('')
  const [searchPDS, setSearchPDS] = useState('')

  const filteredPDV = useMemo(() => {
    let filtered = pdv

    // Aplica el filtro por fecha si hay un valor de búsqueda
    if (searchPDV.length > 0) {
      filtered = filterByPDV(filtered, searchPDV)
    }

    // Aquí podrías aplicar más filtros usando searchPDS
    return filtered
  }, [pdv, searchPDV])

  return { searchPDV, searchPDS, setSearchPDV, setSearchPDS, filteredPDV }
}
