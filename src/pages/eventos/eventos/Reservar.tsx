
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import CampoBusca from '@/core/componentes/CampoBusca';
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
  hourlyRate: number;
  totalHours: number;
  status: string;
  observations: string;
  paymentOption: 'now' | 'later';
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
    hourlyRate: 80,
    totalHours: 0,
    status: 'confirmed',
    observations: '',
    paymentOption: 'later'
  });

  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const locaisExemplo = [
    { id: '1', label: 'Quadra Principal', subtitle: 'Futebol Society - R$ 80/h' },
    { id: '2', label: 'Quadra B', subtitle: 'Futsal - R$ 60/h' },
    { id: '3', label: 'Campo Gramado', subtitle: 'Futebol - R$ 100/h' },
  ];

  // Calcular total de horas e valor total
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const [startHour, startMinute] = formData.startTime.split(':').map(Number);
      const [endHour, endMinute] = formData.endTime.split(':').map(Number);
      
      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;
      
      if (endTotalMinutes > startTotalMinutes) {
        const totalMinutes = endTotalMinutes - startTotalMinutes;
        const hours = totalMinutes / 60;
        setFormData(prev => ({ ...prev, totalHours: hours }));
      }
    }
  }, [formData.startTime, formData.endTime]);

  // Atualizar taxa horária baseado no local selecionado
  useEffect(() => {
    const selectedVenue = locaisExemplo.find(v => v.label === formData.venue);
    if (selectedVenue) {
      const rate = selectedVenue.subtitle.includes('R$ 80') ? 80 : 
                   selectedVenue.subtitle.includes('R$ 60') ? 60 : 100;
      setFormData(prev => ({ ...prev, hourlyRate: rate }));
    }
  }, [formData.venue]);

  const totalValue = formData.totalHours * formData.hourlyRate;

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
      content: 'Configure status, forma de pagamento e observações da reserva.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova reserva:', {
      ...formData,
      totalValue,
      dateTime: formatDateTimeForStorage(formData.date, formData.startTime)
    });
    navigate(-1); // Volta para a página anterior
  };

  const handleChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNewClient = () => {
    // Armazena a URL atual para retornar após cadastro
    sessionStorage.setItem('returnUrl', window.location.pathname + window.location.search);
    navigate('/eventos/clientes/novo');
  };

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações da Reserva',
      alwaysOpen: true,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-2">
            <div className="flex-1">
              <CampoBusca
                id="client"
                label="Cliente"
                value={formData.client}
                onChange={(value) => handleChange('client', value)}
                items={clientesExemplo}
                placeholder="Digite o nome do cliente..."
                required
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleNewClient}
                className="h-11"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

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

            <div className="space-y-2">
              <Label>Pagamento</Label>
              <RadioGroup 
                value={formData.paymentOption} 
                onValueChange={(value) => handleChange('paymentOption', value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="now" id="pay-now" />
                  <Label htmlFor="pay-now">Pagar agora</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="later" id="pay-later" />
                  <Label htmlFor="pay-later">Pagar depois</Label>
                </div>
              </RadioGroup>
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

          {/* Totalizador */}
          <div className="p-4 bg-muted/30 rounded-lg border">
            <h3 className="font-semibold mb-3">Resumo da Reserva</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Duração:</span>
                <span>{formData.totalHours.toFixed(1)} horas</span>
              </div>
              <div className="flex justify-between">
                <span>Taxa por hora:</span>
                <span>R$ {formData.hourlyRate.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-2">
                <span>Valor Total:</span>
                <span>R$ {totalValue.toFixed(2)}</span>
              </div>
            </div>
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
      backLabel="Voltar"
      onSubmit={handleSubmit}
      submitLabel="Salvar Reserva"
      tourSteps={tourSteps}
      tourTitle="Criação de Nova Reserva"
      formSections={formSections}
    />
  );
};

export default Reservar;
