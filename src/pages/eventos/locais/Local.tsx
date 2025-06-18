
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';
import PageTour, { TourStep } from '@/components/PageTour';

const Local = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: isEdit ? 'Quadra Principal' : '',
    type: isEdit ? 'Futebol Society' : '',
    capacity: isEdit ? '22' : '',
    hourlyRate: isEdit ? '80.00' : '',
    status: isEdit ? 'ativo' : 'ativo',
    description: isEdit ? 'Quadra com grama sintética e iluminação completa' : '',
    characteristics: isEdit ? ['Grama sintética', 'Iluminação', 'Vestiário'] : []
  });

  const availableCharacteristics = [
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

  const tourSteps: TourStep[] = [
    {
      target: '[data-tour="nome"]',
      content: 'Digite o nome do local que será exibido nas reservas.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="tipo"]',
      content: 'Selecione o tipo de esporte ou atividade do local.',
      placement: 'bottom'
    },
    {
      target: '[data-tour="caracteristicas"]',
      content: 'Marque as características disponíveis no local.',
      placement: 'top'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEdit ? 'Editando local:' : 'Criando local:', formData);
    navigate('/eventos/locais');
  };

  const handleChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCharacteristicToggle = (characteristic: string) => {
    setFormData(prev => ({
      ...prev,
      characteristics: prev.characteristics.includes(characteristic)
        ? prev.characteristics.filter(c => c !== characteristic)
        : [...prev.characteristics, characteristic]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={isEdit ? 'Editar Local' : 'Cadastrar Novo Local'}
        icon={<MapPin className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos/locais"
        backLabel="Locais"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="shadow-lg relative">
          <PageTour steps={tourSteps} title="Tour - Cadastro de Local" />
          
          <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              {isEdit ? 'Editar Local' : 'Cadastrar Novo Local'}
            </CardTitle>
            <CardDescription>
              {isEdit ? 'Edite as informações do local' : 'Registre um novo local para reservas'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2" data-tour="nome">
                    <Label htmlFor="name">Nome do Local *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Ex: Quadra Principal"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2" data-tour="tipo">
                    <Label htmlFor="type">Tipo *</Label>
                    <Select value={formData.type} onValueChange={(value) => handleChange('type', value)}>
                      <SelectTrigger id="type" className="h-11">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Futebol">Futebol</SelectItem>
                        <SelectItem value="Futebol Society">Futebol Society</SelectItem>
                        <SelectItem value="Futsal">Futsal</SelectItem>
                        <SelectItem value="Vôlei">Vôlei</SelectItem>
                        <SelectItem value="Basquete">Basquete</SelectItem>
                        <SelectItem value="Tênis">Tênis</SelectItem>
                        <SelectItem value="Poliesportiva">Poliesportiva</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidade (pessoas) *</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleChange('capacity', e.target.value)}
                      placeholder="Ex: 22"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      step="0.01"
                      value={formData.hourlyRate}
                      onChange={(e) => handleChange('hourlyRate', e.target.value)}
                      placeholder="Ex: 80.00"
                      required
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Situação</Label>
                    <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                      <SelectTrigger id="status" className="h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Descrição detalhada do local..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 pb-2 border-b">
                  <h3 className="text-lg font-semibold text-foreground">Características</h3>
                </div>
                
                <div className="space-y-2" data-tour="caracteristicas">
                  <Label>Selecione as características disponíveis</Label>
                  <div className="border rounded-lg p-4 max-h-60 overflow-y-auto space-y-3">
                    {availableCharacteristics.map((characteristic) => (
                      <div key={characteristic} className="flex items-center space-x-2">
                        <Checkbox
                          id={characteristic}
                          checked={formData.characteristics.includes(characteristic)}
                          onCheckedChange={() => handleCharacteristicToggle(characteristic)}
                        />
                        <Label htmlFor={characteristic} className="cursor-pointer">
                          {characteristic}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-6 border-t">
                <Button type="submit" className="flex-1 h-11 font-medium">
                  {isEdit ? 'Salvar Alterações' : 'Cadastrar Local'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/locais')}
                  className="flex-1 h-11 font-medium"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Local;
