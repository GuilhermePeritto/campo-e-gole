import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { useUtilitarios } from '../../hooks/useUtilitarios';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';

interface CepInputProps {
  value: string;
  onChange: (cep: string) => void;
  onAddressFound?: (address: {
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  }) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const CepInput = ({
  value,
  onChange,
  onAddressFound,
  label = "CEP",
  placeholder = "12345-678",
  className = "",
  disabled = false
}: CepInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { buscarCEP } = useUtilitarios();

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value;
    onChange(cep);
  };

  const handleSearchCep = async () => {
    if (!value || value.length < 8) return;

    setIsLoading(true);
    try {
      const endereco = await buscarCEP(value);
      if (endereco && onAddressFound) {
        onAddressFound({
          rua: endereco.rua,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
        });
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchCep();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <Label htmlFor="cep">{label}</Label>}
      <div className="flex gap-2">
        <Input
          id="cep"
          value={value}
          onChange={handleCepChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
          maxLength={9}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleSearchCep}
          disabled={disabled || isLoading || !value || value.length < 8}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
