
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
  },
  // Eventos para outros dias
  {
    id: 7,
    client: 'Roberto Lima',
    clientId: '7',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2024-06-25',
    startTime: '08:00',
    endTime: '10:00',
    status: 'confirmed',
    color: '#10b981',
    sport: 'Basquete',
    notes: 'Treino matinal',
    amount: 160,
    createdAt: '2024-06-24'
  },
  {
    id: 8,
    client: 'Fernanda Costa',
    clientId: '8',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2024-06-25',
    startTime: '18:00',
    endTime: '20:00',
    status: 'confirmed',
    color: '#f59e0b',
    sport: 'Aeróbica',
    notes: 'Aula de aeróbica',
    amount: 90,
    createdAt: '2024-06-24'
  },
  {
    id: 9,
    client: 'Lucas Oliveira',
    clientId: '9',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2024-06-26',
    startTime: '16:30',
    endTime: '18:30',
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futsal',
    notes: 'Partida amistosa',
    amount: 200,
    createdAt: '2024-06-24'
  }
];
