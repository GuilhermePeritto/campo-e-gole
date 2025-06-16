
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface CampoTelefoneProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

const CampoTelefone = ({ 
  id, 
  label = "Telefone", 
  value, 
  onChange, 
  required = false,
  className = ""
}: CampoTelefoneProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  const formatTelefone = (telefone: string) => {
    const numbers = telefone.replace(/\D/g, '');
    
    if (numbers.length <= 10) {
      // Telefone fixo: (11) 1234-5678
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
      // Celular: (11) 91234-5678
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const limitedValue = rawValue.slice(0, 11); // Máximo 11 dígitos
    
    const formattedValue = formatTelefone(limitedValue);
    
    setDisplayValue(formattedValue);
    onChange(limitedValue); // Enviar apenas números
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        value={displayValue}
        onChange={handleChange}
        placeholder="(11) 99999-9999"
        required={required}
        className="h-11"
      />
    </div>
  );
};

export default CampoTelefone;
