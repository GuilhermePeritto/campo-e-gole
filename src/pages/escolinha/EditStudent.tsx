
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Users2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    class: '',
    phone: '',
    parentName: '',
    email: '',
    address: '',
    medicalInfo: ''
  });

  const classes = ['Infantil A', 'Infantil B', 'Juvenil A', 'Juvenil B'];

  useEffect(() => {
    // Simular carregamento dos dados do aluno
    const mockData = {
      name: 'Pedro Silva',
      age: '8',
      class: 'Infantil A',
      phone: '(11) 99999-1111',
      parentName: 'José Silva',
      email: 'jose.silva@email.com',
      address: 'Rua das Flores, 123',
      medicalInfo: 'Nenhuma restrição médica'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do aluno atualizados:', formData);
    // Aqui seria feita a atualização no backend
    navigate('/escolinha/alunos');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/alunos')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Alunos
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Editar Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Editar Informações do Aluno</CardTitle>
            <CardDescription>
              Altere as informações do aluno conforme necessário
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-600 dark:text-gray-300">Nome do Aluno</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-600 dark:text-gray-300">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleChange('age', e.target.value)}
                    className="border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class" className="text-gray-600 dark:text-gray-300">Turma</Label>
                  <Select value={formData.class} onValueChange={(value) => handleChange('class', value)}>
                    <SelectTrigger className="border">
                      <SelectValue placeholder="Selecione a turma" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((className) => (
                        <SelectItem key={className} value={className}>
                          {className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-600 dark:text-gray-300">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="parentName" className="text-gray-600 dark:text-gray-300">Nome do Responsável</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleChange('parentName', e.target.value)}
                    className="border"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-600 dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="border"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-gray-600 dark:text-gray-300">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medicalInfo" className="text-gray-600 dark:text-gray-300">Informações Médicas</Label>
                <Input
                  id="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={(e) => handleChange('medicalInfo', e.target.value)}
                  className="border"
                  placeholder="Alergias, medicamentos, restrições..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800 gap-2"
                >
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/alunos')}
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

export default EditStudent;
