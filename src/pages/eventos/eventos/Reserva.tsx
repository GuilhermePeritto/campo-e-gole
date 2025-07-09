import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useClientes } from '@/hooks/useClientes';
import { useLocais } from '@/hooks/useLocais';
import { useReservas } from '@/hooks/useReservas';
import type { Reserva } from '@/types/reservas';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Reserva() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { getReserva, createReserva, updateReserva } = useReservas();
  const { getClientesForSearch } = useClientes();
  const { listar: listarLocais } = useLocais();

  const [loading, setLoading] = useState(false);
  const [clientes, setClientes] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [formData, setFormData] = useState<Partial<Reserva>>({
    cliente: '',
    local: '',
    data: '',
    horaInicio: '',
    horaFim: '',
    situacao: 'pendente',
    cor: '#6b7280',
    esporte: '',
    observacoes: '',
    valor: 0,
    clienteId: '',
    localId: ''
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar clientes e locais
        const [clientesData, locaisData] = await Promise.all([
          getClientesForSearch(),
          listarLocais()
        ]);
        
        setClientes(clientesData);
        setLocais(locaisData);

        // Se estiver editando, carregar dados da reserva
        if (isEditing && id) {
          const reserva = await getReserva(id);
          setFormData(reserva);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados');
      }
    };

    loadData();
  }, [id, isEditing, getReserva, getClientesForSearch, listarLocais]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && id) {
        await updateReserva(id, formData);
        toast.success('Reserva atualizada com sucesso!');
      } else {
        await createReserva(formData as Omit<Reserva, 'id' | 'dataCadastro'>);
        toast.success('Reserva criada com sucesso!');
      }
      
      navigate('/eventos/agenda');
    } catch (error) {
      console.error('Erro ao salvar reserva:', error);
      toast.error('Erro ao salvar reserva');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof Reserva, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClienteChange = (clienteId: string) => {
    const cliente = clientes.find(c => c.id === clienteId);
    setFormData(prev => ({
      ...prev,
      clienteId,
      cliente: cliente?.label || ''
    }));
  };

  const handleLocalChange = (localId: string) => {
    const local = locais.find(l => l.id === localId);
    setFormData(prev => ({
      ...prev,
      localId,
      local: local?.nome || '',
      cor: local?.cor || '#6b7280'
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          {isEditing ? 'Editar Reserva' : 'Nova Reserva'}
        </h1>
        <p className="text-muted-foreground">
          {isEditing ? 'Atualize os dados da reserva' : 'Preencha os dados para criar uma nova reserva'}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados da Reserva</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cliente */}
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente</Label>
                <Select value={formData.clienteId} onValueChange={handleClienteChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clientes.map(cliente => (
                      <SelectItem key={cliente.id} value={cliente.id}>
                        {cliente.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Local */}
              <div className="space-y-2">
                <Label htmlFor="local">Local</Label>
                <Select value={formData.localId} onValueChange={handleLocalChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um local" />
                  </SelectTrigger>
                  <SelectContent>
                    {locais.map(local => (
                      <SelectItem key={local.id} value={local.id}>
                        {local.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange('data', e.target.value)}
                  required
                />
              </div>

              {/* Hora Início */}
              <div className="space-y-2">
                <Label htmlFor="horaInicio">Hora Início</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={formData.horaInicio}
                  onChange={(e) => handleInputChange('horaInicio', e.target.value)}
                  required
                />
              </div>

              {/* Hora Fim */}
              <div className="space-y-2">
                <Label htmlFor="horaFim">Hora Fim</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={formData.horaFim}
                  onChange={(e) => handleInputChange('horaFim', e.target.value)}
                  required
                />
              </div>

              {/* Situação */}
              <div className="space-y-2">
                <Label htmlFor="situacao">Situação</Label>
                <Select value={formData.situacao} onValueChange={(value) => handleInputChange('situacao', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a situação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Esporte */}
              <div className="space-y-2">
                <Label htmlFor="esporte">Esporte/Modalidade</Label>
                <Input
                  id="esporte"
                  value={formData.esporte}
                  onChange={(e) => handleInputChange('esporte', e.target.value)}
                  placeholder="Ex: Futebol, Vôlei, etc."
                />
              </div>

              {/* Valor */}
              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => handleInputChange('valor', parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>

              {/* Cor */}
              <div className="space-y-2">
                <Label htmlFor="cor">Cor</Label>
                <Input
                  id="cor"
                  type="color"
                  value={formData.cor}
                  onChange={(e) => handleInputChange('cor', e.target.value)}
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => handleInputChange('observacoes', e.target.value)}
                placeholder="Observações adicionais..."
                rows={3}
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/eventos/agenda')}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 