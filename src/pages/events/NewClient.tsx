
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Users } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewClient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    document: '',
    address: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e telefone.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Cliente cadastrado!",
      description: `${formData.name} foi adicionado ao sistema.`,
    });
    navigate('/events/clients');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="shadow-sm border-b ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/events/clients')}
              className="gap-2 text-gray-900 dark:text-gray-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-300">Novo Cliente</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card className="">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-gray-300">Cadastrar Cliente</CardTitle>
            <CardDescription className="text-gray-900 dark:text-gray-300">
              Preencha as informações do novo cliente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Nome Completo *</label>
                  <Input
                    placeholder="Ex: João da Silva"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className=""
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                  <Input
                    type="email"
                    placeholder="joao@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className=""
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Telefone *</label>
                  <Input
                    placeholder="(11) 99999-9999"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className=""
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Tipo de Cliente</label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pessoa-fisica">Pessoa Física</SelectItem>
                      <SelectItem value="pessoa-juridica">Pessoa Jurídica</SelectItem>
                      <SelectItem value="clube">Clube/Equipe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">CPF/CNPJ</label>
                  <Input
                    placeholder="000.000.000-00"
                    value={formData.document}
                    onChange={(e) => handleInputChange('document', e.target.value)}
                    className=""
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Endereço</label>
                  <Input
                    placeholder="Rua, Número, Bairro, Cidade"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className=""
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300">Observações</label>
                <Textarea
                  className="w-full p-3 border  rounded-md resize-none h-24"
                  placeholder="Informações adicionais sobre o cliente..."
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                />
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="submit" variant='outline' className="flex-1 bg-black text-white">
                  Cadastrar Cliente
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate('/events/clients')}
                  className="flex-1  text-gray-900 dark:text-gray-300"
                >
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

export default NewClient;
