export interface ClienteEscolinha {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  documento: string;
  dataNascimento: string;
  responsavel?: string;
  telefoneResponsavel?: string;
  endereco?: string;
  cidade?: string;
  estado?: string;
  situacao: 'ativo' | 'inativo';
  dataCadastro: string;
  observacoes?: string;
}

export const mockClientesEscolinha: ClienteEscolinha[] = [
  {
    id: '1',
    nome: 'João Silva Santos',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-1111',
    documento: '123.456.789-00',
    dataNascimento: '2015-03-15',
    responsavel: 'Maria Silva Santos',
    telefoneResponsavel: '(11) 99999-2222',
    endereco: 'Rua das Flores, 123',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-01-15',
    observacoes: 'Aluno dedicado, gosta de futebol'
  },
  {
    id: '2',
    nome: 'Ana Clara Oliveira',
    email: 'ana.clara@email.com',
    telefone: '(11) 99999-3333',
    documento: '987.654.321-00',
    dataNascimento: '2016-07-22',
    responsavel: 'Carlos Oliveira',
    telefoneResponsavel: '(11) 99999-4444',
    endereco: 'Av. Paulista, 456',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-02-10',
    observacoes: 'Excelente em natação'
  },
  {
    id: '3',
    nome: 'Pedro Henrique Costa',
    email: 'pedro.costa@email.com',
    telefone: '(11) 99999-5555',
    documento: '456.789.123-00',
    dataNascimento: '2014-11-08',
    responsavel: 'Fernanda Costa',
    telefoneResponsavel: '(11) 99999-6666',
    endereco: 'Rua Augusta, 789',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2023-12-05',
    observacoes: 'Interesse em basquete'
  },
  {
    id: '4',
    nome: 'Mariana Ferreira',
    email: 'mariana.ferreira@email.com',
    telefone: '(11) 99999-7777',
    documento: '789.123.456-00',
    dataNascimento: '2017-01-30',
    responsavel: 'Roberto Ferreira',
    telefoneResponsavel: '(11) 99999-8888',
    endereco: 'Rua Oscar Freire, 321',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'inativo',
    dataCadastro: '2023-08-20',
    observacoes: 'Transferido para outra escola'
  },
  {
    id: '5',
    nome: 'Lucas Mendes',
    email: 'lucas.mendes@email.com',
    telefone: '(11) 99999-9999',
    documento: '321.654.987-00',
    dataNascimento: '2015-09-12',
    responsavel: 'Patrícia Mendes',
    telefoneResponsavel: '(11) 99999-0000',
    endereco: 'Rua Haddock Lobo, 654',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-03-01',
    observacoes: 'Novo aluno, ainda se adaptando'
  },
  {
    id: '6',
    nome: 'Isabella Rodrigues',
    email: 'isabella.rodrigues@email.com',
    telefone: '(11) 99999-1111',
    documento: '654.321.987-00',
    dataNascimento: '2016-04-18',
    responsavel: 'André Rodrigues',
    telefoneResponsavel: '(11) 99999-2222',
    endereco: 'Rua Bela Cintra, 987',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-01-25',
    observacoes: 'Muito boa em ginástica'
  },
  {
    id: '7',
    nome: 'Gabriel Almeida',
    email: 'gabriel.almeida@email.com',
    telefone: '(11) 99999-3333',
    documento: '987.321.654-00',
    dataNascimento: '2014-12-03',
    responsavel: 'Lucia Almeida',
    telefoneResponsavel: '(11) 99999-4444',
    endereco: 'Rua Teodoro Sampaio, 147',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2023-11-15',
    observacoes: 'Líder natural, ajuda outros alunos'
  },
  {
    id: '8',
    nome: 'Sofia Martins',
    email: 'sofia.martins@email.com',
    telefone: '(11) 99999-5555',
    documento: '321.987.654-00',
    dataNascimento: '2017-06-25',
    responsavel: 'Ricardo Martins',
    telefoneResponsavel: '(11) 99999-6666',
    endereco: 'Rua Cardeal Arcoverde, 258',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-02-28',
    observacoes: 'Interesse em dança'
  },
  {
    id: '9',
    nome: 'Rafael Pereira',
    email: 'rafael.pereira@email.com',
    telefone: '(11) 99999-7777',
    documento: '654.987.321-00',
    dataNascimento: '2015-08-14',
    responsavel: 'Cristina Pereira',
    telefoneResponsavel: '(11) 99999-8888',
    endereco: 'Rua Harmonia, 369',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'inativo',
    dataCadastro: '2023-09-10',
    observacoes: 'Mudou de cidade'
  },
  {
    id: '10',
    nome: 'Laura Barbosa',
    email: 'laura.barbosa@email.com',
    telefone: '(11) 99999-9999',
    documento: '987.654.321-00',
    dataNascimento: '2016-02-20',
    responsavel: 'Marcelo Barbosa',
    telefoneResponsavel: '(11) 99999-0000',
    endereco: 'Rua Fradique Coutinho, 741',
    cidade: 'São Paulo',
    estado: 'SP',
    situacao: 'ativo',
    dataCadastro: '2024-03-15',
    observacoes: 'Excelente em atletismo'
  }
]; 