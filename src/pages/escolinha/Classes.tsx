
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
              <Calendar className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Gerenciar Turmas</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Turmas da Escolinha</h2>
            <p className="text-muted-foreground">Gerencie as turmas e horários de treino</p>
          </div>
          <Button
            onClick={() => navigate('/escolinha/turmas/nova')}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Nova Turma
          </Button>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {pagination.paginatedData.map((classItem) => (
            <Card key={classItem.id}>
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
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/escolinha/turmas/${classItem.id}/editar`)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
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
        <Card>
          <CardHeader>
            <CardTitle>Cronograma Semanal</CardTitle>
            <CardDescription>
              Visualização dos horários de todas as turmas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Segunda</TableHead>
                  <TableHead>Terça</TableHead>
                  <TableHead>Quarta</TableHead>
                  <TableHead>Quinta</TableHead>
                  <TableHead>Sexta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">16:00-17:00</TableCell>
                  <TableCell>Infantil A</TableCell>
                  <TableCell>Infantil B</TableCell>
                  <TableCell>Infantil A</TableCell>
                  <TableCell>Infantil B</TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">17:00-18:00</TableCell>
                  <TableCell>Juvenil A</TableCell>
                  <TableCell>Juvenil B</TableCell>
                  <TableCell>Juvenil A</TableCell>
                  <TableCell>Juvenil B</TableCell>
                  <TableCell>-</TableCell>
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
