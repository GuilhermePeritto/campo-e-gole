
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CampoEmailProps {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
}

const CampoEmail = ({ 
  id, 
  label = "E-mail", 
  value, 
  onChange, 
  required = false,
  className = "",
  placeholder = "usuario@email.com"
}: CampoEmailProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.toLowerCase().trim());
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type="email"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="h-11"
      />
    </div>
  );
};

export default CampoEmail;
