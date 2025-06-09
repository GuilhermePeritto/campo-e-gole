
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
import { ArrowLeft, Search, Shield, Users } from 'lucide-react';

const NewGroup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500',
    permissions: [] as string[]
  });
  const [permissionSearch, setPermissionSearch] = useState('');

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

  // Available permissions organized by category
  const permissionCategories = {
    'Geral': [
      { key: 'general.view_dashboard', label: 'Visualizar Dashboard' },
    ],
    'Bar': [
      { key: 'bar.view', label: 'Visualizar Bar' },
      { key: 'bar.create', label: 'Criar Produtos' },
      { key: 'bar.edit', label: 'Editar Produtos' },
      { key: 'bar.delete', label: 'Excluir Produtos' },
      { key: 'bar.cashier', label: 'Operar Caixa' },
      { key: 'bar.manage_stock', label: 'Gerenciar Estoque' },
      { key: 'bar.manage_comandas', label: 'Gerenciar Comandas' },
    ],
    'Eventos': [
      { key: 'events.view', label: 'Visualizar Eventos' },
      { key: 'events.create', label: 'Criar Eventos' },
      { key: 'events.edit', label: 'Editar Eventos' },
      { key: 'events.delete', label: 'Excluir Eventos' },
      { key: 'events.manage_venues', label: 'Gerenciar Locais' },
      { key: 'events.manage_clients', label: 'Gerenciar Clientes' },
      { key: 'events.receive_payments', label: 'Receber Pagamentos' },
    ],
    'Escolinha': [
      { key: 'school.view', label: 'Visualizar Escolinha' },
      { key: 'school.create', label: 'Criar Registros' },
      { key: 'school.edit', label: 'Editar Registros' },
      { key: 'school.delete', label: 'Excluir Registros' },
      { key: 'school.attendance', label: 'Gerenciar Chamadas' },
      { key: 'school.manage_students', label: 'Gerenciar Alunos' },
      { key: 'school.manage_teachers', label: 'Gerenciar Professores' },
      { key: 'school.manage_classes', label: 'Gerenciar Turmas' },
      { key: 'school.receive_payments', label: 'Receber Pagamentos' },
    ],
    'Financeiro': [
      { key: 'financial.view', label: 'Visualizar Financeiro' },
      { key: 'financial.create', label: 'Criar Lançamentos' },
      { key: 'financial.edit', label: 'Editar Lançamentos' },
      { key: 'financial.delete', label: 'Excluir Lançamentos' },
      { key: 'financial.manage_receivables', label: 'Gerenciar Recebíveis' },
      { key: 'financial.manage_payables', label: 'Gerenciar Pagáveis' },
    ],
    'Relatórios': [
      { key: 'reports.view', label: 'Visualizar Relatórios' },
      { key: 'reports.export', label: 'Exportar Relatórios' },
    ],
    'Configurações': [
      { key: 'settings.view', label: 'Visualizar Configurações' },
      { key: 'settings.edit', label: 'Editar Configurações' },
      { key: 'users.manage', label: 'Gerenciar Usuários' },
    ]
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleCategoryToggle = (categoryPermissions: Array<{key: string, label: string}>) => {
    const categoryKeys = categoryPermissions.map(p => p.key);
    const allSelected = categoryKeys.every(key => formData.permissions.includes(key));
    
    if (allSelected) {
      // Remove all permissions from this category
      setFormData(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => !categoryKeys.includes(p))
      }));
    } else {
      // Add all permissions from this category
      setFormData(prev => ({
        ...prev,
        permissions: [...new Set([...prev.permissions, ...categoryKeys])]
      }));
    }
  };

  const getFilteredPermissions = () => {
    if (!permissionSearch) return permissionCategories;
    
    const filtered: typeof permissionCategories = {};
    Object.entries(permissionCategories).forEach(([category, permissions]) => {
      const filteredPerms = permissions.filter(perm => 
        perm.label.toLowerCase().includes(permissionSearch.toLowerCase()) ||
        perm.key.toLowerCase().includes(permissionSearch.toLowerCase())
      );
      if (filteredPerms.length > 0) {
        filtered[category] = filteredPerms;
      }
    });
    return filtered;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.permissions.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma permissão para o grupo.",
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
      {/* Header */}
      <div className="bg-card border-b">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/configuracoes')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Novo Grupo</h1>
              <p className="text-muted-foreground">Cadastrar um novo grupo de permissões</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 max-w-5xl">
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
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Permissões do Grupo
              </CardTitle>
              <CardDescription>Selecione as permissões que os usuários deste grupo terão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Buscar Permissões</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar permissões..."
                    value={permissionSearch}
                    onChange={(e) => setPermissionSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-6 max-h-96 overflow-y-auto border rounded-lg p-4">
                {Object.entries(getFilteredPermissions()).map(([category, permissions]) => {
                  const categoryKeys = permissions.map(p => p.key);
                  const allSelected = categoryKeys.every(key => formData.permissions.includes(key));
                  const someSelected = categoryKeys.some(key => formData.permissions.includes(key));
                  
                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-primary">{category}</h4>
                        <Button
                          type="button"
                          variant={allSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleCategoryToggle(permissions)}
                          className="text-xs"
                        >
                          {allSelected ? 'Desmarcar Todas' : 'Marcar Todas'}
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {permissions.map((permission) => (
                          <div
                            key={permission.key}
                            className="flex items-center space-x-2 p-3 rounded border hover:bg-muted/30 transition-colors"
                          >
                            <Checkbox
                              id={permission.key}
                              checked={formData.permissions.includes(permission.key)}
                              onCheckedChange={() => handlePermissionToggle(permission.key)}
                            />
                            <Label htmlFor={permission.key} className="text-sm cursor-pointer flex-1">
                              {permission.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {someSelected && (
                        <div className="text-xs text-muted-foreground">
                          {categoryKeys.filter(key => formData.permissions.includes(key)).length} de {categoryKeys.length} selecionadas
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {formData.permissions.length > 0 && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <span className="text-sm font-semibold text-primary">
                    Permissões selecionadas ({formData.permissions.length}):
                  </span>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.permissions.map((permission) => (
                      <Badge key={permission} variant="default" className="text-xs">
                        {permission}
                        <button
                          type="button"
                          onClick={() => handlePermissionToggle(permission)}
                          className="ml-1 hover:bg-primary-foreground/20 rounded"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
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
