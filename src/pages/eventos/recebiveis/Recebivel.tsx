
import BaseFormPage from '@/components/BaseFormPage';
import { TourStep } from '@/components/PageTour';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoBusca from '@/core/componentes/CampoBusca';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Recebivel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    client: isEdit ? 'João Silva' : '',
    description: isEdit ? 'Reserva Quadra A - 18/06/2025' : '',
    amount: isEdit ? '160.00' : '',
    dueDate: isEdit ? new Date('2025-06-25') : new Date(),
    status: isEdit ? 'pending' : 'pending',
    notes: isEdit ? 'Reserva confirmada via telefone' : ''
  });

  const clientesExemplo = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Pedro Costa', subtitle: 'CNPJ: 12.345.678/0001-90' },
  ];

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-basicas"]',
      title: 'Informações do Recebível',
      content: 'Preencha os dados básicos do valor a receber.',
      placement: 'bottom'
    },
    {
      target: '#client',
      title: 'Cliente Devedor',
      content: 'Selecione o cliente que deve o valor.',
      placement: 'bottom'
    },
    {
      target: '[data-card="detalhes"]',
      title: 'Detalhes do Recebível',
      content: 'Configure valor, vencimento e observações.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando recebível:' : 'Criando recebível:', formData);
    navigate('/eventos/recebiveis');
  };

  const handleChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações do Recebível',
      alwaysOpen: true,
      content: (
        <div className="space-y-6">
          <CampoBusca
            id="client"
            label="Cliente"
            value={formData.client}
            onChange={(value) => handleChange('client', value)}
            items={clientesExemplo}
            placeholder="Selecione o cliente..."
            required
          />

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Ex: Reserva Quadra A - 18/06/2025"
              required
              className="h-11"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CampoValor
              id="amount"
              label="Valor"
              value={formData.amount}
              onChange={(value) => handleChange('amount', value)}
              required
            />

            <SeletorData
              id="dueDate"
              label="Data de Vencimento"
              value={formData.dueDate}
              onChange={(date) => handleChange('dueDate', date)}
              required
            />
          </div>
        </div>
      )
    },
    {
      id: 'detalhes',
      title: 'Detalhes',
      defaultOpen: false,
      content: (
        <div className="space-y-6">
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
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
              placeholder="Observações sobre o recebível..."
              rows={3}
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? 'Editar Recebível' : 'Novo Recebível'}
      description={isEdit ? 'Edite as informações do recebível' : 'Registre um novo valor a receber'}
      icon={<CreditCard className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/recebiveis"
      backLabel="Recebíveis"
      onSubmit={handleSubmit}
      submitLabel={isEdit ? 'Salvar Alterações' : 'Cadastrar Recebível'}
      tourSteps={tourSteps}
      tourTitle={isEdit ? "Edição de Recebível" : "Cadastro de Recebível"}
      formSections={formSections}
    />
  );
};

export default Recebivel;
