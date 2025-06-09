
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    parentCpf: '',
    emergencyContact: '',
    emergencyPhone: '',
    address: '',
    medicalInfo: '',
    allergies: '',
    class: '',
    monthlyFee: ''
  });

  const classes = [
    { id: '1', name: 'Infantil A (4-6 anos)', fee: 150 },
    { id: '2', name: 'Infantil B (7-9 anos)', fee: 150 },
    { id: '3', name: 'Juvenil A (10-12 anos)', fee: 180 },
    { id: '4', name: 'Juvenil B (13-15 anos)', fee: 180 }
  ];

  useEffect(() => {
    // Simular carregamento dos dados do aluno
    const mockData = {
      name: 'Pedro Silva',
      birthDate: '2016-03-15',
      parentName: 'José Silva',
      parentPhone: '(11) 99999-1111',
      parentEmail: 'jose.silva@email.com',
      parentCpf: '123.456.789-00',
      emergencyContact: 'Maria Silva',
      emergencyPhone: '(11) 99999-2222',
      address: 'Rua das Flores, 123, Centro, São Paulo - SP, 01234-567',
      medicalInfo: 'Nenhuma restrição médica conhecida',
      allergies: 'Alergia a amendoim',
      class: '1',
      monthlyFee: '150'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Aluno atualizado com sucesso!",
        description: "As informações do aluno foram atualizadas.",
      });
      
      navigate('/escolinha/alunos');
    } catch (error) {
      toast({
        title: "Erro ao atualizar aluno",
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

  const handleClassChange = (classId: string) => {
    const selectedClass = classes.find(c => c.id === classId);
    setFormData(prev => ({ 
      ...prev, 
      class: classId,
      monthlyFee: selectedClass ? selectedClass.fee.toString() : ''
    }));
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/alunos')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Editar Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Dados do Aluno */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Aluno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Nome completo do aluno"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    required
                  />
                  {formData.birthDate && (
                    <p className="text-sm text-muted-foreground">
                      Idade: {calculateAge(formData.birthDate)} anos
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="class">Turma *</Label>
                  <Select value={formData.class} onValueChange={handleClassChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          {classItem.name} - R$ {classItem.fee.toFixed(2)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyFee">Mensalidade (R$)</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    step="0.01"
                    value={formData.monthlyFee}
                    onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
                    placeholder="Valor da mensalidade"
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dados do Responsável */}
          <Card>
            <CardHeader>
              <CardTitle>Dados do Responsável</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Nome do Responsável *</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    placeholder="Nome completo do responsável"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentCpf">CPF do Responsável</Label>
                  <Input
                    id="parentCpf"
                    value={formData.parentCpf}
                    onChange={(e) => handleInputChange('parentCpf', e.target.value)}
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Telefone do Responsável *</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentEmail">E-mail do Responsável</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                    placeholder="responsavel@email.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato de Emergência */}
          <Card>
            <CardHeader>
              <CardTitle>Contato de Emergência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Nome do Contato de Emergência *</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Nome do contato alternativo"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Telefone de Emergência *</Label>
                  <Input
                    id="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço Completo *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Rua, número, bairro, cidade, CEP"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Informações de Saúde */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Saúde</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medicalInfo">Informações Médicas</Label>
                <Textarea
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                  placeholder="Problemas de saúde, medicamentos em uso, restrições médicas..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="Alergias alimentares, medicamentosas ou de contato..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/escolinha/alunos')}
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
      </main>
    </div>
  );
};

export default EditStudent;
