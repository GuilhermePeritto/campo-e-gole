
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PaginaFormularioBase from '@/core/componentes/PaginaFormularioBase';
import SeletorData from '@/core/componentes/SeletorData';
import CampoValor from '@/core/componentes/CampoValor';
import CampoHorario from '@/core/componentes/CampoHorario';
import CampoBusca from '@/core/componentes/CampoBusca';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';

const EditarEvento = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - em produção viria de uma API
  const [formData, setFormData] = useState({
    title: 'Workshop de React',
    description: 'Workshop sobre os fundamentos do React',
    client: 'João Silva',
    venue: 'Sala de Conferências',
    date: new Date('2025-06-20'),
    startTime: '14:00',
    endTime: '18:00',
    capacity: '30',
    price: '150.00',
    type: 'workshop',
    status: 'confirmado'
  });

  // Mock data para clientes e locais
  const clientes = [
    { id: '1', label: 'João Silva', subtitle: 'CPF: 123.456.789-00' },
    { id: '2', label: 'Maria Santos', subtitle: 'CPF: 987.654.321-00' },
    { id: '3', label: 'Empresa ABC Ltda', subtitle: 'CNPJ: 12.345.678/0001-90' }
  ];

  const locais = [
    { id: '1', label: 'Auditório Principal', subtitle: 'Capacidade: 200 pessoas' },
    { id: '2', label: 'Sala de Conferências', subtitle: 'Capacidade: 50 pessoas' },
    { id: '3', label: 'Quadra Esportiva', subtitle: 'Capacidade: 100 pessoas' },
    { id: '4', label: 'Salão de Eventos', subtitle: 'Capacidade: 150 pessoas' }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '#title',
      title: 'Nome do Evento',
      content: 'Atualize o nome do evento conforme necessário.'
    },
    {
      target: '#client',
      title: 'Cliente',
      content: 'Altere o cliente responsável pelo evento se necessário.'
    },
    {
      target: '#venue',
      title: 'Local',
      content: 'Modifique o local onde o evento será realizado.'
    },
    {
      target: '#date',
      title: 'Data do Evento',
      content: 'Altere a data do evento se necessário.'
    },
    {
      target: '#startTime',
      title: 'Horário de Início',
      content: 'Atualize o horário de início do evento.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.client || !formData.venue || !formData.date) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Evento atualizado!",
      description: `O evento "${formData.title}" foi atualizado com sucesso.`,
    });
    navigate('/eventos');
  };

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <PaginaFormularioBase
      title="Editar Evento"
      description="Atualize as informações do evento"
      icon={<CalendarDays className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos"
      backLabel="Eventos"
      onSubmit={handleSubmit}
      submitLabel="Salvar Alterações"
      tourSteps={tourSteps}
      tourTitle="Edição de Evento"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Nome do Evento *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Ex: Workshop de React"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Tipo de Evento</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger id="type" className="h-11">
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="palestra">Palestra</SelectItem>
                <SelectItem value="curso">Curso</SelectItem>
                <SelectItem value="evento_corporativo">Evento Corporativo</SelectItem>
                <SelectItem value="festa">Festa</SelectItem>
                <SelectItem value="reuniao">Reunião</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <CampoBusca
            id="client"
            label="Cliente *"
            value={formData.client}
            onChange={(value) => handleInputChange('client', value)}
            opcoes={clientes}
            placeholder="Digite para buscar cliente..."
            required
          />

          <CampoBusca
            id="venue"
            label="Local *"
            value={formData.venue}
            onChange={(value) => handleInputChange('venue', value)}
            opcoes={locais}
            placeholder="Digite para buscar local..."
            required
          />

          <SeletorData
            id="date"
            label="Data do Evento *"
            value={formData.date}
            onChange={(date) => handleInputChange('date', date)}
            required
          />

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidade</Label>
            <Input
              id="capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => handleInputChange('capacity', e.target.value)}
              placeholder="Ex: 50"
              className="h-11"
            />
          </div>

          <CampoHorario
            id="startTime"
            label="Horário de Início"
            value={formData.startTime}
            onChange={(value) => handleInputChange('startTime', value)}
          />

          <CampoHorario
            id="endTime"
            label="Horário de Término"
            value={formData.endTime}
            onChange={(value) => handleInputChange('endTime', value)}
          />

          <CampoValor
            id="price"
            label="Valor do Evento"
            value={formData.price}
            onChange={(value) => handleInputChange('price', value)}
            placeholder="0,00"
          />

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
              <SelectTrigger id="status" className="h-11">
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planejado">Planejado</SelectItem>
                <SelectItem value="confirmado">Confirmado</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Descreva o evento..."
          rows={3}
        />
      </div>
    </PaginaFormularioBase>
  );
};

export default EditarEvento;
