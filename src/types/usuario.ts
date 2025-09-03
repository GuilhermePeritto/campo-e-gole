export interface Usuario {
  id: string;
  dataCriacao: string;
  nome: string;
  email: string;
  telefone?: string;
  cargo?: string;
  foto?: string;
  situacao: 'Ativo' | 'Inativo';
  ultimoAcesso?: string;
  empresaId?: string;
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
  tenantId?: number;
} 