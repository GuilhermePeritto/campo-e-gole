
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Calendar, CheckCircle, Save, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AttendanceCall = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  
  const classInfo = {
    name: 'Infantil A',
    schedule: 'Segunda/Quarta 16:00-17:00',
    date: new Date().toLocaleDateString('pt-BR'),
    teacher: 'Carlos Silva'
  };

  const [students] = useState([
    { id: 1, name: 'Pedro Silva', present: false },
    { id: 2, name: 'Ana Costa', present: false },
    { id: 3, name: 'João Santos', present: false },
    { id: 4, name: 'Maria Oliveira', present: false },
    { id: 5, name: 'Carlos Ferreira', present: false },
    { id: 6, name: 'Laura Martins', present: false },
    { id: 7, name: 'Rafael Lima', present: false },
    { id: 8, name: 'Beatriz Alves', present: false }
  ]);

  const [attendance, setAttendance] = useState<Record<number, boolean>>({});

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: present }));
  };

  const handleSaveAttendance = () => {
    console.log('Chamada salva:', attendance);
    navigate('/escolinha/turmas');
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/escolinha/turmas')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Turmas
            </Button>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <h1 className="text-xl font-semibold">Chamada</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Class Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {classInfo.name} - {classInfo.date}
            </CardTitle>
            <CardDescription>
              {classInfo.schedule} • Professor: {classInfo.teacher}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Presentes: {presentCount} de {students.length} alunos
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allPresent = students.reduce((acc, student) => {
                      acc[student.id] = true;
                      return acc;
                    }, {} as Record<number, boolean>);
                    setAttendance(allPresent);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Marcar Todos
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAttendance({})}
                >
                  Limpar Todos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Presença</CardTitle>
            <CardDescription>
              Marque os alunos presentes na aula de hoje
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <div 
                  key={student.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
                    attendance[student.id] ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`student-${student.id}`}
                      checked={attendance[student.id] || false}
                      onCheckedChange={(checked) => 
                        handleAttendanceChange(student.id, checked as boolean)
                      }
                    />
                    <label 
                      htmlFor={`student-${student.id}`}
                      className={`font-medium cursor-pointer ${
                        attendance[student.id] ? 'text-green-700' : ''
                      }`}
                    >
                      {student.name}
                    </label>
                  </div>
                  {attendance[student.id] && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6 mt-6 border-t">
              <Button onClick={handleSaveAttendance} className="flex-1 gap-2">
                <Save className="h-4 w-4" />
                Salvar Chamada
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/escolinha/turmas')}
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AttendanceCall;
