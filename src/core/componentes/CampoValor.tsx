
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
      const numericValue = value.replace(/[^\d]/g, '');
      setDisplayValue(formatCurrency(numericValue));
    }
  }, [value]);

  const formatCurrency = (value: string) => {
    if (!value || value === '0') return '0,00';
    
    const paddedValue = value.padStart(3, '0');
    const integerPart = paddedValue.slice(0, -2);
    const decimalPart = paddedValue.slice(-2);
    
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${formattedInteger},${decimalPart}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    const formatted = formatCurrency(rawValue);
    
    setDisplayValue(formatted);
    
    if (onChange) {
      const numericValue = (parseInt(rawValue) / 100).toString();
      onChange(numericValue);
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
