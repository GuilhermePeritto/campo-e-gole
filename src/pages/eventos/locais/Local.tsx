
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { FormField, FormSection, FormularioBase } from '@/core/components/formularioBase';
import { useLocais } from '@/hooks/useLocais';
import { SituacaoLocal } from '@/types/enums/situacao-local';
import { Info, MapPin, Settings, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface LocalFormData {
  nome: string;
  tipo: string;
  cor: string;
  valorHora: string;
  capacidade: string;
  descricao: string;
  comodidades: string[];
  situacao: SituacaoLocal;
  intervalo: string;
  horaAbertura: string;
  horaFechamento: string;
}

const Local = () => {
  const { id } = useParams();
  const isEdit = !!id;

  const { buscarPorId, createLocal, updateLocal } = useLocais();

  const [formData, setFormData] = useState<LocalFormData>({
    nome: '',
    tipo: '',
    cor: '#10B981',
    valorHora: '',
    capacidade: '',
    descricao: '',
    comodidades: [],
    situacao: SituacaoLocal.Ativo,
    intervalo: '60',
    horaAbertura: '08:00',
    horaFechamento: '22:00'
  });

  const [loading, setLoading] = useState(false);

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
          situacao: local.situacao || SituacaoLocal.Ativo,
          intervalo: local.intervalo?.toString() || '60',
          horaAbertura: local.horaAbertura || '08:00',
          horaFechamento: local.horaFechamento || '22:00'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.tipo || !formData.valorHora) {
      alert('Por favor, preencha os campos obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const localData = {
        nome: formData.nome,
        rotulo: formData.nome,
        subtitulo: formData.tipo,
        tipo: formData.tipo,
        valorHora: parseFloat(formData.valorHora),
        capacidade: formData.capacidade ? parseInt(formData.capacidade) : undefined,
        descricao: formData.descricao,
        comodidades: formData.comodidades,
        situacao: formData.situacao,
        cor: formData.cor,
        intervalo: parseInt(formData.intervalo),
        horaAbertura: formData.horaAbertura,
        horaFechamento: formData.horaFechamento,
        filialId: '1' // TODO: Pegar da sessão do usuário
      };

      if (isEdit && id) {
        await updateLocal(id, localData);
      } else {
        await createLocal(localData);
      }
    } catch (error) {
      console.error('Erro ao salvar local:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof LocalFormData, value: string | string[] | SituacaoLocal) => {
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

  return (
    <FormularioBase
      title={isEdit ? "Editar Local" : "Novo Local"}
      icon={<MapPin className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.events}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Atualizar Local" : "Criar Local"}
      description={isEdit ? "Edite as informações do local existente." : "Preencha os campos para criar um novo local."}
      loading={loading}
      layout="two-column"
    >
      {/* Informações Básicas */}
      <FormSection
        title="Informações Básicas"
        icon={<Info className="h-5 w-5" />}
        description="Dados principais do local"
        variant="accent"
        colSpan="full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FormField label="Nome do Local" required>
            <Input
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Ex: Quadra Principal"
              className="h-12 text-base"
            />
          </FormField>

          <FormField label="Tipo" required>
            <Select value={formData.tipo} onValueChange={(value) => handleChange('tipo', value)}>
              <SelectTrigger className="h-12 text-base">
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
          </FormField>
        </div>

        <FormField label="Descrição" colSpan="full">
          <Textarea
            value={formData.descricao}
            onChange={(e) => handleChange('descricao', e.target.value)}
            placeholder="Descrição detalhada do local..."
            rows={4}
            className="text-base resize-none"
          />
        </FormField>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormField label="Valor por Hora (R$)" required>
            <Input
              type="number"
              step="0.01"
              value={formData.valorHora}
              onChange={(e) => handleChange('valorHora', e.target.value)}
              placeholder="Ex: 80.00"
              className="h-12 text-base"
            />
          </FormField>

          <FormField label="Capacidade">
            <Input
              type="number"
              value={formData.capacidade}
              onChange={(e) => handleChange('capacidade', e.target.value)}
              placeholder="Ex: 22"
              className="h-12 text-base"
            />
          </FormField>

          <FormField label="Status">
            <Select value={formData.situacao.toString()} onValueChange={(value) => handleChange('situacao', parseInt(value) as SituacaoLocal)}>
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SituacaoLocal.Ativo.toString()}>Ativo</SelectItem>
                <SelectItem value={SituacaoLocal.Inativo.toString()}>Inativo</SelectItem>
                <SelectItem value={SituacaoLocal.Manutencao.toString()}>Em Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </div>
      </FormSection>

      {/* Configurações */}
      <FormSection
        title="Configurações"
        icon={<Settings className="h-5 w-5" />}
        description="Configurações de horário e intervalo"
        variant="default"
      >
        <div className="space-y-6">
          <FormField label="Intervalo de Reserva">
            <Select value={formData.intervalo} onValueChange={(value) => handleChange('intervalo', value)}>
              <SelectTrigger className="h-12 text-base">
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
          </FormField>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField label="Horário de Abertura">
              <Input
                type="time"
                value={formData.horaAbertura}
                onChange={(e) => handleChange('horaAbertura', e.target.value)}
                className="h-12 text-base"
              />
            </FormField>

            <FormField label="Horário de Fechamento">
              <Input
                type="time"
                value={formData.horaFechamento}
                onChange={(e) => handleChange('horaFechamento', e.target.value)}
                className="h-12 text-base"
              />
            </FormField>
          </div>

          <FormField label="Cor do Local" description="Cor para identificação visual">
            <div className="flex items-center space-x-4">
              <Input
                type="color"
                value={formData.cor}
                onChange={(e) => handleChange('cor', e.target.value)}
                className="w-20 h-12 p-1 rounded-lg border-2 border-border"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{formData.cor}</div>
                <div className="text-xs text-muted-foreground">Clique para alterar a cor</div>
              </div>
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* Comodidades */}
      <FormSection
        title="Comodidades"
        icon={<Star className="h-5 w-5" />}
        description="Selecione as comodidades disponíveis"
        variant="subtle"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Selecione as comodidades disponíveis neste local:
          </p>
          <div className="grid grid-cols-1 gap-3">
            {opcoesComodidades.map(comodidade => (
              <div key={comodidade} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={comodidade}
                  checked={formData.comodidades.includes(comodidade)}
                  onCheckedChange={() => handleComodidadeToggle(comodidade)}
                  className="h-5 w-5"
                />
                <label 
                  htmlFor={comodidade} 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                >
                  {comodidade}
                </label>
              </div>
            ))}
          </div>
        </div>
      </FormSection>
    </FormularioBase>
  );
};

export default Local;
