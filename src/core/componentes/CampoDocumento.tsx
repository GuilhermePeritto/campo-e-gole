
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CampoDocumentoProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  tipo?: 'cpf' | 'cnpj' | 'auto';
  placeholder?: string;
  className?: string;
  required?: boolean;
  id?: string;
}

const CampoDocumento: React.FC<CampoDocumentoProps> = ({
  label,
  value = '',
  onChange,
  tipo = 'auto',
  placeholder,
  className,
  required = false,
  id
}) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCNPJ = (cnpj: string) => {
    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const detectTipo = (numeros: string) => {
    if (tipo !== 'auto') return tipo;
    return numeros.length <= 11 ? 'cpf' : 'cnpj';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Extrair apenas números
    const numbersOnly = input.replace(/[^\d]/g, '');
    
    // Limitar tamanho
    const maxLength = tipo === 'cnpj' ? 14 : tipo === 'cpf' ? 11 : 14;
    const limitedNumbers = numbersOnly.slice(0, maxLength);
    
    // Detectar tipo e formatar
    const tipoDetectado = detectTipo(limitedNumbers);
    let formatted = '';
    
    if (tipoDetectado === 'cpf' && limitedNumbers.length > 0) {
      formatted = formatCPF(limitedNumbers);
    } else if (tipoDetectado === 'cnpj' && limitedNumbers.length > 0) {
      formatted = formatCNPJ(limitedNumbers);
    } else {
      formatted = limitedNumbers;
    }
    
    setDisplayValue(formatted);
    
    if (onChange) {
      onChange(limitedNumbers);
    }
  };

  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    
    const tipoDetectado = detectTipo(displayValue.replace(/[^\d]/g, ''));
    return tipoDetectado === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00';
  };

  const getLabel = () => {
    if (label) return label;
    
    const tipoDetectado = detectTipo(displayValue.replace(/[^\d]/g, ''));
    return tipoDetectado === 'cnpj' ? 'CNPJ' : 'CPF';
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {getLabel()} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={getPlaceholder()}
        className={cn("h-11", className)}
        required={required}
      />
    </div>
  );
};

export default CampoDocumento;
