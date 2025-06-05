
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Plus, Search, Users2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Students = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
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
      {/* Header */}
      <header className="shadow-sm border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/school')}
              className="gap-2 text-black hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Escolinha
            </Button>
            <div className="flex items-center gap-2">
              <Users2 className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold text-black">Gerenciar Alunos</h1>
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
              placeholder="Buscar por nome ou turma..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-black"
            />
          </div>
          <Button
            onClick={() => navigate('/school/students/novo')}
            className="bg-black text-white hover:bg-gray-800 gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Aluno
          </Button>
        </div>

        {/* Students Table */}
        <Card className="border-black">
          <CardHeader>
            <CardTitle className="text-black">Lista de Alunos</CardTitle>
            <CardDescription>
              Gerencie todos os alunos da escolinha
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Nome</TableHead>
                  <TableHead className="text-black">Idade</TableHead>
                  <TableHead className="text-black">Turma</TableHead>
                  <TableHead className="text-black">Telefone</TableHead>
                  <TableHead className="text-black">Mensalidade</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium text-black">{student.name}</TableCell>
                    <TableCell className="text-gray-600">{student.age} anos</TableCell>
                    <TableCell className="text-gray-600">{student.class}</TableCell>
                    <TableCell className="text-gray-600">{student.phone}</TableCell>
                    <TableCell className="font-medium text-black">R$ {student.monthlyFee}</TableCell>
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
                          onClick={() => navigate(`/school/students/${student.id}/editar`)}
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

export default Students;
