
export interface MockReservation {
  id: number;
  client: string;
  clientId: string;
  venue: string;
  venueId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  color: string;
  sport?: string;
  notes?: string;
  amount: number;
  createdAt: string;
}

export const mockReservations: MockReservation[] = [
  {
    id: 1,
    client: 'João Silva',
    clientId: '1',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2024-06-24',
    startTime: '09:00',
    endTime: '10:30',
    status: 'confirmed',
    color: '#10b981',
    sport: 'Futebol Society',
    notes: 'Treino da equipe',
    amount: 120,
    createdAt: '2024-06-20'
  },
  {
    id: 2,
    client: 'Maria Santos',
    clientId: '2',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2024-06-24',
    startTime: '08:30',
    endTime: '09:15',
    status: 'pending',
    color: '#f59e0b',
    sport: 'Basquete',
    notes: 'Aula particular',
    amount: 45,
    createdAt: '2024-06-21'
  },
  {
    id: 3,
    client: 'Pedro Costa',
    clientId: '3',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2024-06-24',
    startTime: '10:00',
    endTime: '12:00',
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futebol',
    notes: 'Pelada dos amigos',
    amount: 200,
    createdAt: '2024-06-19'
  },
  {
    id: 4,
    client: 'Ana Paula',
    clientId: '4',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2024-06-24',
    startTime: '14:00',
    endTime: '16:00',
    status: 'confirmed',
    color: '#10b981',
    sport: 'Vôlei',
    notes: 'Treino feminino',
    amount: 160,
    createdAt: '2024-06-22'
  },
  {
    id: 5,
    client: 'Carlos Mendes',
    clientId: '5',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2024-06-24',
    startTime: '19:00',
    endTime: '21:00',
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futebol',
    notes: 'Jogo oficial',
    amount: 200,
    createdAt: '2024-06-23'
  },
  {
    id: 6,
    client: 'Julia Rodrigues',
    clientId: '6',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2024-06-24',
    startTime: '15:30',
    endTime: '16:15',
    status: 'pending',
    color: '#f59e0b',
    sport: 'Tênis',
    notes: 'Aula de tênis',
    amount: 45,
    createdAt: '2024-06-23'
  }
];
