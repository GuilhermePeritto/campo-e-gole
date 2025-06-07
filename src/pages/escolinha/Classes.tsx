
import PaginationControls from '@/components/PaginationControls';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Classes = () => {
  const navigate = useNavigate();

  const classes = [
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

  const pagination = usePagination(classes, {
    pageSize: 6,
    totalItems: classes.length
  });

  return (
    <div className="min-h-screen bg-background text-gray-600 dark:text-gray-300">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha')}
              className="gap-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Escolinha
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-gray-600 dark:text-gray-300">Gerenciar Turmas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-300">Turmas da Escolinha</h2>
            <p className="text-gray-600">Gerencie as turmas e horários de treino</p>
          </div>
          <Button
            className="bg-black text-gray-600 dark:text-gray-300 hover:bg-gray-800 gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Turma
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {pagination.paginatedData.map((classItem) => (
            <Card key={classItem.id} className="border">
              <CardHeader>
                <CardTitle className="text-gray-600 dark:text-gray-300">{classItem.name}</CardTitle>
                <CardDescription>
                  {classItem.ageRange} • {classItem.schedule}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Alunos</span>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">
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
                    <span className="text-sm text-gray-600">Mensalidade</span>
                    <span className="font-semibold text-gray-600 dark:text-gray-300">R$ {classItem.monthlyFee}</span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border text-gray-600 dark:text-gray-300 hover:bg-black hover:text-gray-600 dark:text-gray-300"
                      onClick={() => navigate(`/escolinha/turmas/${classItem.id}/editar`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border text-gray-600 dark:text-gray-300 hover:bg-black hover:text-gray-600 dark:text-gray-300"
                      onClick={() => navigate(`/escolinha/turmas/${classItem.id}/alunos`)}
                    >
                      Ver Alunos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação para turmas */}
        <div className="mb-8">
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
            pageSizeOptions={[4, 6, 8]}
            showInfo={false}
          />
        </div>

        {/* Schedule Table */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-gray-600 dark:text-gray-300">Cronograma Semanal</CardTitle>
            <CardDescription>
              Visualização dos horários de todas as turmas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-600 dark:text-gray-300">Horário</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Segunda</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Terça</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Quarta</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Quinta</TableHead>
                  <TableHead className="text-gray-600 dark:text-gray-300">Sexta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-600 dark:text-gray-300">16:00-17:00</TableCell>
                  <TableCell className="text-gray-600">Infantil A</TableCell>
                  <TableCell className="text-gray-600">Infantil B</TableCell>
                  <TableCell className="text-gray-600">Infantil A</TableCell>
                  <TableCell className="text-gray-600">Infantil B</TableCell>
                  <TableCell className="text-gray-600">-</TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium text-gray-600 dark:text-gray-300">17:00-18:00</TableCell>
                  <TableCell className="text-gray-600">Juvenil A</TableCell>
                  <TableCell className="text-gray-600">Juvenil B</TableCell>
                  <TableCell className="text-gray-600">Juvenil A</TableCell>
                  <TableCell className="text-gray-600">Juvenil B</TableCell>
                  <TableCell className="text-gray-600">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Classes;
