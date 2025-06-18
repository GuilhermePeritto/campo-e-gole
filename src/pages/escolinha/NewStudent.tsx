
import ModuleHeader from '@/components/ModuleHeader';
import PageTour, { TourStep } from '@/components/PageTour';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewStudent = () => {
  const navigate = useNavigate();
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

  const tourSteps: TourStep[] = [
    {
      target: '#name',
      title: 'Nome do Aluno',
      content: 'Digite o nome completo do aluno que será cadastrado na escolinha.'
    },
    {
      target: '#birthDate',
      title: 'Data de Nascimento',
      content: 'Selecione a data de nascimento do aluno. Esta informação é importante para classificar a turma adequada.'
    },
    {
      target: '#cpf',
      title: 'CPF do Aluno',
      content: 'Campo opcional para o CPF do aluno. Útil para controle de documentação.'
    },
    {
      target: '#parentName',
      title: 'Nome do Responsável',
      content: 'Digite o nome completo do responsável legal pelo aluno.'
    },
    {
      target: '#parentPhone',
      title: 'Telefone do Responsável',
      content: 'Número de telefone principal para contato com o responsável. Campo obrigatório.'
    },
    {
      target: '#parentEmail',
      title: 'E-mail do Responsável',
      content: 'E-mail do responsável para comunicações e envio de relatórios.'
    },
    {
      target: '#address',
      title: 'Endereço Completo',
      content: 'Endereço residencial completo do aluno incluindo rua, número, bairro, cidade e CEP.'
    },
    {
      target: '#emergencyContact',
      title: 'Contato de Emergência',
      content: 'Nome de uma pessoa para contato em caso de emergência (diferente do responsável).'
    },
    {
      target: '#medicalInfo',
      title: 'Informações Médicas',
      content: 'Campo para registrar alergias, medicamentos em uso ou outras informações médicas importantes.'
    },
    {
      target: '#classId',
      title: 'Seleção da Turma',
      content: 'Escolha a turma adequada baseada na idade e nível do aluno.'
    },
    {
      target: '.form-actions',
      title: 'Finalizar Cadastro',
      content: 'Após preencher as informações necessárias, clique em "Cadastrar Aluno" para salvar no sistema.'
    }
  ];

  // Mock data for classes
  const classes = [
    { id: '1', name: 'Infantil A', ageRange: '4-6 anos' },
    { id: '2', name: 'Infantil B', ageRange: '7-9 anos' },
    { id: '3', name: 'Juvenil A', ageRange: '10-12 anos' },
    { id: '4', name: 'Juvenil B', ageRange: '13-17 anos' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo aluno:', formData);
    navigate('/escolinha/alunos');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Novo Aluno"
        icon={<UserPlus className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha/alunos"
        backLabel="Alunos"
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="relative">
          <PageTour steps={tourSteps} title="Cadastro de Novo Aluno" />
          
          <CardHeader>
            <CardTitle>Novo Aluno</CardTitle>
            <CardDescription>
              Preencha os dados pessoais e de contato do aluno
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
                      placeholder="000.000.000-00"
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
                      placeholder="Nome completo do responsável"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Telefone *</Label>
                    <Input
                      id="parentPhone"
                      value={formData.parentPhone}
                      onChange={(e) => handleChange('parentPhone', e.target.value)}
                      placeholder="(11) 99999-9999"
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
                      placeholder="email@exemplo.com"
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
                      placeholder="Rua, número, bairro, cidade, CEP"
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
                        placeholder="Nome do contato"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Telefone de Emergência</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleChange('emergencyPhone', e.target.value)}
                        placeholder="(11) 99999-9999"
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
                      placeholder="Alergias, medicamentos, observações médicas..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="classId">Turma *</Label>
                    <Select value={formData.classId} onValueChange={(value) => handleChange('classId', value)}>
                      <SelectTrigger id="classId">
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

              <div className="flex gap-4 pt-6 form-actions">
                <Button type="submit">
                  Cadastrar Aluno
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

export default NewStudent;
