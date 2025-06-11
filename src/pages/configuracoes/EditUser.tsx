
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, User, Shield } from 'lucide-react';
import ModuleHeader from '@/components/ModuleHeader';
import { MODULE_COLORS } from '@/constants/moduleColors';

interface UserGroup {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
}

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'ativo',
    userGroupId: '',
    avatar: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  // Mock user groups
  const userGroups: UserGroup[] = [
    {
      id: '1',
      name: 'Administradores',
      description: 'Acesso total ao sistema',
      color: 'bg-red-500',
      permissions: ['Todas as permissões']
    },
    {
      id: '2',
      name: 'Gerentes',
      description: 'Acesso de gerenciamento',
      color: 'bg-blue-500',
      permissions: ['Bar', 'Eventos', 'Escolinha', 'Relatórios']
    },
    {
      id: '3',
      name: 'Funcionários Bar',
      description: 'Acesso ao módulo bar',
      color: 'bg-green-500',
      permissions: ['Bar', 'Caixa']
    },
    {
      id: '4',
      name: 'Professores',
      description: 'Acesso ao módulo escolinha',
      color: 'bg-purple-500',
      permissions: ['Escolinha', 'Chamadas']
    }
  ];

  // Load user data on component mount
  useEffect(() => {
    if (id) {
      // Mock data loading - replace with actual API call
      const mockUser = {
        name: 'João Silva',
        email: 'joao@exemplo.com',
        status: 'ativo',
        userGroupId: '2',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      };
      
      setFormData(mockUser);
      setAvatarPreview(mockUser.avatar);
    }
  }, [id]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userGroupId) {
      toast({
        title: "Erro",
        description: "Selecione um grupo de usuários.",
        variant: "destructive"
      });
      return;
    }

    console.log('Updating user:', formData);
    
    toast({
      title: "Usuário atualizado",
      description: "O usuário foi atualizado com sucesso.",
    });
    
    navigate('/configuracoes');
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Editar Usuário"
        icon={<User className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.dashboard}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

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
                      Alterar Foto
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
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Grupo de Permissões
              </CardTitle>
              <CardDescription>Selecione o grupo que define as permissões do usuário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selecionar Grupo</Label>
                <Select value={formData.userGroupId} onValueChange={(value) => setFormData(prev => ({ ...prev, userGroupId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha um grupo..." />
                  </SelectTrigger>
                  <SelectContent>
                    {userGroups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${group.color}`} />
                          <span>{group.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedGroup && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${selectedGroup.color}`} />
                    <span className="font-semibold text-primary">{selectedGroup.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{selectedGroup.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedGroup.permissions.map((permission) => (
                      <Badge key={permission} variant="default" className="text-xs">
                        {permission}
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
              Salvar Alterações
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditUser;
