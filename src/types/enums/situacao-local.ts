// ============================================================================
// ENUM DE SITUAÇÃO DE LOCAL
// ============================================================================

import { SituacaoBase } from './situacao-base';

export enum SituacaoLocal {
  Ativo = SituacaoBase.Ativo,
  Inativo = SituacaoBase.Inativo,
  Manutencao = 3     // Em manutenção
} 