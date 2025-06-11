
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

const NewGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500',
    permissions: [] as string[]
  });

  const colorOptions = [
    { value: 'bg-red-500', label: 'Vermelho', class: 'bg-red-500' },
    { value: 'bg-blue-500', label: 'Azul', class: 'bg-blue-500' },
    { value: 'bg-green-500', label: 'Verde', class: 'bg-green-500' },
    { value: 'bg-purple-500', label: 'Roxo', class: 'bg-purple-500' },
    { value: 'bg-yellow-500', label: 'Amarelo', class: 'bg-yellow-500' },
    { value: 'bg-orange-500', label: 'Laranja', class: 'bg-orange-500' },
    { value: 'bg-pink-500', label: 'Rosa', class: 'bg-pink-500' },
    { value: 'bg-gray-500', label: 'Cinza', class: 'bg-gray-500' }
  ];

  // Simplified permissions structure
  const permissionModules = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      description: 'Visualizar painel principal',
      permissions: ['Visualizar Dashboard']
    },
    {
      id: 'bar',
      name: 'Bar',
      description: 'Módulo completo do bar',
      permissions: ['Visualizar', 'Gerenciar Produtos', 'Operar Caixa', 'Gerenciar Comandas', 'Relatórios']
    },
    {
      id: 'events',
      name: 'Eventos',
      description: 'Módulo completo de eventos',
      permissions: ['Visualizar', 'Gerenciar Eventos', 'Gerenciar Locais', 'Gerenciar Clientes', 'Receber Pagamentos', 'Relatórios']
    },
    {
      id: 'school',
      name: 'Escolinha',
      description: 'Módulo completo da escolinha',
      permissions: ['Visualizar', 'Gerenciar Alunos', 'Gerenciar Professores', 'Gerenciar Turmas', 'Chamadas', 'Receber Pagamentos', 'Relatórios']
    },
    {
      id: 'financial',
      name: 'Financeiro',
      description: 'Módulo financeiro',
      permissions: ['Visualizar', 'Gerenciar Lançamentos', 'Contas a Pagar/Receber', 'Relatórios']
    },
    {
      id: 'settings',
      name: 'Configurações',
      description: 'Configurações do sistema',
      permissions: ['Visualizar Configurações', 'Gerenciar Usuários', 'Editar Configurações']
    }
  ];

  const handleModuleToggle = (moduleId: string) => {
    const isSelected = formData.permissions.includes(moduleId);
    
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== moduleId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        permissions: [...prev.permissions, moduleId]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.permissions.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um módulo para o grupo.",
        variant: "destructive"
      });
      return;
    }

    console.log('Creating group:', formData);
    
    toast({
      title: "Grupo criado",
      description: "O grupo de permissões foi criado com sucesso.",
    });
    
    navigate('/configuracoes');
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Novo Grupo"
        icon={<Shield className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.dashboard}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Informações do Grupo
              </CardTitle>
              <CardDescription>Defina o nome, descrição e cor do grupo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Grupo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Funcionários de Evento"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cor do Grupo</Label>
                  <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        className={`w-8 h-8 rounded-full border-2 transition-all ${color.class} ${
                          formData.color === color.value 
                            ? 'border-primary scale-110' 
                            : 'border-muted hover:scale-105'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, color: color.value }))}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva o que este grupo de usuários pode fazer no sistema..."
                  rows={3}
                  required
                />
              </div>

              {/* Preview */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <Label className="text-sm font-semibold">Pré-visualização:</Label>
                <div className="flex items-center gap-3 mt-2">
                  <div className={`w-4 h-4 rounded-full ${formData.color}`} />
                  <div>
                    <span className="font-medium">{formData.name || 'Nome do Grupo'}</span>
                    <p className="text-sm text-muted-foreground">
                      {formData.description || 'Descrição do grupo...'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Módulos e Permissões</CardTitle>
              <CardDescription>Selecione os módulos que este grupo terá acesso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {permissionModules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      formData.permissions.includes(module.id)
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={module.id}
                        checked={formData.permissions.includes(module.id)}
                        onCheckedChange={() => handleModuleToggle(module.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label htmlFor={module.id} className="text-base font-semibold cursor-pointer">
                          {module.name}
                        </Label>
                        <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {module.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {formData.permissions.length > 0 && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-sm font-semibold text-primary">
                    Módulos selecionados ({formData.permissions.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.permissions.map((moduleId) => {
                      const module = permissionModules.find(m => m.id === moduleId);
                      return (
                        <Badge key={moduleId} variant="default" className="text-xs">
                          {module?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/configuracoes')}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Grupo
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewGroup;
