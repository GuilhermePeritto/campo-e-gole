import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { MapPin, Plus, Edit, Trash2, Building } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import BaseList, { BaseListColumn, BaseListAction } from '@/components/BaseList';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone?: string;
  manager?: string;
  status: 'ativa' | 'inativa';
}

const BranchesList = () => {
  const { branches, addBranch, updateBranch, deleteBranch } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  
  const [branchData, setBranchData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    manager: '',
    status: 'ativa' as 'ativa' | 'inativa'
  });

  const resetForm = () => {
    setBranchData({
      name: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      manager: '',
      status: 'ativa'
    });
    setEditingBranch(null);
  };

  const handleSave = () => {
    if (editingBranch) {
      updateBranch(editingBranch.id, branchData);
      toast({
        title: "Filial atualizada",
        description: "Os dados da filial foram atualizados com sucesso.",
      });
    } else {
      addBranch(branchData);
      toast({
        title: "Filial criada",
        description: "Nova filial foi adicionada com sucesso.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (branch: Branch) => {
    setBranchData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      phone: branch.phone || '',
      manager: branch.manager || '',
      status: branch.status
    });
    setEditingBranch(branch);
    setIsDialogOpen(true);
  };

  const handleDelete = (branchId: string) => {
    deleteBranch(branchId);
    toast({
      title: "Filial removida",
      description: "A filial foi removida com sucesso.",
    });
  };

  const handleCreateNew = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'ativa' ? 'default' : 'secondary';
  };

  const columns: BaseListColumn<Branch>[] = [
    {
      key: 'name',
      label: 'Nome',
      render: (branch) => (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-primary" />
          <span className="font-medium">{branch.name}</span>
        </div>
      ),
      sortable: true
    },
    {
      key: 'address',
      label: 'Endereço',
      render: (branch) => (
        <div>
          <div className="text-sm">{branch.address}</div>
          <div className="text-xs text-muted-foreground">{branch.city}, {branch.state}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Telefone',
      render: (branch) => branch.phone || '-'
    },
    {
      key: 'manager',
      label: 'Gerente',
      render: (branch) => branch.manager || '-'
    },
    {
      key: 'status',
      label: 'Status',
      render: (branch) => (
        <Badge variant={getStatusColor(branch.status)}>
          {branch.status}
        </Badge>
      )
    }
  ];

  const actions: BaseListAction<Branch>[] = [
    {
      label: 'Editar',
      icon: <Edit className="h-3 w-3" />,
      onClick: handleEdit,
      variant: 'outline'
    },
    {
      label: 'Excluir',
      icon: <Trash2 className="h-3 w-3" />,
      onClick: (branch) => handleDelete(branch.id),
      variant: 'outline',
      className: 'text-destructive hover:text-destructive'
    }
  ];

  const renderCard = (branch: Branch, actions: BaseListAction<Branch>[]) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">{branch.name}</CardTitle>
          </div>
          <Badge variant={getStatusColor(branch.status)}>
            {branch.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Endereço</p>
            <p className="text-sm">{branch.address}</p>
            <p className="text-sm">{branch.city}, {branch.state}</p>
          </div>

          {branch.phone && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Telefone</p>
              <p className="text-sm">{branch.phone}</p>
            </div>
          )}

          {branch.manager && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gerente</p>
              <p className="text-sm">{branch.manager}</p>
            </div>
          )}

          <div className="flex gap-2 pt-3">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                className={`flex-1 gap-1 ${action.className || ''}`}
                onClick={() => action.onClick(branch)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-full mb-4">
          <MapPin className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Gerenciar Filiais
        </h1>
        <p className="text-muted-foreground mt-2">
          Configure e gerencie as filiais da sua empresa
        </p>
      </div>

      <BaseList
        data={branches}
        columns={columns}
        actions={actions}
        title="Filiais"
        description="Gerencie as filiais da sua empresa"
        searchPlaceholder="Buscar filiais..."
        searchFields={['name', 'city', 'state', 'manager']}
        getItemId={(branch) => branch.id}
        createButton={{
          label: 'Nova Filial',
          icon: <Plus className="h-4 w-4" />,
          onClick: handleCreateNew
        }}
        renderCard={renderCard}
        showExport={true}
        exportFilename="filiais"
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingBranch ? 'Editar Filial' : 'Nova Filial'}
            </DialogTitle>
            <DialogDescription>
              {editingBranch ? 'Atualize os dados da filial' : 'Preencha os dados da nova filial'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Filial</Label>
              <Input
                id="name"
                value={branchData.name}
                onChange={(e) => setBranchData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Nome da filial"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                value={branchData.address}
                onChange={(e) => setBranchData(prev => ({ ...prev, address: e.target.value }))}
                placeholder="Endereço completo"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={branchData.city}
                  onChange={(e) => setBranchData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Cidade"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  value={branchData.state}
                  onChange={(e) => setBranchData(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="Estado"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                value={branchData.phone}
                onChange={(e) => setBranchData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manager">Gerente</Label>
              <Input
                id="manager"
                value={branchData.manager}
                onChange={(e) => setBranchData(prev => ({ ...prev, manager: e.target.value }))}
                placeholder="Nome do gerente"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingBranch ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BranchesList;
