import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CalendarClock, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import SeletorData from '@/core/componentes/SeletorData';
import { Input } from '@/components/ui/input';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
}

const NovaReserva = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: new Date(),
    startTime: '08:00',
    endTime: '09:00',
    notes: ''
  });

  // Dados de exemplo para os campos de busca
  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra A - Society', subtitle: 'Gramado sintético' },
    { id: '2', label: 'Quadra B - Tênis', subtitle: 'Saibro' },
    { id: '3', label: 'Campo C - Futebol', subtitle: 'Grama natural' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#client',
      title: 'Campo de Busca de Cliente',
      content: 'Selecione o cliente que está fazendo a reserva.'
    },
    {
      target: '#venue',
      title: 'Campo de Busca de Local',
      content: 'Escolha o local onde a reserva será feita.'
    },
    {
      target: '#date',
      title: 'Seletor de Data',
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
      title: 'Anotações',
      content: 'Adicione qualquer informação adicional relevante para a reserva.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova reserva:', formData);
    navigate('/eventos/agenda');
  };

  const handleClientChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, client: value }));
  };

  const handleVenueChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, venue: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date: date }));
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, startTime: e.target.value }));
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, endTime: e.target.value }));
  };

  const handleNotesChange = (value: string) => {
    setFormData(prev => ({ ...prev, notes: value }));
  };

  return (
    <BaseFormPage
      title="Criar Nova Reserva"
      description="Agende um novo horário para um cliente em um de seus espaços"
      icon={<CalendarClock className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/agenda"
      backLabel="Agenda"
      onSubmit={handleSubmit}
      submitLabel="Salvar Reserva"
      tourSteps={tourSteps}
      tourTitle="Criação de Nova Reserva"
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
            onChange={handleClientChange}
            opcoes={clientesExemplo}
            placeholder="Digite o nome do cliente..."
            required
          />

          <CampoBusca
            id="venue"
            label="Local"
            value={formData.venue}
            onChange={handleVenueChange}
            opcoes={locaisExemplo}
            placeholder="Digite o local da reserva..."
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime" className="text-sm font-medium">Início</Label>
              <Input
                type="time"
                id="startTime"
                value={formData.startTime}
                onChange={handleStartTimeChange}
                className="h-11"
                required
              />
            </div>
            <div>
              <Label htmlFor="endTime" className="text-sm font-medium">Término</Label>
              <Input
                type="time"
                id="endTime"
                value={formData.endTime}
                onChange={handleEndTimeChange}
                className="h-11"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">Anotações</Label>
        <Textarea
          id="notes"
          placeholder="Anotações sobre a reserva..."
          value={formData.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          rows={3}
          className="resize-none"
        />
      </div>
    </BaseFormPage>
  );
};

export default NovaReserva;
