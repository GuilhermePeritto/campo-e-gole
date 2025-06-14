
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewVenue = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    capacity: '',
    hourlyRate: '',
    description: '',
    equipment: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.capacity || !formData.hourlyRate) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Espaço criado!",
      description: `O espaço ${formData.name} foi criado com sucesso.`,
    });
    
    navigate('/eventos/locais');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/eventos/locais')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Espaços
              </Button>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h1 className="text-xl font-semibold">Novo Espaço</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Espaço</CardTitle>
            <CardDescription>
              Preencha as informações do novo espaço esportivo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Espaço *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    placeholder="Ex: Quadra de Tênis 1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Espaço *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quadra_tenis">Quadra de Tênis</SelectItem>
                      <SelectItem value="quadra_futsal">Quadra de Futsal</SelectItem>
                      <SelectItem value="campo_futebol">Campo de Futebol</SelectItem>
                      <SelectItem value="quadra_basquete">Quadra de Basquete</SelectItem>
                      <SelectItem value="quadra_volei">Quadra de Vôlei</SelectItem>
                      <SelectItem value="piscina">Piscina</SelectItem>
                      <SelectItem value="salao">Salão de Eventos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({...prev, capacity: e.target.value}))}
                    placeholder="Número de pessoas"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Valor por Hora (R$) *</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({...prev, hourlyRate: e.target.value}))}
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipment">Equipamentos Inclusos</Label>
                <Input
                  id="equipment"
                  value={formData.equipment}
                  onChange={(e) => setFormData(prev => ({...prev, equipment: e.target.value}))}
                  placeholder="Ex: Redes, bolas, iluminação..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                  placeholder="Descrição adicional do espaço..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Criar Espaço
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate('/eventos/locais')}>
                  Cancelar
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
