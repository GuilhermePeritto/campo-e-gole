
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditarReserva = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: undefined,
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
      content: 'Altere o cliente desta reserva se necessário.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: 'Modifique o local da reserva.'
    },
    {
      target: '#date',
      title: 'Data',
      content: 'Atualize a data da reserva.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Ajuste o horário de início.'
    },
    {
      target: '#endTime',
      title: 'Horário de Fim',
      content: 'Ajuste o horário de término.'
    },
    {
      target: '#amount',
      title: 'Valor',
      content: 'Atualize o valor da reserva.'
    }
  ];

  useEffect(() => {
    // Simular carregamento dos dados da reserva
    const mockData = {
      client: 'João Silva',
      venue: 'Quadra A',
      date: new Date('2024-06-15'),
      startTime: '14:00',
      endTime: '16:00',
      notes: 'Reserva para partida de futebol society',
      amount: '120'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reserva editada:', formData);
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
      title="Editar Reserva"
      description="Altere as informações da reserva conforme necessário"
      icon={<Calendar className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/eventos"
      backLabel="Agenda"
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
            onChange={handleClientChange}
            items={clientesExemplo}
            required
          />

          <CampoBusca
            id="venue"
            label="Local"
            value={formData.venue}
            onChange={handleVenueChange}
            items={locaisExemplo}
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
            required
          />

          <SeletorHora
            id="endTime"
            label="Horário de Fim"
            value={formData.endTime}
            onChange={handleEndTimeChange}
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

export default EditarReserva;
