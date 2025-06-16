
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CampoDocumentoProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
  tipo: 'cpf' | 'cnpj';
}

const CampoDocumento: React.FC<CampoDocumentoProps> = ({
  label,
  value = '',
  onChange,
  placeholder,
  className,
  required = false,
  id,
  tipo
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, '');
    
    let formatted = '';
    if (tipo === 'cpf') {
      formatted = formatCPF(numbersOnly.slice(0, 11));
    } else {
      formatted = formatCNPJ(numbersOnly.slice(0, 14));
    }
    
    setDisplayValue(formatted);
    
    if (onChange) {
      onChange(numbersOnly);
    }
  };

  const maxLength = tipo === 'cpf' ? 14 : 18;
  const defaultPlaceholder = tipo === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00';

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder || defaultPlaceholder}
        className={cn("h-11", className)}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
};

export default CampoDocumento;
