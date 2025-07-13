// ============================================================================
// ENUM DE SITUAÇÃO DE CLIENTE
// ============================================================================

import { SituacaoBase } from './situacao-base';

export enum SituacaoCliente {
  Ativo = SituacaoBase.Ativo,
  Inativo = SituacaoBase.Inativo,
  Bloqueado = 3      // Cliente velhaco com títulos vencidos
} 