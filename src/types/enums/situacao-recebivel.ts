// ============================================================================
// ENUM DE SITUAÇÃO DE RECEBÍVEL
// ============================================================================

export enum SituacaoRecebivel {
  Aberto = 1,        // Título ainda não pago
  Vencido = 2,       // Passou da data de vencimento
  Pago = 3,          // Pago
  Cancelado = 4,     // Cancelou evento ou cancelado manualmente
  Estornado = 5      // Somente manualmente
} 