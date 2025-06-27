import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTeacher = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    address: '',
    specialization: '',
    chargeType: 'por-aula',
    valuePerClass: '',
    commissionPercentage: '',
    notes: ''
  });

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Professor',
      content: 'Digite o nome completo do professor que será cadastrado no sistema.'
    },
    {
      target: '#cpf',
      title: 'CPF do Professor',
      content: 'Campo opcional para o CPF do professor. Útil para controle de documentação e folha de pagamento.'
    },
    {
      target: '#email',
      title: 'E-mail de Contato',
      content: 'E-mail do professor para comunicações e envio de relatórios de aulas.'
    },
    {
      target: '#phone',
      title: 'Telefone do Professor',
      content: 'Número de telefone principal para contato com o professor. Campo obrigatório.'
    },
    {
      target: '#address',
      title: 'Endereço',
      content: 'Endereço residencial completo do professor para controle interno.'
    },
    {
      target: '#specialization',
      title: 'Especialização',
      content: 'Área de especialização do professor (Futebol, Educação Física, etc.). Campo obrigatório.'
    },
    {
      target: '#chargeType',
      title: 'Tipo de Cobrança',
      content: 'Defina se o professor será pago por aula ministrada ou por hora trabalhada.'
    },
    {
      target: '#valuePerClass',
      title: 'Valor por Aula/Hora',
      content: 'Valor que será pago ao professor por cada aula ou hora trabalhada.'
    },
    {
      target: '#commissionPercentage',
      title: 'Percentual de Comissão',
      content: 'Percentual de comissão sobre as mensalidades dos alunos que o professor ensina.'
    },
    {
      target: '#notes',
      title: 'Observações',
      content: 'Campo opcional para informações adicionais sobre o professor.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Professor cadastrado com sucesso!",
        description: "O novo professor foi adicionado ao sistema.",
      });
      
      navigate('/escolinha/professores');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar professor",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/professores')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Novo Professor</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Cadastro de Novo Professor" />
          
          <CardHeader>
            <CardTitle>Novo Professor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Nome completo do professor"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleInputChange('cpf', e.target.value)}
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="professor@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Endereço completo"
                  />
                </div>
              </div>

              {/* Dados Profissionais */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dados Profissionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Especialização *</Label>
                    <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a especialização" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="futebol">Futebol</SelectItem>
                        <SelectItem value="educacao-fisica">Educação Física</SelectItem>
                        <SelectItem value="natacao">Natação</SelectItem>
                        <SelectItem value="volei">Vôlei</SelectItem>
                        <SelectItem value="basquete">Basquete</SelectItem>
                        <SelectItem value="tenis">Tênis</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="chargeType">Tipo de Cobrança *</Label>
                    <Select value={formData.chargeType} onValueChange={(value) => handleInputChange('chargeType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="por-aula">Por Aula</SelectItem>
                        <SelectItem value="por-hora">Por Hora</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="valuePerClass">
                      Valor {formData.chargeType === 'por-hora' ? 'por Hora' : 'por Aula'} (R$) *
                    </Label>
                    <Input
                      id="valuePerClass"
                      type="number"
                      step="0.01"
                      value={formData.valuePerClass}
                      onChange={(e) => handleInputChange('valuePerClass', e.target.value)}
                      placeholder="Ex: 80.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="commissionPercentage">Comissão (%) *</Label>
                    <Input
                      id="commissionPercentage"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.commissionPercentage}
                      onChange={(e) => handleInputChange('commissionPercentage', e.target.value)}
                      placeholder="Ex: 15"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Informações adicionais sobre o professor..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/professores')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Cadastrando...' : 'Cadastrar Professor'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewTeacher;
