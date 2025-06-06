import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Calendar, Clock, MapPin, Search, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const NewReservation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    clientEmail: '',
    clientName: '',
    clientPhone: '',
    venue: '',
    sport: '',
    date: '',
    startTime: '',
    endTime: '',
    recurring: false,
    recurringType: '',
    customRecurringDays: '',
    notes: ''
  });

  const [emailSearching, setEmailSearching] = useState(false);
  const [clientFound, setClientFound] = useState(false);

  // Preencher data automaticamente se vier da agenda
  useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      setFormData(prev => ({ ...prev, date: dateParam }));
    }
  }, [searchParams]);

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
    
    // Simular busca no banco de dados
    setTimeout(() => {
      // Simular cliente encontrado (em produção, seria uma chamada real à API)
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
      title: "Reserva criada com sucesso!",
      description: "A nova reserva foi adicionada à agenda.",
    });
    navigate('/eventos/agenda');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/agenda')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Nova Reserva</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Criar Nova Reserva</CardTitle>
            <CardDescription>
              Preencha as informações para criar uma nova reserva esportiva
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
                        onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
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
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
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
                        onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
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
                  <div className="space-y-2">
                    <Label htmlFor="venue">Local *</Label>
                    <Select value={formData.venue} onValueChange={(value) => setFormData({...formData, venue: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o local" />
                      </SelectTrigger>
                      <SelectContent>
                        {venues.map((venue) => (
                          <SelectItem key={venue.name} value={venue.name}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: venue.color }}
                              ></div>
                              {venue.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sport">Esporte Praticado *</Label>
                    <Select value={formData.sport} onValueChange={(value) => setFormData({...formData, sport: value})}>
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

                  <div className="space-y-2">
                    <Label htmlFor="date">Data *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Período *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                        required
                        placeholder="Início"
                      />
                      <Input
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                        required
                        placeholder="Término"
                      />
                    </div>
                  </div>
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
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Informações adicionais sobre a reserva, altura da rede necessária, equipamentos específicos..."
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => navigate('/eventos/agenda')} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Criar Reserva
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewReservation;
