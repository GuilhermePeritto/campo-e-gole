
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Plus, Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Teacher {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  valuePerClass: number;
  commissionPercentage: number;
  status: string;
}

const Teachers = () => {
  const navigate = useNavigate();

  // Mock data for teachers
  const mockTeachers: Teacher[] = [
    {
      id: 1,
      name: 'Carlos Silva',
      email: 'carlos.silva@email.com',
      phone: '(11) 99999-1111',
      specialization: 'Futebol',
      valuePerClass: 80.00,
      commissionPercentage: 15,
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Ana Santos',
      email: 'ana.santos@email.com',
      phone: '(11) 99999-2222',
      specialization: 'Educação Física',
      valuePerClass: 75.00,
      commissionPercentage: 20,
      status: 'ativo'
    },
    {
      id: 3,
      name: 'João Pereira',
      email: 'joao.pereira@email.com',
      phone: '(11) 99999-3333',
      specialization: 'Natação',
      valuePerClass: 90.00,
      commissionPercentage: 18,
      status: 'inativo'
    },
    {
      id: 4,
      name: 'Maria Oliveira',
      email: 'maria.oliveira@email.com',
      phone: '(11) 99999-4444',
      specialization: 'Vôlei',
      valuePerClass: 85.00,
      commissionPercentage: 16,
      status: 'ativo'
    },
    {
      id: 5,
      name: 'Pedro Costa',
      email: 'pedro.costa@email.com',
      phone: '(11) 99999-5555',
      specialization: 'Basquete',
      valuePerClass: 78.00,
      commissionPercentage: 17,
      status: 'ativo'
    }
  ];

  const columns: BaseListColumn<Teacher>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (teacher) => (
        <div>
          <div className="font-medium">{teacher.name}</div>
          <div className="text-sm text-muted-foreground">{teacher.email}</div>
        </div>
      )
    },
    {
      key: 'specialization',
      label: 'Especialização',
      render: (teacher) => teacher.specialization
    },
    {
      key: 'phone',
      label: 'Contato',
      render: (teacher) => teacher.phone
    },
    {
      key: 'valuePerClass',
      label: 'Valor/Aula',
      render: (teacher) => `R$ ${teacher.valuePerClass.toFixed(2)}`
    },
    {
      key: 'commissionPercentage',
      label: 'Comissão',
      render: (teacher) => `${teacher.commissionPercentage}%`
    },
    {
      key: 'status',
      label: 'Status',
      render: (teacher) => (
        <Badge variant={teacher.status === 'ativo' ? 'default' : 'secondary'}>
          {teacher.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Teacher>[] = [
    {
      label: 'Ver relatório',
      icon: <Eye className="h-4 w-4" />,
      onClick: (teacher) => navigate(`/escolinha/professores/${teacher.id}/relatorio`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (teacher) => navigate(`/escolinha/professores/${teacher.id}/editar`)
    }
  ];

  const renderTeacherCard = (teacher: Teacher, actions: BaseListAction<Teacher>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{teacher.name}</CardTitle>
            <CardDescription>{teacher.email}</CardDescription>
          </div>
          <Badge variant={teacher.status === 'ativo' ? 'default' : 'secondary'}>
            {teacher.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <GraduationCap className="h-4 w-4" />
              <span>{teacher.specialization}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>📞 {teacher.phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {teacher.valuePerClass.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">Valor/Aula</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-blue-600">{teacher.commissionPercentage}%</div>
              <div className="text-xs text-muted-foreground">Comissão</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(teacher)}
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
        title="Professores"
        icon={<GraduationCap className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        <div className="flex-1 min-h-0">
          <BaseList
            data={mockTeachers}
            columns={columns}
            actions={actions}
            title="Lista de Professores"
            description="Gerencie os professores da escolinha"
            searchPlaceholder="Buscar professores por nome, email ou especialização..."
            searchFields={['name', 'email', 'specialization']}
            getItemId={(teacher) => teacher.id}
            pageSize={10}
            renderCard={renderTeacherCard}
            createButton={{
              label: 'Novo Professor',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/escolinha/professores/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Teachers;
