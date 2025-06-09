
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, GraduationCap, Plus, Search, Edit, Eye } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePagination } from '@/hooks/usePagination';
import PaginationControls from '@/components/PaginationControls';

const Teachers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for teachers
  const mockTeachers = [
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

  const filteredTeachers = mockTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pagination = usePagination(filteredTeachers, {
    totalItems: filteredTeachers.length,
    pageSize: 10
  });

  return (
    <div className="min-h-screen bg-background">
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
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar professores por nome, email ou especialização..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => navigate('/escolinha/professores/novo')} className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Professor
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Professores</CardTitle>
            <CardDescription>
              Gerencie os professores da escolinha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Especialização</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Valor/Aula</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-muted-foreground">{teacher.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{teacher.specialization}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell>R$ {teacher.valuePerClass.toFixed(2)}</TableCell>
                    <TableCell>{teacher.commissionPercentage}%</TableCell>
                    <TableCell>
                      <Badge variant={teacher.status === 'ativo' ? 'default' : 'secondary'}>
                        {teacher.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/relatorio`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/escolinha/professores/${teacher.id}/editar`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Teachers;
