
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Plus, Users2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ClassStudents = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const classInfo = {
    name: 'Infantil A',
    ageRange: '4-6 anos',
    schedule: 'Segunda/Quarta 16:00-17:00'
  };

  const students = [
    { 
      id: 1, 
      name: 'Pedro Silva', 
      age: 8, 
      phone: '(11) 99999-1111',
      status: 'em dia'
    },
    { 
      id: 4, 
      name: 'Maria Oliveira', 
      age: 9, 
      phone: '(11) 99999-4444',
      status: 'em dia'
    },
    // Adicionando mais alunos para demonstrar paginação
    { 
      id: 5, 
      name: 'João Santos', 
      age: 7, 
      phone: '(11) 99999-5555',
      status: 'atrasado'
    },
    { 
      id: 6, 
      name: 'Ana Costa', 
      age: 8, 
      phone: '(11) 99999-6666',
      status: 'em dia'
    },
    { 
      id: 7, 
      name: 'Carlos Ferreira', 
      age: 9, 
      phone: '(11) 99999-7777',
      status: 'em dia'
    },
    { 
      id: 8, 
      name: 'Laura Martins', 
      age: 7, 
      phone: '(11) 99999-8888',
      status: 'atrasado'
    },
    { 
      id: 9, 
      name: 'Rafael Lima', 
      age: 8, 
      phone: '(11) 99999-9999',
      status: 'em dia'
    },
    { 
      id: 10, 
      name: 'Beatriz Alves', 
      age: 9, 
      phone: '(11) 99999-0000',
      status: 'em dia'
    }
  ];

  const pagination = usePagination(students, {
    pageSize: 5,
    totalItems: students.length
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'em dia':
        return 'bg-green-200 text-green-800';
      case 'atrasado':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/turmas')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Alunos da Turma</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Info */}
        <Card className="border-black mb-6">
          <CardHeader>
            <CardTitle className="text-black">{classInfo.name}</CardTitle>
            <CardDescription>
              {classInfo.ageRange} • {classInfo.schedule}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total de alunos: {students.length}</span>
              <Button
                onClick={() => navigate('/escolinha/alunos/novo')}
                className="bg-black text-white hover:bg-gray-800 gap-2"
              >
                <Plus className="h-4 w-4" />
                Adicionar Aluno
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Lista de Alunos</CardTitle>
            <CardDescription>
              Alunos matriculados nesta turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Nome</TableHead>
                  <TableHead className="text-black">Idade</TableHead>
                  <TableHead className="text-black">Telefone</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{student.name}</TableCell>
                    <TableCell className="text-gray-600">{student.age} anos</TableCell>
                    <TableCell className="text-gray-600">{student.phone}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white"
                          onClick={() => navigate(`/escolinha/alunos/${student.id}/editar`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white"
                          onClick={() => navigate(`/escolinha/alunos/${student.id}/historico`)}
                        >
                          Histórico
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
              pageSizeOptions={[5, 10, 15]}
            />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClassStudents;
