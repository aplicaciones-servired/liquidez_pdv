export interface Liquidez {
  FECHA: string;
  ZONA: string;
  CCOSTO: string;
  SUPERVISOR: string;
  SUCURSAL: string;
  NOMBRE: string;
  CATEGORIA: string;
  CELULA: string;
  DISPOSITIVO: string;
  UMBRAL_MINIMO: string;
  UMBRAL_MAXIMO: string;
  HORA: number;
  LIQUIDEZ: string;
  ESTADO_LIQUIDEZ: string;
}

export interface LiquidezHora {
  zona: string;
  ultima_fecha: string;
}

export interface ToLiquidez {
  ZONA: string;
  ESTADO_LIQUIDEZ: string;
  TOTAL_PDV: number;
  PORCENTAJE: string;
}

export interface DetalleLiquidez {
  FECHA: string;
  SUCURSAL: string;
  CATEGORIACOMERCIAL: string;
  ING: string;
  EGR: string;
}
