// ============================================================================
// TIPOS UNIFICADOS DO MÓDULO DE RESERVAS
// ============================================================================

// ============================================================================
// ENUMS BASEADOS NO BACKEND
// ============================================================================

export enum SituacaoBase {
  Ativo = 1,
  Inativo = 2
}

export enum SituacaoRecebivel {
  Aberto = 1,        // Título ainda não pago
  Vencido = 2,       // Passou da data de vencimento
  Pago = 3,          // Pago
  Cancelado = 4,     // Cancelou evento ou cancelado manualmente
  Estornado = 5      // Somente manualmente
}

export enum SituacaoCliente {
  Ativo = SituacaoBase.Ativo,
  Inativo = SituacaoBase.Inativo,
  Bloqueado = 3      // Cliente velhaco com títulos vencidos
}

export enum SituacaoLocal {
  Ativo = SituacaoBase.Ativo,
  Inativo = SituacaoBase.Inativo,
  Manutencao = 3     // Em manutenção
}

export enum SituacaoReserva {
  Confirmado = 1,    // Cliente pagou
  Concluido = 2,     // Pós término do evento
  Pendente = 3,      // Confirmação pendente (ainda não pagou)
  Cancelado = 4      // Cancelado
}

// ============================================================================
// TIPOS BASE
// ============================================================================

export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'lista';

// ============================================================================
// TIPOS DE LOCAL
// ============================================================================

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

// ============================================================================
// TIPOS DE CLIENTE
// ============================================================================

export interface Cliente {
  id: string; // GUID
  nome: string;
  subtitulo: string;
  documento: string;
  email: string;
  telefone: string;
  endereco: string;
  observacoes: string;
  situacao: SituacaoCliente; // Enum do backend
  dataCriacao: string; // Padronizado com backend
}

// ============================================================================
// TIPOS DE RECEBÍVEL
// ============================================================================

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

// ============================================================================
// TIPOS DE RESERVA (UNIFICADO)
// ============================================================================

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

// ============================================================================
// TIPOS DE AUTENTICAÇÃO
// ============================================================================

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiraEm: string;
  usuario: User;
}

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  filialId: string;
  grupoId: string;
  ativo: boolean;
  ultimoAcesso: string;
  foto: string;
  permissoesCustomizadas: number[];
  dataCadastro: string;
} 