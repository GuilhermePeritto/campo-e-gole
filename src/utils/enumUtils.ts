import {
    SituacaoCliente,
    SituacaoLocal,
    SituacaoRecebivel,
    SituacaoReserva
} from '../types';

// ============================================================================
// UTILITÁRIOS PARA CONVERSÃO DE ENUMS
// ============================================================================

export const situacaoRecebivelConfig = {
  [SituacaoRecebivel.Aberto]: { label: 'Aberto', variant: 'secondary' as const },
  [SituacaoRecebivel.Vencido]: { label: 'Vencido', variant: 'destructive' as const },
  [SituacaoRecebivel.Pago]: { label: 'Pago', variant: 'default' as const },
  [SituacaoRecebivel.Cancelado]: { label: 'Cancelado', variant: 'outline' as const },
  [SituacaoRecebivel.Estornado]: { label: 'Estornado', variant: 'outline' as const }
};

export const situacaoClienteConfig = {
  [SituacaoCliente.Ativo]: { label: 'Ativo', variant: 'default' as const },
  [SituacaoCliente.Inativo]: { label: 'Inativo', variant: 'destructive' as const },
  [SituacaoCliente.Bloqueado]: { label: 'Bloqueado', variant: 'destructive' as const }
};

export const situacaoLocalConfig = {
  [SituacaoLocal.Ativo]: { label: 'Ativo', variant: 'default' as const },
  [SituacaoLocal.Inativo]: { label: 'Inativo', variant: 'destructive' as const },
  [SituacaoLocal.Manutencao]: { label: 'Manutenção', variant: 'secondary' as const }
};

export const situacaoReservaConfig = {
  [SituacaoReserva.Confirmado]: { label: 'Confirmado', variant: 'default' as const },
  [SituacaoReserva.Concluido]: { label: 'Concluído', variant: 'outline' as const },
  [SituacaoReserva.Pendente]: { label: 'Pendente', variant: 'secondary' as const },
  [SituacaoReserva.Cancelado]: { label: 'Cancelado', variant: 'destructive' as const }
};

// Função para obter configuração de situação baseada no tipo de entidade
export function getSituacaoConfig(tipoEntidade: 'recebivel' | 'cliente' | 'local' | 'reserva') {
  switch (tipoEntidade) {
    case 'recebivel':
      return situacaoRecebivelConfig;
    case 'cliente':
      return situacaoClienteConfig;
    case 'local':
      return situacaoLocalConfig;
    case 'reserva':
      return situacaoReservaConfig;
    default:
      return {};
  }
}

// Função para obter label de situação
export function getSituacaoLabel(
  valor: number, 
  tipoEntidade: 'recebivel' | 'cliente' | 'local' | 'reserva'
): string {
  const config = getSituacaoConfig(tipoEntidade);
  return config[valor]?.label || 'Desconhecido';
}

// Função para obter variant de situação
export function getSituacaoVariant(
  valor: number, 
  tipoEntidade: 'recebivel' | 'cliente' | 'local' | 'reserva'
): 'default' | 'destructive' | 'secondary' | 'outline' {
  const config = getSituacaoConfig(tipoEntidade);
  return config[valor]?.variant || 'secondary';
} 