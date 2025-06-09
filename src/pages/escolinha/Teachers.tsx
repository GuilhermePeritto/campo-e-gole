
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, GraduationCap, Plus, Search, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    {
      id: 1,
      name: 'Prof. Carlos Silva',
      email: 'carlos@escolinha.com',
      phone: '(11) 99999-1111',
      specialization: 'Futebol Infantil',
      valuePerClass: 80,
      commissionPercentage: 15,
      status: 'active',
      totalClasses: 24,
      totalEarnings: 1920
    },
    {
      id: 2,
      name: 'Profa. Maria Santos',
      email: 'maria@escolinha.com',
      phone: '(11) 99999-2222',
      specialization: 'Educação Física',
      valuePerClass: 75,
      commissionPercentage: 12,
      status: 'active',
      totalClasses: 18,
      totalEarnings: 1350
    },
    {
      id: 3,
      name: 'Prof. João Costa',
      email: 'joao@escolinha.com',
      phone: '(11) 99999-3333',
      specialization: 'Natação',
      valuePerClass: 90,
      commissionPercentage: 20,
      status: 'inactive',
      totalClasses: 0,
      totalEarnings: 0
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredTeachers, {
    pageSize: 8,
    totalItems: filteredTeachers.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-200 text-green-800';
      case 'inactive':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  const totalActiveTeachers = teachers.filter(t => t.status === 'active').length;
  const totalClassesThisMonth = teachers.reduce((sum, t) => sum + t.totalClasses, 0);
  const totalEarningsThisMonth = teachers.reduce((sum, t) => sum + t.totalEarnings, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Escolinha
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Professores</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Professores Ativos</p>
                  <p className="text-2xl font-bold">{totalActiveTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aulas Este Mês</p>
                  <p className="text-2xl font-bold">{totalClassesThisMonth}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                  <p className="text-2xl font-bold">R$ {totalEarningsThisMonth.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou especialização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => navigate('/escolinha/professores/novo')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Professor
          </Button>
        </div>

        {/* Teachers Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Professores</CardTitle>
            <CardDescription>
              Gerencie os professores e suas comissões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialização</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Valor/Aula</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Aulas Este Mês</TableHead>
                  <TableHead>A Receber</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.specialization}</TableCell>
                    <TableCell className="text-muted-foreground">{teacher.phone}</TableCell>
                    <TableCell className="font-medium">R$ {teacher.valuePerClass.toFixed(2)}</TableCell>
                    <TableCell>{teacher.commissionPercentage}%</TableCell>
                    <TableCell className="text-center">{teacher.totalClasses}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      R$ {teacher.totalEarnings.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(teacher.status)}`}>
                        {getStatusLabel(teacher.status)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/relatorio`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          Relatório
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/editar`)}
                          className="gap-1"
                        >
                          <Edit className="h-3 w-3" />
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Paginação */}
            <PaginationControls
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              pageSize={pagination.pageSize}
              startIndex={pagination.startIndex}
              endIndex={pagination.endIndex}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
              onPageChange={pagination.goToPage}
              onPageSizeChange={pagination.setPageSize}
              pageSizeOptions={[5, 8, 12]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Teachers;
