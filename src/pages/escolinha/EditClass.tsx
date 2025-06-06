
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditClass = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    schedule: '',
    maxStudents: '',
    monthlyFee: ''
  });

  useEffect(() => {
    // Simular carregamento dos dados da turma
    const mockData = {
      name: 'Infantil A',
      ageRange: '4-6 anos',
      schedule: 'Segunda/Quarta 16:00-17:00',
      maxStudents: '15',
      monthlyFee: '150'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da turma atualizados:', formData);
    // Aqui seria feita a atualização no backend
    navigate('/escolinha/turmas');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/turmas')}
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
            <CardTitle className="text-black">Editar Informações da Turma</CardTitle>
            <CardDescription>
              Altere as informações da turma conforme necessário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-black">Nome da Turma</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ageRange" className="text-black">Faixa Etária</Label>
                  <Input
                    id="ageRange"
                    value={formData.ageRange}
                    onChange={(e) => handleChange('ageRange', e.target.value)}
                    className="border-black"
                    placeholder="Ex: 4-6 anos"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schedule" className="text-black">Horário</Label>
                  <Input
                    id="schedule"
                    value={formData.schedule}
                    onChange={(e) => handleChange('schedule', e.target.value)}
                    className="border-black"
                    placeholder="Ex: Segunda/Quarta 16:00-17:00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxStudents" className="text-black">Máximo de Alunos</Label>
                  <Input
                    id="maxStudents"
                    type="number"
                    value={formData.maxStudents}
                    onChange={(e) => handleChange('maxStudents', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyFee" className="text-black">Mensalidade (R$)</Label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    value={formData.monthlyFee}
                    onChange={(e) => handleChange('monthlyFee', e.target.value)}
                    className="border-black"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800 gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/turmas')}
                  className="border-black text-black hover:bg-gray-100"
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

export default EditClass;
