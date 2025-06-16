import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseFormPage from '@/components/BaseFormPage';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { TourStep } from '@/components/PageTour';
import SeletorData from '@/core/componentes/SeletorData';

interface EventoFormData {
  nome: string;
  descricao: string;
  dataInicio: Date | undefined;
  dataFim: Date | undefined;
  local: string;
}

const NovoEvento = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<EventoFormData>({
    nome: '',
    descricao: '',
    dataInicio: new Date(),
    dataFim: new Date(),
    local: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#nome',
      title: 'Nome do Evento',
      content: 'Insira o nome do evento que será criado.'
    },
    {
      target: '#dataInicio',
      title: 'Data de Início',
      content: 'Selecione a data de início do evento.'
    },
    {
      target: '#dataFim',
      title: 'Data de Fim',
      content: 'Selecione a data de término do evento.'
    },
    {
      target: '#local',
      title: 'Local',
      content: 'Informe o local onde o evento ocorrerá.'
    },
    {
      target: '#descricao',
      title: 'Descrição',
      content: 'Descreva detalhadamente o evento.'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo evento:', formData);
    navigate('/eventos');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleDataInicioChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dataInicio: date }));
  };

  const handleDataFimChange = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, dataFim: date }));
  };

  return (
    <BaseFormPage
      title="Criar Novo Evento"
      description="Registre um novo evento no sistema"
      icon={<Calendar className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos"
      backLabel="Eventos"
      onSubmit={handleSubmit}
      submitLabel="Salvar Evento"
      tourSteps={tourSteps}
      tourTitle="Criação de Novo Evento"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações do Evento</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-sm font-medium">Nome *</Label>
            <Input
              id="nome"
              placeholder="Nome do evento"
              value={formData.nome}
              onChange={(e) => handleInputChange(e, 'nome')}
              className="h-11"
              required
            />
          </div>

          <div>
            <Label htmlFor="local" className="text-sm font-medium">Local *</Label>
            <Input
              id="local"
              placeholder="Local do evento"
              value={formData.local}
              onChange={(e) => handleInputChange(e, 'local')}
              className="h-11"
              required
            />
          </div>

          <div>
            <SeletorData
              id="dataInicio"
              label="Data de Início"
              value={formData.dataInicio}
              onChange={handleDataInicioChange}
              required
            />
          </div>

          <div>
            <SeletorData
              id="dataFim"
              label="Data de Fim"
              value={formData.dataFim}
              onChange={handleDataFimChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao" className="text-sm font-medium">Descrição *</Label>
        <Textarea
          id="descricao"
          placeholder="Descrição detalhada do evento"
          value={formData.descricao}
          onChange={(e) => handleInputChange(e, 'descricao')}
          rows={3}
          className="resize-none"
          required
        />
      </div>
    </BaseFormPage>
  );
};

export default NovoEvento;
