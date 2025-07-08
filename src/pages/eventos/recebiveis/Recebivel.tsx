
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
import { useClientes } from '@/hooks/useClientes';
import { useEventos } from '@/hooks/useEventos';
import { useLocais } from '@/hooks/useLocais';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface RecebivelFormData {
  clienteId: string;
  localId: string;
  data: Date | undefined;
  horaInicio: string;
  horaFim: string;
  observacoes: string;
  modalidade: string;
  valor: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
}

const Recebivel = () => {
  const navigate = useNavigate();
  const { goBack } = useNavigationHistory();
  const { id } = useParams();
  const isEdit = !!id;

  const { getClienteByClientId, getClientesForSearch, loadClienteById } = useClientes();
  const { buscarPorId: buscarLocalPorId, locais, loadLocalById } = useLocais();
  const { buscarPorId, criar, editar } = useEventos();

  const [formData, setFormData] = useState<RecebivelFormData>({
    clienteId: '',
    localId: '',
    data: new Date(),
    horaInicio: '',
    horaFim: '',
    observacoes: '',
    modalidade: '',
    valor: '',
    status: 'pendente'
  });

  // Carregar dados do recebível se for edição
  useEffect(() => {
    if (isEdit && id) {
      const recebivel = buscarPorId(id);
      if (recebivel) {
        setFormData({
          clienteId: recebivel.clienteId,
          localId: recebivel.localId,
          data: new Date(recebivel.data),
          horaInicio: recebivel.horaInicio,
          horaFim: recebivel.horaFim,
          observacoes: recebivel.observacoes || '',
          modalidade: recebivel.modalidade || '',
          valor: recebivel.valor?.toString() || '',
          status: recebivel.status
        });
      }
    }
  }, [isEdit, id, buscarPorId]);

  // Dados usando hooks
  const clientesExemplo = getClientesForSearch();
  const locaisExemplo = locais.map(local => ({
    id: local.id,
    label: local.nome,
    subtitle: local.tipo
  }));

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-basicas"]',
      title: 'Informações do Recebível',
      content: 'Preencha os dados básicos do valor a receber.',
      placement: 'bottom'
    },
    {
      target: '#cliente',
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
    
    if (!formData.clienteId || !formData.localId || !formData.data || !formData.valor) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    // Buscar dados do cliente e local para incluir no recebível
    const cliente = getClienteByClientId(formData.clienteId);
    const local = buscarLocalPorId(formData.localId);

    const recebivelData = {
      clienteId: formData.clienteId,
      cliente: cliente?.name || '',
      localId: formData.localId,
      local: local?.nome || '',
      data: formData.data.toISOString().split('T')[0],
      horaInicio: formData.horaInicio,
      horaFim: formData.horaFim,
      observacoes: formData.observacoes,
      modalidade: formData.modalidade,
      valor: parseFloat(formData.valor) || 0,
      status: formData.status,
      cor: '#6b7280',
      criadoEm: new Date().toISOString()
    };

    if (isEdit && id) {
      editar(id, recebivelData);
    } else {
      criar(recebivelData);
    }

    goBack();
  };

  const handleChange = (field: keyof RecebivelFormData, value: string | Date | undefined) => {
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
            id="cliente"
            label="Cliente"
            selectedId={formData.clienteId}
            onChange={(value, item) => handleChange('clienteId', item?.id || value)}
            items={clientesExemplo}
            placeholder="Selecione o cliente..."
            onLoadById={loadClienteById}
            required
          />

          <CampoBusca
            id="local"
            label="Local"
            selectedId={formData.localId}
            onChange={(value, item) => handleChange('localId', item?.id || value)}
            items={locaisExemplo}
            placeholder="Selecione o local..."
            onLoadById={loadLocalById}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SeletorData
              id="data"
              label="Data"
              value={formData.data}
              onChange={(date) => handleChange('data', date)}
              required
            />

            <div className="space-y-2">
              <Label htmlFor="horaInicio">Hora Início</Label>
              <Input
                id="horaInicio"
                type="time"
                value={formData.horaInicio}
                onChange={(e) => handleChange('horaInicio', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horaFim">Hora Fim</Label>
              <Input
                id="horaFim"
                type="time"
                value={formData.horaFim}
                onChange={(e) => handleChange('horaFim', e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="modalidade">Modalidade</Label>
            <Input
              id="modalidade"
              value={formData.modalidade}
              onChange={(e) => handleChange('modalidade', e.target.value)}
              placeholder="Ex: Futebol, Vôlei, etc."
              className="h-11"
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
          <CampoValor
            id="valor"
            label="Valor"
            value={formData.valor}
            onChange={(value) => handleChange('valor', value)}
            required
          />

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleChange('status', value as 'confirmado' | 'pendente' | 'cancelado')}
            >
              <SelectTrigger id="status" className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
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
      title={isEdit ? "Editar Recebível" : "Novo Recebível"}
      icon={<CreditCard className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.events}
      
      
      formSections={formSections}
      onSubmit={handleSubmit}
      tourSteps={tourSteps}
      submitLabel={isEdit ? "Atualizar Recebível" : "Criar Recebível"}
      description={isEdit ? "Edite as informações do recebível existente." : "Preencha os campos para criar um novo recebível."}
    />
  );
};

export default Recebivel;
