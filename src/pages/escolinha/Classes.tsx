
import ModuleHeader from '@/components/ModuleHeader';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar, Plus, UserCheck, Edit, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ClassItem {
  id: number;
  name: string;
  ageRange: string;
  schedule: string;
  studentsCount: number;
  maxStudents: number;
  monthlyFee: number;
}

const Classes = () => {
  const navigate = useNavigate();

  const classes: ClassItem[] = [
    { 
      id: 1, 
      name: 'Infantil A', 
      ageRange: '4-6 anos',
      schedule: 'Segunda/Quarta 16:00-17:00',
      studentsCount: 12,
      maxStudents: 15,
      monthlyFee: 150
    },
    { 
      id: 2, 
      name: 'Infantil B', 
      ageRange: '7-9 anos',
      schedule: 'Terça/Quinta 16:00-17:00',
      studentsCount: 15,
      maxStudents: 15,
      monthlyFee: 150
    },
    { 
      id: 3, 
      name: 'Juvenil A', 
      ageRange: '10-12 anos',
      schedule: 'Segunda/Quarta 17:00-18:00',
      studentsCount: 18,
      maxStudents: 20,
      monthlyFee: 180
    },
    { 
      id: 4, 
      name: 'Juvenil B', 
      ageRange: '13-17 anos',
      schedule: 'Terça/Quinta 17:00-18:00',
      studentsCount: 10,
      maxStudents: 20,
      monthlyFee: 200
    }
  ];

  const columns: BaseListColumn<ClassItem>[] = [
    {
      key: 'name',
      label: 'Turma',
      render: (classItem) => (
        <div>
          <div className="font-medium">{classItem.name}</div>
          <div className="text-sm text-muted-foreground">{classItem.ageRange}</div>
        </div>
      )
    },
    {
      key: 'schedule',
      label: 'Horário',
      render: (classItem) => classItem.schedule
    },
    {
      key: 'students',
      label: 'Alunos',
      render: (classItem) => (
        <div className="space-y-2">
          <span className="font-semibold">
            {classItem.studentsCount}/{classItem.maxStudents}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{width: `${(classItem.studentsCount / classItem.maxStudents) * 100}%`}}
            ></div>
          </div>
        </div>
      )
    },
    {
      key: 'monthlyFee',
      label: 'Mensalidade',
      render: (classItem) => (
        <span className="font-medium">R$ {classItem.monthlyFee}</span>
      )
    }
  ];

  const actions: BaseListAction<ClassItem>[] = [
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (classItem) => navigate(`/escolinha/turmas/${classItem.id}/editar`)
    },
    {
      label: 'Alunos',
      icon: <Users className="h-4 w-4" />,
      onClick: (classItem) => navigate(`/escolinha/turmas/${classItem.id}/alunos`)
    },
    {
      label: 'Chamada',
      icon: <UserCheck className="h-4 w-4" />,
      onClick: (classItem) => navigate(`/escolinha/turmas/${classItem.id}/chamada`)
    }
  ];

  const renderClassCard = (classItem: ClassItem, actions: BaseListAction<ClassItem>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{classItem.name}</CardTitle>
        <CardDescription>
          {classItem.ageRange} • {classItem.schedule}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Alunos</span>
            <span className="font-semibold">
              {classItem.studentsCount}/{classItem.maxStudents}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{width: `${(classItem.studentsCount / classItem.maxStudents) * 100}%`}}
            ></div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Mensalidade</span>
            <span className="font-semibold">R$ {classItem.monthlyFee}</span>
          </div>
          
          <div className="grid grid-cols-1 gap-2 pt-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => action.onClick(classItem)}
                className="gap-2"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <ModuleHeader
        title="Gerenciar Turmas"
        icon={<Calendar className="h-5 w-5" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        <div className="flex-1 min-h-0">
          <BaseList
            data={classes}
            columns={columns}
            actions={actions}
            title="Turmas da Escolinha"
            description="Gerencie as turmas e horários de treino"
            searchPlaceholder="Buscar por nome da turma ou faixa etária..."
            searchFields={['name', 'ageRange']}
            getItemId={(classItem) => classItem.id}
            pageSize={6}
            renderCard={renderClassCard}
            createButton={{
              label: 'Nova Turma',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/escolinha/turmas/nova')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Classes;
