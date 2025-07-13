export interface Usuario {
  id: string;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  foto?: string;
  ativo: boolean;
  ultimoAcesso?: string;
  empresaId: string;
  grupoPermissaoId?: string;
  filialId?: string;
  filial?: {
    id: string;
    nome: string;
  };
  grupo?: {
    id: string;
    nome: string;
    cor: string;
  };
  tenantId: number;
} 