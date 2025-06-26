
export interface Filial {
  id: number;
  nome: string;
  codigo: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  cnpj: string;
  responsavel: string;
  ativo: boolean;
  dataAbertura: string;
}

export const mockFiliais: Filial[] = [
  {
    id: 1,
    nome: 'Filial Centro',
    codigo: 'FC001',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '01234-567',
    telefone: '11987654321',
    email: 'centro@arenasports.com',
    cnpj: '12.345.678/0001-90',
    responsavel: 'João Silva',
    ativo: true,
    dataAbertura: '2020-01-15'
  },
  {
    id: 2,
    nome: 'Filial Zona Norte',
    codigo: 'FZN002',
    endereco: 'Av. Principal, 456',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '02345-678',
    telefone: '11987654322',
    email: 'zonanorte@arenasports.com',
    cnpj: '12.345.678/0002-71',
    responsavel: 'Maria Santos',
    ativo: true,
    dataAbertura: '2021-03-10'
  },
  {
    id: 3,
    nome: 'Filial Zona Sul',
    codigo: 'FZS003',
    endereco: 'Rua do Comércio, 789',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03456-789',
    telefone: '11987654323',
    email: 'zonasul@arenasports.com',
    cnpj: '12.345.678/0003-52',
    responsavel: 'Carlos Lima',
    ativo: false,
    dataAbertura: '2022-05-20'
  }
];
