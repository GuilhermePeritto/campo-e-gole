
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CampoValorProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
}

const CampoValor: React.FC<CampoValorProps> = ({
  label,
  value = '',
  onChange,
  placeholder = "0,00",
  className,
  required = false,
  id
}) => {
  const [displayValue, setDisplayValue] = useState('0,00');

  useEffect(() => {
    if (value) {
      // Converter o valor recebido para centavos para formatação
      const numericValue = parseFloat(value) || 0;
      const centavos = Math.round(numericValue * 100);
      setDisplayValue(formatCurrency(centavos.toString()));
    } else {
      setDisplayValue('0,00');
    }
  }, [value]);

  const formatCurrency = (centavos: string) => {
    if (!centavos || centavos === '0') return '0,00';
    
    // Garantir que temos pelo menos 3 dígitos (para incluir os centavos)
    const paddedValue = centavos.padStart(3, '0');
    
    // Separar a parte inteira dos centavos
    const integerPart = paddedValue.slice(0, -2);
    const decimalPart = paddedValue.slice(-2);
    
    // Formatar a parte inteira com pontos a cada 3 dígitos
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    return `${formattedInteger},${decimalPart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Extrair apenas números
    const numbersOnly = input.replace(/[^\d]/g, '');
    
    // Se não há números, resetar para 0
    if (!numbersOnly) {
      setDisplayValue('0,00');
      if (onChange) {
        onChange('0');
      }
      return;
    }
    
    // Formatar para exibição
    const formatted = formatCurrency(numbersOnly);
    setDisplayValue(formatted);
    
    // Converter para valor decimal e enviar para o onChange
    if (onChange) {
      const decimalValue = (parseInt(numbersOnly) / 100).toFixed(2);
      onChange(decimalValue);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm font-medium">
          R$
        </span>
        <Input
          id={id}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn("pl-10 h-11 text-right font-mono text-lg", className)}
          required={required}
        />
      </div>
    </div>
  );
};

export default CampoValor;
