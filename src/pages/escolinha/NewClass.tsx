
import PageHeader from '@/components/PageHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Clock, DollarSign, GraduationCap, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ClassFormData {
  name: string;
  teacher: string;
  category: string;
  ageGroup: string;
  maxStudents: string;
  schedule: string;
  duration: string;
  monthlyFee: string;
  description: string;
  active: boolean;
}

const NewClass = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome da Turma',
      content: 'Digite um nome identificador para a turma (ex: Infantil A - Manhã).'
    },
    {
      target: '[data-teacher-select]',
      title: 'Professor',
      content: 'Selecione o professor responsável por esta turma.'
    },
    {
      target: '[data-category-select]',
      title: 'Categoria',
      content: 'Escolha a categoria esportiva da turma.'
    },
    {
      target: '#ageGroup',
      title: 'Faixa Etária',
      content: 'Defina a faixa etária dos alunos (ex: 6-8 anos).'
    },
    {
      target: '.schedule-inputs',
      title: 'Horários',
      content: 'Configure os horários e duração das aulas.'
    },
    {
      target: '#monthlyFee',
      title: 'Mensalidade',
      content: 'Defina o valor da mensalidade para esta turma.'
    }
  ];

  const [formData, setFormData] = useState<ClassFormData>({
    name: '',
    teacher: '',
    category: '',
    ageGroup: '',
    maxStudents: '',
    schedule: '',
    duration: '',
    monthlyFee: '',
    description: '',
    active: true
  });

  const teachers = [
    'Prof. Carlos Silva',
    'Prof. Maria Oliveira',
    'Prof. João Santos',
    'Prof. Ana Costa'
  ];

  const categories = [
    'Futebol',
    'Basquete',
    'Vôlei',
    'Tênis',
    'Natação',
    'Ginástica'
  ];

  const ageGroups = [
    '4-6 anos',
    '7-9 anos',
    '10-12 anos',
    '13-15 anos',
    '16+ anos'
  ];

  const schedules = [
    'Segunda e Quarta - 08:00',
    'Terça e Quinta - 08:00',
    'Segunda e Quarta - 14:00',
    'Terça e Quinta - 14:00',
    'Segunda e Quarta - 16:00',
    'Terça e Quinta - 16:00'
  ];

  const handleInputChange = (field: keyof ClassFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name.trim() || !formData.teacher || !formData.category || !formData.ageGroup) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, professor, categoria e faixa etária.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Turma criada com sucesso!",
        description: `Turma "${formData.name}" foi adicionada ao sistema.`,
      });
      
      navigate('/escolinha/turmas');
    } catch (error) {
      toast({
        title: "Erro ao criar turma",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Nova Turma"
        icon={<GraduationCap className="h-5 w-5 text-primary" />}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Criação de Nova Turma" />
          
          <CardHeader>
            <CardTitle>Criar Nova Turma</CardTitle>
            <CardDescription>
              Preencha as informações da nova turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Turma *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Infantil A - Manhã"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacher">Professor *</Label>
                  <Select value={formData.teacher} onValueChange={(value) => handleInputChange('teacher', value)}>
                    <SelectTrigger data-teacher-select>
                      <SelectValue placeholder="Selecionar professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger data-category-select>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Faixa Etária *</Label>
                  <Select value={formData.ageGroup} onValueChange={(value) => handleInputChange('ageGroup', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar faixa etária" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageGroups.map((age) => (
                        <SelectItem key={age} value={age}>{age}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 schedule-inputs">
                <div className="space-y-2">
                  <Label htmlFor="schedule">Horário das Aulas</Label>
                  <Select value={formData.schedule} onValueChange={(value) => handleInputChange('schedule', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {schedules.map((schedule) => (
                        <SelectItem key={schedule} value={schedule}>{schedule}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração (minutos)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="duration"
                      type="number"
                      placeholder="Ex: 60"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Máx. Alunos</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxStudents"
                      type="number"
                      placeholder="Ex: 15"
                      value={formData.maxStudents}
                      onChange={(e) => handleInputChange('maxStudents', e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyFee">Mensalidade (R$)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="monthlyFee"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 150.00"
                    value={formData.monthlyFee}
                    onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição adicional da turma..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => handleInputChange('active', checked)}
                />
                <Label>Turma ativa</Label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Criando...' : 'Criar Turma'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/turmas')}
                  className="flex-1"
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

export default NewClass;
