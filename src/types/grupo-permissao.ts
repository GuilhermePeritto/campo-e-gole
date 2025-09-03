export interface GrupoPermissao {
  id: string;
  nome: string;
  descricao: string;
  situacao: 'Ativo' | 'Inativo';
  dataCriacao: string;
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
    submodulo?: string;
  }[];
} 