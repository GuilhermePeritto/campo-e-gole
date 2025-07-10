
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';

interface CampoDocumentoProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  tipo: 'cpf' | 'cnpj';
  required?: boolean;
  className?: string;
}

const CampoDocumento = ({ 
  id, 
  label, 
  value, 
  onChange, 
  tipo, 
  required = false,
  className = ""
}: CampoDocumentoProps) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value) {
      const formatted = tipo === 'cpf' ? formatCPF(value) : formatCNPJ(value);
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [value, tipo]);

  const formatCPF = (cpf: string) => {
    const numbers = cpf.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
    if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return numbers.replace(/(\d{2})(\d+)/, '$1.$2');
    if (numbers.length <= 8) return numbers.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3');
    if (numbers.length <= 12) return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4');
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    
    const maxLength = tipo === 'cpf' ? 11 : 14;
    const limitedValue = rawValue.slice(0, maxLength);
    
    const formattedValue = tipo === 'cpf' 
      ? formatCPF(limitedValue) 
      : formatCNPJ(limitedValue);
    
    setDisplayValue(formattedValue);
    onChange(limitedValue);
  };

  const placeholder = tipo === 'cpf' ? '000.000.000-00' : '00.000.000/0000-00';
  const defaultLabel = tipo === 'cpf' ? 'CPF' : 'CNPJ';

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Input
        id={id}
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="h-11"
      />
    </div>
  );
};

export default CampoDocumento;
