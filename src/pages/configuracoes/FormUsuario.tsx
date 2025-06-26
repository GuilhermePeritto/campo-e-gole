
import ModuleHeader from '@/components/ModuleHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { toast } from '@/hooks/use-toast';
import { useFiliais } from '@/hooks/useFiliais';
import { useGrupos } from '@/hooks/useGrupos';
import { useUsuarios } from '@/hooks/useUsuarios';
import { Camera, Upload, User, UserPlus, Edit } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FormUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  const { filiais, buscarFiliais } = useFiliais();
  const { grupos, buscarGrupos } = useGrupos();
  const { buscarUsuarioPorId, criarUsuario, atualizarUsuario } = useUsuarios();

  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    filialId: 0,
    grupoId: 0,
    senha: '',
    confirmarSenha: '',
    ativo: true,
    foto: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buscarFiliais();
    buscarGrupos();
  }, [buscarFiliais, buscarGrupos]);

  useEffect(() => {
    if (isEditing && id) {
      carregarUsuario(parseInt(id));
    }
  }, [id, isEditing]);

  const carregarUsuario = async (usuarioId: number) => {
    setLoading(true);
    const usuario = await buscarUsuarioPorId(usuarioId);
    
    if (usuario) {
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        cargo: usuario.cargo,
        filialId: usuario.filialId,
        grupoId: usuario.grupoId,
        senha: '',
        confirmarSenha: '',
        ativo: usuario.ativo,
        foto: usuario.foto || ''
      });
      setAvatarPreview(usuario.foto || '');
    }
    setLoading(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        setFormData(prev => ({ ...prev, foto: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEditing && formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.grupoId) {
      toast({
        title: "Erro",
        description: "Selecione um grupo para o usuário.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.filialId) {
      toast({
        title: "Erro",
        description: "Selecione uma filial para o usuário.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      if (isEditing) {
        await atualizarUsuario(parseInt(id!), {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cargo: formData.cargo,
          filialId: formData.filialId,
          grupoId: formData.grupoId,
          ativo: formData.ativo,
          foto: formData.foto
        });
        
        toast({
          title: "Usuário atualizado",
          description: "O usuário foi atualizado com sucesso.",
        });
      } else {
        await criarUsuario({
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          cargo: formData.cargo,
          filialId: formData.filialId,
          grupoId: formData.grupoId,
          ativo: formData.ativo,
          foto: formData.foto,
          ultimoAcesso: '',
          senha: formData.senha
        });
        
        toast({
          title: "Usuário criado",
          description: "O usuário foi criado com sucesso.",
        });
      }
      
      navigate('/configuracoes/usuarios');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o usuário.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedGrupo = grupos.find(g => g.id === formData.grupoId);
  const selectedFilial = filiais.find(f => f.id === formData.filialId);

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title={isEditing ? "Editar Usuário" : "Novo Usuário"}
        icon={isEditing ? <Edit className="h-6 w-6" /> : <UserPlus className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes/usuarios"
        backLabel="Usuários"
      />

      <main className="container mx-auto p-6 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações Pessoais
              </CardTitle>
              <CardDescription>
                {isEditing ? 'Atualize os dados pessoais do usuário' : 'Dados básicos do novo usuário'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
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
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    className="h-11"
                    placeholder="Ex: Gerente, Atendente"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CampoEmail
                  id="email"
                  value={formData.email}
                  onChange={(value) => setFormData({...formData, email: value})}
                  required
                />
                
                <CampoTelefone
                  id="telefone"
                  value={formData.telefone}
                  onChange={(value) => setFormData({...formData, telefone: value})}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Configurações de Acesso */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Acesso</CardTitle>
              <CardDescription>
                Configure o acesso e permissões do usuário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="filial">Filial *</Label>
                  <Select value={formData.filialId.toString()} onValueChange={(value) => setFormData({...formData, filialId: parseInt(value)})}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione a filial" />
                    </SelectTrigger>
                    <SelectContent>
                      {filiais.map((filial) => (
                        <SelectItem key={filial.id} value={filial.id.toString()}>{filial.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grupo">Grupo de Permissões *</Label>
                  <Select value={formData.grupoId.toString()} onValueChange={(value) => setFormData({...formData, grupoId: parseInt(value)})}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione o grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      {grupos.filter(g => g.ativo).map((grupo) => (
                        <SelectItem key={grupo.id} value={grupo.id.toString()}>{grupo.nome}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedGrupo && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${selectedGrupo.cor}`} />
                    <span className="font-medium">{selectedGrupo.nome}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedGrupo.descricao}</p>
                </div>
              )}

              {!isEditing && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha *</Label>
                    <Input
                      id="senha"
                      type="password"
                      value={formData.senha}
                      onChange={(e) => setFormData({...formData, senha: e.target.value})}
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
                      value={formData.confirmarSenha}
                      onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                      className="h-11"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => setFormData({...formData, ativo: checked})}
                />
                <Label htmlFor="ativo">Usuário ativo</Label>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/configuracoes/usuarios')}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : (isEditing ? 'Atualizar Usuário' : 'Criar Usuário')}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FormUsuario;
