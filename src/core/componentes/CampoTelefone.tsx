
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
  label,
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
    const numbersOnly = telefone.replace(/\D/g, '');
    
    if (numbersOnly.length <= 10) {
      // Telefone fixo: (11) 1234-5678
      return numbersOnly
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    } else {
      // Celular: (11) 99999-9999
      return numbersOnly
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, '').slice(0, 11);
    const formatted = formatTelefone(numbersOnly);
    
    setDisplayValue(formatted);
    
    if (onChange) {
      onChange(numbersOnly);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="tel"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={cn("h-11", className)}
        required={required}
        maxLength={15}
      />
    </div>
  );
};

export default CampoTelefone;
