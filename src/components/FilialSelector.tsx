import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FilialSelectorProps {
  className?: string;
  showLabel?: boolean;
}

export const FilialSelector = ({ className = '', showLabel = true }: FilialSelectorProps) => {
  const { filiais, filialAtual, setFilialAtual } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Se não há filiais ou apenas uma, não mostrar o seletor
  if (!filiais || filiais.length <= 1) {
    return null;
  }

  const handleFilialChange = async (filialId: string) => {
    setIsLoading(true);
    try {
      const selectedFilial = filiais.find(f => f.id === filialId);
      if (selectedFilial) {
        setFilialAtual(selectedFilial);
      }
    } catch (error) {
      console.error('Erro ao alterar filial:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>Filial:</span>
        </div>
      )}
      
      <Select
        value={filialAtual?.id || ''}
        onValueChange={handleFilialChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Selecionar filial" />
        </SelectTrigger>
        <SelectContent>
          {filiais.map((filial) => (
            <SelectItem key={filial.id} value={filial.id}>
              <div className="flex flex-col">
                <span className="font-medium">{filial.nome}</span>
                <span className="text-xs text-muted-foreground">
                  {filial.cidade && filial.estado ? `${filial.cidade} - ${filial.estado}` : filial.codigo}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilialSelector;
