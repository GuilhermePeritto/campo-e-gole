// ============================================================================
// TIPOS UNIFICADOS DO MÓDULO DE RESERVAS
// ============================================================================

// ============================================================================
// TIPOS BASE
// ============================================================================

export type StatusReserva = 'confirmado' | 'pendente' | 'cancelado';
export type StatusLocal = 'ativo' | 'inativo' | 'manutencao';
export type StatusCliente = 'ativo' | 'inativo';
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
  situacao: string; // Padronizado com backend
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
  situacao: string; // Padronizado com backend
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
  situacao: string; // Padronizado com backend
  reservaId: string | null; // Padronizado com backend
  dataCadastro: string; // Padronizado com backend
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
  situacao: string; // Padronizado com backend
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
  user: User;
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