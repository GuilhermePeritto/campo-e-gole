export interface GrupoPermissao {
  id: string;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  descricao: string;
  ativo: boolean;
  tenantId: number;
  usuarios?: {
    id: string;
    nome: string;
    email: string;
  }[];
  permissoes?: {
    id: string;
    nome: string;
    descricao: string;
    moduloPai: string;
    acao: string;
  }[];
} 