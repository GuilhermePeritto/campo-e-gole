import BaseFormPage from '@/components/BaseFormPage';
import { TourStep } from '@/components/PageTour';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Clock, Grip, Type } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Local = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: isEdit ? 'Quadra de Tênis Principal' : '',
    category: isEdit ? 'sports' : '',
    capacity: isEdit ? '4' : '',
    hourlyRate: isEdit ? '150' : '',
    interval: isEdit ? '60' : '30',
    description: isEdit ? 'Quadra principal de tênis com piso sintético e iluminação noturna.' : '',
    openTime: isEdit ? '07:00' : '07:00',
    closeTime: isEdit ? '22:00' : '22:00',
    color: isEdit ? '#10b981' : '#10b981',
    primeTime: true, // Alterado para true como default
    primeTimeStart: isEdit ? '18:00' : '18:00',
    primeTimeEnd: isEdit ? '22:00' : '22:00',
    primeTimeRate: isEdit ? '200' : ''
  });

  useEffect(() => {
    // Verificar se existe URL de retorno no sessionStorage
    const returnUrl = sessionStorage.getItem('returnUrl');
  }, []);

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-local"]',
      title: 'Informações do Local',
      content: 'Preencha os dados gerais do local.',
      placement: 'bottom'
    },
    {
      target: '#name',
      title: 'Nome do Local',
      content: 'Digite o nome do local.',
      placement: 'bottom'
    },
    {
      target: '[data-card="configuracoes"]',
      title: 'Configurações',
      content: 'Configure detalhes como capacidade e horários.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando local:' : 'Criando local:', formData);
    navigate('/eventos/locais');
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formSections = [
    {
      id: 'info-local',
      title: 'Informações do Local',
      alwaysOpen: true,
      content: (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Local *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Quadra de Tênis Principal"
              required
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Ex: Quadra principal de tênis com piso sintético e iluminação noturna."
              rows={4}
            />
          </div>
        </div>
      )
    },
    {
      id: 'configuracoes',
      title: 'Configurações',
      defaultOpen: false,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger id="category" className="h-11">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sports">Esportes</SelectItem>
                  <SelectItem value="events">Eventos</SelectItem>
                  <SelectItem value="leisure">Lazer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacidade</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => handleChange('capacity', e.target.value)}
                placeholder="Ex: 4"
                className="h-11"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Taxa por Hora</Label>
              <Input
                id="hourlyRate"
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => handleChange('hourlyRate', e.target.value)}
                placeholder="Ex: 150"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interval">Intervalo (minutos)</Label>
              <Select value={formData.interval} onValueChange={(value) => handleChange('interval', value)}>
                <SelectTrigger id="interval" className="h-11">
                  <SelectValue placeholder="Selecione o intervalo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                  <SelectItem value="60">60 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="openTime">Horário de Abertura</Label>
              <Input
                id="openTime"
                type="time"
                value={formData.openTime}
                onChange={(e) => handleChange('openTime', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closeTime">Horário de Fechamento</Label>
              <Input
                id="closeTime"
                type="time"
                value={formData.closeTime}
                onChange={(e) => handleChange('closeTime', e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Cor de Identificação</Label>
            <Input
              id="color"
              type="color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="h-11 w-24"
            />
          </div>
        </div>
      )
    },
    {
      id: 'horario-nobre',
      title: 'Horário Nobre',
      defaultOpen: false,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
            <div className="space-y-1">
              <Label htmlFor="primeTime" className="text-sm font-medium">
                Ativar Horário Nobre
              </Label>
              <p className="text-xs text-muted-foreground">
                Defina horários e taxas diferenciadas para horários de pico
              </p>
            </div>
            <Switch
              id="primeTime"
              checked={formData.primeTime}
              onCheckedChange={(checked) => handleChange('primeTime', checked)}
            />
          </div>

          {formData.primeTime && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primeTimeStart">Início do Horário Nobre</Label>
                  <Input
                    id="primeTimeStart"
                    type="time"
                    value={formData.primeTimeStart}
                    onChange={(e) => handleChange('primeTimeStart', e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primeTimeEnd">Fim do Horário Nobre</Label>
                  <Input
                    id="primeTimeEnd"
                    type="time"
                    value={formData.primeTimeEnd}
                    onChange={(e) => handleChange('primeTimeEnd', e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primeTimeRate">Taxa no Horário Nobre</Label>
                <Input
                  id="primeTimeRate"
                  type="number"
                  value={formData.primeTimeRate}
                  onChange={(e) => handleChange('primeTimeRate', e.target.value)}
                  placeholder="Ex: 200"
                  className="h-11"
                />
              </div>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? 'Editar Local' : 'Novo Local'}
      description={isEdit ? 'Edite as informações do local' : 'Cadastre um novo local'}
      icon={<Grip className="h-5 w-5" />}
      moduleColor={MODULE_COLORS.events}
      backTo="/eventos/locais"
      backLabel="Locais"
      onSubmit={handleSubmit}
      submitLabel={isEdit ? 'Salvar Alterações' : 'Cadastrar Local'}
      tourSteps={tourSteps}
      tourTitle={isEdit ? "Edição de Local" : "Cadastro de Local"}
      formSections={formSections}
    />
  );
};

export default Local;
