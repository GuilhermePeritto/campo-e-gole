
import ExportButton from '@/components/ExportButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, DollarSign, Users } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TeacherPaymentReport = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState('2024-06');

  const monthlyTeacherData = [
    { 
      teacher: 'Carlos Silva', 
      classesGiven: 16, 
      hourlyRate: 75, 
      totalEarned: 1200,
      subjects: ['Infantil A', 'Juvenil A']
    },
    { 
      teacher: 'Ana Santos', 
      classesGiven: 12, 
      hourlyRate: 80, 
      totalEarned: 960,
      subjects: ['Infantil B']
    },
    { 
      teacher: 'João Pereira', 
      classesGiven: 14, 
      hourlyRate: 70, 
      totalEarned: 980,
      subjects: ['Juvenil B']
    },
    { 
      teacher: 'Maria Oliveira', 
      classesGiven: 10, 
      hourlyRate: 85, 
      totalEarned: 850,
      subjects: ['Técnico']
    }
  ];

  const chartData = monthlyTeacherData.map(teacher => ({
    name: teacher.teacher.split(' ')[0],
    valor: teacher.totalEarned
  }));

  const totalPayments = monthlyTeacherData.reduce((sum, teacher) => sum + teacher.totalEarned, 0);
  const totalClasses = monthlyTeacherData.reduce((sum, teacher) => sum + teacher.classesGiven, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/financeiro/relatorios')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Relatórios
              </Button>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                <h1 className="text-xl font-semibold">Pagamento de Professores</h1>
              </div>
            </div>
            <ExportButton 
              data={monthlyTeacherData}
              filename="pagamento-professores"
              title="Relatório de Pagamento de Professores"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Período:</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
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
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Total a Pagar</p>
                <p className="text-3xl font-bold text-green-600">R$ {totalPayments.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Professores Ativos</p>
                <p className="text-3xl font-bold">{monthlyTeacherData.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">A</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">Total de Aulas</p>
                <p className="text-3xl font-bold">{totalClasses}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Distribuição de Pagamentos</CardTitle>
            <CardDescription>
              Valor a ser pago para cada professor no mês selecionado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, 'Valor a Pagar']} />
                <Bar dataKey="valor" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhamento por Professor</CardTitle>
            <CardDescription>
              Informações detalhadas sobre aulas ministradas e valores a pagar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Professor</th>
                    <th className="text-center p-4 font-semibold">Aulas Dadas</th>
                    <th className="text-center p-4 font-semibold">Valor/Hora</th>
                    <th className="text-center p-4 font-semibold">Total a Pagar</th>
                    <th className="text-left p-4 font-semibold">Turmas</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyTeacherData.map((teacher, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{teacher.teacher}</td>
                      <td className="text-center p-4">{teacher.classesGiven}</td>
                      <td className="text-center p-4">R$ {teacher.hourlyRate}</td>
                      <td className="text-center p-4 font-semibold text-green-600">
                        R$ {teacher.totalEarned.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, i) => (
                            <span 
                              key={i}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TeacherPaymentReport;
