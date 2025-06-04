
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ClassFormData {
  name: string;
  ageRange: string;
  schedule: string;
  maxStudents: number;
  monthlyFee: number;
}

const EditClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - in real app, fetch from API
  const classData = {
    id: 1,
    name: 'Infantil A',
    ageRange: '4-6 anos',
    schedule: 'Segunda/Quarta 16:00-17:00',
    maxStudents: 15,
    monthlyFee: 150
  };

  const form = useForm<ClassFormData>({
    defaultValues: {
      name: classData.name,
      ageRange: classData.ageRange,
      schedule: classData.schedule,
      maxStudents: classData.maxStudents,
      monthlyFee: classData.monthlyFee
    }
  });

  const onSubmit = async (data: ClassFormData) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Turma editada:', data);
      setIsSubmitting(false);
      navigate('/school/classes');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/school/classes')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Editar Turma</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Editar Turma</CardTitle>
            <CardDescription>
              Atualize as informações da turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: 'Nome da turma é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Nome da Turma</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Infantil A"
                            className="border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ageRange"
                    rules={{ required: 'Faixa etária é obrigatória' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Faixa Etária</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: 4-6 anos"
                            className="border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schedule"
                    rules={{ required: 'Horário é obrigatório' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Horário</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Segunda/Quarta 16:00-17:00"
                            className="border-black"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxStudents"
                    rules={{ 
                      required: 'Número máximo de alunos é obrigatório',
                      min: { value: 1, message: 'Deve ter pelo menos 1 aluno' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Máximo de Alunos</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="15"
                            className="border-black"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="monthlyFee"
                    rules={{ 
                      required: 'Mensalidade é obrigatória',
                      min: { value: 0.01, message: 'Valor deve ser maior que zero' }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-black">Mensalidade (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            step="0.01"
                            placeholder="150.00"
                            className="border-black"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-black text-black hover:bg-black hover:text-white"
                    onClick={() => navigate('/school/classes')}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EditClass;
