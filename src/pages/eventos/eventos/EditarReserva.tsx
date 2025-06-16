import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import EventTimeline from '@/components/EventTimeline';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Search, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';
import CampoHorario from '@/core/componentes/CampoHorario';
import CampoBusca from '@/core/componentes/CampoBusca';

const EditReservation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    clientEmail: '',
    clientName: '',
    clientPhone: '',
    venue: '',
    sport: '',
    date: '',
    startTime: '',
    endTime: '',
    amount: 0,
    recurring: false,
    recurringType: '',
    customRecurringDays: '',
    notes: ''
  });

  const [emailSearching, setEmailSearching] = useState(false);
  const [clientFound, setClientFound] = useState(false);

  // Mock events for timeline
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

  // Mock data for search components
  const mockVenues = [
    { id: 1, nome: 'Quadra A - Futebol Society', tipo: 'Futebol Society' },
    { id: 2, nome: 'Quadra B - Basquete', tipo: 'Basquete' },
    { id: 3, nome: 'Campo 1 - Futebol 11', tipo: 'Futebol 11' },
    { id: 4, nome: 'Campo 2 - Futebol 7', tipo: 'Futebol 7' },
    { id: 5, nome: 'Quadra C - Vôlei', tipo: 'Vôlei' },
    { id: 6, nome: 'Quadra de Areia - Poliesportiva', tipo: 'Poliesportiva' }
  ];

  // Carregar dados da reserva para edição
  useEffect(() => {
    // Simular carregamento dos dados da reserva
    const mockReservationData = {
      clientEmail: 'joao@exemplo.com',
      clientName: 'João Silva',
      clientPhone: '(11) 99999-9999',
      venue: 'Quadra A - Futebol Society',
      sport: 'Futebol Society',
      date: '2024-06-15',
      startTime: '19:00',
      endTime: '20:00',
      recurring: false,
      recurringType: '',
      customRecurringDays: '',
      notes: 'Reserva para treino do time'
    };
    
    setFormData(mockReservationData);
    setClientFound(true);
  }, [id]);

  const venues = [
    { name: 'Quadra A - Futebol Society', color: '#10B981' },
    { name: 'Quadra B - Basquete', color: '#3B82F6' },
    { name: 'Campo 1 - Futebol 11', color: '#EF4444' },
    { name: 'Campo 2 - Futebol 7', color: '#F59E0B' },
    { name: 'Quadra C - Vôlei', color: '#8B5CF6' },
    { name: 'Quadra de Areia - Poliesportiva', color: '#EC4899' }
  ];

  const sports = [
    'Futebol Society',
    'Basquete',
    'Futebol 11',
    'Futebol 7', 
    'Vôlei',
    'Futvolei',
    'Beach Tennis',
    'Tênis',
    'Outros'
  ];

  const handleEmailSearch = async () => {
    if (!formData.clientEmail) return;
    
    setEmailSearching(true);
    
    setTimeout(() => {
      const mockClientExists = formData.clientEmail === 'joao@exemplo.com';
      
      if (mockClientExists) {
        setFormData(prev => ({
          ...prev,
          clientName: 'João Silva',
          clientPhone: '(11) 99999-9999'
        }));
        setClientFound(true);
        toast({
          title: "Cliente encontrado!",
          description: "Dados do cliente carregados automaticamente.",
        });
      } else {
        setClientFound(false);
        setFormData(prev => ({
          ...prev,
          clientName: '',
          clientPhone: ''
        }));
        toast({
          title: "Cliente não encontrado",
          description: "Preencha os dados para criar um novo cliente.",
          variant: "destructive"
        });
      }
      setEmailSearching(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientEmail || !formData.clientName || !formData.venue || !formData.sport) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha email, nome do cliente, local e esporte.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Reserva atualizada com sucesso!",
      description: "As alterações da reserva foram salvas.",
    });
    navigate('/eventos/reservas');
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotClick = (time: string) => {
    setFormData(prev => ({ ...prev, startTime: time }));
  };

  // Filter events by selected date (excluding current event being edited)
  const eventsForSelectedDate = formData.date 
    ? mockEvents.filter(event => event.id !== parseInt(id || '0'))
    : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/reservas')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Editar Reserva</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Editar Reserva #{id}</CardTitle>
              <CardDescription>
                Atualize as informações da reserva esportiva
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informações do Cliente */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <User className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Informações do Cliente</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">E-mail do Cliente *</Label>
                      <div className="flex gap-2">
                        <Input
                          id="clientEmail"
                          type="email"
                          value={formData.clientEmail}
                          onChange={(e) => handleChange('clientEmail', e.target.value)}
                          placeholder="cliente@exemplo.com"
                          required
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleEmailSearch}
                          disabled={!formData.clientEmail || emailSearching}
                          variant="outline"
                          className="gap-2"
                        >
                          {emailSearching ? (
                            <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                          ) : (
                            <Search className="h-4 w-4" />
                          )}
                          Buscar
                        </Button>
                      </div>
                      {clientFound && (
                        <p className="text-sm text-green-600">✓ Cliente encontrado no sistema</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Nome do Cliente *</Label>
                        <Input
                          id="clientName"
                          value={formData.clientName}
                          onChange={(e) => handleChange('clientName', e.target.value)}
                          required
                          readOnly={clientFound}
                          className={clientFound ? "bg-gray-50" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientPhone">Telefone</Label>
                        <Input
                          id="clientPhone"
                          type="tel"
                          value={formData.clientPhone}
                          onChange={(e) => handleChange('clientPhone', e.target.value)}
                          readOnly={clientFound}
                          className={clientFound ? "bg-gray-50" : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações da Reserva */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Detalhes da Reserva</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CampoBusca
                      id="venue"
                      label="Local"
                      value={formData.venue}
                      onChange={(value) => handleChange('venue', value)}
                      items={mockVenues}
                      displayField="nome"
                      placeholder="Buscar local..."
                      required
                    />
                    
                    <div className="space-y-2">
                      <Label htmlFor="sport">Esporte Praticado *</Label>
                      <Select value={formData.sport} onValueChange={(value) => handleChange('sport', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o esporte" />
                        </SelectTrigger>
                        <SelectContent>
                          {sports.map((sport) => (
                            <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <SeletorData
                      id="date"
                      label="Data"
                      value={formData.date}
                      onChange={(value) => handleChange('date', value)}
                      required
                    />
                    
                    <div className="space-y-2">
                      <Label>Período *</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <CampoHorario
                          id="startTime"
                          value={formData.startTime}
                          onChange={(value) => handleChange('startTime', value)}
                          required
                        />
                        <CampoHorario
                          id="endTime"
                          value={formData.endTime}
                          onChange={(value) => handleChange('endTime', value)}
                          required
                        />
                      </div>
                    </div>

                    <CampoValor
                      id="amount"
                      label="Valor"
                      value={formData.amount}
                      onChange={(value) => handleChange('amount', value)}
                      required
                    />
                  </div>
                </div>

                {/* Reserva Recorrente */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-medium">Recorrência</h3>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">Reserva Recorrente</div>
                      <div className="text-sm text-gray-500">
                        Repetir esta reserva automaticamente
                      </div>
                    </div>
                    <Switch
                      checked={formData.recurring}
                      onCheckedChange={(checked) => setFormData({...formData, recurring: checked})}
                    />
                  </div>

                  {formData.recurring && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="recurringType">Tipo de Recorrência</Label>
                        <Select value={formData.recurringType} onValueChange={(value) => setFormData({...formData, recurringType: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a frequência" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Semanal (mesmo dia da semana)</SelectItem>
                            <SelectItem value="biweekly">Quinzenal</SelectItem>
                            <SelectItem value="monthly">Mensal</SelectItem>
                            <SelectItem value="custom">Personalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {formData.recurringType === 'custom' && (
                        <div className="space-y-2">
                          <Label htmlFor="customRecurringDays">Repetir a cada quantos dias?</Label>
                          <Input
                            id="customRecurringDays"
                            type="number"
                            min="1"
                            max="365"
                            value={formData.customRecurringDays}
                            onChange={(e) => setFormData({...formData, customRecurringDays: e.target.value})}
                            placeholder="Ex: 3 (a cada 3 dias)"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    placeholder="Informações adicionais sobre a reserva..."
                  />
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => navigate('/eventos/reservas')} className="flex-1">
                    Cancelar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Salvar Alterações
                  </Button>
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

export default EditReservation;
