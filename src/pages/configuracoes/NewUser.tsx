
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, User, Search } from 'lucide-react';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
}

const NewUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: 'ativo',
    useGroupPermissions: true,
    userGroupId: '',
    permissions: [] as string[],
    avatar: ''
  });
  const [groupSearch, setGroupSearch] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Mock user groups
  const userGroups: UserGroup[] = [
    {
      id: '1',
      name: 'Administradores',
      description: 'Acesso total ao sistema',
      color: 'bg-red-500',
      permissions: ['*']
    },
    {
      id: '2',
      name: 'Gerentes',
      description: 'Acesso de gerenciamento',
      color: 'bg-blue-500',
      permissions: ['bar.*', 'events.*', 'school.*', 'reports.view']
    },
    {
      id: '3',
      name: 'Funcionários Bar',
      description: 'Acesso ao módulo bar',
      color: 'bg-green-500',
      permissions: ['bar.view', 'bar.cashier', 'bar.products.view']
    },
    {
      id: '4',
      name: 'Professores',
      description: 'Acesso ao módulo escolinha',
      color: 'bg-purple-500',
      permissions: ['school.view', 'school.attendance', 'school.students.view']
    }
  ];

  // Available permissions
  const availablePermissions = [
    'general.view_dashboard',
    'bar.view', 'bar.create', 'bar.edit', 'bar.delete', 'bar.cashier',
    'events.view', 'events.create', 'events.edit', 'events.delete',
    'school.view', 'school.create', 'school.edit', 'school.delete', 'school.attendance',
    'financial.view', 'financial.create', 'financial.edit', 'financial.delete',
    'reports.view', 'reports.export',
    'settings.view', 'settings.edit', 'users.manage'
  ];

  const filteredGroups = userGroups.filter(group => 
    group.name.toLowerCase().includes(groupSearch.toLowerCase()) ||
    group.description.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const selectedGroup = userGroups.find(group => group.id === formData.userGroupId);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (formData.useGroupPermissions && !formData.userGroupId) {
      toast({
        title: "Erro",
        description: "Selecione um grupo de usuários.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your API
    console.log('Creating user:', formData);
    
    toast({
      title: "Usuário criado",
      description: "O usuário foi criado com sucesso.",
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
              <h1 className="text-3xl font-bold">Novo Usuário</h1>
              <p className="text-muted-foreground">Cadastrar um novo usuário no sistema</p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Dados básicos do usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatarPreview} />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Label htmlFor="avatar" className="cursor-pointer">
                    <Button type="button" variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Escolher Foto
                    </Button>
                    <Input
                      id="avatar"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG até 2MB
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões</CardTitle>
              <CardDescription>Configure as permissões do usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="useGroupPermissions"
                  checked={formData.useGroupPermissions}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, useGroupPermissions: checked }))}
                />
                <Label htmlFor="useGroupPermissions">Usar permissões de grupo</Label>
              </div>

              {formData.useGroupPermissions ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Buscar Grupo</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Digite para buscar grupos..."
                        value={groupSearch}
                        onChange={(e) => setGroupSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                    {filteredGroups.map((group) => (
                      <div
                        key={group.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.userGroupId === group.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, userGroupId: group.id }))}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${group.color}`} />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{group.name}</h4>
                            <p className="text-xs text-muted-foreground">{group.description}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {group.permissions.slice(0, 3).map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission === '*' ? 'Todas' : permission.split('.')[1] || permission}
                            </Badge>
                          ))}
                          {group.permissions.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{group.permissions.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedGroup && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${selectedGroup.color}`} />
                        <span className="font-medium">{selectedGroup.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{selectedGroup.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedGroup.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission === '*' ? 'Todas as permissões' : permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <Label>Permissões Específicas</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                    {availablePermissions.map((permission) => (
                      <div
                        key={permission}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.permissions.includes(permission)
                            ? 'border-primary bg-primary/5'
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => handlePermissionToggle(permission)}
                      >
                        <span className="text-sm">{permission}</span>
                      </div>
                    ))}
                  </div>
                  {formData.permissions.length > 0 && (
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <span className="text-sm font-medium">Permissões selecionadas:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formData.permissions.map((permission) => (
                          <Badge key={permission} variant="secondary" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/configuracoes')}>
              Cancelar
            </Button>
            <Button type="submit">
              Criar Usuário
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default NewUser;
