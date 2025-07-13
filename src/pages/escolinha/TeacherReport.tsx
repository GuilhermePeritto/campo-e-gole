
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { usePagination } from '@/hooks/usePagination';
import { ArrowLeft, Calendar, DollarSign, GraduationCap, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TeacherReport = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedMonth, setSelectedMonth] = useState('2024-06');

  const teacher = {
    id: 1,
    name: 'Prof. Carlos Silva',
    specialization: 'Futebol Infantil',
    valuePerClass: 80,
    commissionPercentage: 15
  };

  const classes = [
    {
      id: 1,
      date: '2024-06-03',
      className: 'Infantil A',
      duration: 60,
      studentsPresent: 12,
      totalValue: 80,
      commission: 12,
      status: 'realizada'
    },
    {
      id: 2,
      date: '2024-06-05',
      className: 'Infantil B',
      duration: 60,
      studentsPresent: 8,
      totalValue: 80,
      commission: 12,
      status: 'realizada'
    },
    {
      id: 3,
      date: '2024-06-07',
      className: 'Infantil A',
      duration: 60,
      studentsPresent: 10,
      totalValue: 80,
      commission: 12,
      status: 'realizada'
    },
    {
      id: 4,
      date: '2024-06-10',
      className: 'Juvenil A',
      duration: 90,
      studentsPresent: 15,
      totalValue: 120,
      commission: 18,
      status: 'realizada'
    },
    {
      id: 5,
      date: '2024-06-12',
      className: 'Infantil A',
      duration: 60,
      studentsPresent: 11,
      totalValue: 80,
      commission: 12,
      status: 'cancelada'
    }
  ];

  // const pagination = usePagination(classes, {
  //   pageSize: 10,
  //   totalItems: classes.length
  // });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'realizada':
        return 'bg-green-200 text-green-800';
      case 'cancelada':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'realizada':
        return 'Realizada';
      case 'cancelada':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const totalClasses = classes.filter(c => c.status === 'realizada').length;
  const totalStudents = classes.filter(c => c.status === 'realizada').reduce((sum, c) => sum + c.studentsPresent, 0);
  const totalEarnings = classes.filter(c => c.status === 'realizada').reduce((sum, c) => sum + c.commission, 0);
  const totalValue = classes.filter(c => c.status === 'realizada').reduce((sum, c) => sum + c.totalValue, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="shadow-sm border-b">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/professores')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Professores
            </Button>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Relatório do Professor</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-none mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Teacher Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{teacher.name}</CardTitle>
            <CardDescription>
              {teacher.specialization} • Valor por aula: R$ {teacher.valuePerClass.toFixed(2)} • Comissão: {teacher.commissionPercentage}%
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Filter */}
        <div className="flex gap-4 mb-6">
          <div className="w-48">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-06">Junho 2024</SelectItem>
                <SelectItem value="2024-05">Maio 2024</SelectItem>
                <SelectItem value="2024-04">Abril 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Aulas Realizadas</p>
                  <p className="text-2xl font-bold">{totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alunos Atendidos</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Valor Total Gerado</p>
                  <p className="text-2xl font-bold">R$ {totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Comissão a Receber</p>
                  <p className="text-2xl font-bold text-orange-600">R$ {totalEarnings.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhamento das Aulas</CardTitle>
            <CardDescription>
              Aulas ministradas no período selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Turma</TableHead>
                  <TableHead>Duração</TableHead>
                  <TableHead>Alunos Presentes</TableHead>
                  <TableHead>Valor da Aula</TableHead>
                  <TableHead>Comissão</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((classItem) => (
                  <TableRow key={classItem.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {new Date(classItem.date).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>{classItem.className}</TableCell>
                    <TableCell>{classItem.duration} min</TableCell>
                    <TableCell className="text-center">{classItem.studentsPresent}</TableCell>
                    <TableCell className="font-medium">R$ {classItem.totalValue.toFixed(2)}</TableCell>
                    <TableCell className="font-medium text-orange-600">
                      R$ {classItem.commission.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(classItem.status)}`}>
                        {getStatusLabel(classItem.status)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Paginação */}
            {/* <PaginationControls
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
            /> */}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TeacherReport;
