
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Criar Novo Usuário' : 'Editar Usuário'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' 
              ? 'Preencha as informações para criar um novo usuário'
              : 'Atualize as informações do usuário'
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Função</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="employee">Funcionário</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === 'edit' && (
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-medium">Usuário Ativo</div>
                <div className="text-sm text-muted-foreground">
                  Usuário pode acessar o sistema
                </div>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
            </div>
          )}

          <div className="border-t pt-6">
            {mode === 'edit' && (
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <div className="font-medium">Alterar Senha</div>
                  <div className="text-sm text-muted-foreground">
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
                  <Label htmlFor="newPassword">
                    {mode === 'create' ? 'Senha' : 'Nova Senha'}
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    required={formData.changePassword || mode === 'create'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    {mode === 'create' ? 'Confirmar Senha' : 'Confirmar Nova Senha'}
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required={formData.changePassword || mode === 'create'}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            {mode === 'edit' && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex-1"
              >
                Excluir
              </Button>
            )}
            <Button type="submit" className="flex-1">
              {mode === 'create' ? 'Criar Usuário' : 'Salvar Alterações'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
