// ============================================================================
// TIPOS DE LOCAL
// ============================================================================

import { SituacaoLocal } from './enums/situacao-local';

export interface Local {
  id: string; // GUID
  nome: string;
  subtitulo: string;
  tipo: string;
  intervalo: number;
  valorHora: number;
  capacidade: number | null;
  descricao: string;
  comodidades: string[];
  situacao: SituacaoLocal; // Enum do backend
  cor: string;
  horaAbertura: string; // Padronizado com backend
  horaFechamento: string; // Padronizado com backend
  filialId: string;
} 