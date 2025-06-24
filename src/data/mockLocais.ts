
export interface MockLocal {
  id: string;
  label: string;
  subtitle: string;
  name: string;
  type: string;
  interval: number;
  hourlyRate: number;
  capacity?: number;
  description?: string;
  amenities?: string[];
  status: 'active' | 'inactive' | 'maintenance';
}

export const mockLocais: MockLocal[] = [
  {
    id: '1',
    label: 'Quadra Principal',
    subtitle: 'Futebol Society - R$ 80/h',
    name: 'Quadra Principal',
    type: 'Futebol Society',
    interval: 30,
    hourlyRate: 80,
    capacity: 14,
    description: 'Quadra principal com grama sintética',
    amenities: ['Vestiário', 'Iluminação', 'Arquibancada'],
    status: 'active'
  },
  {
    id: '2',
    label: 'Quadra Coberta',
    subtitle: 'Basquete - R$ 60/h',
    name: 'Quadra Coberta',
    type: 'Basquete',
    interval: 15,
    hourlyRate: 60,
    capacity: 10,
    description: 'Quadra coberta para basquete e vôlei',
    amenities: ['Vestiário', 'Ar condicionado', 'Som'],
    status: 'active'
  },
  {
    id: '3',
    label: 'Campo Externo',
    subtitle: 'Futebol - R$ 100/h',
    name: 'Campo Externo',
    type: 'Futebol',
    interval: 60,
    hourlyRate: 100,
    capacity: 22,
    description: 'Campo oficial de futebol',
    amenities: ['Vestiário', 'Iluminação', 'Estacionamento'],
    status: 'active'
  }
];
