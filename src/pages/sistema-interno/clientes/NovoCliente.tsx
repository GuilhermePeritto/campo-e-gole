
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import BaseFormPage from '@/components/BaseFormPage';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CampoEmail from '@/core/componentes/CampoEmail';
import CampoTelefone from '@/core/componentes/CampoTelefone';
import CampoDocumento from '@/core/componentes/CampoDocumento';
import CampoValor from '@/core/componentes/CampoValor';
import SeletorData from '@/core/componentes/SeletorData';

const NovoCliente = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: '',
    plano: '',
    valorMensal: '',
    dataContrato: new Date(),
    observacoes: ''
  });

  const planos = [
    'Básico - R$ 149,90',
    'Premium - R$ 299,90',
    'Empresarial - R$ 499,90',
    'Personalizado'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo cliente:', formData);
    navigate('/sistema-interno/clientes');
  };

  const handleChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <BaseFormPage
      title="Cadastrar Novo Cliente"
      description="Registre um novo cliente no sistema"
      icon={<Users className="h-5 w-5" />}
      moduleColor="bg-blue-600"
      backTo="/sistema-interno/clientes"
      backLabel="Clientes"
      onSubmit={handleSubmit}
      submitLabel="Salvar Cliente"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Informações Básicas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome/Razão Social *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Nome do cliente ou empresa"
              required
              className="h-11"
            />
          </div>

          <CampoDocumento
            id="documento"
            label="CPF/CNPJ"
            value={formData.documento}
            onChange={(value) => handleChange('documento', value)}
            required
          />

          <CampoEmail
            id="email"
            label="E-mail"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            required
          />

          <CampoTelefone
            id="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={(value) => handleChange('telefone', value)}
            required
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 pb-2 border-b">
          <h3 className="text-lg font-semibold text-foreground">Plano e Contrato</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="plano">Plano *</Label>
            <Select value={formData.plano} onValueChange={(value) => handleChange('plano', value)}>
              <SelectTrigger id="plano" className="h-11">
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent>
                {planos.map((plano) => (
                  <SelectItem key={plano} value={plano}>{plano}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <CampoValor
            id="valorMensal"
            label="Valor Mensal"
            value={formData.valorMensal}
            onChange={(value) => handleChange('valorMensal', value)}
            required
          />

          <div className="md:col-span-2">
            <SeletorData
              id="dataContrato"
              label="Data do Contrato"
              value={formData.dataContrato}
              onChange={(date) => handleChange('dataContrato', date)}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="observacoes">Observações</Label>
        <Textarea
          id="observacoes"
          value={formData.observacoes}
          onChange={(e) => handleChange('observacoes', e.target.value)}
          placeholder="Observações sobre o cliente..."
          rows={3}
        />
      </div>
    </BaseFormPage>
  );
};

export default NovoCliente;
