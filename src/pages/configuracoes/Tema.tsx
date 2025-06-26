
import ModuleHeader from '@/components/ModuleHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MODULE_COLORS } from '@/constants/moduleColors';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, Save, Upload } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfiguracoesTema = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b',
    background: '#ffffff'
  });

  const handleColorChange = (colorKey: string, value: string) => {
    setColors(prev => ({ ...prev, [colorKey]: value }));
  };

  const handleSave = () => {
    console.log('Salvando configurações de tema:', colors);
    navigate('/configuracoes');
  };

  return (
    <div className="min-h-screen bg-background">
      <ModuleHeader
        title="Personalização Visual"
        icon={<Palette className="h-6 w-6" />}
        moduleColor={MODULE_COLORS.inicio}
        mustReturn={true}
        backTo="/configuracoes"
        backLabel="Configurações"
      />

      <main className="container mx-auto p-6 max-w-4xl">
        <div className="space-y-6">
          {/* Tema do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle>Tema do Sistema</CardTitle>
              <CardDescription>
                Configure as cores principais do sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary">Cor Primária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary"
                      type="color"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => handleColorChange('primary', e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary">Cor Secundária</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange('secondary', e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent">Cor de Destaque</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent"
                      type="color"
                      value={colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={colors.accent}
                      onChange={(e) => handleColorChange('accent', e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Cor de Fundo</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      type="text"
                      value={colors.background}
                      onChange={(e) => handleColorChange('background', e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Logo e Marca */}
          <Card>
            <CardHeader>
              <CardTitle>Logo e Marca</CardTitle>
              <CardDescription>
                Personalize a identidade visual da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Logo da Empresa</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Clique para fazer upload do logo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: PNG, JPG, SVG (máx. 2MB)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Selecionar Arquivo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Visualização das cores aplicadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-6 space-y-4">
                <div 
                  className="h-16 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: colors.primary }}
                >
                  Cor Primária
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className="h-12 rounded-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    Secundária
                  </div>
                  <div 
                    className="h-12 rounded-lg flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: colors.accent }}
                  >
                    Destaque
                  </div>
                  <div 
                    className="h-12 rounded-lg flex items-center justify-center border text-sm"
                    style={{ backgroundColor: colors.background }}
                  >
                    Fundo
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botões */}
          <div className="flex justify-end gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/configuracoes')}
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Salvar Tema
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracoesTema;
