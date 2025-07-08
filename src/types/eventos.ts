// ============================================================================
// TIPOS UNIFICADOS DO MÓDULO DE EVENTOS
// ============================================================================

// ============================================================================
// TIPOS BASE
// ============================================================================

export type StatusEvento = 'confirmado' | 'pendente' | 'cancelado';
export type StatusLocal = 'ativo' | 'inativo' | 'manutencao';
export type StatusCliente = 'ativo' | 'inativo';
export type TipoVisualizacao = 'mes' | 'semana' | 'dia' | 'lista';

// ============================================================================
// TIPOS DE LOCAL
// ============================================================================

export interface Local {
  id: string; // GUID
  nome: string;
  rotulo: string;
  subtitulo: string;
  tipo: string;
  intervalo: number;
  valorHora: number;
  capacidade?: number;
  descricao?: string;
  comodidades?: string[];
  status: StatusLocal;
  cor: string;
  horarioAbertura: string;
  horarioFechamento: string;
}

// ============================================================================
// TIPOS DE CLIENTE
// ============================================================================

export interface Cliente {
  id: string; // GUID
  nome: string;
  rotulo: string;
  subtitulo: string;
  documento: string;
  email: string;
  telefone: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  observacoes?: string;
  status: StatusCliente;
  criadoEm: string;
}

// ============================================================================
// TIPOS DE RECEBÍVEL
// ============================================================================

export type StatusRecebivel = 'pendente' | 'pago' | 'vencido';

export interface Recebivel {
  id: string; // GUID
  clienteId: string; // GUID
  cliente: string;
  descricao: string;
  valor: number;
  dataVencimento: string;
  status: StatusRecebivel;
  eventoId?: string; // Referência opcional ao evento
  criadoEm: string;
}

// ============================================================================
// TIPOS DE EVENTO (UNIFICADO)
// ============================================================================

export interface Evento {
  id: string; // GUID
  clienteId: string; // GUID
  cliente: string;
  localId: string; // GUID
  local: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  status: StatusEvento;
  cor: string;
  modalidade?: string;
  observacoes?: string;
  valor: number;
  criadoEm: string;
}