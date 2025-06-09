
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { User, Mail, Shield, Eye, EyeOff, Trash2, Save, X, UserCheck, Clock, Users, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  status?: string;
  lastAccess?: string;
  userGroupId?: string;
  useGroupPermissions: boolean;
  permissions: string[];
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  mode: 'create' | 'edit';
}

const UserModal = ({ open, onClose, user, mode }: UserModalProps) => {
  const { userGroups } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    isActive: true,
    changePassword: mode === 'create',
    newPassword: '',
    confirmPassword: '',
    useGroupPermissions: true,
    userGroupId: '',
    permissions: [] as string[]
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const availablePermissions = {
    events: [
      { id: 'events.view', name: 'Visualizar Eventos', description: 'Pode ver a lista de eventos' },
      { id: 'events.create', name: 'Criar Eventos', description: 'Pode criar novos eventos' },
      { id: 'events.edit', name: 'Editar Eventos', description: 'Pode editar eventos existentes' },
      { id: 'events.delete', name: 'Excluir Eventos', description: 'Pode excluir eventos' },
      { id: 'events.manage_venues', name: 'Gerenciar Locais', description: 'Pode gerenciar locais de eventos' },
      { id: 'events.manage_clients', name: 'Gerenciar Clientes', description: 'Pode gerenciar clientes de eventos' },
      { id: 'events.receive_payments', name: 'Receber Pagamentos', description: 'Pode processar pagamentos de eventos' }
    ],
    school: [
      { id: 'school.view', name: 'Visualizar Escolinha', description: 'Pode ver informações da escolinha' },
      { id: 'school.manage_students', name: 'Gerenciar Alunos', description: 'Pode gerenciar alunos' },
      { id: 'school.manage_teachers', name: 'Gerenciar Professores', description: 'Pode gerenciar professores' },
      { id: 'school.manage_classes', name: 'Gerenciar Turmas', description: 'Pode gerenciar turmas' },
      { id: 'school.receive_payments', name: 'Receber Mensalidades', description: 'Pode processar mensalidades' }
    ],
    bar: [
      { id: 'bar.view', name: 'Visualizar Bar', description: 'Pode ver informações do bar' },
      { id: 'bar.manage_products', name: 'Gerenciar Produtos', description: 'Pode gerenciar produtos' },
      { id: 'bar.manage_stock', name: 'Gerenciar Estoque', description: 'Pode gerenciar estoque' },
      { id: 'bar.manage_comandas', name: 'Gerenciar Comandas', description: 'Pode gerenciar comandas' },
      { id: 'bar.cashier', name: 'Operador de Caixa', description: 'Pode operar o caixa' }
    ],
    financial: [
      { id: 'financial.view', name: 'Visualizar Financeiro', description: 'Pode ver informações financeiras' },
      { id: 'financial.manage_receivables', name: 'Gerenciar Recebíveis', description: 'Pode gerenciar contas a receber' },
      { id: 'financial.manage_payables', name: 'Gerenciar Pagáveis', description: 'Pode gerenciar contas a pagar' },
      { id: 'financial.view_reports', name: 'Ver Relatórios', description: 'Pode visualizar relatórios financeiros' }
    ],
    general: [
      { id: 'general.view_dashboard', name: 'Ver Dashboard', description: 'Pode acessar o dashboard principal' },
      { id: 'general.manage_settings', name: 'Gerenciar Configurações', description: 'Pode alterar configurações do sistema' },
      { id: 'general.manage_users', name: 'Gerenciar Usuários', description: 'Pode gerenciar usuários do sistema' }
    ]
  };

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.status === 'ativo',
        changePassword: false,
        newPassword: '',
        confirmPassword: '',
        useGroupPermissions: user.useGroupPermissions,
        userGroupId: user.userGroupId || '',
        permissions: user.permissions || []
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        role: '',
        isActive: true,
        changePassword: true,
        newPassword: '',
        confirmPassword: '',
        useGroupPermissions: true,
        userGroupId: '',
        permissions: []
      });
    }
  }, [user, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((formData.changePassword || mode === 'create') && formData.newPassword !== formData.confirmPassword) {
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
        description: "Selecione um grupo de usuário.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.useGroupPermissions && formData.permissions.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma permissão específica.",
        variant: "destructive"
      });
      return;
    }

    const action = mode === 'create' ? 'criado' : 'atualizado';
    toast({
      title: `Usuário ${action}`,
      description: `O usuário foi ${action} com sucesso.`,
    });
    
    onClose();
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      toast({
        title: "Usuário excluído",
        description: "O usuário foi excluído com sucesso.",
      });
      onClose();
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const getSelectedGroup = () => {
    return userGroups.find(group => group.id === formData.userGroupId);
  };

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'admin':
        return { label: 'Administrador', color: 'bg-red-500', icon: Shield };
      case 'manager':
        return { label: 'Gerente', color: 'bg-blue-500', icon: UserCheck };
      case 'employee':
        return { label: 'Funcionário', color: 'bg-green-500', icon: User };
      default:
        return { label: role, color: 'bg-gray-500', icon: User };
    }
  };

  const roleInfo = getRoleInfo(formData.role);
  const RoleIcon = roleInfo.icon;
  const selectedGroup = getSelectedGroup();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${mode === 'create' ? 'bg-green-100' : 'bg-blue-100'}`}>
              <User className={`h-5 w-5 ${mode === 'create' ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            <div>
              <DialogTitle className="text-xl">
                {mode === 'create' ? 'Novo Usuário' : 'Editar Usuário'}
              </DialogTitle>
              <DialogDescription>
                {mode === 'create' 
                  ? 'Preencha as informações para criar um novo usuário no sistema'
                  : 'Atualize as informações do usuário selecionado'
                }
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Coluna Esquerda - Informações Básicas */}
            <div className="space-y-6">
              {/* User Information Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5" />
                    Informações Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Digite o nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="usuario@empresa.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Função no Sistema</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma função" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-red-500" />
                            <span>Administrador</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="manager">
                          <div className="flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-blue-500" />
                            <span>Gerente</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="employee">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-green-500" />
                            <span>Funcionário</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {mode === 'edit' && (
                    <>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="font-medium text-sm">Status do Usuário</div>
                          <div className="text-xs text-muted-foreground">
                            Usuário {formData.isActive ? 'ativo' : 'inativo'} no sistema
                          </div>
                        </div>
                        <Switch
                          checked={formData.isActive}
                          onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Password Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Shield className="h-5 w-5" />
                    {mode === 'create' ? 'Definir Senha' : 'Alterar Senha'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mode === 'edit' && (
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium text-sm">Alterar Senha</div>
                        <div className="text-xs text-muted-foreground">
                          Marque para definir uma nova senha
                        </div>
                      </div>
                      <Switch
                        checked={formData.changePassword}
                        onCheckedChange={(checked) => setFormData({ ...formData, changePassword: checked })}
                      />
                    </div>
                  )}

                  {(formData.changePassword || mode === 'create') && (
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">
                          {mode === 'create' ? 'Senha' : 'Nova Senha'}
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Digite a senha"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            required={formData.changePassword || mode === 'create'}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          {mode === 'create' ? 'Confirmar Senha' : 'Confirmar Nova Senha'}
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirme a senha"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            required={formData.changePassword || mode === 'create'}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita - Permissões */}
            <div className="space-y-6">
              {/* Permission Type Selection */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Settings className="h-5 w-5" />
                    Tipo de Permissões
                  </CardTitle>
                  <CardDescription>
                    Escolha como as permissões serão atribuídas ao usuário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.useGroupPermissions ? "group" : "individual"}
                    onValueChange={(value) => setFormData({ ...formData, useGroupPermissions: value === "group" })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="group" id="group" />
                      <Label htmlFor="group" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Usar Grupo de Usuários
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Permissões Específicas
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Group Selection */}
              {formData.useGroupPermissions && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Users className="h-5 w-5" />
                      Grupo de Usuários
                    </CardTitle>
                    <CardDescription>
                      Selecione um grupo predefinido com permissões específicas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Selecionar Grupo</Label>
                      <Select
                        value={formData.userGroupId}
                        onValueChange={(value) => setFormData({ ...formData, userGroupId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Escolha um grupo" />
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
                      <div className="p-3 bg-muted/30 rounded-lg border">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-4 h-4 rounded-full ${selectedGroup.color}`} />
                          <div>
                            <p className="font-medium text-sm">{selectedGroup.name}</p>
                            <p className="text-xs text-muted-foreground">{selectedGroup.description}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-xs font-medium mb-2">Permissões incluídas:</p>
                          <div className="flex flex-wrap gap-1">
                            {selectedGroup.permissions.slice(0, 8).map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission.split('.')[1]}
                              </Badge>
                            ))}
                            {selectedGroup.permissions.length > 8 && (
                              <Badge variant="secondary" className="text-xs">
                                +{selectedGroup.permissions.length - 8} mais
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Individual Permissions */}
              {!formData.useGroupPermissions && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="h-5 w-5" />
                      Permissões Específicas
                    </CardTitle>
                    <CardDescription>
                      Selecione individualmente as permissões do usuário
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                    {Object.entries(availablePermissions).map(([module, permissions]) => (
                      <div key={module} className="space-y-3">
                        <h4 className="font-medium text-sm border-b pb-1">
                          {module === 'events' ? 'Eventos' : 
                           module === 'school' ? 'Escolinha' : 
                           module === 'bar' ? 'Bar' : 
                           module === 'financial' ? 'Financeiro' : 'Geral'}
                        </h4>
                        <div className="space-y-2">
                          {permissions.map((permission) => (
                            <div key={permission.id} className="flex items-start space-x-2">
                              <Checkbox
                                id={permission.id}
                                checked={formData.permissions.includes(permission.id)}
                                onCheckedChange={() => togglePermission(permission.id)}
                              />
                              <div className="flex-1">
                                <Label htmlFor={permission.id} className="text-xs font-medium">
                                  {permission.name}
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  {permission.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 gap-2"
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          {mode === 'edit' && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="flex-1 gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Excluir Usuário
            </Button>
          )}
          <Button 
            type="submit" 
            onClick={handleSubmit}
            className="flex-1 gap-2"
          >
            <Save className="h-4 w-4" />
            {mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
