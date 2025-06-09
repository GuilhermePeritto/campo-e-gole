
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowLeft, Calendar, Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const NewClass = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    schedule: '',
    maxStudents: '',
    monthlyFee: '',
    teacherId: ''
  });

  // Mock data for teachers
  const teachers = [
    { id: '1', name: 'Carlos Silva', specialization: 'Futebol' },
    { id: '2', name: 'Ana Santos', specialization: 'Educação Física' },
    { id: '3', name: 'João Pereira', specialization: 'Natação' },
    { id: '4', name: 'Maria Oliveira', specialization: 'Vôlei' },
    { id: '5', name: 'Pedro Costa', specialization: 'Basquete' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova turma:', formData);
    // Aqui seria feito o cadastro no backend
    navigate('/escolinha/turmas');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedTeacher = teachers.find(teacher => teacher.id === formData.teacherId);

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/turmas')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Nova Turma</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Cadastrar Nova Turma</CardTitle>
            <CardDescription>
              Preencha os dados para criar uma nova turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-600 dark:text-gray-300">Nome da Turma *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="border"
                    placeholder="Ex: Infantil A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRange" className="text-gray-600 dark:text-gray-300">Faixa Etária *</Label>
                  <Input
                    id="ageRange"
                    value={formData.ageRange}
                    onChange={(e) => handleChange('ageRange', e.target.value)}
                    className="border"
                    placeholder="Ex: 4-6 anos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule" className="text-gray-600 dark:text-gray-300">Horário *</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => handleChange('schedule', e.target.value)}
                    className="border"
                    placeholder="Ex: Segunda/Quarta 16:00-17:00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents" className="text-gray-600 dark:text-gray-300">Máximo de Alunos *</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => handleChange('maxStudents', e.target.value)}
                    className="border"
                    placeholder="Ex: 15"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyFee" className="text-gray-600 dark:text-gray-300">Mensalidade (R$) *</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    step="0.01"
                    value={formData.monthlyFee}
                    onChange={(e) => handleChange('monthlyFee', e.target.value)}
                    className="border"
                    placeholder="Ex: 150.00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-600 dark:text-gray-300">Professor *</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between border"
                      >
                        {selectedTeacher
                          ? `${selectedTeacher.name} - ${selectedTeacher.specialization}`
                          : "Selecione um professor..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Buscar professor..." />
                        <CommandList>
                          <CommandEmpty>Nenhum professor encontrado.</CommandEmpty>
                          <CommandGroup>
                            {teachers.map((teacher) => (
                              <CommandItem
                                key={teacher.id}
                                value={`${teacher.name} ${teacher.specialization}`}
                                onSelect={() => {
                                  handleChange('teacherId', teacher.id);
                                  setOpen(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.teacherId === teacher.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div>
                                  <div className="font-medium">{teacher.name}</div>
                                  <div className="text-sm text-muted-foreground">{teacher.specialization}</div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Cadastrar Turma
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/turmas')}
                  className="border text-gray-600 dark:text-gray-300 hover:bg-gray-100"
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
