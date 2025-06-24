
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
  // Quadra Principal (ID: 1) - Intervalo: 30 min
  {
    id: 1,
    client: 'João Silva',
    clientId: '1',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2025-06-24',
    startTime: '09:00',
    endTime: '10:30', // 1h30 = 3 slots de 30min
    status: 'confirmed',
    color: '#10b981',
    sport: 'Futebol Society',
    notes: 'Treino da equipe',
    amount: 120,
    createdAt: '2025-06-24'
  },
  {
    id: 4,
    client: 'Ana Paula',
    clientId: '4',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2025-06-24',
    startTime: '14:00',
    endTime: '16:00', // 2h = 4 slots de 30min
    status: 'confirmed',
    color: '#10b981',
    sport: 'Vôlei',
    notes: 'Treino feminino',
    amount: 160,
    createdAt: '2025-06-24'
  },
  // Quadra Coberta (ID: 2) - Intervalo: 15 min
  {
    id: 2,
    client: 'Maria Santos',
    clientId: '2',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2025-06-24',
    startTime: '08:30',
    endTime: '09:15', // 45min = 3 slots de 15min
    status: 'pending',
    color: '#f59e0b',
    sport: 'Basquete',
    notes: 'Aula particular',
    amount: 45,
    createdAt: '2025-06-24'
  },
  {
    id: 6,
    client: 'Julia Rodrigues',
    clientId: '6',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2025-06-24',
    startTime: '15:30',
    endTime: '16:15', // 45min = 3 slots de 15min
    status: 'pending',
    color: '#f59e0b',
    sport: 'Tênis',
    notes: 'Aula de tênis',
    amount: 45,
    createdAt: '2025-06-24'
  },
  // Campo Externo (ID: 3) - Intervalo: 60 min
  {
    id: 3,
    client: 'Pedro Costa',
    clientId: '3',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2025-06-24',
    startTime: '10:00',
    endTime: '12:00', // 2h = 2 slots de 60min
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futebol',
    notes: 'Pelada dos amigos',
    amount: 200,
    createdAt: '2025-06-24'
  },
  {
    id: 5,
    client: 'Carlos Mendes',
    clientId: '5',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2025-06-24',
    startTime: '19:00',
    endTime: '21:00', // 2h = 2 slots de 60min
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futebol',
    notes: 'Jogo oficial',
    amount: 200,
    createdAt: '2025-06-24'
  },
  // Eventos para outros dias
  {
    id: 7,
    client: 'Roberto Lima',
    clientId: '7',
    venue: 'Quadra Principal',
    venueId: '1',
    date: '2025-06-24',
    startTime: '08:00',
    endTime: '10:00', // 2h = 4 slots de 30min
    status: 'confirmed',
    color: '#10b981',
    sport: 'Basquete',
    notes: 'Treino matinal',
    amount: 160,
    createdAt: '2025-06-24'
  },
  {
    id: 8,
    client: 'Fernanda Costa',
    clientId: '8',
    venue: 'Quadra Coberta',
    venueId: '2',
    date: '2025-06-24',
    startTime: '18:00',
    endTime: '20:00', // 2h = 8 slots de 15min
    status: 'confirmed',
    color: '#f59e0b',
    sport: 'Aeróbica',
    notes: 'Aula de aeróbica',
    amount: 90,
    createdAt: '2025-06-24'
  },
  {
    id: 9,
    client: 'Lucas Oliveira',
    clientId: '9',
    venue: 'Campo Externo',
    venueId: '3',
    date: '2025-06-24',
    startTime: '16:00',
    endTime: '18:00', // 2h = 2 slots de 60min
    status: 'confirmed',
    color: '#3b82f6',
    sport: 'Futsal',
    notes: 'Partida amistosa',
    amount: 200,
    createdAt: '2025-06-24'
  }
];
