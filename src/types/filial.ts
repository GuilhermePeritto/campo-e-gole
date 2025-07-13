export interface Filial {
  id: string;
  dataCriacao: string;
  dataAtualizacao: string | null;
  nome: string;
  codigo?: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  cnpj?: string;
  responsavel?: string;
  dataAbertura?: string;
  ativo: boolean;
  empresaId: string;
  tenantId: number;
  modulos: {
    eventos?: boolean;
    bar?: boolean;
    escolinha?: boolean;
    financeiro?: boolean;
  };
} 