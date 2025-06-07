
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { User, Mail, Shield, Eye, EyeOff, Trash2, Save, X, UserCheck, Clock, Calendar } from 'lucide-react';

interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  status?: string;
  lastAccess?: string;
}

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
  mode: 'create' | 'edit';
}

const UserModal = ({ open, onClose, user, mode }: UserModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    isActive: true,
    changePassword: mode === 'create',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.status === 'ativo',
        changePassword: false,
        newPassword: '',
        confirmPassword: ''
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        email: '',
        role: '',
        isActive: true,
        changePassword: true,
        newPassword: '',
        confirmPassword: ''
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
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
          {/* User Information Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                Dados básicos do usuário no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Digite o nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="pl-10 h-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role and Permissions Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="h-5 w-5" />
                Função e Permissões
              </CardTitle>
              <CardDescription>
                Configure o nível de acesso do usuário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium">Função no Sistema</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Selecione uma função" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-red-500" />
                        <span>Administrador</span>
                        <Badge variant="destructive" className="text-xs">Acesso Total</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="manager">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-blue-500" />
                        <span>Gerente</span>
                        <Badge variant="secondary" className="text-xs">Acesso Avançado</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="employee">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-green-500" />
                        <span>Funcionário</span>
                        <Badge variant="outline" className="text-xs">Acesso Básico</Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role && (
                <div className="p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${roleInfo.color.replace('bg-', 'bg-').replace('-500', '-100')}`}>
                      <RoleIcon className={`h-4 w-4 ${roleInfo.color.replace('bg-', 'text-')}`} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{roleInfo.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {formData.role === 'admin' && 'Acesso completo a todas as funcionalidades'}
                        {formData.role === 'manager' && 'Acesso avançado com algumas restrições'}
                        {formData.role === 'employee' && 'Acesso básico às funcionalidades essenciais'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

                  {user?.lastAccess && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Último acesso: {user.lastAccess}</span>
                    </div>
                  )}
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
              <CardDescription>
                {mode === 'create' 
                  ? 'Defina uma senha segura para o novo usuário'
                  : 'Altere a senha do usuário se necessário'
                }
              </CardDescription>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-medium">
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
                        className="pr-10 h-10"
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
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">
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
                        className="pr-10 h-10"
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
