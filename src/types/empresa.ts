export interface Empresa {
  id: string;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  cnpj: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  ativo: boolean;
  tenantId: number;
  filiais?: {
    id: string;
    nome: string;
    codigo: string;
  }[];
} 