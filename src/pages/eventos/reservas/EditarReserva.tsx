import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import SeletorData from '@/core/componentes/SeletorData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
}

const EditarReserva = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: undefined,
    startTime: '',
    endTime: '',
    notes: ''
  });

  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const venuesExemplo = [
    { id: '1', label: 'Quadra A - Society', subtitle: 'Futebol Society' },
    { id: '2', label: 'Quadra B - Basquete', subtitle: 'Basquete' },
    { id: '3', label: 'Campo 1 - Futebol 11', subtitle: 'Futebol 11' },
  ];

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
    "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00"
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Cliente',
      content: 'Selecione o cliente que está fazendo a reserva.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: 'Escolha o local onde a reserva será feita.'
    },
    {
      target: '#date',
      title: 'Data',
      content: 'Selecione a data para a reserva.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Selecione o horário de início da reserva.'
    },
    {
      target: '#endTime',
      title: 'Horário de Término',
      content: 'Selecione o horário de término da reserva.'
    },
    {
      target: '#notes',
      title: 'Observações',
      content: 'Adicione quaisquer observações adicionais sobre a reserva.'
    }
  ];

  useEffect(() => {
    // Simular carregamento dos dados da reserva
    const mockData = {
      client: 'João Silva',
      venue: 'Quadra A - Society',
      date: new Date('2024-06-15'),
      startTime: '10:00',
      endTime: '12:00',
      notes: 'Reserva para campeonato interno'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da reserva atualizados:', formData);
    navigate('/eventos/reservas');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date: date }));
  };

  return (
    <BaseFormPage
      title="Editar Reserva"
      description="Altere as informações da reserva conforme necessário"
      icon={<Calendar className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos"
      backLabel="Eventos"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
      tourSteps={tourSteps}
      tourTitle="Edição de Reserva"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações da Reserva</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={(value) => handleInputChange('client', value)}
            opcoes={clientesExemplo}
            required
          />

          <CampoBusca
            id="venue"
            label="Local"
            value={formData.venue}
            onChange={(value) => handleInputChange('venue', value)}
            opcoes={venuesExemplo}
            required
          />

          <div>
            <SeletorData
              id="date"
              label="Data"
              value={formData.date}
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-sm font-medium">Início</Label>
              <Select value={formData.startTime} onValueChange={(value) => handleInputChange('startTime', value)}>
                <SelectTrigger id="startTime" className="h-11">
                  <SelectValue placeholder="Selecionar horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="endTime" className="text-sm font-medium">Término</Label>
              <Select value={formData.endTime} onValueChange={(value) => handleInputChange('endTime', value)}>
                <SelectTrigger id="endTime" className="h-11">
                  <SelectValue placeholder="Selecionar horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
        <Textarea
          id="notes"
          placeholder="Observações adicionais sobre a reserva..."
          rows={3}
          className="resize-none"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>
    </BaseFormPage>
  );
};

export default EditarReserva;
