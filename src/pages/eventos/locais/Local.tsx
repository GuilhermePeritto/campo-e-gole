
import BaseFormPage from '@/components/BaseFormPage';
import { TourStep } from '@/components/PageTour';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useLocais } from '@/hooks/useLocais';
import { useNavigationHistory } from '@/hooks/useNavigationHistory';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface LocalFormData {
  nome: string;
  tipo: string;
  cor: string;
  valorHora: string;
  capacidade: string;
  descricao: string;
  comodidades: string[];
  status: 'ativo' | 'inativo' | 'manutencao';
  intervalo: string;
  horarioAbertura: string;
  horarioFechamento: string;
}

const Local = () => {
  const navigate = useNavigate();
  const { goBack } = useNavigationHistory();
  const { id } = useParams();
  const isEdit = !!id;

  const { buscarPorId, criar, editar } = useLocais();

  const [formData, setFormData] = useState<LocalFormData>({
    nome: '',
    tipo: '',
    cor: '#10B981',
    valorHora: '',
    capacidade: '',
    descricao: '',
    comodidades: [],
    status: 'ativo',
    intervalo: '60',
    horarioAbertura: '08:00',
    horarioFechamento: '22:00'
  });

  // Carregar dados do local se for edição
  useEffect(() => {
    if (isEdit && id) {
      const local = buscarPorId(id);
      if (local) {
        setFormData({
          nome: local.nome || '',
          tipo: local.tipo || '',
          cor: local.cor || '#10B981',
          valorHora: local.valorHora?.toString() || '',
          capacidade: local.capacidade?.toString() || '',
          descricao: local.descricao || '',
          comodidades: local.comodidades || [],
          status: local.status || 'ativo',
          intervalo: local.intervalo?.toString() || '60',
          horarioAbertura: local.horarioAbertura || '08:00',
          horarioFechamento: local.horarioFechamento || '22:00'
        });
      }
    }
  }, [isEdit, id, buscarPorId]);

  const opcoesTipo = [
    'Futebol',
    'Futebol Society',
    'Futsal',
    'Vôlei',
    'Basquete',
    'Tênis',
    'Poliesportiva'
  ];

  const opcoesComodidades = [
    'Grama sintética',
    'Grama natural',
    'Piso de madeira',
    'Piso de cimento',
    'Iluminação',
    'Arquibancada',
    'Vestiário',
    'Vestiário duplo',
    'Som ambiente',
    'Quadro de gols',
    'Rede de proteção',
    'Estacionamento',
    'Cobertura',
    'Climatização'
  ];

  const opcoesIntervalo = [
    { value: '15', label: '15 minutos' },
    { value: '30', label: '30 minutos' },
    { value: '60', label: '1 hora' },
    { value: '90', label: '1 hora e 30 minutos' },
    { value: '120', label: '2 horas' }
  ];

  const tourSteps: TourStep[] = [
    {
      target: '[data-card="info-basicas"]',
      title: 'Informações Básicas',
      content: 'Este card contém os dados principais do local como nome, tipo e capacidade.',
      placement: 'bottom'
    },
    {
      target: '#nome',
      title: 'Nome do Local',
      content: 'Digite o nome do local que será exibido nas reservas.',
      placement: 'bottom'
    },
    {
      target: '[data-card="comodidades"]',
      title: 'Comodidades',
      content: 'Selecione as comodidades disponíveis no local.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipo || !formData.valorHora) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    const localData = {
      nome: formData.nome,
      rotulo: formData.nome,
      subtitulo: formData.tipo,
      tipo: formData.tipo,
      valorHora: parseFloat(formData.valorHora),
      capacidade: formData.capacidade ? parseInt(formData.capacidade) : undefined,
      descricao: formData.descricao,
      comodidades: formData.comodidades,
      status: formData.status,
      cor: formData.cor,
      intervalo: parseInt(formData.intervalo),
      horarioAbertura: formData.horarioAbertura,
      horarioFechamento: formData.horarioFechamento
    };

    if (isEdit && id) {
      editar(id, localData);
    } else {
      criar(localData);
    }

    goBack();
  };

  const handleChange = (field: keyof LocalFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComodidadeToggle = (comodidade: string) => {
    setFormData(prev => ({
      ...prev,
      comodidades: prev.comodidades.includes(comodidade)
        ? prev.comodidades.filter(c => c !== comodidade)
        : [...prev.comodidades, comodidade]
    }));
  };

  const formSections = [
    {
      id: 'info-basicas',
      title: 'Informações Básicas',
      alwaysOpen: true,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Local *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Ex: Quadra Principal"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleChange('tipo', value)}>
                <SelectTrigger id="tipo" className="h-11">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {opcoesTipo.map(tipo => (
                    <SelectItem key={tipo} value={tipo}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              placeholder="Descrição detalhada do local..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="valorHora">Valor por Hora (R$) *</Label>
              <Input
                id="valorHora"
                type="number"
                step="0.01"
                value={formData.valorHora}
                onChange={(e) => handleChange('valorHora', e.target.value)}
                placeholder="Ex: 80.00"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacidade">Capacidade</Label>
              <Input
                id="capacidade"
                type="number"
                value={formData.capacidade}
                onChange={(e) => handleChange('capacidade', e.target.value)}
                placeholder="Ex: 22"
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value as 'ativo' | 'inativo' | 'manutencao')}>
                <SelectTrigger id="status" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="manutencao">Em Manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="intervalo">Intervalo de Reserva</Label>
              <Select value={formData.intervalo} onValueChange={(value) => handleChange('intervalo', value)}>
                <SelectTrigger id="intervalo" className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {opcoesIntervalo.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="horarioAbertura">Horário de Abertura</Label>
              <Input
                id="horarioAbertura"
                type="time"
                value={formData.horarioAbertura}
                onChange={(e) => handleChange('horarioAbertura', e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horarioFechamento">Horário de Fechamento</Label>
              <Input
                id="horarioFechamento"
                type="time"
                value={formData.horarioFechamento}
                onChange={(e) => handleChange('horarioFechamento', e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cor">Cor do Local</Label>
            <div className="flex items-center space-x-3">
              <Input
                id="cor"
                type="color"
                value={formData.cor}
                onChange={(e) => handleChange('cor', e.target.value)}
                className="w-16 h-11 p-1"
              />
              <span className="text-sm text-muted-foreground">
                Cor para identificação visual do local
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'comodidades',
      title: 'Comodidades',
      defaultOpen: false,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Selecione as comodidades disponíveis neste local:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {opcoesComodidades.map(comodidade => (
              <div key={comodidade} className="flex items-center space-x-2">
                <Checkbox
                  id={comodidade}
                  checked={formData.comodidades.includes(comodidade)}
                  onCheckedChange={() => handleComodidadeToggle(comodidade)}
                />
                <Label htmlFor={comodidade} className="text-sm">
                  {comodidade}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )
    }
  ];

  return (
    <BaseFormPage
      title={isEdit ? "Editar Local" : "Novo Local"}
      icon={<MapPin className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.events}
      
      
      formSections={formSections}
      onSubmit={handleSubmit}
      tourSteps={tourSteps}
      submitLabel={isEdit ? "Atualizar Local" : "Criar Local"}
      description={isEdit ? "Edite as informações do local existente." : "Preencha os campos para criar um novo local."}
    />
  );
};

export default Local;
