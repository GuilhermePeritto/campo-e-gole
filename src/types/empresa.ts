export interface Empresa {
  id: string;
  dataCriacao: string;
  nome: string;
  cnpj?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  situacao: 'Ativo' | 'Inativo';
  tenantId?: number;
  filiais?: {
    id: string;
    nome: string;
    codigo: string;
  }[];
} 