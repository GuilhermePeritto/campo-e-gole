export interface Permissao {
  id: string;
  nome: string;
  moduloPai: string;
  submodulo?: string;
  descricao: string;
} 