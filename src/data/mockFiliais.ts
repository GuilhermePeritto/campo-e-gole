
export interface Filial {
  id: number;
  nome: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  ativo: boolean;
  modulos: {
    eventos: boolean;
    bar: boolean;
    escolinha: boolean;
    financeiro: boolean;
  };
  dataCadastro: string;
}

export const mockFiliais: Filial[] = [
  {
    id: 1,
    nome: 'Filial Centro',
    endereco: 'Av. Paulista, 1000',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01310-100',
    telefone: '(11) 98765-4321',
    email: 'centro@arenasports.com',
    ativo: true,
    modulos: {
      eventos: true,
      bar: true,
      escolinha: false,
      financeiro: true
    },
    dataCadastro: '2024-01-15'
  },
  {
    id: 2,
    nome: 'Filial Zona Norte',
    endereco: 'Rua do Limão, 500',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '02710-000',
    telefone: '(11) 98765-4322',
    email: 'zonanorte@arenasports.com',
    ativo: true,
    modulos: {
      eventos: true,
      bar: false,
      escolinha: true,
      financeiro: true
    },
    dataCadastro: '2024-01-20'
  },
  {
    id: 3,
    nome: 'Filial Zona Sul',
    endereco: 'Av. Ibirapuera, 200',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '04029-000',
    telefone: '(11) 98765-4323',
    email: 'zonasul@arenasports.com',
    ativo: false,
    modulos: {
      eventos: true,
      bar: true,
      escolinha: true,
      financeiro: true
    },
    dataCadastro: '2024-02-01'
  }
];
