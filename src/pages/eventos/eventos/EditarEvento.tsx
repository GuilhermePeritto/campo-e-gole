import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import SeletorData from '@/core/componentes/SeletorData';

const EditarEvento = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - em produção viria de uma API
  const [formData, setFormData] = useState({
    name: 'Campeonato de Futebol',
    date: new Date('2024-07-15'),
    description: 'Campeonato anual de futebol society para amadores.'
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Evento',
      content: 'Atualize o nome do evento conforme necessário.'
    },
    {
      target: '#date',
      title: 'Data do Evento',
      content: 'Selecione a nova data para o evento.'
    },
    {
      target: '#description',
      title: 'Descrição',
      content: 'Modifique ou adicione detalhes sobre o evento.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do evento atualizados:', formData);
    navigate('/eventos');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date: date }));
  };

  return (
    <BaseFormPage
      title="Editar Evento"
      description="Altere as informações do evento"
      icon={<Calendar className="h-5 w-5" />}
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
          <h3 className="text-lg font-semibold text-foreground">Informações do Evento</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Nome do Evento *</Label>
            <Input
              id="name"
              placeholder="Ex: Campeonato de Futebol"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium">Data do Evento *</Label>
            <SeletorData
              id="date"
              value={formData.date}
              onChange={handleDateChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Descrição</Label>
        <Textarea
          id="description"
          className="resize-none"
          placeholder="Descrição detalhada do evento..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={3}
        />
      </div>
    </BaseFormPage>
  );
};

export default EditarEvento;
