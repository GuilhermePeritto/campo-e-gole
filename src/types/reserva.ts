// ============================================================================
// TIPOS DE RESERVA
// ============================================================================

import { SituacaoReserva } from './enums/situacao-reserva';

export interface Reserva {
  id: string; // GUID
  cliente: string;
  local: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  situacao: SituacaoReserva; // Enum do backend
  cor: string;
  esporte: string; // Padronizado com backend
  observacoes: string;
  valor: number;
  dataCadastro: string; // Padronizado com backend
  clienteId: string;
  localId: string;
} 