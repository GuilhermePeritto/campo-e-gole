
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Package, Save, Trash2, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    supplier: '',
    barcode: '',
    minStock: '',
    active: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Bebidas', 'Lanches', 'Refeições', 'Sobremesas', 'Outros'];

  // Simular carregamento dos dados do produto
  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados mockados para demonstração
      const mockProduct = {
        name: 'Cerveja Skol 350ml',
        category: 'Bebidas',
        price: '4.50',
        supplier: 'Distribuidora ABC',
        barcode: '7891234567890',
        minStock: '20',
        active: true
      };
      setFormData(mockProduct);
      setLoading(false);
    };

    loadProduct();
  }, [id]);

  const validateField = (field: string, value: string | boolean) => {
    const newErrors = { ...errors };

    switch (field) {
      case 'name':
        if (!value || (typeof value === 'string' && !value.trim())) {
          newErrors.name = 'Nome é obrigatório';
        } else {
          delete newErrors.name;
        }
        break;
      case 'category':
        if (!value) {
          newErrors.category = 'Categoria é obrigatória';
        } else {
          delete newErrors.category;
        }
        break;
      case 'price':
        if (!value || isNaN(Number(value)) || Number(value) <= 0) {
          newErrors.price = 'Preço deve ser um número maior que zero';
        } else {
          delete newErrors.price;
        }
        break;
      case 'minStock':
        if (value && (isNaN(Number(value)) || Number(value) < 0)) {
          newErrors.minStock = 'Estoque mínimo deve ser um número válido';
        } else {
          delete newErrors.minStock;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar todos os campos
    validateField('name', formData.name);
    validateField('category', formData.category);
    validateField('price', formData.price);
    validateField('minStock', formData.minStock);

    if (Object.keys(errors).length > 0 || !formData.name.trim() || !formData.category || !formData.price) {
      toast({
        title: "Erro na validação",
        description: "Corrija os erros no formulário antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Produto atualizado!",
      description: `${formData.name} foi atualizado com sucesso.`,
    });
    navigate('/bar/produtos');
  };

  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      toast({
        title: "Produto excluído",
        description: "Produto foi removido do sistema.",
        variant: "destructive"
      });
      navigate('/bar/produtos');
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validação em tempo real
    if (typeof value === 'string' || field === 'category') {
      validateField(field, value);
    }
  };

  const formatPrice = (value: string) => {
    // Remove caracteres não numéricos exceto ponto e vírgula
    const cleanValue = value.replace(/[^\d.,]/g, '');
    return cleanValue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card shadow-sm border-b">
          <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 h-16">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar/produtos')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Editar Produto</h1>
              </div>
            </div>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-10 bg-muted rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/bar/produtos')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Editar Produto</h1>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Informações Básicas
              </CardTitle>
              <CardDescription>
                Dados principais do produto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Ex: Cerveja Skol 350ml"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Categoria *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Selecionar categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Preço de Venda *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      R$
                    </span>
                    <Input
                      id="price"
                      type="text"
                      placeholder="0,00"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', formatPrice(e.target.value))}
                      className={`pl-10 ${errors.price ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.price && (
                    <p className="text-sm text-destructive">{errors.price}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier" className="text-sm font-medium">
                    Fornecedor
                  </Label>
                  <Input
                    id="supplier"
                    placeholder="Nome do fornecedor"
                    value={formData.supplier}
                    onChange={(e) => handleInputChange('supplier', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
              <CardDescription>
                Dados complementares do produto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="barcode" className="text-sm font-medium">
                    Código de Barras
                  </Label>
                  <Input
                    id="barcode"
                    placeholder="Código de barras (opcional)"
                    value={formData.barcode}
                    onChange={(e) => handleInputChange('barcode', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minStock" className="text-sm font-medium">
                    Estoque Mínimo
                  </Label>
                  <Input
                    id="minStock"
                    type="number"
                    placeholder="Quantidade mínima"
                    value={formData.minStock}
                    onChange={(e) => handleInputChange('minStock', e.target.value)}
                    className={errors.minStock ? 'border-destructive' : ''}
                  />
                  {errors.minStock && (
                    <p className="text-sm text-destructive">{errors.minStock}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-accent rounded-lg">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => handleInputChange('active', checked)}
                />
                <div className="space-y-1">
                  <Label htmlFor="active" className="text-sm font-medium cursor-pointer">
                    Produto ativo
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Produtos ativos ficam disponíveis para venda
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1 gap-2">
                  <Save className="h-4 w-4" />
                  Salvar Alterações
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/bar/produtos')}
                  className="flex-1 gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
};

export default EditProduct;
