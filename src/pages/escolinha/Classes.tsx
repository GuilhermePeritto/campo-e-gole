import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { ArrowLeft, GraduationCap, Plus, Users2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EscolinhaTurmas = () => {
  const navigate = useNavigate();

  const classesData = [
    { id: 1, name: 'Infantil A', schedule: 'Seg/Qua 14:00-15:00', vacancies: 5, totalStudents: 15 },
    { id: 2, name: 'Infantil B', schedule: 'Ter/Qui 16:00-17:00', vacancies: 2, totalStudents: 18 },
    { id: 3, name: 'Juvenil A', schedule: 'Seg/Qua 16:00-17:30', vacancies: 8, totalStudents: 12 },
    { id: 4, name: 'Juvenil B', schedule: 'Ter/Qui 18:00-19:30', vacancies: 10, totalStudents: 10 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Turmas"
        icon={<GraduationCap className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Gerenciar Turmas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border"
              onClick={() => navigate('/escolinha/turmas/nova')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-module-school rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plus className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-card-foreground mb-1">Nova Turma</h3>
                <p className="text-sm text-muted-foreground">Adicionar nova turma</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Classes List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Lista de Turmas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classesData.map((classItem) => (
              <Card key={classItem.id} className="border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">{classItem.name}</CardTitle>
                  <CardDescription>
                    {classItem.schedule}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Vagas Disponíveis</span>
                      <span className="font-semibold text-blue-600">{classItem.vacancies}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total de Alunos</span>
                      <span className="font-semibold text-green-600">{classItem.totalStudents}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => navigate(`/escolinha/turmas/${classItem.id}`)}
                  >
                    Gerenciar Turma
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EscolinhaTurmas;
