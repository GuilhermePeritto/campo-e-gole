
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ModuleHeader from '@/components/ModuleHeader';
import EventTimeline from '@/components/EventTimeline';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { Calendar, Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewReservation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    client: '',
    venue: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: '',
    amount: ''
  });

  // Mock events for timeline demonstration
  const mockEvents = [
    { 
      id: 1, 
      client: 'João Silva', 
      venue: 'Quadra 1', 
      startTime: '08:00', 
      endTime: '10:00', 
      status: 'confirmed' as const, 
      color: '#10b981',
      sport: 'Futebol Society'
    },
    { 
      id: 2, 
      client: 'Maria Santos', 
      venue: 'Campo de Futebol', 
      startTime: '14:00', 
      endTime: '15:30', 
      status: 'pending' as const, 
      color: '#f59e0b',
      sport: 'Futebol 11'
    },
    { 
      id: 3, 
      client: 'Pedro Costa', 
      venue: 'Quadra 2', 
      startTime: '18:00', 
      endTime: '20:00', 
      status: 'confirmed' as const, 
      color: '#3b82f6',
      sport: 'Basquete'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Nova reserva:', formData);
    navigate('/eventos');
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotClick = (time: string) => {
    setFormData(prev => ({ ...prev, startTime: time }));
  };

  // Filter events by selected date
  const eventsForSelectedDate = formData.date 
    ? mockEvents.filter(event => {
        // In a real app, you would filter by actual date
        return true; // For demo, show all events
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Nova Reserva"
        icon={<Plus className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.events}
        backTo="/eventos"
        backLabel="Eventos"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="border h-fit">
            <CardHeader>
              <CardTitle className="text-card-foreground">Criar Nova Reserva</CardTitle>
              <CardDescription>
                Preencha os dados para criar uma nova reserva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="client">Cliente</Label>
                    <Select value={formData.client} onValueChange={(value) => handleChange('client', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joao-silva">João Silva</SelectItem>
                        <SelectItem value="maria-santos">Maria Santos</SelectItem>
                        <SelectItem value="pedro-costa">Pedro Costa</SelectItem>
                        <SelectItem value="ana-oliveira">Ana Oliveira</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue">Local</Label>
                    <Select value={formData.venue} onValueChange={(value) => handleChange('venue', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um local" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quadra-1">Quadra 1</SelectItem>
                        <SelectItem value="quadra-2">Quadra 2</SelectItem>
                        <SelectItem value="campo-futebol">Campo de Futebol</SelectItem>
                        <SelectItem value="quadra-coberta">Quadra Coberta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleChange('date', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => handleChange('amount', e.target.value)}
                      placeholder="0,00"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Horário de Início</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleChange('startTime', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">Horário de Término</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleChange('endTime', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Observações</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                      placeholder="Observações adicionais sobre a reserva..."
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button type="submit" className="flex-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      Criar Reserva
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate('/eventos')}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Timeline */}
          <div className="space-y-4">
            {formData.date ? (
              <EventTimeline
                selectedDate={formData.date}
                events={eventsForSelectedDate}
                onTimeSlotClick={handleTimeSlotClick}
              />
            ) : (
              <Card className="h-[500px] flex items-center justify-center">
                <CardContent className="text-center">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold text-lg mb-2">Selecione uma data</h3>
                  <p className="text-muted-foreground">
                    Escolha uma data no formulário para ver a timeline dos eventos
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewReservation;
