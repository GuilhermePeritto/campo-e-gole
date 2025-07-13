// ============================================================================
// TIPOS DE RECEBÍVEL
// ============================================================================

import { SituacaoRecebivel } from './enums/situacao-recebivel';

export type StatusRecebivel = 'pendente' | 'pago' | 'vencido';

export interface Recebivel {
  id: string; // GUID
  cliente: string;
  clienteId: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  situacao: SituacaoRecebivel; // Enum do backend
  reservaId: string | null; // Padronizado com backend
  dataCriacao: string; // Padronizado com backend
} 