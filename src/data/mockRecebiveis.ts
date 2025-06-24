
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
  }
];
