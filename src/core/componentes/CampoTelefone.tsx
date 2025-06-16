
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CampoTelefoneProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
}

const CampoTelefone: React.FC<CampoTelefoneProps> = ({
  label = "Telefone",
  value = '',
  onChange,
  placeholder = "(11) 99999-9999",
  className,
  required = false,
  id
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatTelefone = (telefone: string) => {
    // Remove tudo que não é número
    const numbers = telefone.replace(/[^\d]/g, '');
    
    if (numbers.length <= 10) {
      // Telefone fixo: (11) 3333-4444
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Celular: (11) 99999-9999
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Extrair apenas números
    const numbersOnly = input.replace(/[^\d]/g, '');
    
    // Limitar a 11 dígitos
    const limitedNumbers = numbersOnly.slice(0, 11);
    
    // Formatar
    const formatted = formatTelefone(limitedNumbers);
    
    setDisplayValue(formatted);
    
    if (onChange) {
      onChange(limitedNumbers);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("h-11", className)}
        required={required}
      />
    </div>
  );
};

export default CampoTelefone;
