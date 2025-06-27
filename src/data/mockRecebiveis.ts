
export interface MockRecebivel {
  id: string;
  client: string;
  clientId: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  reservationId?: number;
  createdAt: string;
}

export const mockRecebiveis: MockRecebivel[] = [
  {
    id: '1',
    client: 'João Silva',
    clientId: '1',
    description: 'Reserva Quadra Principal - 24/06/2024',
    amount: 120,
    dueDate: '2024-06-25',
    status: 'pending',
    reservationId: 1,
    createdAt: '2024-06-20'
  },
  {
    id: '2',
    client: 'Maria Santos',
    clientId: '2',
    description: 'Reserva Quadra Coberta - 24/06/2024',
    amount: 45,
    dueDate: '2024-06-24',
    status: 'overdue',
    reservationId: 2,
    createdAt: '2024-06-21'
  },
  {
    id: '3',
    client: 'Pedro Costa',
    clientId: '3',
    description: 'Reserva Campo Externo - 24/06/2024',
    amount: 200,
    dueDate: '2024-06-26',
    status: 'paid',
    reservationId: 3,
    createdAt: '2024-06-19'
  },
  {
    id: '4',
    client: 'Ana Oliveira',
    clientId: '4',
    description: 'Reserva Quadra de Tênis - 25/06/2024',
    amount: 85,
    dueDate: '2024-06-30',
    status: 'pending',
    reservationId: 4,
    createdAt: '2024-06-22'
  },
  {
    id: '5',
    client: 'Carlos Mendes',
    clientId: '5',
    description: 'Reserva Salão de Festas - 26/06/2024',
    amount: 350,
    dueDate: '2024-07-01',
    status: 'paid',
    reservationId: 5,
    createdAt: '2024-06-23'
  },
  {
    id: '6',
    client: 'Fernanda Lima',
    clientId: '6',
    description: 'Reserva Quadra Poliesportiva - 27/06/2024',
    amount: 95,
    dueDate: '2024-06-28',
    status: 'overdue',
    reservationId: 6,
    createdAt: '2024-06-24'
  },
  {
    id: '7',
    client: 'Roberto Alves',
    clientId: '7',
    description: 'Reserva Campo de Futebol - 28/06/2024',
    amount: 180,
    dueDate: '2024-07-03',
    status: 'pending',
    reservationId: 7,
    createdAt: '2024-06-25'
  },
  {
    id: '8',
    client: 'Juliana Ferreira',
    clientId: '8',
    description: 'Reserva Quadra de Vôlei - 29/06/2024',
    amount: 75,
    dueDate: '2024-07-04',
    status: 'paid',
    reservationId: 8,
    createdAt: '2024-06-26'
  },
  {
    id: '9',
    client: 'Marcos Rodrigues',
    clientId: '9',
    description: 'Reserva Piscina - 30/06/2024',
    amount: 130,
    dueDate: '2024-07-05',
    status: 'pending',
    reservationId: 9,
    createdAt: '2024-06-27'
  },
  {
    id: '10',
    client: 'Luciana Castro',
    clientId: '10',
    description: 'Reserva Academia - 01/07/2024',
    amount: 60,
    dueDate: '2024-07-06',
    status: 'overdue',
    reservationId: 10,
    createdAt: '2024-06-28'
  },
  {
    id: '11',
    client: 'Thiago Barbosa',
    clientId: '11',
    description: 'Reserva Quadra de Basquete - 02/07/2024',
    amount: 110,
    dueDate: '2024-07-07',
    status: 'paid',
    reservationId: 11,
    createdAt: '2024-06-29'
  },
  {
    id: '12',
    client: 'Patricia Souza',
    clientId: '12',
    description: 'Reserva Sauna - 03/07/2024',
    amount: 40,
    dueDate: '2024-07-08',
    status: 'pending',
    reservationId: 12,
    createdAt: '2024-06-30'
  },
  {
    id: '13',
    client: 'Diego Santos',
    clientId: '13',
    description: 'Reserva Mesa de Ping Pong - 04/07/2024',
    amount: 25,
    dueDate: '2024-07-09',
    status: 'overdue',
    reservationId: 13,
    createdAt: '2024-07-01'
  },
  {
    id: '14',
    client: 'Camila Neves',
    clientId: '14',
    description: 'Reserva Churrasqueira - 05/07/2024',
    amount: 80,
    dueDate: '2024-07-10',
    status: 'paid',
    reservationId: 14,
    createdAt: '2024-07-02'
  },
  {
    id: '15',
    client: 'Rafael Moreira',
    clientId: '15',
    description: 'Reserva Quadra de Squash - 06/07/2024',
    amount: 140,
    dueDate: '2024-07-11',
    status: 'pending',
    reservationId: 15,
    createdAt: '2024-07-03'
  },
  {
    id: '16',
    client: 'Beatriz Silva',
    clientId: '16',
    description: 'Reserva Sala de Reunião - 07/07/2024',
    amount: 50,
    dueDate: '2024-07-12',
    status: 'overdue',
    reservationId: 16,
    createdAt: '2024-07-04'
  },
  {
    id: '17',
    client: 'Gabriel Pereira',
    clientId: '17',
    description: 'Reserva Campo Society - 08/07/2024',
    amount: 160,
    dueDate: '2024-07-13',
    status: 'paid',
    reservationId: 17,
    createdAt: '2024-07-05'
  },
  {
    id: '18',
    client: 'Natália Costa',
    clientId: '18',
    description: 'Reserva Spa - 09/07/2024',
    amount: 220,
    dueDate: '2024-07-14',
    status: 'pending',
    reservationId: 18,
    createdAt: '2024-07-06'
  },
  {
    id: '19',
    client: 'Eduardo Lima',
    clientId: '19',
    description: 'Reserva Quadra de Futsal - 10/07/2024',
    amount: 90,
    dueDate: '2024-07-15',
    status: 'overdue',
    reservationId: 19,
    createdAt: '2024-07-07'
  },
  {
    id: '20',
    client: 'Larissa Cardoso',
    clientId: '20',
    description: 'Reserva Estúdio de Dança - 11/07/2024',
    amount: 70,
    dueDate: '2024-07-16',
    status: 'paid',
    reservationId: 20,
    createdAt: '2024-07-08'
  },
  {
    id: '21',
    client: 'André Oliveira',
    clientId: '21',
    description: 'Reserva Mesa de Bilhar - 12/07/2024',
    amount: 35,
    dueDate: '2024-07-17',
    status: 'pending',
    reservationId: 21,
    createdAt: '2024-07-09'
  },
  {
    id: '22',
    client: 'Vanessa Rocha',
    clientId: '22',
    description: 'Reserva Quadra de Badminton - 13/07/2024',
    amount: 65,
    dueDate: '2024-07-18',
    status: 'overdue',
    reservationId: 22,
    createdAt: '2024-07-10'
  },
  {
    id: '23',
    client: 'Leonardo Torres',
    clientId: '23',
    description: 'Reserva Pista de Atletismo - 14/07/2024',
    amount: 120,
    dueDate: '2024-07-19',
    status: 'paid',
    reservationId: 23,
    createdAt: '2024-07-11'
  },
  {
    id: '24',
    client: 'Isabela Martins',
    clientId: '24',
    description: 'Reserva Sala de Yoga - 15/07/2024',
    amount: 45,
    dueDate: '2024-07-20',
    status: 'pending',
    reservationId: 24,
    createdAt: '2024-07-12'
  },
  {
    id: '25',
    client: 'Rodrigo Almeida',
    clientId: '25',
    description: 'Reserva Campo de Tênis - 16/07/2024',
    amount: 100,
    dueDate: '2024-07-21',
    status: 'overdue',
    reservationId: 25,
    createdAt: '2024-07-13'
  }
];
