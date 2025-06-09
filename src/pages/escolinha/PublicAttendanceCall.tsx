
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Calendar as CalendarIcon, 
  CheckCircle, 
  Save, 
  UserCheck, 
  Lock,
  User,
  Clock,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const PublicAttendanceCall = () => {
  const { classId } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [teacher, setTeacher] = useState<any>(null);
  
  const classInfo = {
    name: 'Infantil A',
    schedule: 'Segunda/Quarta 16:00-17:00',
    description: 'Turma de futebol infantil para crianças de 6 a 8 anos'
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

  const handleAccessCodeSubmit = () => {
    // Simulação de validação do código
    if (accessCode.trim()) {
      setIsAuthenticated(true);
      setTeacher({
        name: 'Carlos Silva',
        code: accessCode,
        id: 1
      });
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo, professor!",
      });
    } else {
      toast({
        title: "Código inválido",
        description: "Por favor, insira um código válido.",
        variant: "destructive"
      });
    }
  };

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: present }));
  };

  const handleSaveAttendance = () => {
    console.log('Chamada salva:', {
      teacher: teacher?.name,
      date: selectedDate,
      class: classInfo.name,
      attendance
    });
    
    toast({
      title: "Chamada salva com sucesso!",
      description: `${presentCount} alunos presentes registrados.`,
    });
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-2xl">Chamada Online</CardTitle>
              <CardDescription>
                Insira seu código de acesso para fazer a chamada
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessCode">Código de Acesso do Professor</Label>
              <Input
                id="accessCode"
                type="password"
                placeholder="Digite seu código"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAccessCodeSubmit()}
                className="text-center text-lg tracking-widest"
              />
            </div>
            <Button 
              onClick={handleAccessCodeSubmit} 
              className="w-full"
              size="lg"
            >
              Acessar Sistema
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <p>Turma: <strong>{classInfo.name}</strong></p>
              <p>{classInfo.schedule}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">Chamada Online</h1>
                <p className="text-sm text-muted-foreground">
                  Professor: {teacher?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Informações da Turma e Data */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  {classInfo.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1">
                  <Clock className="h-4 w-4" />
                  {classInfo.schedule}
                </CardDescription>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal min-w-[200px]",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    locale={ptBR}
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                <p>{classInfo.description}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-muted-foreground">
                  Presentes: <span className="font-semibold text-green-600">{presentCount}</span>
                </span>
                <span className="text-muted-foreground">
                  Total: <span className="font-semibold">{students.length}</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controles Rápidos */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
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
                className="flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Marcar Todos Presentes
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAttendance({})}
                className="flex-1"
              >
                Limpar Seleção
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Presença */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Presença</CardTitle>
            <CardDescription>
              Marque os alunos presentes na aula de {format(selectedDate, "dd/MM/yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {students.map((student) => (
                <div 
                  key={student.id}
                  className={cn(
                    "flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer",
                    attendance[student.id] 
                      ? 'bg-green-50 border-green-200 shadow-sm' 
                      : 'bg-background hover:bg-accent'
                  )}
                  onClick={() => handleAttendanceChange(student.id, !attendance[student.id])}
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
                      className={cn(
                        "font-medium cursor-pointer",
                        attendance[student.id] ? 'text-green-700' : ''
                      )}
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

            <div className="flex flex-col sm:flex-row gap-3 pt-6 mt-6 border-t">
              <Button onClick={handleSaveAttendance} className="flex-1 gap-2" size="lg">
                <Save className="h-4 w-4" />
                Salvar Chamada ({presentCount} presentes)
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PublicAttendanceCall;
