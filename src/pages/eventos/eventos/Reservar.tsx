
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import SeletorHora from '@/core/componentes/SeletorHora';
import BaseFormPage from '@/components/BaseFormPage';
import { formatDateForDisplay, formatTimeForDisplay, formatDateTimeForStorage } from '@/utils/dateUtils';

interface ReservationFormData {
  client: string;
  venue: string;
  date: Date | undefined;
  startTime: string;
  endTime: string;
  amount: string;
  status: string;
  observations: string;
}

const Reservar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preSelectedDate = searchParams.get('date');

  const [formData, setFormData] = useState<ReservationFormData>({
    client: '',
    venue: '',
    date: preSelectedDate ? new Date(preSelectedDate) : new Date(),
    startTime: '',
    endTime: '',
    amount: '',
    status: 'confirmed',
    observations: ''
  });

  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra Principal', subtitle: 'Futebol Society' },
    { id: '2', label: 'Quadra B', subtitle: 'Futsal' },
    { id: '3', label: 'Campo Gramado', subtitle: 'Futebol' },
  ];

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-basicas"]',
      title: 'Informações da Reserva',
      content: 'Preencha os dados básicos da reserva como cliente, local e horário.',
      placement: 'bottom'
    },
    {
      target: '#client',
      title: 'Seleção de Cliente',
      content: 'Busque e selecione o cliente que fará a reserva.',
      placement: 'bottom'
    },
    {
      target: '[data-card="detalhes"]',
      title: 'Detalhes Adicionais',
      content: 'Configure valor, status e observações da reserva.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova reserva:', {
      ...formData,
      dateTime: formatDateTimeForStorage(formData.date, formData.startTime)
    });
    navigate('/eventos/agenda');
  };

  const handleChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações da Reserva',
      alwaysOpen: true,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={(value) => handleChange('client', value)}
            items={clientesExemplo}
            placeholder="Digite o nome do cliente..."
            required
          />

          <CampoBusca
            id="venue"
            label="Local"
            value={formData.venue}
            onChange={(value) => handleChange('venue', value)}
            items={locaisExemplo}
            placeholder="Selecione o local..."
            required
          />

          <div className="md:col-span-2">
            <SeletorData
              id="date"
              label={`Data da Reserva ${formData.date ? `(${formatDateForDisplay(formData.date)})` : ''}`}
              value={formData.date}
              onChange={(date) => handleChange('date', date)}
              required
            />
          </div>

          <SeletorHora
            id="startTime"
            label={`Horário de Início ${formData.startTime ? `(${formatTimeForDisplay(formData.startTime)})` : ''}`}
            value={formData.startTime}
            onChange={(value) => handleChange('startTime', value)}
            required
          />

          <SeletorHora
            id="endTime"
            label={`Horário de Término ${formData.endTime ? `(${formatTimeForDisplay(formData.endTime)})` : ''}`}
            value={formData.endTime}
            onChange={(value) => handleChange('endTime', value)}
            required
          />
        </div>
      )
    },
    {
      id: 'detalhes',
      title: 'Detalhes da Reserva',
      defaultOpen: false,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampoValor
              id="amount"
              label="Valor da Reserva"
              value={formData.amount}
              onChange={(value) => handleChange('amount', value)}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange('status', value)}
              >
                <SelectTrigger id="status" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmed">Confirmada</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="cancelled">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observations">Observações</Label>
            <Textarea
              id="observations"
              value={formData.observations}
              onChange={(e) => handleChange('observations', e.target.value)}
              placeholder="Observações sobre a reserva..."
              rows={3}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title="Nova Reserva"
      description="Registre uma nova reserva de local"
      icon={<Calendar className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/agenda"
      backLabel="Agenda"
      onSubmit={handleSubmit}
      submitLabel="Salvar Reserva"
      tourSteps={tourSteps}
      tourTitle="Criação de Nova Reserva"
      formSections={formSections}
    />
  );
};

export default Reservar;
