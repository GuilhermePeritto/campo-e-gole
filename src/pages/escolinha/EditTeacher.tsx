
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTeacher = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    status: true,
    notes: ''
  });

  useEffect(() => {
    // Carregar dados do professor
    const loadTeacher = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        // Aqui você faria uma chamada para buscar dados do professor
        // Por exemplo: const response = await api.get<ApiResponse<Teacher>>(`/api/professores/${id}`);
        // Por enquanto, vamos deixar como dados vazios até implementar a API
        
        setFormData({
          name: '',
          email: '',
          phone: '',
          cpf: '',
          address: '',
          specialization: '',
          chargeType: 'por-aula',
          valuePerClass: '',
          commissionPercentage: '',
          status: true,
          notes: ''
        });
      } catch (error) {
        console.error('Erro ao carregar professor:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do professor.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTeacher();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui você faria uma chamada para atualizar o professor
      // Por exemplo: await api.put<ApiResponse<Teacher>>(`/api/professores/${id}`, formData);
      
      toast({
        title: "Professor atualizado com sucesso!",
        description: "As informações do professor foram atualizadas.",
      });
      
      navigate('/escolinha/professores');
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
      toast({
        title: "Erro ao atualizar professor",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
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
              <h1 className="text-xl font-semibold">Editar Professor</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Editar Informações do Professor</CardTitle>
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

                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => handleInputChange('status', checked)}
                  />
                  <Label htmlFor="status">Professor Ativo</Label>
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
                  {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditTeacher;
