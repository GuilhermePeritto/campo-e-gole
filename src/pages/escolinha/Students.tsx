
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users2, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface Student {
  id: number;
  name: string;
  age: number;
  class: string;
  phone: string;
  status: string;
  monthlyFee: number;
}

const Students = () => {
  const navigate = useNavigate();

  const students: Student[] = [
    { 
      id: 1, 
      name: 'Pedro Silva', 
      age: 8, 
      class: 'Infantil A', 
      phone: '(11) 99999-1111',
      status: 'em dia',
      monthlyFee: 150
    },
    { 
      id: 2, 
      name: 'Ana Costa', 
      age: 10, 
      class: 'Infantil B', 
      phone: '(11) 99999-2222',
      status: 'atrasado',
      monthlyFee: 150
    },
    { 
      id: 3, 
      name: 'João Santos', 
      age: 12, 
      class: 'Juvenil A', 
      phone: '(11) 99999-3333',
      status: 'em dia',
      monthlyFee: 180
    },
    { 
      id: 4, 
      name: 'Maria Oliveira', 
      age: 9, 
      class: 'Infantil A', 
      phone: '(11) 99999-4444',
      status: 'em dia',
      monthlyFee: 150
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em dia': return 'default';
      case 'atrasado': return 'destructive';
      default: return 'secondary';
    }
  };

  const columns: BaseListColumn<Student>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (student) => (
        <div>
          <div className="font-medium">{student.name}</div>
          <div className="text-sm text-muted-foreground">{student.age} anos</div>
        </div>
      )
    },
    {
      key: 'class',
      label: 'Turma',
      render: (student) => student.class
    },
    {
      key: 'phone',
      label: 'Telefone',
      render: (student) => student.phone
    },
    {
      key: 'monthlyFee',
      label: 'Mensalidade',
      render: (student) => (
        <span className="font-medium">R$ {student.monthlyFee}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (student) => (
        <Badge variant={getStatusColor(student.status)}>
          {student.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Student>[] = [
    {
      label: 'Histórico',
      icon: <Eye className="h-4 w-4" />,
      onClick: (student) => navigate(`/escolinha/alunos/${student.id}/historico`)
    },
    {
      label: 'Editar',
      icon: <Edit className="h-4 w-4" />,
      onClick: (student) => navigate(`/escolinha/alunos/${student.id}/editar`)
    }
  ];

  const renderStudentCard = (student: Student, actions: BaseListAction<Student>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{student.name}</CardTitle>
            <CardDescription>{student.age} anos • {student.class}</CardDescription>
          </div>
          <Badge variant={getStatusColor(student.status)}>
            {student.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span>📞 {student.phone}</span>
            </div>
          </div>

          <div className="pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">R$ {student.monthlyFee}</div>
              <div className="text-xs text-muted-foreground">Mensalidade</div>
            </div>
          </div>

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="flex-1 gap-1"
                onClick={() => action.onClick(student)}
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
        title="Gerenciar Alunos"
        icon={<Users2 className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.school}
        backTo="/escolinha"
        backLabel="Escolinha"
      />

      <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 min-h-0">
        <div className="flex-1 min-h-0">
          <BaseList
            data={students}
            columns={columns}
            actions={actions}
            title="Lista de Alunos"
            description="Gerencie todos os alunos da escolinha"
            searchPlaceholder="Buscar por nome ou turma..."
            searchFields={['name', 'class']}
            getItemId={(student) => student.id}
            pageSize={5}
            renderCard={renderStudentCard}
            createButton={{
              label: 'Novo Aluno',
              icon: <Plus className="h-4 w-4" />,
              onClick: () => navigate('/escolinha/alunos/novo')
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Students;
