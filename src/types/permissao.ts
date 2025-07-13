export interface Permissao {
  id: string;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  descricao: string;
  moduloPai: string;
  submodulo?: string;
  acao: string;
  ativo: boolean;
  tenantId: number;
} 