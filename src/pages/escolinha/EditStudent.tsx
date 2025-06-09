
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    cpf: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalInfo: '',
    classId: ''
  });

  // Mock data for classes
  const classes = [
    { id: '1', name: 'Infantil A', ageRange: '4-6 anos' },
    { id: '2', name: 'Infantil B', ageRange: '7-9 anos' },
    { id: '3', name: 'Juvenil A', ageRange: '10-12 anos' },
    { id: '4', name: 'Juvenil B', ageRange: '13-17 anos' }
  ];

  useEffect(() => {
    // Simular carregamento dos dados do aluno
    const mockData = {
      name: 'João Silva',
      birthDate: '2015-03-15',
      cpf: '123.456.789-00',
      parentName: 'Maria Silva',
      parentPhone: '(11) 99999-1111',
      parentEmail: 'maria.silva@email.com',
      address: 'Rua das Flores, 123, Centro, São Paulo, SP, 01234-567',
      emergencyContact: 'José Silva',
      emergencyPhone: '(11) 99999-2222',
      medicalInfo: 'Alergia a amendoim',
      classId: '1'
    };
    setFormData(mockData);
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados do aluno atualizados:', formData);
    navigate('/escolinha/alunos');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              Alunos
            </Button>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Editar Aluno</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Editar Informações do Aluno</CardTitle>
            <CardDescription>
              Altere os dados pessoais e de contato do aluno
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Dados do Aluno */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados do Aluno</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleChange('birthDate', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      value={formData.cpf}
                      onChange={(e) => handleChange('cpf', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Dados do Responsável */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Dados do Responsável</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Nome do Responsável *</Label>
                    <Input
                      id="parentName"
                      value={formData.parentName}
                      onChange={(e) => handleChange('parentName', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Telefone *</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleChange('parentPhone', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentEmail">E-mail</Label>
                    <Input
                      id="parentEmail"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleChange('parentEmail', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Endereço e Contato de Emergência */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Endereço e Emergência</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço Completo</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleChange('emergencyContact', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações Médicas e Turma */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Informações Adicionais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="medicalInfo">Informações Médicas</Label>
                    <Textarea
                      id="medicalInfo"
                      value={formData.medicalInfo}
                      onChange={(e) => handleChange('medicalInfo', e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classId">Turma *</Label>
                    <Select value={formData.classId} onValueChange={(value) => handleChange('classId', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma turma" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((classItem) => (
                          <SelectItem key={classItem.id} value={classItem.id}>
                            {classItem.name} - {classItem.ageRange}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" className="gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/escolinha/alunos')}
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
