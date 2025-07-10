
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { MODULE_COLORS } from '@/constants/moduleColors';
import CampoEmail from '@/core/components/CampoEmail';
import CampoTelefone from '@/core/components/CampoTelefone';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';

const NovoUsuario = () => {
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    filial: '',
    grupo: '',
    senha: '',
    confirmarSenha: '',
    ativo: true,
    forcarTrocaSenha: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Salvando usuário:', userData);
    // Aqui faria a chamada para a API
  };

  const filiais = ['Filial Centro', 'Filial Zona Norte'];
  const grupos = ['Administrador', 'Gerente', 'Atendente', 'Professor', 'Financeiro'];

  return (
    <BaseFormPage
      title="Novo Usuário"
      description="Cadastre um novo usuário no sistema"
      icon={<UserPlus className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.inicio}
      backTo="/configuracoes/usuarios"
      backLabel="Usuários"
      onSubmit={handleSubmit}
      submitLabel="Salvar Usuário"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Dados básicos do usuário
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={userData.nome}
                  onChange={(e) => setUserData({...userData, nome: e.target.value})}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cargo">Cargo *</Label>
                <Input
                  id="cargo"
                  value={userData.cargo}
                  onChange={(e) => setUserData({...userData, cargo: e.target.value})}
                  className="h-11"
                  placeholder="Ex: Gerente, Atendente"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <CampoEmail
                id="email"
                value={userData.email}
                onChange={(value) => setUserData({...userData, email: value})}
                required
              />
              <CampoTelefone
                id="telefone"
                value={userData.telefone}
                onChange={(value) => setUserData({...userData, telefone: value})}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acesso e Permissões</CardTitle>
            <CardDescription>
              Configure o acesso do usuário ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="filial">Filial *</Label>
                <Select value={userData.filial} onValueChange={(value) => setUserData({...userData, filial: value})}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a filial" />
                  </SelectTrigger>
                  <SelectContent>
                    {filiais.map((filial) => (
                      <SelectItem key={filial} value={filial}>{filial}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo de Permissões *</Label>
                <Select value={userData.grupo} onValueChange={(value) => setUserData({...userData, grupo: value})}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {grupos.map((grupo) => (
                      <SelectItem key={grupo} value={grupo}>{grupo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="senha">Senha *</Label>
                <Input
                  id="senha"
                  type="password"
                  value={userData.senha}
                  onChange={(e) => setUserData({...userData, senha: e.target.value})}
                  className="h-11"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
                <Input
                  id="confirmarSenha"
                  type="password"
                  value={userData.confirmarSenha}
                  onChange={(e) => setUserData({...userData, confirmarSenha: e.target.value})}
                  className="h-11"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="ativo"
                  checked={userData.ativo}
                  onCheckedChange={(checked) => setUserData({...userData, ativo: checked})}
                />
                <Label htmlFor="ativo">Usuário ativo</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="forcarTrocaSenha"
                  checked={userData.forcarTrocaSenha}
                  onCheckedChange={(checked) => setUserData({...userData, forcarTrocaSenha: checked})}
                />
                <Label htmlFor="forcarTrocaSenha">Forçar troca de senha no primeiro acesso</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseFormPage>
  );
};

export default NovoUsuario;
