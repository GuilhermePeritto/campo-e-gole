
export interface MockCliente {
  id: string;
  label: string;
  subtitle: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const mockClientes: MockCliente[] = [
  {
    id: '1',
    label: 'João Silva',
    subtitle: 'CPF: 123.456.789-00',
    name: 'João Silva',
    document: '123.456.789-00',
    email: 'joao.silva@email.com',
    phone: '(11) 99999-1111',
    address: 'Rua das Flores, 123 - São Paulo/SP',
    notes: 'Cliente frequente, prefere horários matutinos',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    label: 'Maria Santos',
    subtitle: 'CPF: 987.654.321-00',
    name: 'Maria Santos',
    document: '987.654.321-00',
    email: 'maria.santos@email.com',
    phone: '(11) 88888-2222',
    address: 'Av. Paulista, 456 - São Paulo/SP',
    notes: 'Treina voleibol feminino',
    status: 'active',
    createdAt: '2024-02-10'
  },
  {
    id: '3',
    label: 'Pedro Costa',
    subtitle: 'CNPJ: 12.345.678/0001-90',
    name: 'Pedro Costa',
    document: '12.345.678/0001-90',
    email: 'pedro.costa@empresa.com',
    phone: '(11) 77777-3333',
    address: 'Rua do Comércio, 789 - São Paulo/SP',
    notes: 'Empresa de eventos esportivos',
    status: 'active',
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    label: 'Ana Paula',
    subtitle: 'CPF: 456.789.123-00',
    name: 'Ana Paula',
    document: '456.789.123-00',
    email: 'ana.paula@email.com',
    phone: '(11) 66666-4444',
    status: 'active',
    createdAt: '2024-03-05'
  },
  {
    id: '5',
    label: 'Carlos Mendes',
    subtitle: 'CPF: 789.123.456-00',
    name: 'Carlos Mendes',
    document: '789.123.456-00',
    email: 'carlos.mendes@email.com',
    phone: '(11) 55555-5555',
    status: 'active',
    createdAt: '2024-02-28'
  },
  {
    id: '6',
    label: 'Julia Rodrigues',
    subtitle: 'CPF: 321.654.987-00',
    name: 'Julia Rodrigues',
    document: '321.654.987-00',
    email: 'julia.rodrigues@email.com',
    phone: '(11) 44444-6666',
    status: 'active',
    createdAt: '2024-03-12'
  },
  {
    id: '7',
    label: 'Roberto Lima',
    subtitle: 'CPF: 111.222.333-44',
    name: 'Roberto Lima',
    document: '111.222.333-44',
    email: 'roberto.lima@email.com',
    phone: '(11) 33333-7777',
    address: 'Rua dos Esportes, 456 - São Paulo/SP',
    notes: 'Jogador de basquete profissional',
    status: 'active',
    createdAt: '2024-03-15'
  },
  {
    id: '8',
    label: 'Fernanda Costa',
    subtitle: 'CPF: 222.333.444-55',
    name: 'Fernanda Costa',
    document: '222.333.444-55',
    email: 'fernanda.costa@email.com',
    phone: '(11) 22222-8888',
    address: 'Av. dos Atletas, 789 - São Paulo/SP',
    notes: 'Instrutora de aeróbica',
    status: 'active',
    createdAt: '2024-03-18'
  },
  {
    id: '9',
    label: 'Lucas Oliveira',
    subtitle: 'CPF: 333.444.555-66',
    name: 'Lucas Oliveira',
    document: '333.444.555-66',
    email: 'lucas.oliveira@email.com',
    phone: '(11) 11111-9999',
    address: 'Rua do Futsal, 321 - São Paulo/SP',
    notes: 'Organizador de eventos esportivos',
    status: 'active',
    createdAt: '2024-03-20'
  }
];
