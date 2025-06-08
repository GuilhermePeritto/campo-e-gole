
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewClass = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [category, setCategory] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [instructor, setInstructor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [maxStudents, setMaxStudents] = useState('');
  const [monthlyFee, setMonthlyFee] = useState('');
  const [description, setDescription] = useState('');

  const scheduleOptions = [
    'Segunda e Quarta - 08:00 às 09:00',
    'Segunda e Quarta - 09:00 às 10:00',
    'Segunda e Quarta - 15:00 às 16:00',
    'Segunda e Quarta - 16:00 às 17:00',
    'Terça e Quinta - 08:00 às 09:00',
    'Terça e Quinta - 09:00 às 10:00',
    'Terça e Quinta - 15:00 às 16:00',
    'Terça e Quinta - 16:00 às 17:00',
    'Sábado - 08:00 às 10:00',
    'Sábado - 10:00 às 12:00'
  ];

  const instructors = [
    'Carlos Santos',
    'Roberto Silva',
    'João Oliveira',
    'Pedro Costa'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!className || !category || !ageGroup || !instructor || !schedule || !maxStudents || !monthlyFee) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Turma criada!",
      description: `A turma ${className} foi criada com sucesso.`,
    });
    navigate('/escolinha/turmas');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/turmas')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Nova Turma</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Turma</CardTitle>
            <CardDescription>
              Preencha as informações para criar uma nova turma da escolinha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="className">Nome da Turma *</Label>
                  <Input
                    id="className"
                    placeholder="Ex: Infantil A"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infantil">Infantil</SelectItem>
                      <SelectItem value="juvenil">Juvenil</SelectItem>
                      <SelectItem value="adulto">Adulto</SelectItem>
                      <SelectItem value="veterano">Veterano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageGroup">Faixa Etária *</Label>
                  <Select value={ageGroup} onValueChange={setAgeGroup} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar faixa etária" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-8">6 a 8 anos</SelectItem>
                      <SelectItem value="9-11">9 a 11 anos</SelectItem>
                      <SelectItem value="12-14">12 a 14 anos</SelectItem>
                      <SelectItem value="15-17">15 a 17 anos</SelectItem>
                      <SelectItem value="18+">18+ anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Professor *</Label>
                  <Select value={instructor} onValueChange={setInstructor} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar professor" />
                    </SelectTrigger>
                    <SelectContent>
                      {instructors.map((inst) => (
                        <SelectItem key={inst} value={inst}>{inst}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule">Horário *</Label>
                  <Select value={schedule} onValueChange={setSchedule} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar horário" />
                    </SelectTrigger>
                    <SelectContent>
                      {scheduleOptions.map((option) => (
                        <SelectItem key={option} value={option}>{option}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents">Máximo de Alunos *</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    placeholder="Ex: 20"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyFee">Mensalidade (R$) *</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    step="0.01"
                    placeholder="Ex: 150.00"
                    value={monthlyFee}
                    onChange={(e) => setMonthlyFee(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descrição adicional da turma, objetivos, requisitos..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Resumo da Turma */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800">Resumo da Turma</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {className && (
                    <div><strong>Nome:</strong> {className}</div>
                  )}
                  {category && ageGroup && (
                    <div><strong>Categoria:</strong> {category} ({ageGroup})</div>
                  )}
                  {instructor && (
                    <div><strong>Professor:</strong> {instructor}</div>
                  )}
                  {schedule && (
                    <div><strong>Horário:</strong> {schedule}</div>
                  )}
                  {maxStudents && (
                    <div><strong>Capacidade:</strong> {maxStudents} alunos</div>
                  )}
                  {monthlyFee && (
                    <div><strong>Mensalidade:</strong> R$ {parseFloat(monthlyFee || '0').toFixed(2)}</div>
                  )}
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/turmas')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Criar Turma
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
