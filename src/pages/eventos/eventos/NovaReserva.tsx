
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  notes: string;
  amount: string;
}

const NovaReserva = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: new Date(),
    startTime: '',
    endTime: '',
    notes: '',
    amount: ''
  });

  // Dados de exemplo
  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra A', subtitle: 'Futebol Society' },
    { id: '2', label: 'Quadra B', subtitle: 'Basquete' },
    { id: '3', label: 'Campo Principal', subtitle: 'Futebol' },
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
      content: 'Escolha o local que será reservado.'
    },
    {
      target: '#date',
      title: 'Data',
      content: 'Selecione a data da reserva.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Defina o horário de início da reserva.'
    },
    {
      target: '#endTime',
      title: 'Horário de Fim',
      content: 'Defina o horário de término da reserva.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Informe o valor total da reserva.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova reserva:', formData);
    navigate('/eventos/eventos');
  };

  const handleClientChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, client: value }));
  };

  const handleVenueChange = (value: string, item?: any) => {
    setFormData(prev => ({ ...prev, venue: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleStartTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, startTime: time }));
  };

  const handleEndTimeChange = (time: string) => {
    setFormData(prev => ({ ...prev, endTime: time }));
  };

  const handleAmountChange = (value: string) => {
    setFormData(prev => ({ ...prev, amount: value }));
  };

  const handleNotesChange = (value: string) => {
    setFormData(prev => ({ ...prev, notes: value }));
  };

  return (
    <BaseFormPage
      title="Nova Reserva"
      description="Crie uma nova reserva de local para um cliente"
      icon={<Calendar className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/eventos"
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
            items={clientesExemplo}
            placeholder="Digite o nome do cliente..."
            required
          />

          <CampoBusca
            id="venue"
            label="Local"
            value={formData.venue}
            onChange={handleVenueChange}
            items={locaisExemplo}
            placeholder="Selecione o local..."
            required
          />

          <div className="md:col-span-2">
            <SeletorData
              id="date"
              label="Data da Reserva"
              value={formData.date}
              onChange={handleDateChange}
              required
            />
          </div>

          <SeletorHora
            id="startTime"
            label="Horário de Início"
            value={formData.startTime}
            onChange={handleStartTimeChange}
            placeholder="Selecione o horário de início"
            required
          />

          <SeletorHora
            id="endTime"
            label="Horário de Fim"
            value={formData.endTime}
            onChange={handleEndTimeChange}
            placeholder="Selecione o horário de fim"
            required
          />

          <div className="md:col-span-2">
            <CampoValor
              id="amount"
              label="Valor Total"
              value={formData.amount}
              onChange={handleAmountChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm font-medium">Observações</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => handleNotesChange(e.target.value)}
          placeholder="Observações sobre a reserva..."
          rows={3}
          className="resize-none"
        />
      </div>
    </BaseFormPage>
  );
};

export default NovaReserva;
