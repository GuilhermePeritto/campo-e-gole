
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Users2, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const ClassStudents = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, fetch from API
  const classInfo = {
    id: 1,
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
      status: 'em dia',
      monthlyFee: 150,
      joinDate: '2024-01-15'
    },
    { 
      id: 4, 
      name: 'Maria Oliveira', 
      age: 9, 
      phone: '(11) 99999-4444',
      status: 'em dia',
      monthlyFee: 150,
      joinDate: '2024-02-01'
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/school/classes')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Alunos da Turma {classInfo.name}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Class Info */}
        <Card className="border-black mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-semibold text-black">Nome da Turma</h3>
                <p className="text-gray-600">{classInfo.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Faixa Etária</h3>
                <p className="text-gray-600">{classInfo.ageRange}</p>
              </div>
              <div>
                <h3 className="font-semibold text-black">Horário</h3>
                <p className="text-gray-600">{classInfo.schedule}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-black"
            />
          </div>
          <Button
            onClick={() => navigate('/school/students/new')}
            className="bg-black text-white hover:bg-gray-800 gap-2"
          >
            <Plus className="h-4 w-4" />
            Adicionar Aluno
          </Button>
        </div>

        {/* Students Table */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Alunos Matriculados</CardTitle>
            <CardDescription>
              {filteredStudents.length} alunos matriculados nesta turma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Nome</TableHead>
                  <TableHead className="text-black">Idade</TableHead>
                  <TableHead className="text-black">Telefone</TableHead>
                  <TableHead className="text-black">Mensalidade</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Data de Matrícula</TableHead>
                  <TableHead className="text-black">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{student.name}</TableCell>
                    <TableCell className="text-gray-600">{student.age} anos</TableCell>
                    <TableCell className="text-gray-600">{student.phone}</TableCell>
                    <TableCell className="font-medium text-black">R$ {student.monthlyFee}</TableCell>
                    <TableCell>
                      <span className={`text-xs px-2 py-1 rounded-lg ${getStatusColor(student.status)}`}>
                        {student.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{student.joinDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white"
                          onClick={() => navigate(`/school/students/${student.id}/edit`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-black text-black hover:bg-black hover:text-white"
                          onClick={() => navigate(`/school/students/${student.id}/history`)}
                        >
                          Histórico
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClassStudents;
