
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Plus, Search, GraduationCap, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Teachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const teachers = [
    { 
      id: 1, 
      name: 'Prof. Carlos Silva', 
      specialization: 'Futebol Infantil',
      phone: '(11) 99999-1111',
      email: 'carlos.silva@email.com',
      valuePerClass: 80,
      commissionPercentage: 15,
      status: 'ativo'
    },
    { 
      id: 2, 
      name: 'Prof. Ana Costa', 
      specialization: 'Educação Física',
      phone: '(11) 99999-2222',
      email: 'ana.costa@email.com',
      valuePerClass: 70,
      commissionPercentage: 20,
      status: 'ativo'
    },
    { 
      id: 3, 
      name: 'Prof. João Santos', 
      specialization: 'Futebol Juvenil',
      phone: '(11) 99999-3333',
      email: 'joao.santos@email.com',
      valuePerClass: 90,
      commissionPercentage: 18,
      status: 'ativo'
    },
    { 
      id: 4, 
      name: 'Prof. Maria Oliveira', 
      specialization: 'Natação',
      phone: '(11) 99999-4444',
      email: 'maria.oliveira@email.com',
      valuePerClass: 85,
      commissionPercentage: 17,
      status: 'inativo'
    }
  ];

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredTeachers, {
    pageSize: 10,
    totalItems: filteredTeachers.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-200 text-green-800';
      case 'inativo':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      default:
        return status;
    }
  };

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
              <h1 className="text-xl font-semibold">Gerenciar Professores</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
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
              Gerencie todos os professores da escolinha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialização</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Valor/Aula</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{teacher.name}</TableCell>
                    <TableCell>{teacher.specialization}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell className="font-medium">R$ {teacher.valuePerClass.toFixed(2)}</TableCell>
                    <TableCell>{teacher.commissionPercentage}%</TableCell>
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
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/editar`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/relatorio`)}
                        >
                          <Eye className="h-3 w-3" />
                          Relatório
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
              pageSizeOptions={[10, 20, 30]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Teachers;
