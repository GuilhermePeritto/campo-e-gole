
import BaseFormPage from '@/components/BaseFormPage';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useFiliais } from '@/hooks/useFiliais';
import { useGrupos } from '@/hooks/useGrupos';
import { useUsuarios } from '@/hooks/useUsuarios';
import { User, Upload, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Usuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const { filiais } = useFiliais();
  const { grupos } = useGrupos();
  const { getUsuarioById, createUsuario, updateUsuario } = useUsuarios();
  
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    filialId: 0,
    grupoId: 0,
    senha: '',
    confirmarSenha: '',
    ativo: true,
    avatar: ''
  });
  const [avatarPreview, setAvatarPreview] = useState<string>('');

  useEffect(() => {
    if (isEditing && id) {
      const usuario = getUsuarioById(parseInt(id));
      if (usuario) {
        setUserData({
          nome: usuario.nome,
          email: usuario.email,
          telefone: usuario.telefone,
          cargo: usuario.cargo,
          filialId: usuario.filialId,
          grupoId: usuario.grupoId,
          senha: '',
          confirmarSenha: '',
          ativo: usuario.ativo,
          avatar: usuario.avatar || ''
        });
        setAvatarPreview(usuario.avatar || '');
      }
    }
  }, [id, isEditing, getUsuarioById]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setUserData(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing && userData.senha !== userData.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    if (isEditing && id) {
      updateUsuario(parseInt(id), {
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        cargo: userData.cargo,
        filialId: userData.filialId,
        grupoId: userData.grupoId,
        ativo: userData.ativo,
        avatar: userData.avatar
      });
    } else {
      createUsuario({
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        cargo: userData.cargo,
        filialId: userData.filialId,
        grupoId: userData.grupoId,
        ativo: userData.ativo,
        avatar: userData.avatar
      });
    }
    
    navigate('/configuracoes/usuarios');
  };

  return (
    <BaseFormPage
      title={isEditing ? 'Editar Usuário' : 'Novo Usuário'}
      description={isEditing ? 'Edite as informações do usuário' : 'Cadastre um novo usuário no sistema'}
      icon={<User className="h-6 w-6" />}
      moduleColor={MODULE_COLORS.inicio}
      backTo="/configuracoes/usuarios"
      backLabel="Usuários"
      onSubmit={handleSubmit}
      submitLabel={isEditing ? 'Salvar Alterações' : 'Salvar Usuário'}
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
            {/* Avatar Upload */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarImage src={avatarPreview} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-xl">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <Label htmlFor="avatar" className="cursor-pointer">
                <Button type="button" variant="outline" className="gap-2">
                  <Upload className="h-4 w-4" />
                  {isEditing ? 'Alterar Foto' : 'Escolher Foto'}
                </Button>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </Label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  value={userData.nome}
                  onChange={(e) => setUserData({...userData, nome: e.target.value})}
                  className="h-11"
                  required
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
                  required
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

            {!isEditing && (
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
                    required
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
                    required
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configurações de Acesso</CardTitle>
            <CardDescription>
              Configure o acesso do usuário ao sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="filial">Filial *</Label>
                <Select 
                  value={userData.filialId.toString()} 
                  onValueChange={(value) => setUserData({...userData, filialId: parseInt(value)})}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione a filial" />
                  </SelectTrigger>
                  <SelectContent>
                    {filiais.map((filial) => (
                      <SelectItem key={filial.id} value={filial.id.toString()}>
                        {filial.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="grupo">Grupo de Permissões *</Label>
                <Select 
                  value={userData.grupoId.toString()} 
                  onValueChange={(value) => setUserData({...userData, grupoId: parseInt(value)})}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Selecione o grupo" />
                  </SelectTrigger>
                  <SelectContent>
                    {grupos.map((grupo) => (
                      <SelectItem key={grupo.id} value={grupo.id.toString()}>
                        {grupo.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="ativo"
                checked={userData.ativo}
                onCheckedChange={(checked) => setUserData({...userData, ativo: checked})}
              />
              <Label htmlFor="ativo">Usuário ativo</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    </BaseFormPage>
  );
};

export default Usuario;
