export interface Filial {
  id: string;
  dataCriacao: string;
  nome: string;
  codigo?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  cnpj?: string;
  responsavel?: string;
  dataAbertura?: string;
  situacao: 'Ativo' | 'Inativo';
  empresaId?: string;
  empresa?: {
    id: string;
    nome: string;
  };
  tenantId?: number;
  modulos?: {
    eventos?: boolean;
    bar?: boolean;
    escolinha?: boolean;
    financeiro?: boolean;
  };
} 