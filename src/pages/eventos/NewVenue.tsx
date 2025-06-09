
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewVenue = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capacity: '',
    hourlyRate: '',
    address: '',
    phone: '',
    amenities: '',
    hasPeakHours: false,
    peakHourRate: '',
    peakHourStart: '18:00',
    peakHourEnd: '22:00'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Local cadastrado com sucesso!",
        description: "O novo local foi adicionado ao sistema.",
      });
      
      navigate('/eventos/locais');
    } catch (error) {
      toast({
        title: "Erro ao cadastrar local",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePeakRate = () => {
    if (formData.hourlyRate && !formData.peakHourRate) {
      const baseRate = parseFloat(formData.hourlyRate);
      const peakRate = baseRate * 1.5; // 50% a mais
      setFormData(prev => ({ ...prev, peakHourRate: peakRate.toFixed(2) }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/eventos/locais')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h1 className="text-xl font-semibold">Novo Local</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Local</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Informações Básicas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome do Local *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Ex: Quadra Principal"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacidade</Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={(e) => handleInputChange('capacity', e.target.value)}
                      placeholder="Ex: 50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descrição do local..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Endereço completo do local"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities">Comodidades</Label>
                  <Textarea
                    id="amenities"
                    value={formData.amenities}
                    onChange={(e) => handleInputChange('amenities', e.target.value)}
                    placeholder="Ex: Vestiário, Chuveiro, Estacionamento, Ar Condicionado..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Preços */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configuração de Preços</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                    onBlur={calculatePeakRate}
                    placeholder="Ex: 150.00"
                    required
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Horário Nobre</div>
                    <div className="text-sm text-muted-foreground">
                      Ativar preços diferenciados para horários de maior demanda
                    </div>
                  </div>
                  <Switch
                    checked={formData.hasPeakHours}
                    onCheckedChange={(checked) => handleInputChange('hasPeakHours', checked)}
                  />
                </div>

                {formData.hasPeakHours && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div className="space-y-2">
                      <Label htmlFor="peakHourStart">Início do Horário Nobre</Label>
                      <Input
                        id="peakHourStart"
                        type="time"
                        value={formData.peakHourStart}
                        onChange={(e) => handleInputChange('peakHourStart', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="peakHourEnd">Fim do Horário Nobre</Label>
                      <Input
                        id="peakHourEnd"
                        type="time"
                        value={formData.peakHourEnd}
                        onChange={(e) => handleInputChange('peakHourEnd', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="peakHourRate">Valor Horário Nobre (R$) *</Label>
                      <Input
                        id="peakHourRate"
                        type="number"
                        step="0.01"
                        value={formData.peakHourRate}
                        onChange={(e) => handleInputChange('peakHourRate', e.target.value)}
                        placeholder="Ex: 225.00"
                        required={formData.hasPeakHours}
                      />
                      {formData.hourlyRate && formData.peakHourRate && (
                        <p className="text-xs text-muted-foreground">
                          {(((parseFloat(formData.peakHourRate) / parseFloat(formData.hourlyRate)) - 1) * 100).toFixed(0)}% mais caro
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/eventos/locais')}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Cadastrando...' : 'Cadastrar Local'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewVenue;
